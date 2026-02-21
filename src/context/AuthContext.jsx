import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "../SupabaseClient";

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [session, setSession] = useState(undefined)

    const signUpNewUser = async (name, email, password, captchaToken, type) => {
        const {data, error} = await supabase.auth.signUp({
            email: email, password: password,
            options: {
                data: {
                    name: name,
                    account_type: type,
                },
                captchaToken: captchaToken,
            }
        })
        if (error) {
            console.error("There was a problem signing up")
            return { success: false, error }
        }
        return { success: true, data }
    }

    const signInUser = async (email, password, captchaToken) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
            options: { captchaToken }
        });

        if (error) return { success: false, error: error.message };

        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('account_type')
            .eq('id', data.user.id)
            .single();

        if (profileError) return { success: false, error: "Profile not found." };

        return { success: true, user: data.user, accountType: profile.account_type };
    };

    useEffect(() => {
        // get current session on load
        supabase.auth.getSession().then(({ data: { session }}) => {
            setSession(session)
        })

        // Listen for auth state changes and ensure a profile row exists with account_type.
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setSession(session)

            try {
                if (session?.user) {
                    const userId = session.user.id

                    // check existing profile
                    const { data: profile, error: profileError } = await supabase
                        .from('profiles')
                        .select('account_type')
                        .eq('id', userId)
                        .single()

                    // If no profile or no account_type, create/upsert one using available metadata
                    if (profileError || !profile || !profile.account_type) {
                        // Preferred source: user_metadata set at signup. Fallback to a pre-oauth stored value or 'user'.
                        const metaType = session.user.user_metadata?.account_type
                        const storedType = typeof window !== 'undefined' ? window.localStorage.getItem('pre_oauth_account_type') : null
                        const account_type = metaType || storedType || 'user'

                        // Upsert profile row so later sign-ins can query it
                        await supabase.from('profiles').upsert({
                            id: userId,
                            account_type,
                            full_name: session.user.user_metadata?.name || session.user.email
                        }, { returning: 'minimal' })

                        // cleanup stored pre-oauth value
                        if (typeof window !== 'undefined') window.localStorage.removeItem('pre_oauth_account_type')
                    }
                }
            } catch (err) {
                console.error('Error ensuring profile after auth change:', err)
            }
        })

        return () => subscription.unsubscribe()
    }, [])
    const signOut = async () => {
        const {error} = await supabase.auth.signOut()
        if (error) {
            console.error("There was an error signing out")
        }
    }

    // Accept an optional `type` to indicate the account type the user intends (e.g., 'user' or 'business').
    // We store that temporarily (localStorage) before redirecting to OAuth and then upsert it into `profiles` on auth change.
    const signInWithGoogle = async (type = 'user') => {
        // Only allow Google OAuth for regular 'user' accounts.
        if (type !== 'user') {
            return { success: false, error: 'Google sign-in is only available for individual user accounts.' }
        }

        try {
            if (typeof window !== 'undefined') {
                window.localStorage.setItem('pre_oauth_account_type', type)
            }

            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: window.location.origin
                }
            })

            if (error) throw error
            return { success: true, data }
        } catch (error) {
            console.error("Google login error", error)
            return { success: false, error: error.message }
        }
    }
    const sendMagicLink = async (email) => {
        try {
            const { error } = await supabase.auth.signInWithOtp({
                email: email,
                options: {
                    emailRedirectTo: window.location.origin, 
                },
            });
            if (error) throw error;
            return { success: true };
        } catch (error) {
            console.error("OTP Error");
            return { success: false, error: error.message };
        }
    };

        return (
            <AuthContext.Provider value={{ session, signUpNewUser, signInUser, signInWithGoogle, signOut, sendMagicLink }}>
                {children}
            </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}
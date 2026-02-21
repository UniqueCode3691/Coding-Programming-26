import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "../SupabaseClient";

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [session, setSession] = useState(undefined)
    const [loading, setLoading] = useState(true)

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
        try {
            const userId = data?.user?.id
            if (userId) {
                await supabase.from('profiles').upsert({
                    id: userId,
                    full_name: name,
                    account_type: type,
                }, { returning: 'minimal' })
            }
        } catch (err) {
            console.error('Failed to upsert profile after signUp:', err)
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
        let mounted = true

        const init = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession()
                if (!mounted) return
                setSession(session)
            } catch (err) {
                console.error('Error getting session on init:', err)
            } finally {
                if (mounted) setLoading(false)
            }
        }

        init()

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setSession(session)

            try {
                if (session?.user) {
                    const userId = session.user.id

                    const { data: profile, error: profileError } = await supabase
                        .from('profiles')
                        .select('account_type')
                        .eq('id', userId)
                        .single()

                    if (profileError || !profile || !profile.account_type) {
                        const account_type = session.user.user_metadata?.account_type || 'user'

                        // Ensure we have a profiles row for this user
                        await supabase.from('profiles').upsert({
                            id: userId,
                            account_type,
                            full_name: session.user.user_metadata?.name || session.user.email
                        }, { returning: 'minimal' })

                        try {
                            // Also update the Supabase user's metadata so UI that reads
                            // `session.user.user_metadata.account_type` sees the correct value.
                            await supabase.auth.updateUser({
                                data: {
                                    account_type,
                                    name: session.user.user_metadata?.name || session.user.email
                                }
                            })
                        } catch (metaErr) {
                            console.error('Failed to update user metadata with account_type:', metaErr)
                        }
                    }
                }
            } catch (err) {
                console.error('Error ensuring profile after auth change:', err)
            } finally {
                if (mounted) setLoading(false)
            }
        })

        return () => {
            mounted = false
            subscription.unsubscribe()
        }
    }, [])
    const signOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            // proactively clear local session state so UI updates immediately
            setSession(null);
            if (error) {
                console.error("There was an error signing out:", error);
                return { success: false, error };
            }
            return { success: true };
        } catch (err) {
            console.error('Unexpected signOut error:', err);
            setSession(null);
            return { success: false, error: err };
        }
    }

    const signInWithGoogle = async () => {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: window.location.origin
                }
            })

            if (error) throw error

            if (data?.url) {
                window.location.href = data.url
                return { success: true }
            }

            if (data?.session) {
                return { success: true, session: data.session }
            }

            return { success: true, data }
        } catch (error) {
            console.error("Google login error", error)
            return { success: false, error: error.message }
        }
    }
    const sendMagicLink = async (email, captchaToken) => {
        try {
            const { error } = await supabase.auth.signInWithOtp({
                email: email,
                options: {
                    emailRedirectTo: window.location.origin, 
                    captchaToken
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
            <AuthContext.Provider value={{ session, loading, signUpNewUser, signInUser, signInWithGoogle, signOut, sendMagicLink }}>
                {children}
            </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}
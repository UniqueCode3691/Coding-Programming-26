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
        supabase.auth.getSession().then(({ data: { session }}) => {
            setSession(session)
        })

        const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    setSession(session)
  })

  return () => subscription.unsubscribe()
}, [])
    const signOut = async () => {
        const {error} = await supabase.auth.signOut()
        if (error) {
            console.error("There was an error signing out")
        }
    }

    const signInWithGoogle = async () => {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: window.location.origin 
                }
            });
                if (error) throw error;
                return { success: true, data };
            } catch (error) {
                console.error("Google login error");
                return { success: false, error: error.message };
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
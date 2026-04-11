// AuthContext.jsx - Authentication context provider for the NearMeer application.
// This file manages user authentication state using Supabase.
// It provides functions for signing up, signing in, signing out, and handling authentication changes.
// The context is used throughout the app to access the current user session and authentication methods.

import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "../SupabaseClient";

// Create the AuthContext to hold authentication state and methods.
const AuthContext = createContext()

// AuthContextProvider component that wraps the app and provides authentication functionality.
// It manages the session state, loading state, and exposes authentication methods to child components.
export const AuthContextProvider = ({children}) => {
    // State to hold the current user session. Undefined initially, then null or session object.
    const [session, setSession] = useState(undefined)
    // State to indicate if authentication is loading.
    const [loading, setLoading] = useState(true)
    const [favoriteIds, setFavoriteIds] = useState([]);
    useEffect(() => {
        if (session?.user) {
            const fetchFavoriteIds = async () => {
                const { data } = await supabase
                    .from('favorites')
                    .select('business_id')
                    .eq('user_id', session.user.id);
                setFavoriteIds(data?.map(f => f.business_id) || []);
            };
            fetchFavoriteIds();
        } else {
            setFavoriteIds([]);
        }
    }, [session]);
    // Function to sign up a new user.
    // Takes name, email, password, captcha token, and account type.
    // Signs up with Supabase auth, then upserts the profile in the profiles table.
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

    // Function to sign in an existing user.
    // Takes email, password, and captcha token.
    // Signs in with Supabase, then fetches the account type from profiles.
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

    // useEffect to initialize the session and listen for auth state changes.
    // On mount, gets the current session.
    // Sets up a listener for auth state changes (sign in, sign out, etc.).
    // Ensures the profile exists and has account_type.
    useEffect(() => {
        let mounted = true

        const init = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession()
                console.debug('[Auth] init session:', session)
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
            console.debug('[Auth] onAuthStateChange', _event, session)
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

                        await supabase.from('profiles').upsert({
                            id: userId,
                            account_type,
                            full_name: session.user.user_metadata?.name || session.user.email
                        }, { returning: 'minimal' })

                        try {
                            await supabase.auth.updateUser({
                                data: {
                                    account_type: account_type,
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
    // Function to sign out the current user.
    // Signs out with Supabase, clears local storage, and resets session state.
    const signOut = async () => {
        console.debug('[Auth] signOut called');
        try {
            setSession(null);

            const { error } = await supabase.auth.signOut();

            if (error) {
                console.error("Supabase signOut error:", error);
                return { success: false, error };
            }
            localStorage.removeItem('supabase.auth.token'); 

            return { success: true };
        } catch (err) {
            console.error('Unexpected signOut error:', err);
            return { success: false, error: err };
        }
    };

    // Function to sign in with Google OAuth.
    // Redirects to Google for authentication, then back to the app.
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
    // Function to send a magic link for passwordless sign-in.
    // Sends an OTP to the user's email.
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

    const toggleFavorite = async (business) => {
        if (!session?.user) return { error: "Please login first" };

        const isFavorited = favoriteIds.includes(business.id);

        if (isFavorited) {
            await supabase.from('favorites').delete().eq('user_id', session.user.id).eq('business_id', business.id);
            setFavoriteIds(prev => prev.filter(id => id !== business.id));
            return { action: 'removed' };
        } else {
            await supabase.from('favorites').insert({
                user_id: session.user.id,
                business_id: business.id,
                business_name: business.name,
                business_data: business
            });
            setFavoriteIds(prev => [...prev, business.id]);
            return { action: 'added' };
        }
    };

    // Provide the context value to child components.
    // Includes session, loading, and all auth methods.
    return (
        <AuthContext.Provider value={{ session, loading, signUpNewUser, signInUser, signInWithGoogle, signOut, sendMagicLink, favoriteIds, toggleFavorite }}>
            {children}
        </AuthContext.Provider>
    )
}

// Custom hook to use the AuthContext.
// Allows components to access authentication state and methods easily.
export const UserAuth = () => {
    return useContext(AuthContext)
}
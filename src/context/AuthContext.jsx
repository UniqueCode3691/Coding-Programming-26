// AuthContext.jsx - Authentication context provider for the NearMeer application.
import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "../SupabaseClient";

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [session, setSession] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const [favoriteIds, setFavoriteIds] = useState([]);

    useEffect(() => {
        // 1. Initial Session Check
        const initializeAuth = async () => {
            const { data: { session: initialSession } } = await supabase.auth.getSession();
            setSession(initialSession);
            setLoading(false);
        };

        initializeAuth();

        // 2. Listen for Auth State Changes (Sign-in, Sign-out, Token Refresh)
        // This is crucial for fixing the "Refresh signs me back in" bug.
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
            setSession(currentSession);
            setLoading(false);
            
            if (!currentSession) {
                // Clear user-specific state on sign-out
                setFavoriteIds([]);
            }
        });

        return () => {
            subscription.unsubscribe();
        }
    }, []);

    // Fetch favorites whenever the session changes to a logged-in user
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
        }
    }, [session]);

    const signUpNewUser = async (name, email, password, captchaToken, type) => {
        try {
            const {data, error} = await supabase.auth.signUp({
                email: email, 
                password: password,
                options: {
                    captchaToken,
                    data: {
                        display_name: name,
                        account_type: type,
                    }
                }
            });
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error("Signup error", error);
            return { success: false, error: error.message };
        }
    }

    const signInUser = async (email, password, captchaToken) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
                options: { captchaToken }
            });
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    const signOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            // State is handled by onAuthStateChange listener
            return { success: true };
        } catch (error) {
            console.error("Logout error", error);
            return { success: false, error: error.message };
        }
    }

    const signInWithGoogle = async () => {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: { redirectTo: window.location.origin }
            });
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error("Google login error", error);
            return { success: false, error: error.message };
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
            console.error("OTP Error", error);
            return { success: false, error: error.message };
        }
    };

    const toggleFavorite = async (business) => {
        if (!session?.user) return { error: "Please login first" };

        const isFavorited = favoriteIds.includes(business.id);

        try {
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
        } catch (err) {
            console.error("Toggle Favorite error", err);
            return { error: err.message };
        }
    };

    return (
        <AuthContext.Provider value={{ session, loading, signUpNewUser, signInUser, signInWithGoogle, signOut, sendMagicLink, favoriteIds, toggleFavorite }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}
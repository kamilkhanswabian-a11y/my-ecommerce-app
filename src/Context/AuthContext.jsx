import { createContext, useEffect, useState } from "react";
import { supabase } from '../supabaseClient'


export const AuthContext = createContext(null);
export function Authprovider({ children }) {
    const [user, setuser] = useState(null);
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState('')
    async function sign_Up(email, password) {
        console.log(email, password);

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        })
        if (error) throw error;
        console.log(data);

        return data
    }


    async function sign_In(email, password) {
        const { data } = await supabase.auth.signInWithPassword({
            email,
            password
        })
    }


    async function sign_Out() {
        setloading(true);
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
        } catch (err) {
            seterror(err.message);
        } finally {
            setloading(false);
        }
    }


    useEffect(() => {
        async function get_Session() {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                setuser(session?.user ?? null)
            } catch (error) {
                seterror(error)
            } finally {
                setloading(false)
            }
        }
        get_Session()

        const { data: { subscription }, } = supabase.auth.onAuthStateChange((_event, session) => {
            setuser(session?.user ?? null);
        }
        );

        return () => subscription.unsubscribe();
    }, [])


    return (
        <AuthContext.Provider value={{
            sign_Up,
            sign_In,
            sign_Out,
            loading,
            setloading,
            user,
        }}>
            {children}
        </AuthContext.Provider>
    )
}
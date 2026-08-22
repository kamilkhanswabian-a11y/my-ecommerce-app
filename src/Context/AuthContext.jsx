import { createContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export const AuthContext = createContext(null);

export function Authprovider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sign Up
  async function signUp(form) {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    if (!data.user) {
      setLoading(false);
      setError('Please check your email to confirm your account before signing in.');
      return data;
    }

    const { profileError } = await supabase
      .from('profiles')
      .insert({
        id: data.user.id,
        firstname: form.firstname,
        lastname: form.lastname,
      })
    setLoading(false);

    if(profileError){
      setError(profileError.message)
    }
    if (error) {
      setError(error.message);
      throw error;
    }
    return data;
  }

  // Sign In
  async function signIn(email, password) {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      throw error;
    }
    return data;
  }

  // Sign Out
  async function signOut() {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  // Auth Listener
  useEffect(() => {
    async function getSession() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);
  
  useEffect(() => {
  if (!user) {
    setProfile(null);
    return;
  }

  async function get_User() {
    const { data: profileData, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      setError(error.message);
      return;
    }
    setProfile(profileData);
  }
  get_User();
}, [user]);

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        signOut,
        loading,
        user,
        error,
        setError,
        profile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
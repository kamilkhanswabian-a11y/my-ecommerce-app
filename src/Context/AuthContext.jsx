import { createContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export const AuthContext = createContext(null);

export function Authprovider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // =====================================================
  // GET USER PROFILE
  // =====================================================

  async function getUserProfile(userId) {
    if (!userId) {
      setProfile(null);
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    if (error) {
      setError(error.message);
      return;
    }

    setProfile(data);
  }

  // =====================================================
  // UPLOAD AVATAR
  // =====================================================

  async function uploadAvatar(file) {
    if (!file) return;
    if (!user) {
      throw new Error("You must be logged in to upload an avatar.");
    }

    const fileExt = file.name.split(".").pop().toLowerCase();
    const filePath = `${user.id}/avatar.${fileExt}`;

    // Upload image to Storage
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, {
        upsert: true,
        contentType: file.type,
      });

    if (uploadError) {
      setError(uploadError.message);
      throw uploadError;
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    const avatarUrl = publicUrlData.publicUrl;

    // Save URL in profiles table
    const {
      data: updatedProfile,
      error: saveUrlError,
    } = await supabase
      .from("profiles")
      .update({
        avatar_url: avatarUrl,
      })
      .eq("id", user.id)
      .select()
      .single();

    if (saveUrlError) {
      setError(saveUrlError.message);
      throw saveUrlError;
    }

    // Update React state immediately
    setProfile(updatedProfile);
 
    return updatedProfile;
  }

  // =====================================================
  // SIGN UP
  // =====================================================

  async function signUp(form) {
    setLoading(true);
    setError(null);

    try {
      // Create authentication user
      const { data, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });

      if (authError) {
        throw authError;
      }

      if (!data.user) {
        throw new Error("User could not be created.");
      }

      // Create profile
      const { data: profileData, error: profileError } =
        await supabase
          .from("profiles")
          .insert({
            id: data.user.id,
            firstname: form.firstname,
            lastname: form.lastname,
            role: "user",
            avatar_url: null,
          })
          .select()
          .single();

      if (profileError) {
        throw profileError;
      }

      // Set local state
      setUser(data.user);
      setProfile(profileData);

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  // =====================================================
  // SIGN IN
  // =====================================================

  async function signIn(email, password) {
    setLoading(true);
    setError(null);

    try {
      const { data, error: authError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (authError) {
        throw authError;
      }

      setUser(data.user);

      // Get profile after login
      await getUserProfile(data.user.id);

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  // =====================================================
  // SIGN OUT
  // =====================================================

  async function signOut() {
    setLoading(true);
    setError(null);

    try {
      const { error: signOutError } =
        await supabase.auth.signOut();

      if (signOutError) {
        throw signOutError;
      }

      setUser(null);
      setProfile(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  // =====================================================
  // AUTH LISTENER + INITIAL SESSION
  // =====================================================

  useEffect(() => {
    async function getSession() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        const currentUser = session?.user ?? null;

        setUser(currentUser);

        if (currentUser) {
          await getUserProfile(currentUser.id);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const currentUser = session?.user ?? null;

        setUser(currentUser);

        if (!currentUser) {
          setProfile(null);
          return;
        }

        await getUserProfile(currentUser.id);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);


  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        error,
        setError,
        signUp,
        signIn,
        signOut,
        uploadAvatar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
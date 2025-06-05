import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { ActivityIndicator } from 'react-native';

type MyAuthContextType = {
  user: User | null
  isAuthenticated: boolean,
  logout: () => void
}

const MyAuthContext = createContext<MyAuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | false>(false);

  // Check if user is logged in on mount and set up auth state listener
  useEffect(() => {
    // Get initial session
    checkAuthStatus();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          setUser(session.user);
          setIsAuthenticated(true)
        } else {
          setUser(null);
          setIsAuthenticated(false)
        }
        setLoading(false);
      }
    );

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkAuthStatus = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        setIsAuthenticated(true)
        // console.log(JSON.stringify(session, null, 2))
      }
    } catch (err) {
      setError('Failed to check authentication status');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setIsAuthenticated(false)
    } catch (err: any) {
      setError(err.message || 'Failed to logout');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  if(loading) {
    return <ActivityIndicator />
  }

  const value = {
    user,
    isAuthenticated,
    logout
  };

  return <MyAuthContext.Provider value={value}>{children}</MyAuthContext.Provider>;
}

// Custom hook to use the auth context
export function useMyAuth() {
  const context = useContext(MyAuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

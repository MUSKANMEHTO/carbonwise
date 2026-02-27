"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import {
  getCurrentUser,
  signInWithEmail,
  signUpWithEmail,
  signInWithGoogle,
  signOut,
  resetPassword,
  type User,
} from "@/lib/auth"

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, displayName: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  logout: () => Promise<void>
  forgotPassword: (email: string) => Promise<void>
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const storedUser = getCurrentUser()
    setUser(storedUser)
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setError(null)
      setLoading(true)
      const loggedInUser = await signInWithEmail(email, password)
      setUser(loggedInUser)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed"
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const signup = async (email: string, password: string, displayName: string) => {
    try {
      setError(null)
      setLoading(true)
      const newUser = await signUpWithEmail(email, password, displayName)
      setUser(newUser)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Signup failed"
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const loginWithGoogle = async () => {
    try {
      setError(null)
      setLoading(true)
      const googleUser = await signInWithGoogle()
      setUser(googleUser)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Google login failed"
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      setLoading(true)
      await signOut()
      setUser(null)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Logout failed"
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const forgotPassword = async (email: string) => {
    try {
      setError(null)
      await resetPassword(email)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Password reset failed"
      setError(message)
      throw err
    }
  }

  const clearError = () => setError(null)

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        signup,
        loginWithGoogle,
        logout,
        forgotPassword,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Simple mock authentication system using localStorage

export interface User {
  id: string
  email: string
  displayName: string | null
  photoURL: string | null
}

const STORAGE_KEY = "carbonwise_user"
const USERS_KEY = "carbonwise_users"

// Get stored users
function getStoredUsers(): Record<string, { password: string; user: User }> {
  if (typeof window === "undefined") return {}
  const stored = localStorage.getItem(USERS_KEY)
  return stored ? JSON.parse(stored) : {}
}

// Save users
function saveUsers(users: Record<string, { password: string; user: User }>) {
  if (typeof window === "undefined") return
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

// Get current user
export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : null
}

// Save current user
function setCurrentUser(user: User | null) {
  if (typeof window === "undefined") return
  if (user) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  } else {
    localStorage.removeItem(STORAGE_KEY)
  }
}

// Sign up with email and password
export async function signUpWithEmail(
  email: string,
  password: string,
  displayName: string
): Promise<User> {
  await new Promise((r) => setTimeout(r, 500)) // Simulate network delay
  
  const users = getStoredUsers()
  if (users[email]) {
    throw new Error("An account with this email already exists")
  }
  
  const user: User = {
    id: crypto.randomUUID(),
    email,
    displayName,
    photoURL: null,
  }
  
  users[email] = { password, user }
  saveUsers(users)
  setCurrentUser(user)
  
  return user
}

// Sign in with email and password
export async function signInWithEmail(
  email: string,
  password: string
): Promise<User> {
  await new Promise((r) => setTimeout(r, 500)) // Simulate network delay
  
  const users = getStoredUsers()
  const record = users[email]
  
  if (!record || record.password !== password) {
    throw new Error("Invalid email or password")
  }
  
  setCurrentUser(record.user)
  return record.user
}

// Sign in with Google (mock)
export async function signInWithGoogle(): Promise<User> {
  await new Promise((r) => setTimeout(r, 500)) // Simulate network delay
  
  const user: User = {
    id: crypto.randomUUID(),
    email: "demo@carbonwise.com",
    displayName: "Demo User",
    photoURL: null,
  }
  
  setCurrentUser(user)
  return user
}

// Sign out
export async function signOut(): Promise<void> {
  await new Promise((r) => setTimeout(r, 300))
  setCurrentUser(null)
}

// Reset password (mock)
export async function resetPassword(email: string): Promise<void> {
  await new Promise((r) => setTimeout(r, 500))
  const users = getStoredUsers()
  if (!users[email]) {
    throw new Error("No account found with this email")
  }
  // In a real app, this would send an email
}

// Update profile
export async function updateUserProfile(
  displayName?: string
): Promise<User | null> {
  await new Promise((r) => setTimeout(r, 300))
  
  const user = getCurrentUser()
  if (!user) return null
  
  const updatedUser = { ...user, displayName: displayName || user.displayName }
  setCurrentUser(updatedUser)
  
  // Update in users storage too
  const users = getStoredUsers()
  if (users[user.email]) {
    users[user.email].user = updatedUser
    saveUsers(users)
  }
  
  return updatedUser
}

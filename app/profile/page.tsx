"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { 
  User, 
  Mail, 
  Calendar, 
  Shield, 
  Leaf, 
  ArrowLeft,
  Camera,
  Edit2,
  Award,
  TrendingDown
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"

export default function ProfilePage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading || !mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900">
        <div className="w-12 h-12 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  const createdAt = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        {/* Profile Header Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-5xl font-bold shadow-xl">
                {user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || "U"}
              </div>
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-emerald-500 hover:bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-lg transition-all opacity-0 group-hover:opacity-100">
                <Camera className="w-5 h-5" />
              </button>
            </div>

            {/* Info */}
            <div className="text-center md:text-left flex-1">
              <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                <h1 className="text-3xl font-bold text-white">
                  {user.displayName || "User"}
                </h1>
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <Edit2 className="w-4 h-4 text-white/60" />
                </button>
              </div>
              <p className="text-white/60 mb-4">{user.email}</p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/20 text-emerald-300 rounded-full text-sm">
                  <Leaf className="w-4 h-4" />
                  Eco Warrior
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-500/20 text-teal-300 rounded-full text-sm">
                  <Award className="w-4 h-4" />
                  30-Day Streak
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-3">
              <TrendingDown className="w-6 h-6 text-emerald-400" />
            </div>
            <p className="text-2xl font-bold text-white mb-1">42.5 kg</p>
            <p className="text-white/60 text-sm">Total CO2 Saved</p>
          </div>
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center mx-auto mb-3">
              <Leaf className="w-6 h-6 text-teal-400" />
            </div>
            <p className="text-2xl font-bold text-white mb-1">2</p>
            <p className="text-white/60 text-sm">Trees Equivalent</p>
          </div>
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6 text-cyan-400" />
            </div>
            <p className="text-2xl font-bold text-white mb-1">85</p>
            <p className="text-white/60 text-sm">Sustainability Score</p>
          </div>
        </div>

        {/* Account Details */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
          <h2 className="text-xl font-semibold text-white mb-6">Account Details</h2>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <User className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="flex-1">
                <p className="text-white/60 text-sm">Display Name</p>
                <p className="text-white font-medium">{user.displayName || "Not set"}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center">
                <Mail className="w-5 h-5 text-teal-400" />
              </div>
              <div className="flex-1">
                <p className="text-white/60 text-sm">Email Address</p>
                <p className="text-white font-medium">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="flex-1">
                <p className="text-white/60 text-sm">Member Since</p>
                <p className="text-white font-medium">{createdAt}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-purple-400" />
              </div>
              <div className="flex-1">
                <p className="text-white/60 text-sm">Account Type</p>
                <p className="text-white font-medium">Standard Account</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-white/10">
            <Button 
              variant="outline" 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
            >
              Change Password
            </Button>
            <Button 
              variant="outline" 
              className="bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20 hover:text-red-300"
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

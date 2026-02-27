"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { 
  Trophy, 
  Medal, 
  Award, 
  Crown, 
  User,
  Search,
  Filter,
  ChevronUp,
  ChevronDown,
  Flame,
  Leaf,
  TreePine,
  Globe,
  Sparkles,
  ArrowLeft,
  Zap,
  Target,
  TreeDeciduous,
  Car,
  Recycle,
  Lightbulb,
  TrendingUp,
  Users,
  MapPin
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/AuthContext"

// Eco Level Tiers
const ecoTiers = {
  beginner: { name: "Eco Beginner", minScore: 0, color: "from-gray-400 to-gray-500", icon: Leaf },
  warrior: { name: "Green Warrior", minScore: 50, color: "from-emerald-400 to-emerald-600", icon: TreePine },
  champion: { name: "Climate Champion", minScore: 150, color: "from-teal-400 to-cyan-500", icon: Globe },
  guardian: { name: "Earth Guardian", minScore: 300, color: "from-amber-400 to-yellow-500", icon: Crown },
}

// Achievement Badges
const achievementBadges = [
  { id: "no-car", name: "No-Car Week", icon: Car, description: "7 days without car travel" },
  { id: "plastic-free", name: "Plastic-Free Month", icon: Recycle, description: "30 days plastic-free" },
  { id: "energy-saver", name: "Energy Saver", icon: Lightbulb, description: "Reduced energy by 30%" },
  { id: "plant-lover", name: "Plant Lover", icon: TreeDeciduous, description: "100% plant-based week" },
  { id: "streak-master", name: "Streak Master", icon: Flame, description: "30-day eco streak" },
  { id: "top-10", name: "Top 10", icon: Trophy, description: "Reached top 10 ranking" },
]

// Mock leaderboard data
const generateLeaderboardData = () => [
  { id: 1, rank: 1, name: "Emma Wilson", city: "San Francisco", co2Saved: 487.5, greenScore: 945, streakDays: 127, badges: ["no-car", "plastic-free", "energy-saver", "streak-master", "top-10"], tier: "guardian", avatar: "EW", isCurrentUser: false },
  { id: 2, rank: 2, name: "James Chen", city: "Seattle", co2Saved: 423.2, greenScore: 892, streakDays: 98, badges: ["no-car", "energy-saver", "plant-lover", "top-10"], tier: "guardian", avatar: "JC", isCurrentUser: false },
  { id: 3, rank: 3, name: "Sofia Martinez", city: "Portland", co2Saved: 398.7, greenScore: 867, streakDays: 84, badges: ["plastic-free", "energy-saver", "streak-master", "top-10"], tier: "champion", avatar: "SM", isCurrentUser: false },
  { id: 4, rank: 4, name: "Alex Thompson", city: "Austin", co2Saved: 356.4, greenScore: 823, streakDays: 72, badges: ["no-car", "plant-lover", "top-10"], tier: "champion", avatar: "AT", isCurrentUser: false },
  { id: 5, rank: 5, name: "Maya Patel", city: "Denver", co2Saved: 312.8, greenScore: 789, streakDays: 65, badges: ["energy-saver", "streak-master", "top-10"], tier: "champion", avatar: "MP", isCurrentUser: false },
  { id: 6, rank: 6, name: "Lucas Brown", city: "Boston", co2Saved: 287.3, greenScore: 756, streakDays: 58, badges: ["no-car", "plastic-free", "top-10"], tier: "champion", avatar: "LB", isCurrentUser: false },
  { id: 7, rank: 7, name: "Olivia Davis", city: "Chicago", co2Saved: 264.9, greenScore: 721, streakDays: 51, badges: ["plant-lover", "energy-saver", "top-10"], tier: "champion", avatar: "OD", isCurrentUser: false },
  { id: 8, rank: 8, name: "You", city: "New York", co2Saved: 245.6, greenScore: 698, streakDays: 45, badges: ["no-car", "energy-saver", "top-10"], tier: "champion", avatar: "YO", isCurrentUser: true },
  { id: 9, rank: 9, name: "Ethan Miller", city: "Los Angeles", co2Saved: 223.4, greenScore: 667, streakDays: 39, badges: ["plastic-free", "top-10"], tier: "warrior", avatar: "EM", isCurrentUser: false },
  { id: 10, rank: 10, name: "Ava Garcia", city: "Miami", co2Saved: 198.7, greenScore: 634, streakDays: 33, badges: ["no-car", "top-10"], tier: "warrior", avatar: "AG", isCurrentUser: false },
  { id: 11, rank: 11, name: "Noah Wilson", city: "Phoenix", co2Saved: 176.2, greenScore: 598, streakDays: 28, badges: ["energy-saver"], tier: "warrior", avatar: "NW", isCurrentUser: false },
  { id: 12, rank: 12, name: "Isabella Lee", city: "Dallas", co2Saved: 154.8, greenScore: 567, streakDays: 24, badges: ["plant-lover"], tier: "warrior", avatar: "IL", isCurrentUser: false },
  { id: 13, rank: 13, name: "Liam Anderson", city: "Atlanta", co2Saved: 132.5, greenScore: 523, streakDays: 19, badges: ["no-car"], tier: "warrior", avatar: "LA", isCurrentUser: false },
  { id: 14, rank: 14, name: "Sophia Taylor", city: "Minneapolis", co2Saved: 112.3, greenScore: 489, streakDays: 15, badges: ["plastic-free"], tier: "warrior", avatar: "ST", isCurrentUser: false },
  { id: 15, rank: 15, name: "Mason White", city: "Nashville", co2Saved: 89.7, greenScore: 445, streakDays: 11, badges: [], tier: "beginner", avatar: "MW", isCurrentUser: false },
]

const getTierInfo = (tier: string) => {
  return ecoTiers[tier as keyof typeof ecoTiers] || ecoTiers.beginner
}

export default function LeaderboardPage() {
  const { user } = useAuth()
  const [leaderboardData, setLeaderboardData] = useState(generateLeaderboardData())
  const [searchQuery, setSearchQuery] = useState("")
  const [timeFilter, setTimeFilter] = useState<"weekly" | "monthly" | "all-time">("all-time")
  const [sortBy, setSortBy] = useState<"rank" | "co2Saved" | "greenScore" | "streakDays">("rank")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [communityCounter, setCommunityCounter] = useState(2847563)
  const [treesGrown, setTreesGrown] = useState(135)
  const [mounted, setMounted] = useState(false)

  // Animation mount
  useEffect(() => {
    setMounted(true)
  }, [])

  // Real-time community counter simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setCommunityCounter(prev => prev + Math.floor(Math.random() * 5) + 1)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // Filter and sort data
  const filteredData = useMemo(() => {
    let data = [...leaderboardData]
    
    // Apply time filter (simulated - in real app would fetch different data)
    if (timeFilter === "weekly") {
      data = data.map(u => ({ ...u, co2Saved: u.co2Saved * 0.1, greenScore: Math.floor(u.greenScore * 0.15) }))
    } else if (timeFilter === "monthly") {
      data = data.map(u => ({ ...u, co2Saved: u.co2Saved * 0.35, greenScore: Math.floor(u.greenScore * 0.4) }))
    }
    
    // Search filter
    if (searchQuery) {
      data = data.filter(u => 
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.city.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    // Sort
    data.sort((a, b) => {
      const multiplier = sortOrder === "asc" ? 1 : -1
      if (sortBy === "rank") return (a.rank - b.rank) * multiplier
      if (sortBy === "co2Saved") return (b.co2Saved - a.co2Saved) * multiplier
      if (sortBy === "greenScore") return (b.greenScore - a.greenScore) * multiplier
      if (sortBy === "streakDays") return (b.streakDays - a.streakDays) * multiplier
      return 0
    })
    
    return data
  }, [leaderboardData, searchQuery, timeFilter, sortBy, sortOrder])

  const top3 = filteredData.slice(0, 3)
  const currentUserData = leaderboardData.find(u => u.isCurrentUser)
  const nextRankUser = currentUserData ? leaderboardData.find(u => u.rank === currentUserData.rank - 1) : null
  const co2ToNextRank = nextRankUser && currentUserData ? (nextRankUser.co2Saved - currentUserData.co2Saved).toFixed(1) : 0

  const handleSort = (column: typeof sortBy) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder(column === "rank" ? "asc" : "desc")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Floating leaves */}
        {mounted && [...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          >
            <Leaf className={`w-${4 + Math.floor(Math.random() * 4)} h-${4 + Math.floor(Math.random() * 4)} text-emerald-400`} />
          </div>
        ))}
        
        {/* Glowing orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <ArrowLeft className="w-5 h-5 text-emerald-400 group-hover:-translate-x-1 transition-transform" />
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">CarbonWise</span>
          </Link>
          
          <div className="flex items-center gap-4">
            {user && (
              <Link href="/dashboard">
                <Button variant="outline" className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10">
                  Dashboard
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Page Title */}
        <div className={`text-center mb-12 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-medium mb-6">
            <Trophy className="w-4 h-4" />
            Global Eco Leaderboard
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-balance">
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Eco Warriors
            </span>
            <span className="text-white"> Hall of Fame</span>
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto text-pretty">
            Compete with the community and rise through the ranks to become an Earth Guardian
          </p>
        </div>

        {/* Real-time Stats Bar */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {/* Community Carbon Counter */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center">
            <Globe className="w-8 h-8 text-emerald-400 mx-auto mb-3 animate-spin" style={{ animationDuration: "20s" }} />
            <p className="text-white/60 text-sm mb-1">Community CO2 Reduced</p>
            <p className="text-3xl font-bold text-emerald-400" suppressHydrationWarning>
              {mounted ? communityCounter.toLocaleString("en-US") : "2,847,563"} <span className="text-lg font-normal text-white/40">kg</span>
            </p>
          </div>
          
          {/* Virtual Forest */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center">
            <div className="flex justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <TreePine 
                  key={i} 
                  className="w-6 h-6 text-emerald-400 animate-bounce"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
            <p className="text-white/60 text-sm mb-1">Virtual Forest Grown</p>
            <p className="text-3xl font-bold text-emerald-400">
              {treesGrown.toLocaleString("en-US")} <span className="text-lg font-normal text-white/40">trees</span>
            </p>
          </div>
          
          {/* Active Members */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center">
            <Users className="w-8 h-8 text-teal-400 mx-auto mb-3" />
            <p className="text-white/60 text-sm mb-1">Active Eco Warriors</p>
            <p className="text-3xl font-bold text-teal-400">
              12,847 <span className="text-lg font-normal text-white/40">users</span>
            </p>
          </div>
        </div>

        {/* Podium Section - Top 3 */}
        <div className={`mb-16 transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="flex items-end justify-center gap-4 lg:gap-8">
            {/* 2nd Place */}
            <div className="flex flex-col items-center group">
              <div className="relative mb-4">
                <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-slate-300 to-slate-400 rounded-full flex items-center justify-center ring-4 ring-slate-400/50 shadow-xl group-hover:scale-105 transition-transform">
                  <span className="text-2xl lg:text-3xl font-bold text-slate-700">{top3[1]?.avatar}</span>
                </div>
                <Medal className="absolute -top-2 -right-2 w-8 h-8 text-slate-300" />
              </div>
              <div className="text-center mb-4">
                <p className="text-lg font-semibold text-white">{top3[1]?.name}</p>
                <p className="text-sm text-white/50">{top3[1]?.city}</p>
                <p className="text-emerald-400 font-medium">{top3[1]?.co2Saved.toFixed(1)} kg CO2</p>
              </div>
              <div className="w-24 lg:w-32 h-28 bg-gradient-to-b from-slate-500 to-slate-600 rounded-t-xl flex items-center justify-center shadow-2xl">
                <span className="text-4xl font-bold text-white/80">2</span>
              </div>
            </div>

            {/* 1st Place */}
            <div className="flex flex-col items-center group -mt-8">
              {/* Glowing Crown */}
              <div className="relative mb-2">
                <Crown className="w-12 h-12 text-yellow-400 animate-bounce drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
                <div className="absolute inset-0 w-12 h-12 bg-yellow-400/30 rounded-full blur-xl animate-pulse" />
              </div>
              <div className="relative mb-4">
                <div className="w-28 h-28 lg:w-32 lg:h-32 bg-gradient-to-br from-yellow-300 to-amber-400 rounded-full flex items-center justify-center ring-4 ring-yellow-400/50 shadow-2xl group-hover:scale-105 transition-transform">
                  <span className="text-3xl lg:text-4xl font-bold text-yellow-800">{top3[0]?.avatar}</span>
                </div>
                <div className="absolute inset-0 rounded-full bg-yellow-400/20 blur-2xl animate-pulse" />
              </div>
              <div className="text-center mb-4">
                <p className="text-xl font-bold text-white">{top3[0]?.name}</p>
                <p className="text-sm text-white/50">{top3[0]?.city}</p>
                <p className="text-emerald-400 font-semibold text-lg">{top3[0]?.co2Saved.toFixed(1)} kg CO2</p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Flame className="w-4 h-4 text-orange-400" />
                  <span className="text-orange-400 text-sm">{top3[0]?.streakDays} day streak</span>
                </div>
              </div>
              <div className="w-28 lg:w-36 h-36 bg-gradient-to-b from-yellow-400 to-amber-500 rounded-t-xl flex items-center justify-center shadow-2xl">
                <span className="text-5xl font-bold text-yellow-800">1</span>
              </div>
            </div>

            {/* 3rd Place */}
            <div className="flex flex-col items-center group">
              <div className="relative mb-4">
                <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center ring-4 ring-amber-500/50 shadow-xl group-hover:scale-105 transition-transform">
                  <span className="text-2xl lg:text-3xl font-bold text-amber-900">{top3[2]?.avatar}</span>
                </div>
                <Award className="absolute -top-2 -right-2 w-8 h-8 text-amber-400" />
              </div>
              <div className="text-center mb-4">
                <p className="text-lg font-semibold text-white">{top3[2]?.name}</p>
                <p className="text-sm text-white/50">{top3[2]?.city}</p>
                <p className="text-emerald-400 font-medium">{top3[2]?.co2Saved.toFixed(1)} kg CO2</p>
              </div>
              <div className="w-24 lg:w-32 h-20 bg-gradient-to-b from-amber-600 to-orange-600 rounded-t-xl flex items-center justify-center shadow-2xl">
                <span className="text-4xl font-bold text-amber-200">3</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Suggestion Card */}
        {currentUserData && nextRankUser && (
          <div className={`mb-8 transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">AI Rank Improvement Suggestion</h3>
                  <p className="text-white/70">
                    You need to reduce <span className="text-emerald-400 font-semibold">{co2ToNextRank} kg more CO2</span> to 
                    overtake <span className="text-white font-medium">{nextRankUser.name}</span> and reach 
                    <span className="text-yellow-400 font-semibold"> Rank #{currentUserData.rank - 1}</span>.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-sm">
                      Try cycling to work 2 days/week
                    </span>
                    <span className="px-3 py-1 bg-teal-500/20 border border-teal-500/30 rounded-full text-teal-400 text-sm">
                      Reduce meat consumption by 20%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters & Search */}
        <div className={`mb-6 transition-all duration-700 delay-400 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <Input
                placeholder="Search users or cities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-emerald-500/50 rounded-xl"
              />
            </div>
            
            {/* Time Filters */}
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-1">
              {(["weekly", "monthly", "all-time"] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setTimeFilter(filter)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    timeFilter === filter
                      ? "bg-emerald-500 text-white"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1).replace("-", " ")}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Eco Tiers Legend */}
        <div className={`mb-6 transition-all duration-700 delay-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="flex flex-wrap gap-3 justify-center">
            {Object.entries(ecoTiers).map(([key, tier]) => (
              <div key={key} className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full">
                <tier.icon className={`w-4 h-4 text-${tier.color.split(" ")[0].replace("from-", "")}`} />
                <span className="text-sm text-white/70">{tier.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Ranking Table */}
        <div className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all duration-700 delay-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {/* Table Header */}
          <div className="bg-gradient-to-r from-emerald-600/50 to-teal-600/50 backdrop-blur-sm">
            <div className="grid grid-cols-12 gap-4 p-4 text-sm font-medium text-white/80">
              <button 
                onClick={() => handleSort("rank")}
                className="col-span-1 flex items-center gap-1 hover:text-white transition-colors"
              >
                Rank
                {sortBy === "rank" && (sortOrder === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
              </button>
              <div className="col-span-3">User</div>
              <div className="col-span-2 hidden md:block">City</div>
              <button 
                onClick={() => handleSort("co2Saved")}
                className="col-span-2 flex items-center gap-1 hover:text-white transition-colors"
              >
                CO2 Saved
                {sortBy === "co2Saved" && (sortOrder === "desc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
              </button>
              <button 
                onClick={() => handleSort("greenScore")}
                className="col-span-1 hidden lg:flex items-center gap-1 hover:text-white transition-colors"
              >
                Score
                {sortBy === "greenScore" && (sortOrder === "desc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
              </button>
              <button 
                onClick={() => handleSort("streakDays")}
                className="col-span-1 hidden lg:flex items-center gap-1 hover:text-white transition-colors"
              >
                Streak
                {sortBy === "streakDays" && (sortOrder === "desc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
              </button>
              <div className="col-span-2 text-right">Badges</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-white/5">
            {filteredData.map((userItem, index) => {
              const tierInfo = getTierInfo(userItem.tier)
              return (
                <div
                  key={userItem.id}
                  className={`grid grid-cols-12 gap-4 p-4 items-center transition-all hover:bg-white/5 ${
                    userItem.isCurrentUser ? "bg-emerald-500/10 border-l-4 border-emerald-500" : ""
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Rank */}
                  <div className="col-span-1">
                    {userItem.rank === 1 ? (
                      <Crown className="w-6 h-6 text-yellow-400" />
                    ) : userItem.rank === 2 ? (
                      <Medal className="w-6 h-6 text-slate-300" />
                    ) : userItem.rank === 3 ? (
                      <Award className="w-6 h-6 text-amber-400" />
                    ) : (
                      <span className="text-lg font-bold text-white/60">#{userItem.rank}</span>
                    )}
                  </div>

                  {/* User */}
                  <div className="col-span-3 flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${tierInfo.color} flex items-center justify-center text-white font-semibold text-sm`}>
                      {userItem.avatar}
                    </div>
                    <div>
                      <p className="font-medium text-white flex items-center gap-2">
                        {userItem.name}
                        {userItem.isCurrentUser && (
                          <span className="px-2 py-0.5 bg-emerald-500/30 text-emerald-400 text-xs rounded-full">You</span>
                        )}
                      </p>
                      <p className="text-xs text-white/40">{tierInfo.name}</p>
                    </div>
                  </div>

                  {/* City */}
                  <div className="col-span-2 hidden md:flex items-center gap-2 text-white/60">
                    <MapPin className="w-4 h-4" />
                    {userItem.city}
                  </div>

                  {/* CO2 Saved */}
                  <div className="col-span-2">
                    <span className="text-emerald-400 font-semibold">{userItem.co2Saved.toFixed(1)}</span>
                    <span className="text-white/40 text-sm ml-1">kg</span>
                  </div>

                  {/* Green Score */}
                  <div className="col-span-1 hidden lg:block">
                    <span className="text-teal-400 font-semibold">{userItem.greenScore}</span>
                  </div>

                  {/* Streak */}
                  <div className="col-span-1 hidden lg:flex items-center gap-1">
                    <Flame className="w-4 h-4 text-orange-400" />
                    <span className="text-white/80">{userItem.streakDays}d</span>
                  </div>

                  {/* Badges */}
                  <div className="col-span-2 flex justify-end gap-1 flex-wrap">
                    {userItem.badges.slice(0, 3).map((badgeId) => {
                      const badge = achievementBadges.find(b => b.id === badgeId)
                      if (!badge) return null
                      return (
                        <div
                          key={badgeId}
                          className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center group relative"
                          title={badge.name}
                        >
                          <badge.icon className="w-4 h-4 text-emerald-400" />
                        </div>
                      )
                    })}
                    {userItem.badges.length > 3 && (
                      <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-xs text-white/60">
                        +{userItem.badges.length - 3}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Achievement Badges Section */}
        <div className={`mt-12 transition-all duration-700 delay-600 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Achievement Badges</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {achievementBadges.map((badge) => {
              const earned = currentUserData?.badges.includes(badge.id)
              return (
                <div
                  key={badge.id}
                  className={`p-4 rounded-2xl border text-center transition-all hover:scale-105 ${
                    earned
                      ? "bg-emerald-500/20 border-emerald-500/30"
                      : "bg-white/5 border-white/10 opacity-60"
                  }`}
                >
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center ${
                    earned ? "bg-emerald-500/30" : "bg-white/10"
                  }`}>
                    <badge.icon className={`w-6 h-6 ${earned ? "text-emerald-400" : "text-white/40"}`} />
                  </div>
                  <p className={`font-medium text-sm mb-1 ${earned ? "text-white" : "text-white/60"}`}>
                    {badge.name}
                  </p>
                  <p className="text-xs text-white/40">{badge.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Virtual Forest Visualization */}
        <div className={`mt-12 transition-all duration-700 delay-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="bg-gradient-to-b from-emerald-900/30 to-transparent backdrop-blur-xl border border-emerald-500/20 rounded-3xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Community Virtual Forest</h2>
            <p className="text-white/60 mb-8">Watch our forest grow as the community reduces emissions</p>
            
            <div className="flex justify-center items-end gap-1 h-32 mb-6">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-end"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <TreePine 
                    className={`text-emerald-${400 + (i % 3) * 100} animate-pulse`}
                    style={{ 
                      width: `${16 + Math.random() * 16}px`,
                      height: `${24 + Math.random() * 40}px`,
                      animationDelay: `${i * 200}ms`
                    }}
                  />
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-center gap-8">
              <div>
                <p className="text-4xl font-bold text-emerald-400">{treesGrown}</p>
                <p className="text-white/60 text-sm">Trees Planted</p>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div>
                <p className="text-4xl font-bold text-teal-400">{(communityCounter / 1000).toFixed(1)}t</p>
                <p className="text-white/60 text-sm">CO2 Absorbed</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

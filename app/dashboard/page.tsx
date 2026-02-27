"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import Link from "next/link"
import {
  Sun,
  Moon,
  Leaf,
  TrendingUp,
  TrendingDown,
  TreePine,
  Award,
  Target,
  Zap,
  Car,
  Bus,
  Plane,
  Utensils,
  Home,
  ArrowLeft,
  Trophy,
  Medal,
  Star,
  Flame,
  Crown,
  ChevronRight,
  Activity,
  Calendar,
  BarChart3,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart,
} from "recharts"
import { AIInsights } from "@/components/dashboard/AIInsights"

// Mock user data
const userData = {
  name: "Alex Green",
  totalEmissions: 42.5,
  lastMonthEmissions: 48.2,
  dailyAverage: 6.1,
  budgetLimit: 150,
  currentStreak: 12,
}

// Category emissions data
const categoryData = [
  { name: "Car", value: 15.2, color: "#10b981", icon: Car },
  { name: "Bus", value: 3.5, color: "#14b8a6", icon: Bus },
  { name: "Flight", value: 8.4, color: "#0891b2", icon: Plane },
  { name: "Electricity", value: 7.8, color: "#f59e0b", icon: Zap },
  { name: "Veg Meals", value: 4.2, color: "#22c55e", icon: Utensils },
  { name: "Non-Veg", value: 3.4, color: "#ef4444", icon: Utensils },
]

// Weekly trend data
const weeklyData = [
  { day: "Mon", emissions: 5.2, lastWeek: 6.1 },
  { day: "Tue", emissions: 4.8, lastWeek: 5.8 },
  { day: "Wed", emissions: 6.5, lastWeek: 7.2 },
  { day: "Thu", emissions: 5.1, lastWeek: 6.0 },
  { day: "Fri", emissions: 7.2, lastWeek: 7.8 },
  { day: "Sat", emissions: 8.1, lastWeek: 9.2 },
  { day: "Sun", emissions: 5.6, lastWeek: 6.1 },
]

// Radar chart data for lifestyle impact
const radarData = [
  { subject: "Transport", A: 75, fullMark: 100 },
  { subject: "Food", A: 45, fullMark: 100 },
  { subject: "Energy", A: 60, fullMark: 100 },
  { subject: "Travel", A: 30, fullMark: 100 },
  { subject: "Shopping", A: 55, fullMark: 100 },
]

// Leaderboard data
const leaderboardData = [
  { rank: 1, name: "Emma Wilson", score: 18.2, badge: "Eco Champion", isCurrentUser: false },
  { rank: 2, name: "James Chen", score: 22.5, badge: "Green Hero", isCurrentUser: false },
  { rank: 3, name: "Sarah Miller", score: 28.1, badge: "Earth Saver", isCurrentUser: false },
  { rank: 4, name: "Alex Green", score: 42.5, badge: "Eco Warrior", isCurrentUser: true },
  { rank: 5, name: "Mike Davis", score: 45.8, badge: "Nature Friend", isCurrentUser: false },
]

// Activity heatmap data (last 12 weeks)
const generateHeatmapData = () => {
  const data = []
  for (let week = 0; week < 12; week++) {
    for (let day = 0; day < 7; day++) {
      const value = Math.random() * 15
      data.push({
        week,
        day,
        value: parseFloat(value.toFixed(1)),
        intensity: value < 5 ? "low" : value < 10 ? "medium" : "high",
      })
    }
  }
  return data
}

const heatmapData = generateHeatmapData()

// Achievements data
const achievements = [
  { id: 1, name: "First Steps", description: "Log your first activity", icon: Leaf, earned: true, color: "emerald" },
  { id: 2, name: "Week Warrior", description: "7-day logging streak", icon: Flame, earned: true, color: "orange" },
  { id: 3, name: "Green Commuter", description: "Use public transport 10 times", icon: Bus, earned: true, color: "teal" },
  { id: 4, name: "Carbon Cutter", description: "Reduce emissions by 20%", icon: TrendingDown, earned: false, color: "blue" },
  { id: 5, name: "Eco Champion", description: "Stay under budget for a month", icon: Crown, earned: false, color: "amber" },
  { id: 6, name: "Tree Planter", description: "Save equivalent of 5 trees", icon: TreePine, earned: false, color: "green" },
]

// Animated counter hook
function useAnimatedCounter(end: number, duration: number = 1000) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number | null = null
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      setCount(Math.floor(progress * end * 10) / 10)
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [end, duration])

  return count
}

// KPI Card Component
function KPICard({
  title,
  value,
  unit,
  icon: Icon,
  trend,
  trendValue,
  color,
}: {
  title: string
  value: number
  unit: string
  icon: React.ElementType
  trend?: "up" | "down"
  trendValue?: string
  color: string
}) {
  const animatedValue = useAnimatedCounter(value, 1200)

  return (
    <div className="relative group">
      <div className={`absolute inset-0 bg-gradient-to-br ${color} rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity`} />
      <div className="relative bg-card border border-border rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${color}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          {trend && (
            <div className={`flex items-center gap-1 text-sm font-medium ${trend === "down" ? "text-emerald-500" : "text-red-500"}`}>
              {trend === "down" ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
              {trendValue}
            </div>
          )}
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-foreground">{animatedValue.toFixed(1)}</span>
            <span className="text-sm text-muted-foreground">{unit}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Budget Tracker Component
function BudgetTracker({ current, limit }: { current: number; limit: number }) {
  const percentage = (current / limit) * 100
  const getColor = () => {
    if (percentage < 50) return "from-emerald-400 to-emerald-500"
    if (percentage < 80) return "from-amber-400 to-amber-500"
    return "from-red-400 to-red-500"
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Carbon Budget</h3>
            <p className="text-sm text-muted-foreground">Monthly limit: {limit} kg</p>
          </div>
        </div>
        <span className="text-2xl font-bold text-foreground">{percentage.toFixed(0)}%</span>
      </div>
      <div className="relative h-4 bg-muted rounded-full overflow-hidden">
        <div
          className={`absolute inset-y-0 left-0 bg-gradient-to-r ${getColor()} rounded-full transition-all duration-1000`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      <div className="flex justify-between mt-2 text-sm text-muted-foreground">
        <span>{current.toFixed(1)} kg used</span>
        <span>{(limit - current).toFixed(1)} kg remaining</span>
      </div>
    </div>
  )
}

// AI Forecast Component
function AIForecast({ dailyAvg }: { dailyAvg: number }) {
  const monthlyPrediction = dailyAvg * 30
  const yearlyPrediction = dailyAvg * 365

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600">
          <Activity className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">AI Forecast</h3>
          <p className="text-sm text-muted-foreground">Based on your patterns</p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
          <div>
            <p className="text-sm text-muted-foreground">Monthly Prediction</p>
            <p className="text-2xl font-bold text-foreground">{monthlyPrediction.toFixed(1)} kg</p>
          </div>
          <div className="p-3 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl">
            <Calendar className="w-6 h-6 text-emerald-500" />
          </div>
        </div>
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
          <div>
            <p className="text-sm text-muted-foreground">Yearly Projection</p>
            <p className="text-2xl font-bold text-foreground">{(yearlyPrediction / 1000).toFixed(2)} tons</p>
          </div>
          <div className="p-3 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-xl">
            <BarChart3 className="w-6 h-6 text-amber-500" />
          </div>
        </div>
      </div>
    </div>
  )
}

// Activity Heatmap Component
function ActivityHeatmap({ data }: { data: typeof heatmapData }) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  const getColor = (intensity: string) => {
    switch (intensity) {
      case "low":
        return "bg-emerald-200 dark:bg-emerald-900"
      case "medium":
        return "bg-amber-300 dark:bg-amber-800"
      case "high":
        return "bg-red-400 dark:bg-red-700"
      default:
        return "bg-muted"
    }
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Activity Heatmap</h3>
            <p className="text-sm text-muted-foreground">Last 12 weeks</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Low</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-sm bg-emerald-200 dark:bg-emerald-900" />
            <div className="w-3 h-3 rounded-sm bg-amber-300 dark:bg-amber-800" />
            <div className="w-3 h-3 rounded-sm bg-red-400 dark:bg-red-700" />
          </div>
          <span>High</span>
        </div>
      </div>
      <div className="flex gap-1">
        <div className="flex flex-col gap-1 mr-2">
          {days.map((day) => (
            <div key={day} className="h-4 text-xs text-muted-foreground flex items-center">
              {day}
            </div>
          ))}
        </div>
        {Array.from({ length: 12 }).map((_, week) => (
          <div key={week} className="flex flex-col gap-1">
            {Array.from({ length: 7 }).map((_, day) => {
              const cell = data.find((d) => d.week === week && d.day === day)
              return (
                <div
                  key={`${week}-${day}`}
                  className={`w-4 h-4 rounded-sm ${getColor(cell?.intensity || "low")} hover:ring-2 hover:ring-primary transition-all cursor-pointer`}
                  title={`${cell?.value || 0} kg CO2`}
                />
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

// Mini Leaderboard Component
function MiniLeaderboard({ data }: { data: typeof leaderboardData }) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-amber-500" />
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />
      case 3:
        return <Medal className="w-5 h-5 text-amber-600" />
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-muted-foreground">{rank}</span>
    }
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600">
            <Trophy className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Leaderboard</h3>
            <p className="text-sm text-muted-foreground">Top performers</p>
          </div>
        </div>
        <Link href="/#leaderboard">
          <Button variant="ghost" size="sm" className="text-primary">
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>
      <div className="space-y-3">
        {data.map((user) => (
          <div
            key={user.rank}
            className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
              user.isCurrentUser ? "bg-primary/10 border border-primary/20" : "hover:bg-muted/50"
            }`}
          >
            {getRankIcon(user.rank)}
            <div className="flex-1 min-w-0">
              <p className={`font-medium truncate ${user.isCurrentUser ? "text-primary" : "text-foreground"}`}>
                {user.name} {user.isCurrentUser && "(You)"}
              </p>
              <p className="text-xs text-muted-foreground">{user.badge}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-foreground">{user.score} kg</p>
              <p className="text-xs text-muted-foreground">CO2</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Achievements Component
function AchievementsBadges({ achievements: achvs }: { achievements: typeof achievements }) {
  const getColorClasses = (color: string, earned: boolean) => {
    if (!earned) return "from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700"
    const colors: Record<string, string> = {
      emerald: "from-emerald-400 to-emerald-600",
      orange: "from-orange-400 to-orange-600",
      teal: "from-teal-400 to-teal-600",
      blue: "from-blue-400 to-blue-600",
      amber: "from-amber-400 to-amber-600",
      green: "from-green-400 to-green-600",
    }
    return colors[color] || colors.emerald
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600">
          <Star className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Achievements</h3>
          <p className="text-sm text-muted-foreground">{achvs.filter((a) => a.earned).length}/{achvs.length} earned</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {achvs.map((achievement) => (
          <div
            key={achievement.id}
            className={`flex flex-col items-center text-center p-4 rounded-xl transition-all ${
              achievement.earned ? "hover:scale-105" : "opacity-50"
            }`}
          >
            <div className={`p-3 rounded-full bg-gradient-to-br ${getColorClasses(achievement.color, achievement.earned)} mb-2`}>
              <achievement.icon className="w-6 h-6 text-white" />
            </div>
            <p className="text-xs font-medium text-foreground">{achievement.name}</p>
            <p className="text-xs text-muted-foreground line-clamp-1">{achievement.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Calculate derived values
  const percentageChange = ((userData.lastMonthEmissions - userData.totalEmissions) / userData.lastMonthEmissions) * 100
  const treesEquivalent = userData.totalEmissions / 21 // 1 tree absorbs ~21kg CO2/year
  const sustainabilityScore = Math.max(0, Math.min(100, 100 - userData.totalEmissions / 2))

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
              </Link>
              <div className="h-6 w-px bg-border" />
              <div className="flex items-center gap-2">
                <Leaf className="w-6 h-6 text-emerald-500" />
                <span className="text-xl font-bold text-foreground">CarbonWise</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden sm:block">
                Welcome, {userData.name}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full"
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Track your carbon footprint and environmental impact</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Total Carbon This Month"
            value={userData.totalEmissions}
            unit="kg CO2"
            icon={Activity}
            trend={percentageChange > 0 ? "down" : "up"}
            trendValue={`${Math.abs(percentageChange).toFixed(1)}%`}
            color="from-emerald-500 to-teal-600"
          />
          <KPICard
            title="Change from Last Month"
            value={percentageChange}
            unit="%"
            icon={percentageChange > 0 ? TrendingDown : TrendingUp}
            color={percentageChange > 0 ? "from-emerald-500 to-green-600" : "from-red-500 to-rose-600"}
          />
          <KPICard
            title="Trees Equivalent"
            value={treesEquivalent}
            unit="trees/year"
            icon={TreePine}
            color="from-green-500 to-emerald-600"
          />
          <KPICard
            title="Sustainability Score"
            value={sustainabilityScore}
            unit="/100"
            icon={Award}
            color="from-amber-500 to-orange-600"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Category Bar Chart */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-semibold text-foreground mb-6">Emissions by Category</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis type="number" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis dataKey="name" type="category" stroke="var(--muted-foreground)" fontSize={12} width={80} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      borderColor: "var(--border)",
                      borderRadius: "12px",
                    }}
                    formatter={(value: number) => [`${value} kg CO2`, "Emissions"]}
                  />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-semibold text-foreground mb-6">Percentage Breakdown</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={60}
                    paddingAngle={2}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      borderColor: "var(--border)",
                      borderRadius: "12px",
                    }}
                    formatter={(value: number) => [`${value} kg CO2`, "Emissions"]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Weekly Trend - Full Width */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-foreground">Weekly Trend</h3>
              <p className="text-sm text-muted-foreground">Comparing this week vs last week</p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-muted-foreground">This Week</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-400" />
                <span className="text-muted-foreground">Last Week</span>
              </div>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="colorEmissions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    borderColor: "var(--border)",
                    borderRadius: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="emissions"
                  stroke="#10b981"
                  strokeWidth={3}
                  fill="url(#colorEmissions)"
                  name="This Week"
                />
                <Line
                  type="monotone"
                  dataKey="lastWeek"
                  stroke="#9ca3af"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="Last Week"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center justify-center gap-2 text-emerald-500">
            <TrendingDown className="w-5 h-5" />
            <span className="font-medium">11.8% improvement compared to last week</span>
          </div>
        </div>

        {/* Radar Chart & Budget */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Radar Chart */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-semibold text-foreground mb-6">Lifestyle Impact Analysis</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="var(--border)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} />
                  <Radar
                    name="Impact"
                    dataKey="A"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      borderColor: "var(--border)",
                      borderRadius: "12px",
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Budget Tracker & AI Forecast */}
          <div className="space-y-6">
            <BudgetTracker current={userData.totalEmissions} limit={userData.budgetLimit} />
            <AIForecast dailyAvg={userData.dailyAverage} />
          </div>
        </div>

        {/* Activity Heatmap - Full Width */}
        <div className="mb-8">
          <ActivityHeatmap data={heatmapData} />
        </div>

        {/* Leaderboard & Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <MiniLeaderboard data={leaderboardData} />
          <AchievementsBadges achievements={achievements} />
        </div>

        {/* AI Sustainability Insights Section */}
        <div className="mb-8">
          <AIInsights />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-emerald-500" />
              <span className="text-sm text-muted-foreground">CarbonWise Dashboard</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Making sustainability simple, one step at a time.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

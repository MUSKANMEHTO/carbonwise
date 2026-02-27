"use client"

import { FileText, TrendingDown, TrendingUp, ArrowRight } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"

// Simulated weekly data
const weeklyData = [
  { week: "Week 1", emissions: 12.5, target: 10 },
  { week: "Week 2", emissions: 10.2, target: 10 },
  { week: "Week 3", emissions: 11.8, target: 10 },
  { week: "Week 4", emissions: 8.5, target: 10 },
]

const monthlyStats = {
  currentMonth: 42.5,
  previousMonth: 48.2,
  improvement: 11.8,
  averageDaily: 1.42,
  bestDay: 0.8,
  worstDay: 3.2,
}

export function MonthlyReport() {
  const isImprovement = monthlyStats.currentMonth < monthlyStats.previousMonth

  return (
    <section id="monthly-report" className="py-20 lg:py-32 bg-gradient-to-b from-white to-emerald-50/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full text-emerald-700 text-sm font-medium mb-6">
            <FileText className="w-4 h-4" />
            Monthly Report
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 text-balance">
            Your Carbon{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Progress Report
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
            Track your environmental impact over time and celebrate your progress
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chart */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 lg:p-8 shadow-xl border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2 sm:mb-0">
                Weekly Emissions Trend
              </h3>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                  <span className="text-gray-600">Emissions</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-teal-300 rounded-full" />
                  <span className="text-gray-600">Target</span>
                </div>
              </div>
            </div>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyData}>
                  <defs>
                    <linearGradient id="emissionsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="week" 
                    stroke="#9ca3af" 
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="#9ca3af" 
                    fontSize={12}
                    tickLine={false}
                    tickFormatter={(value) => `${value}kg`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      borderRadius: "12px",
                      border: "1px solid #e5e7eb",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                    formatter={(value: number) => [`${value} kg CO₂`, "Emissions"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="emissions"
                    stroke="#10b981"
                    strokeWidth={3}
                    fill="url(#emissionsGradient)"
                  />
                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke="#5eead4"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-6">
            {/* Month Comparison */}
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
              <h4 className="text-sm font-medium text-gray-500 mb-4">Month Comparison</h4>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-3xl font-bold text-gray-900">
                    {monthlyStats.currentMonth}
                    <span className="text-lg text-gray-500 ml-1">kg</span>
                  </div>
                  <div className="text-sm text-gray-500">This month</div>
                </div>
                <ArrowRight className="w-6 h-6 text-gray-300" />
                <div className="text-right">
                  <div className="text-2xl font-semibold text-gray-400">
                    {monthlyStats.previousMonth}
                    <span className="text-sm text-gray-400 ml-1">kg</span>
                  </div>
                  <div className="text-sm text-gray-400">Last month</div>
                </div>
              </div>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${isImprovement ? 'bg-emerald-50' : 'bg-red-50'}`}>
                {isImprovement ? (
                  <TrendingDown className="w-5 h-5 text-emerald-600" />
                ) : (
                  <TrendingUp className="w-5 h-5 text-red-600" />
                )}
                <span className={`font-semibold ${isImprovement ? 'text-emerald-700' : 'text-red-700'}`}>
                  {monthlyStats.improvement}% {isImprovement ? 'improvement' : 'increase'}
                </span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {monthlyStats.averageDaily}
                  <span className="text-sm text-gray-500 ml-1">kg</span>
                </div>
                <div className="text-sm text-gray-500">Daily Average</div>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
                <div className="text-2xl font-bold text-emerald-600 mb-1">
                  {monthlyStats.bestDay}
                  <span className="text-sm text-emerald-500 ml-1">kg</span>
                </div>
                <div className="text-sm text-gray-500">Best Day</div>
              </div>
            </div>

            {/* Achievement */}
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <TrendingDown className="w-5 h-5" />
                </div>
                <span className="font-semibold">Great Progress!</span>
              </div>
              <p className="text-white/90 text-sm leading-relaxed">
                {"You're on track to reduce your annual carbon footprint by 15%. Keep up the amazing work!"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { Globe, TrendingDown, Users, MapPin } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

const comparisonData = [
  { name: "You", value: 4.5, color: "#10b981" },
  { name: "National Avg", value: 8.0, color: "#f59e0b" },
  { name: "Global Avg", value: 10.0, color: "#ef4444" },
]

const countryData = [
  { country: "Sweden", avg: 4.2 },
  { country: "Germany", avg: 8.4 },
  { country: "USA", avg: 14.7 },
  { country: "China", avg: 7.1 },
  { country: "India", avg: 1.9 },
]

export function NationalComparison() {
  const userScore = 4.5
  const nationalAvg = 8.0
  const globalAvg = 10.0

  const percentBelowNational = ((nationalAvg - userScore) / nationalAvg * 100).toFixed(0)
  const percentBelowGlobal = ((globalAvg - userScore) / globalAvg * 100).toFixed(0)

  return (
    <section id="national-comparison" className="py-20 lg:py-32 bg-gradient-to-b from-emerald-50/50 to-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full text-emerald-700 text-sm font-medium mb-6">
            <Globe className="w-4 h-4" />
            National Comparison
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 text-balance">
            How Do You{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Compare Globally?
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
            See how your carbon footprint stacks up against national and global averages
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Bar Chart */}
          <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-xl border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-8">
              Daily Carbon Footprint Comparison
            </h3>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={true} vertical={false} />
                  <XAxis 
                    type="number" 
                    stroke="#9ca3af" 
                    fontSize={12}
                    tickFormatter={(value) => `${value}kg`}
                  />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    stroke="#9ca3af" 
                    fontSize={14}
                    width={100}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      borderRadius: "12px",
                      border: "1px solid #e5e7eb",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                    formatter={(value: number) => [`${value} kg CO₂`, "Daily Average"]}
                  />
                  <Bar 
                    dataKey="value" 
                    radius={[0, 8, 8, 0]}
                    barSize={40}
                  >
                    {comparisonData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-6 mt-6">
              {comparisonData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats & Insights */}
          <div className="space-y-6">
            {/* Performance Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-5 h-5 text-amber-500" />
                  <span className="text-sm text-gray-500">vs National</span>
                </div>
                <div className="text-3xl font-bold text-emerald-600 mb-1">
                  {percentBelowNational}%
                </div>
                <div className="text-sm text-gray-600">below average</div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="w-5 h-5 text-red-500" />
                  <span className="text-sm text-gray-500">vs Global</span>
                </div>
                <div className="text-3xl font-bold text-emerald-600 mb-1">
                  {percentBelowGlobal}%
                </div>
                <div className="text-sm text-gray-600">below average</div>
              </div>
            </div>

            {/* Country Comparison */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-600" />
                Global Country Averages
              </h4>
              <div className="space-y-3">
                {countryData.map((country) => (
                  <div key={country.country} className="flex items-center justify-between">
                    <span className="text-gray-700">{country.country}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            country.avg <= userScore 
                              ? "bg-emerald-500" 
                              : country.avg <= nationalAvg 
                              ? "bg-amber-500" 
                              : "bg-red-500"
                          }`}
                          style={{ width: `${Math.min((country.avg / 15) * 100, 100)}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-600 w-16 text-right">
                        {country.avg} kg
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievement */}
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <TrendingDown className="w-5 h-5" />
                </div>
                <span className="font-semibold">Excellent Performance!</span>
              </div>
              <p className="text-white/90 text-sm leading-relaxed">
                {"Your carbon footprint is significantly lower than both the national and global averages. You're making a real difference!"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

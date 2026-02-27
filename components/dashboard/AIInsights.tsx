"use client"

import { useState, useEffect, useCallback } from "react"
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Lightbulb,
  Brain,
  Plane,
  Car,
  Utensils,
  Zap,
  RefreshCw,
  ChevronRight,
  Sparkles,
  BarChart3,
  Calendar,
  Target,
  AlertCircle,
  CheckCircle2,
  Info,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  Legend,
} from "recharts"

interface CarbonDataPoint {
  date: string
  emission: number
}

interface Prediction {
  date: string
  predicted: number
}

interface Suggestion {
  title: string
  description: string
  impact: string
  category: string
  priority: "high" | "medium" | "low"
}

interface RiskAlert {
  type: "warning" | "info"
  title: string
  message: string
  percentageChange?: string
  category?: string
}

interface SimulationResult {
  currentTotal: number
  simulatedTotal: number
  totalReduction: number
  percentageReduction: number
  reductions: {
    category: string
    amount: number
    percentage: number
  }[]
}

interface AISummary {
  summary: string
  highlights: string[]
  encouragement: string
}

interface InsightsData {
  carbonData: CarbonDataPoint[]
  patterns: {
    totalEmission: number
    averageDaily: number
    percentages: {
      transport: string
      food: string
      energy: string
      shopping: string
    }
    emissions: {
      transport: number
      food: number
      energy: number
      shopping: number
    }
  }
  predictions: {
    next7Days: Prediction[]
    next30Days: Prediction[]
    averagePredicted7: number
    averagePredicted30: number
  }
  riskAlerts: {
    hasRisk: boolean
    percentageChange: number
    alerts: RiskAlert[]
  }
  suggestions: Suggestion[]
  aiSummary: AISummary
  simulation: SimulationResult
}

export function AIInsights() {
  const [data, setData] = useState<InsightsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [predictionRange, setPredictionRange] = useState<7 | 30>(7)
  const [simulationOptions, setSimulationOptions] = useState({
    flights: false,
    meat: false,
    carUsage: false,
  })
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null)
  const [isSimulating, setIsSimulating] = useState(false)

  const fetchInsights = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/ai-insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "full" }),
      })
      
      if (!response.ok) throw new Error("Failed to fetch insights")
      
      const result = await response.json()
      setData(result)
      setSimulationResult(result.simulation)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchInsights()
  }, [fetchInsights])

  const runSimulation = async () => {
    setIsSimulating(true)
    try {
      const response = await fetch("/api/ai-insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          action: "simulate", 
          simulationOptions 
        }),
      })
      
      if (!response.ok) throw new Error("Simulation failed")
      
      const result = await response.json()
      setSimulationResult(result.simulation)
    } catch (err) {
      console.error("Simulation error:", err)
    } finally {
      setIsSimulating(false)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/30"
      case "medium": return "bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30"
      case "low": return "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
      default: return "bg-muted text-muted-foreground"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "transport": return Car
      case "food": return Utensils
      case "energy": return Zap
      case "travel":
      case "flight": return Plane
      default: return Lightbulb
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-card border border-border rounded-2xl p-8">
          <div className="flex items-center justify-center gap-3">
            <RefreshCw className="w-6 h-6 animate-spin text-primary" />
            <span className="text-muted-foreground">Analyzing your carbon data with AI...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-destructive/10 border border-destructive/30 rounded-2xl p-6">
        <div className="flex items-center gap-3 text-destructive">
          <AlertCircle className="w-6 h-6" />
          <span>{error}</span>
        </div>
        <Button onClick={fetchInsights} variant="outline" className="mt-4">
          Try Again
        </Button>
      </div>
    )
  }

  if (!data) return null

  // Prepare chart data
  const chartData = [
    ...data.carbonData.map(d => ({
      date: d.date.slice(5),
      actual: d.emission,
      predicted: null as number | null,
    })),
    ...(predictionRange === 7 ? data.predictions.next7Days : data.predictions.next30Days).map(p => ({
      date: p.date.slice(5),
      actual: null as number | null,
      predicted: p.predicted,
    })),
  ]

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">AI Sustainability Insights</h2>
            <p className="text-muted-foreground">Powered by advanced AI analytics</p>
          </div>
        </div>
        <Button onClick={fetchInsights} variant="outline" size="sm" className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Refresh
        </Button>
      </div>

      {/* Risk Alerts */}
      {data.riskAlerts.alerts.length > 0 && (
        <div className="space-y-3">
          {data.riskAlerts.alerts.map((alert, index) => (
            <div
              key={index}
              className={`rounded-2xl p-4 border ${
                alert.type === "warning"
                  ? "bg-red-500/10 border-red-500/30"
                  : "bg-blue-500/10 border-blue-500/30"
              }`}
            >
              <div className="flex items-start gap-3">
                {alert.type === "warning" ? (
                  <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                ) : (
                  <Info className="w-5 h-5 text-blue-500 mt-0.5" />
                )}
                <div className="flex-1">
                  <h4 className={`font-semibold ${
                    alert.type === "warning" ? "text-red-600 dark:text-red-400" : "text-blue-600 dark:text-blue-400"
                  }`}>
                    {alert.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Carbon Trend Prediction */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Carbon Trend Prediction</h3>
              <p className="text-sm text-muted-foreground">AI-powered forecasting</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant={predictionRange === 7 ? "default" : "outline"}
              size="sm"
              onClick={() => setPredictionRange(7)}
            >
              7 Days
            </Button>
            <Button
              variant={predictionRange === 30 ? "default" : "outline"}
              size="sm"
              onClick={() => setPredictionRange(30)}
            >
              30 Days
            </Button>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="predictedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis 
                dataKey="date" 
                stroke="var(--muted-foreground)"
                tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
              />
              <YAxis 
                stroke="var(--muted-foreground)"
                tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                }}
                labelStyle={{ color: 'var(--foreground)' }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="actual"
                name="Actual Emissions"
                stroke="#10b981"
                fill="url(#actualGradient)"
                strokeWidth={2}
                connectNulls={false}
              />
              <Area
                type="monotone"
                dataKey="predicted"
                name="Predicted"
                stroke="#6366f1"
                fill="url(#predictedGradient)"
                strokeWidth={2}
                strokeDasharray="5 5"
                connectNulls={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="p-4 bg-muted/50 rounded-xl">
            <p className="text-sm text-muted-foreground">Predicted Average (Next {predictionRange} days)</p>
            <p className="text-2xl font-bold text-foreground">
              {(predictionRange === 7 ? data.predictions.averagePredicted7 : data.predictions.averagePredicted30).toFixed(1)} kg
            </p>
          </div>
          <div className="p-4 bg-muted/50 rounded-xl">
            <p className="text-sm text-muted-foreground">vs Current Average</p>
            <div className="flex items-center gap-2">
              {(predictionRange === 7 ? data.predictions.averagePredicted7 : data.predictions.averagePredicted30) < data.patterns.averageDaily ? (
                <>
                  <TrendingDown className="w-5 h-5 text-emerald-500" />
                  <span className="text-2xl font-bold text-emerald-500">
                    {((1 - (predictionRange === 7 ? data.predictions.averagePredicted7 : data.predictions.averagePredicted30) / data.patterns.averageDaily) * 100).toFixed(1)}%
                  </span>
                </>
              ) : (
                <>
                  <TrendingUp className="w-5 h-5 text-red-500" />
                  <span className="text-2xl font-bold text-red-500">
                    +{(((predictionRange === 7 ? data.predictions.averagePredicted7 : data.predictions.averagePredicted30) / data.patterns.averageDaily - 1) * 100).toFixed(1)}%
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* AI Suggestions and Monthly Summary Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personalized AI Suggestions */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">AI-Powered Suggestions</h3>
              <p className="text-sm text-muted-foreground">Personalized for your lifestyle</p>
            </div>
          </div>

          <div className="space-y-4">
            {data.suggestions.map((suggestion, index) => {
              const Icon = getCategoryIcon(suggestion.category)
              return (
                <div
                  key={index}
                  className="p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors group"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-foreground">{suggestion.title}</h4>
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${getPriorityColor(suggestion.priority)}`}>
                          {suggestion.priority}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{suggestion.description}</p>
                      <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                        <Sparkles className="w-3 h-3" />
                        <span>{suggestion.impact}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* AI Monthly Summary */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">AI Monthly Summary</h3>
              <p className="text-sm text-muted-foreground">Your sustainability progress</p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-foreground leading-relaxed">{data.aiSummary.summary}</p>

            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Highlights</p>
              {data.aiSummary.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm text-foreground">{highlight}</span>
                </div>
              ))}
            </div>

            <div className="p-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl border border-emerald-500/20">
              <p className="text-sm text-emerald-700 dark:text-emerald-300 italic">
                {data.aiSummary.encouragement}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* What-if Simulator */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">What-if Simulator</h3>
            <p className="text-sm text-muted-foreground">See how lifestyle changes impact your footprint</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Simulation Options */}
          <div className="space-y-4">
            <p className="text-sm font-medium text-muted-foreground">Select changes to simulate:</p>
            
            <label className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl cursor-pointer hover:bg-muted/50 transition-colors">
              <input
                type="checkbox"
                checked={simulationOptions.flights}
                onChange={(e) => setSimulationOptions(prev => ({ ...prev, flights: e.target.checked }))}
                className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
              />
              <div className="flex items-center gap-2">
                <Plane className="w-5 h-5 text-blue-500" />
                <span className="text-foreground">Remove Flights</span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl cursor-pointer hover:bg-muted/50 transition-colors">
              <input
                type="checkbox"
                checked={simulationOptions.meat}
                onChange={(e) => setSimulationOptions(prev => ({ ...prev, meat: e.target.checked }))}
                className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
              />
              <div className="flex items-center gap-2">
                <Utensils className="w-5 h-5 text-red-500" />
                <span className="text-foreground">Go Vegetarian</span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl cursor-pointer hover:bg-muted/50 transition-colors">
              <input
                type="checkbox"
                checked={simulationOptions.carUsage}
                onChange={(e) => setSimulationOptions(prev => ({ ...prev, carUsage: e.target.checked }))}
                className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
              />
              <div className="flex items-center gap-2">
                <Car className="w-5 h-5 text-emerald-500" />
                <span className="text-foreground">Reduce Car Usage 50%</span>
              </div>
            </label>

            <Button 
              onClick={runSimulation} 
              disabled={isSimulating || (!simulationOptions.flights && !simulationOptions.meat && !simulationOptions.carUsage)}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
            >
              {isSimulating ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Simulating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Run Simulation
                </>
              )}
            </Button>
          </div>

          {/* Simulation Results */}
          <div className="lg:col-span-2">
            {simulationResult && (
              <div className="space-y-4">
                {/* Score Comparison */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/50 rounded-xl text-center">
                    <p className="text-sm text-muted-foreground mb-1">Current Monthly</p>
                    <p className="text-3xl font-bold text-foreground">
                      {simulationResult.currentTotal.toFixed(1)}
                      <span className="text-base font-normal text-muted-foreground ml-1">kg</span>
                    </p>
                  </div>
                  <div className="p-4 bg-emerald-500/10 rounded-xl text-center border border-emerald-500/30">
                    <p className="text-sm text-emerald-600 dark:text-emerald-400 mb-1">Simulated Monthly</p>
                    <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                      {simulationResult.simulatedTotal.toFixed(1)}
                      <span className="text-base font-normal ml-1">kg</span>
                    </p>
                  </div>
                </div>

                {/* Total Reduction */}
                {simulationResult.percentageReduction > 0 && (
                  <div className="p-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl border border-emerald-500/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <TrendingDown className="w-6 h-6 text-emerald-500" />
                        <div>
                          <p className="text-sm text-muted-foreground">Total Reduction</p>
                          <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                            -{simulationResult.totalReduction.toFixed(1)} kg CO2
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                          -{simulationResult.percentageReduction.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Breakdown by category */}
                {simulationResult.reductions.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Reduction Breakdown</p>
                    {simulationResult.reductions.map((reduction, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <span className="text-foreground">{reduction.category}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-muted-foreground">-{reduction.amount.toFixed(1)} kg</span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                            -{reduction.percentage.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {simulationResult.percentageReduction === 0 && (
                  <div className="text-center p-8 text-muted-foreground">
                    <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Select options above and run simulation to see potential impact</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

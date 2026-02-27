"use client"

import { useState } from "react"
import { Car, Bus, Plane, Zap, Salad, Drumstick, Calculator as CalcIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

// Emission rates (kg CO₂)
const EMISSION_RATES = {
  car: 0.21,      // per km
  bus: 0.05,      // per km
  flight: 0.15,   // per km
  electricity: 0.82, // per unit
  vegMeal: 1.5,   // per meal
  nonVegMeal: 3,  // per meal
}

const COLORS = ['#10b981', '#14b8a6', '#0891b2', '#f59e0b', '#ef4444', '#8b5cf6']

interface FormData {
  car: number
  bus: number
  flight: number
  electricity: number
  vegMeals: number
  nonVegMeals: number
}

interface EmissionResult {
  total: number
  breakdown: { name: string; value: number; color: string }[]
  badge: { label: string; color: string; bgColor: string }
}

export function Calculator() {
  const [formData, setFormData] = useState<FormData>({
    car: 0,
    bus: 0,
    flight: 0,
    electricity: 0,
    vegMeals: 0,
    nonVegMeals: 0,
  })
  const [result, setResult] = useState<EmissionResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const handleInputChange = (field: keyof FormData, value: string) => {
    const numValue = parseFloat(value) || 0
    setFormData((prev) => ({ ...prev, [field]: numValue }))
  }

  const calculateEmissions = () => {
    setIsCalculating(true)
    
    setTimeout(() => {
      const carEmission = formData.car * EMISSION_RATES.car
      const busEmission = formData.bus * EMISSION_RATES.bus
      const flightEmission = formData.flight * EMISSION_RATES.flight
      const electricityEmission = formData.electricity * EMISSION_RATES.electricity
      const vegEmission = formData.vegMeals * EMISSION_RATES.vegMeal
      const nonVegEmission = formData.nonVegMeals * EMISSION_RATES.nonVegMeal

      const total = carEmission + busEmission + flightEmission + electricityEmission + vegEmission + nonVegEmission

      const breakdown = [
        { name: "Car Travel", value: parseFloat(carEmission.toFixed(2)), color: COLORS[0] },
        { name: "Bus Travel", value: parseFloat(busEmission.toFixed(2)), color: COLORS[1] },
        { name: "Flight Travel", value: parseFloat(flightEmission.toFixed(2)), color: COLORS[2] },
        { name: "Electricity", value: parseFloat(electricityEmission.toFixed(2)), color: COLORS[3] },
        { name: "Veg Meals", value: parseFloat(vegEmission.toFixed(2)), color: COLORS[4] },
        { name: "Non-Veg Meals", value: parseFloat(nonVegEmission.toFixed(2)), color: COLORS[5] },
      ].filter(item => item.value > 0)

      let badge: EmissionResult['badge']
      if (total < 5) {
        badge = { label: "Low Impact", color: "text-emerald-700", bgColor: "bg-emerald-100" }
      } else if (total <= 15) {
        badge = { label: "Moderate Impact", color: "text-amber-700", bgColor: "bg-amber-100" }
      } else {
        badge = { label: "High Impact", color: "text-red-700", bgColor: "bg-red-100" }
      }

      setResult({ total: parseFloat(total.toFixed(2)), breakdown, badge })
      setIsCalculating(false)
    }, 800)
  }

  const progressPercentage = Math.min((result?.total || 0) / 20 * 100, 100)

  const inputs = [
    { field: "car" as const, label: "Car Travel", unit: "km", icon: Car, placeholder: "0" },
    { field: "bus" as const, label: "Bus Travel", unit: "km", icon: Bus, placeholder: "0" },
    { field: "flight" as const, label: "Flight Travel", unit: "km", icon: Plane, placeholder: "0" },
    { field: "electricity" as const, label: "Electricity Usage", unit: "units", icon: Zap, placeholder: "0" },
    { field: "vegMeals" as const, label: "Vegetarian Meals", unit: "meals", icon: Salad, placeholder: "0" },
    { field: "nonVegMeals" as const, label: "Non-Veg Meals", unit: "meals", icon: Drumstick, placeholder: "0" },
  ]

  return (
    <section id="calculator" className="py-20 lg:py-32 bg-gradient-to-b from-emerald-50/50 to-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full text-emerald-700 text-sm font-medium mb-6">
            <CalcIcon className="w-4 h-4" />
            Carbon Calculator
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 text-balance">
            Calculate Your{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Carbon Footprint
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
            Enter your daily activities to discover your environmental impact
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Input Form */}
          <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-xl border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Enter Your Activities</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {inputs.map((input) => (
                <div key={input.field} className="space-y-2">
                  <Label htmlFor={input.field} className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <input.icon className="w-4 h-4 text-emerald-600" />
                    {input.label}
                  </Label>
                  <div className="relative">
                    <Input
                      id={input.field}
                      type="number"
                      min="0"
                      step="any"
                      value={formData[input.field] || ""}
                      onChange={(e) => handleInputChange(input.field, e.target.value)}
                      placeholder={input.placeholder}
                      className="pr-12 h-12 rounded-xl border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                      {input.unit}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <Button
              onClick={calculateEmissions}
              disabled={isCalculating}
              className="w-full mt-6 h-14 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              {isCalculating ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Calculating...
                </span>
              ) : (
                "Calculate Emissions"
              )}
            </Button>
          </div>

          {/* Results */}
          <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-xl border border-gray-100 min-h-[500px]">
            {result ? (
              <div className="space-y-6">
                {/* Total & Badge */}
                <div className="text-center">
                  <h3 className="text-lg text-gray-600 mb-2">Your Total Carbon Footprint</h3>
                  <div className="text-5xl font-bold text-gray-900 mb-3">
                    {result.total}
                    <span className="text-2xl text-gray-500 ml-2">kg CO₂</span>
                  </div>
                  <span className={`inline-flex px-4 py-2 rounded-full text-sm font-semibold ${result.badge.bgColor} ${result.badge.color}`}>
                    {result.badge.label}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Impact Level</span>
                    <span>{progressPercentage.toFixed(0)}%</span>
                  </div>
                  <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        result.total < 5
                          ? "bg-gradient-to-r from-emerald-400 to-emerald-500"
                          : result.total <= 15
                          ? "bg-gradient-to-r from-amber-400 to-amber-500"
                          : "bg-gradient-to-r from-red-400 to-red-500"
                      }`}
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Pie Chart */}
                {result.breakdown.length > 0 && (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={result.breakdown}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          innerRadius={40}
                          paddingAngle={2}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {result.breakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value: number) => [`${value} kg CO₂`, "Emissions"]}
                          contentStyle={{
                            backgroundColor: "white",
                            borderRadius: "12px",
                            border: "1px solid #e5e7eb",
                            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                          }}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                  <CalcIcon className="w-12 h-12 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Ready to Calculate?
                </h3>
                <p className="text-gray-600 max-w-sm">
                  Enter your daily activities on the left and click Calculate to see your carbon footprint breakdown.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export { EMISSION_RATES }
export type { FormData }

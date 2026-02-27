"use client"

import { useState, useEffect } from "react"
import { 
  Lightbulb, 
  Car, 
  Leaf, 
  Zap, 
  Plane,
  Bus,
  Salad,
  Sun,
  TreeDeciduous,
  Bike
} from "lucide-react"

interface Suggestion {
  id: string
  icon: React.ElementType
  title: string
  description: string
  impact: string
  color: string
}

const defaultSuggestions: Suggestion[] = [
  {
    id: "bike",
    icon: Bike,
    title: "Switch to Cycling",
    description: "Consider cycling for short trips under 5km instead of driving.",
    impact: "Save up to 2kg CO₂ per trip",
    color: "from-emerald-500 to-green-600",
  },
  {
    id: "plant",
    icon: Salad,
    title: "Try Plant-Based Meals",
    description: "Incorporate more vegetarian meals into your weekly diet.",
    impact: "Save 1.5kg CO₂ per meal",
    color: "from-teal-500 to-cyan-600",
  },
  {
    id: "energy",
    icon: Sun,
    title: "Use Renewable Energy",
    description: "Switch to a renewable energy provider for your home.",
    impact: "Reduce emissions by 50%",
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "tree",
    icon: TreeDeciduous,
    title: "Offset Your Carbon",
    description: "Support verified carbon offset projects to neutralize your impact.",
    impact: "Net zero emissions",
    color: "from-green-500 to-emerald-600",
  },
]

const carSuggestion: Suggestion = {
  id: "car",
  icon: Bus,
  title: "Take Public Transport",
  description: "High car usage detected! Consider using buses or trains for your commute.",
  impact: "Save 0.16kg CO₂ per km",
  color: "from-blue-500 to-indigo-600",
}

const flightSuggestion: Suggestion = {
  id: "flight",
  icon: Plane,
  title: "Consider Carbon Offsets",
  description: "Flying contributes significantly to emissions. Consider purchasing carbon offsets.",
  impact: "Neutralize flight impact",
  color: "from-purple-500 to-pink-600",
}

const electricitySuggestion: Suggestion = {
  id: "electricity",
  icon: Zap,
  title: "Reduce Energy Consumption",
  description: "High electricity usage detected! Try energy-saving practices.",
  impact: "Save up to 30% on energy",
  color: "from-amber-500 to-orange-600",
}

const nonVegSuggestion: Suggestion = {
  id: "nonveg",
  icon: Leaf,
  title: "Reduce Meat Consumption",
  description: "High non-veg meal count! Try having 2-3 meat-free days per week.",
  impact: "Save 3kg CO₂ per meal skipped",
  color: "from-green-500 to-teal-600",
}

interface SuggestionsProps {
  carKm?: number
  flightKm?: number
  electricityUnits?: number
  nonVegMeals?: number
}

export function Suggestions({ carKm = 0, flightKm = 0, electricityUnits = 0, nonVegMeals = 0 }: SuggestionsProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>(defaultSuggestions)

  useEffect(() => {
    const newSuggestions: Suggestion[] = []

    // Add suggestions based on high usage
    if (carKm > 50) {
      newSuggestions.push(carSuggestion)
    }
    if (flightKm > 0) {
      newSuggestions.push(flightSuggestion)
    }
    if (electricityUnits > 20) {
      newSuggestions.push(electricitySuggestion)
    }
    if (nonVegMeals > 3) {
      newSuggestions.push(nonVegSuggestion)
    }

    // Fill remaining slots with default suggestions
    const remainingSlots = 4 - newSuggestions.length
    const filteredDefaults = defaultSuggestions.filter(
      (d) => !newSuggestions.some((n) => n.id === d.id)
    )
    
    setSuggestions([...newSuggestions, ...filteredDefaults.slice(0, Math.max(0, remainingSlots))])
  }, [carKm, flightKm, electricityUnits, nonVegMeals])

  return (
    <section id="suggestions" className="py-20 lg:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full text-emerald-700 text-sm font-medium mb-6">
            <Lightbulb className="w-4 h-4" />
            AI Suggestions
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 text-balance">
            Smart Ways to{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Reduce Your Impact
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
            Personalized AI-powered recommendations based on your lifestyle
          </p>
        </div>

        {/* Suggestion Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion.id}
              className="group relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${suggestion.color} opacity-0 group-hover:opacity-5 transition-opacity`} />

              <div className="flex items-start gap-4 relative">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${suggestion.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg`}>
                  <suggestion.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {suggestion.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                    {suggestion.description}
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full">
                    <Car className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-xs font-medium text-emerald-700">
                      {suggestion.impact}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Tips */}
        <div className="mt-12 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Want More Personalized Tips?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Use the calculator above with your actual data to receive AI-powered suggestions tailored to your lifestyle.
          </p>
          <button
            onClick={() => document.querySelector("#calculator")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full font-medium hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl"
          >
            <Lightbulb className="w-5 h-5" />
            Get Personalized Suggestions
          </button>
        </div>
      </div>
    </section>
  )
}

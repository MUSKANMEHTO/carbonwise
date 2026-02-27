"use client"

import Image from "next/image"
import { Car, Cpu, TrendingUp, ArrowRight, Utensils, Zap, ShoppingBag } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Car,
    title: "Log Activities",
    description: "Track your daily activities across four key categories",
    details: [
      { icon: Car, label: "Transport" },
      { icon: Utensils, label: "Food" },
      { icon: Zap, label: "Energy" },
      { icon: ShoppingBag, label: "Shopping" },
    ],
    color: "from-emerald-500 to-teal-600",
  },
  {
    number: "02",
    icon: Cpu,
    title: "AI Calculates Impact",
    description: "Our AI processes your data and calculates your precise carbon footprint",
    isPulsing: true,
    color: "from-teal-500 to-cyan-600",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Get Insights & Reduce",
    description: "Receive personalized insights and actionable tips to reduce your footprint",
    hasCheckmarks: true,
    color: "from-cyan-500 to-blue-600",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/howitworks-forest.jpg"
          alt="Sunlit forest path"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-emerald-50/90 to-white/95" />
      </div>
      
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full text-emerald-700 text-sm font-medium mb-6">
            How It Works
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 text-balance">
            Three Simple Steps to{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Sustainability
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
            Start your journey to a greener lifestyle in just three easy steps
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-4 relative">
          {/* Connection Lines (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-1/3 right-1/3 h-1">
            <div className="w-full h-full bg-gradient-to-r from-emerald-300 to-teal-300 rounded-full" />
          </div>

          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Mobile Arrow */}
              {index < steps.length - 1 && (
                <div className="lg:hidden flex justify-center my-4">
                  <ArrowRight className="w-8 h-8 text-emerald-400 rotate-90" />
                </div>
              )}

              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 relative z-10">
                {/* Step Number */}
                <div className={`absolute -top-4 left-8 px-4 py-1 bg-gradient-to-r ${step.color} text-white text-sm font-bold rounded-full`}>
                  Step {step.number}
                </div>

                {/* Icon */}
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 mx-auto shadow-lg ${step.isPulsing ? 'animate-pulse' : ''}`}>
                  <step.icon className="w-10 h-10 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-center mb-6">
                  {step.description}
                </p>

                {/* Step 1: Activity Icons */}
                {step.details && (
                  <div className="grid grid-cols-4 gap-2">
                    {step.details.map((detail, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-1 p-2 bg-emerald-50 rounded-xl">
                        <detail.icon className="w-5 h-5 text-emerald-600" />
                        <span className="text-xs text-gray-600">{detail.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Step 2: Pulse Animation */}
                {step.isPulsing && (
                  <div className="flex justify-center gap-2">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-3 h-3 bg-teal-400 rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                )}

                {/* Step 3: Checkmarks */}
                {step.hasCheckmarks && (
                  <div className="space-y-2">
                    {["Personalized tips", "Weekly reports", "Goal tracking"].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-600">{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

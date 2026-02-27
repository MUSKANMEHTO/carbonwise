"use client"

import Image from "next/image"
import { 
  Calendar, 
  Activity, 
  Lightbulb, 
  FileText, 
  Globe, 
  Users 
} from "lucide-react"

const features = [
  {
    icon: Calendar,
    title: "Daily Lifestyle Logger",
    description: "Track your daily activities including transport, food, energy usage, and shopping habits with our intuitive logging system.",
    color: "from-emerald-500 to-green-600",
  },
  {
    icon: Activity,
    title: "Real-Time Carbon Score",
    description: "Get instant feedback on your carbon footprint with our real-time scoring system that updates as you log activities.",
    color: "from-teal-500 to-cyan-600",
  },
  {
    icon: Lightbulb,
    title: "Smart AI Habit Suggestions",
    description: "Receive personalized AI-powered recommendations to reduce your carbon impact based on your unique lifestyle patterns.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: FileText,
    title: "Monthly Carbon Reports",
    description: "Comprehensive monthly reports showing your progress, trends, and environmental impact over time.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: Globe,
    title: "National Footprint Comparison",
    description: "Compare your carbon footprint with national and global averages to see how you stack up.",
    color: "from-purple-500 to-pink-600",
  },
  {
    icon: Users,
    title: "Community Leaderboard",
    description: "Join a community of eco-conscious individuals and compete to achieve the lowest carbon footprint.",
    color: "from-rose-500 to-red-600",
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 lg:py-32 bg-white relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/features-leaves.jpg"
          alt="Fresh green leaves with water droplets"
          fill
          className="object-cover opacity-5"
        />
      </div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full text-emerald-700 text-sm font-medium mb-6">
            Features
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 text-balance">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Go Green
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
            Powerful tools and insights to help you understand and reduce your environmental impact
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-6 lg:p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

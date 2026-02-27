"use client"

import Image from "next/image"
import { ArrowRight, Play, Leaf, Wind, Droplets } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-nature.jpg"
          alt="Lush green forest with morning mist"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/70 via-teal-900/60 to-cyan-900/70" />
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-400/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <Leaf className="absolute top-1/4 left-1/4 w-8 h-8 text-emerald-300/50 animate-bounce delay-100" />
        <Wind className="absolute top-1/3 right-1/4 w-10 h-10 text-teal-300/50 animate-bounce delay-300" />
        <Droplets className="absolute bottom-1/3 left-1/3 w-6 h-6 text-cyan-300/50 animate-bounce delay-500" />
        <Leaf className="absolute bottom-1/4 right-1/3 w-12 h-12 text-emerald-200/40 animate-bounce delay-700" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-8 animate-fade-in">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          AI-Powered Carbon Tracking
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight text-balance">
          <span className="block">Track. Reduce.</span>
          <span className="block bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
            Transform Your Carbon Impact.
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed text-pretty">
          AI-powered lifestyle tracking to reduce your carbon footprint in real-time.
          Join thousands making a difference, one choice at a time.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={() => scrollToSection("#calculator")}
            size="lg"
            className="bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
          >
            Start Tracking
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            onClick={() => scrollToSection("#how-it-works")}
            variant="outline"
            size="lg"
            className="border-2 border-white/50 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full group"
          >
            <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
            Learn More
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { value: "50K+", label: "Active Users" },
            { value: "2.5M", label: "kg CO\u2082 Saved" },
            { value: "150+", label: "Countries" },
            { value: "4.9", label: "App Rating" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-colors"
            >
              <div className="text-2xl sm:text-3xl font-bold text-emerald-300 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-white/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/70 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}

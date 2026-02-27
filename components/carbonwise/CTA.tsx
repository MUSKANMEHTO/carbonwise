"use client"

import Image from "next/image"
import { ArrowRight, Leaf, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTA() {
  const scrollToCalculator = () => {
    const element = document.querySelector("#calculator")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/cta-earth.jpg"
          alt="Beautiful Earth from space"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/90 via-teal-600/90 to-cyan-600/90" />
      </div>
      
      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <Leaf className="absolute top-1/4 left-1/5 w-12 h-12 text-white/20 animate-bounce" />
        <Sparkles className="absolute bottom-1/3 right-1/4 w-10 h-10 text-white/20 animate-pulse" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-8">
          <Sparkles className="w-4 h-4" />
          Start Your Green Journey Today
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight text-balance">
          Ready to Reduce Your{" "}
          <span className="relative">
            Carbon Impact?
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 300 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 10C50 4 150 4 298 10"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h2>

        {/* Subtext */}
        <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed text-pretty">
          Join over 50,000 eco-conscious individuals who are actively making a difference.
          Start tracking your carbon footprint today and become part of the solution.
        </p>

        {/* CTA Button */}
        <Button
          onClick={scrollToCalculator}
          size="lg"
          className="bg-white text-emerald-600 hover:bg-gray-100 px-10 py-7 text-lg rounded-full shadow-2xl hover:shadow-3xl transition-all hover:scale-105 group"
        >
          Start Tracking Now
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-white/80 text-sm">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Free to use
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            No credit card required
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            AI-powered insights
          </div>
        </div>
      </div>
    </section>
  )
}

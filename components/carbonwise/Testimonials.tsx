"use client"

import Image from "next/image"
import { Star, Quote, User } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Mitchell",
    title: "Environmental Consultant",
    feedback: "CarbonWise has completely transformed how I think about my daily habits. The AI suggestions are incredibly accurate and actionable. I've reduced my carbon footprint by 40% in just 3 months!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    title: "Tech Entrepreneur",
    feedback: "As someone who travels frequently for work, I was concerned about my environmental impact. CarbonWise helped me offset my flights and find greener alternatives. Highly recommend!",
    rating: 5,
  },
  {
    name: "Emma Rodriguez",
    title: "College Student",
    feedback: "The leaderboard feature keeps me motivated! It's like a game but for saving the planet. I love competing with my friends to see who can have the lowest carbon score each month.",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/testimonials-nature.jpg"
          alt="Serene mountain lake"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-white/95" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full text-emerald-700 text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            Testimonials
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 text-balance">
            What Our{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Users Say
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
            Join thousands of eco-conscious individuals making a difference
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl p-6 lg:p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 right-8">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                  <Quote className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Feedback */}
              <p className="text-gray-600 leading-relaxed mb-6">
                {`"${testimonial.feedback}"`}
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.title}
                  </div>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity" />
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl p-8 lg:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "4.9", label: "Average Rating" },
              { value: "50K+", label: "Happy Users" },
              { value: "95%", label: "Would Recommend" },
              { value: "2.5M", label: "kg CO₂ Saved" },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-3xl lg:text-4xl font-bold text-emerald-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

import { Navbar } from "@/components/carbonwise/Navbar"
import { Hero } from "@/components/carbonwise/Hero"
import { Features } from "@/components/carbonwise/Features"
import { HowItWorks } from "@/components/carbonwise/HowItWorks"
import { Calculator } from "@/components/carbonwise/Calculator"
import { Suggestions } from "@/components/carbonwise/Suggestions"
import { MonthlyReport } from "@/components/carbonwise/MonthlyReport"
import { Leaderboard } from "@/components/carbonwise/Leaderboard"
import { NationalComparison } from "@/components/carbonwise/NationalComparison"
import { Testimonials } from "@/components/carbonwise/Testimonials"
import { CTA } from "@/components/carbonwise/CTA"
import { Contact } from "@/components/carbonwise/Contact"
import { Footer } from "@/components/carbonwise/Footer"

export default function CarbonWisePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Calculator />
      <Suggestions />
      <MonthlyReport />
      <Leaderboard />
      <NationalComparison />
      <Testimonials />
      <CTA />
      <Contact />
      <Footer />
    </main>
  )
}

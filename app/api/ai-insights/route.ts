import { generateText, Output } from 'ai'
import { z } from 'zod'

// Carbon emission rates (kg CO2 per unit)
const EMISSION_RATES = {
  car: 0.21,      // per km
  bus: 0.05,      // per km
  flight: 0.15,   // per km
  electricity: 0.82, // per kWh
  vegMeal: 1.5,   // per meal
  nonVegMeal: 3.0, // per meal
  shopping: 5.0,   // per shopping trip
}

// Simulated user carbon data for last 30 days
function generateMockCarbonData() {
  const data = []
  const today = new Date()
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    
    data.push({
      date: date.toISOString().split('T')[0],
      car: Math.random() * 30 + 5,
      bus: Math.random() * 10,
      flight: i % 15 === 0 ? Math.random() * 200 + 50 : 0,
      electricity: Math.random() * 8 + 3,
      vegMeals: Math.floor(Math.random() * 3) + 1,
      nonVegMeals: Math.floor(Math.random() * 2),
      shopping: Math.random() > 0.7 ? 1 : 0,
      totalEmission: 0,
    })
    
    // Calculate daily total
    const day = data[data.length - 1]
    day.totalEmission = 
      day.car * EMISSION_RATES.car +
      day.bus * EMISSION_RATES.bus +
      day.flight * EMISSION_RATES.flight +
      day.electricity * EMISSION_RATES.electricity +
      day.vegMeals * EMISSION_RATES.vegMeal +
      day.nonVegMeals * EMISSION_RATES.nonVegMeal +
      day.shopping * EMISSION_RATES.shopping
  }
  
  return data
}

// Simple linear regression for prediction
function linearRegression(data: number[]): { slope: number; intercept: number } {
  const n = data.length
  const xSum = (n * (n - 1)) / 2
  const ySum = data.reduce((a, b) => a + b, 0)
  const xySum = data.reduce((sum, y, x) => sum + x * y, 0)
  const x2Sum = (n * (n - 1) * (2 * n - 1)) / 6
  
  const slope = (n * xySum - xSum * ySum) / (n * x2Sum - xSum * xSum)
  const intercept = (ySum - slope * xSum) / n
  
  return { slope, intercept }
}

// Predict future emissions
function predictEmissions(historicalData: number[], daysToPredict: number): number[] {
  const { slope, intercept } = linearRegression(historicalData)
  const predictions = []
  const startIndex = historicalData.length
  
  for (let i = 0; i < daysToPredict; i++) {
    const predicted = Math.max(0, slope * (startIndex + i) + intercept)
    predictions.push(parseFloat(predicted.toFixed(2)))
  }
  
  return predictions
}

// Analyze user behavior patterns
function analyzePatterns(carbonData: ReturnType<typeof generateMockCarbonData>) {
  const totals = carbonData.reduce(
    (acc, day) => ({
      car: acc.car + day.car,
      bus: acc.bus + day.bus,
      flight: acc.flight + day.flight,
      electricity: acc.electricity + day.electricity,
      vegMeals: acc.vegMeals + day.vegMeals,
      nonVegMeals: acc.nonVegMeals + day.nonVegMeals,
      shopping: acc.shopping + day.shopping,
    }),
    { car: 0, bus: 0, flight: 0, electricity: 0, vegMeals: 0, nonVegMeals: 0, shopping: 0 }
  )
  
  const emissions = {
    transport: (totals.car * EMISSION_RATES.car + totals.bus * EMISSION_RATES.bus + totals.flight * EMISSION_RATES.flight),
    food: (totals.vegMeals * EMISSION_RATES.vegMeal + totals.nonVegMeals * EMISSION_RATES.nonVegMeal),
    energy: totals.electricity * EMISSION_RATES.electricity,
    shopping: totals.shopping * EMISSION_RATES.shopping,
  }
  
  const total = Object.values(emissions).reduce((a, b) => a + b, 0)
  
  return {
    totals,
    emissions,
    totalEmission: total,
    percentages: {
      transport: ((emissions.transport / total) * 100).toFixed(1),
      food: ((emissions.food / total) * 100).toFixed(1),
      energy: ((emissions.energy / total) * 100).toFixed(1),
      shopping: ((emissions.shopping / total) * 100).toFixed(1),
    },
    averageDaily: total / 30,
  }
}

// Check for risk alerts
function checkRiskAlerts(carbonData: ReturnType<typeof generateMockCarbonData>) {
  const lastWeek = carbonData.slice(-7)
  const previousWeek = carbonData.slice(-14, -7)
  
  const lastWeekTotal = lastWeek.reduce((sum, d) => sum + d.totalEmission, 0)
  const previousWeekTotal = previousWeek.reduce((sum, d) => sum + d.totalEmission, 0)
  
  const percentageChange = ((lastWeekTotal - previousWeekTotal) / previousWeekTotal) * 100
  
  const alerts = []
  
  if (percentageChange > 15) {
    // Find the main contributor
    const lastWeekByCategory = {
      transport: lastWeek.reduce((s, d) => s + d.car * EMISSION_RATES.car + d.bus * EMISSION_RATES.bus + d.flight * EMISSION_RATES.flight, 0),
      food: lastWeek.reduce((s, d) => s + d.vegMeals * EMISSION_RATES.vegMeal + d.nonVegMeals * EMISSION_RATES.nonVegMeal, 0),
      energy: lastWeek.reduce((s, d) => s + d.electricity * EMISSION_RATES.electricity, 0),
    }
    
    const mainContributor = Object.entries(lastWeekByCategory).sort((a, b) => b[1] - a[1])[0][0]
    
    alerts.push({
      type: 'warning',
      title: 'Carbon Spike Detected',
      message: `Your weekly carbon score increased by ${percentageChange.toFixed(1)}%. Main contributor: ${mainContributor}.`,
      percentageChange: percentageChange.toFixed(1),
      category: mainContributor,
    })
  }
  
  // Check for high flight usage
  const flightDays = carbonData.filter(d => d.flight > 0).length
  if (flightDays >= 2) {
    alerts.push({
      type: 'info',
      title: 'Frequent Air Travel',
      message: `You took ${flightDays} flights this month. Consider carbon offsetting or video calls for meetings.`,
      category: 'flight',
    })
  }
  
  return {
    hasRisk: percentageChange > 15,
    percentageChange,
    alerts,
  }
}

// What-if simulator calculations
function simulateWhatIf(
  carbonData: ReturnType<typeof generateMockCarbonData>,
  removals: { flights: boolean; meat: boolean; carUsage: boolean }
) {
  const currentTotal = carbonData.reduce((sum, d) => sum + d.totalEmission, 0)
  
  let simulatedTotal = currentTotal
  const reductions: { category: string; amount: number; percentage: number }[] = []
  
  if (removals.flights) {
    const flightEmissions = carbonData.reduce((sum, d) => sum + d.flight * EMISSION_RATES.flight, 0)
    simulatedTotal -= flightEmissions
    reductions.push({
      category: 'Flights',
      amount: flightEmissions,
      percentage: (flightEmissions / currentTotal) * 100,
    })
  }
  
  if (removals.meat) {
    const meatEmissions = carbonData.reduce((sum, d) => sum + d.nonVegMeals * EMISSION_RATES.nonVegMeal, 0)
    simulatedTotal -= meatEmissions
    reductions.push({
      category: 'Non-Veg Meals',
      amount: meatEmissions,
      percentage: (meatEmissions / currentTotal) * 100,
    })
  }
  
  if (removals.carUsage) {
    // Assume reducing car usage by 50%
    const carEmissions = carbonData.reduce((sum, d) => sum + d.car * EMISSION_RATES.car, 0) * 0.5
    simulatedTotal -= carEmissions
    reductions.push({
      category: 'Car Usage (50%)',
      amount: carEmissions,
      percentage: (carEmissions / currentTotal) * 100,
    })
  }
  
  return {
    currentTotal,
    simulatedTotal,
    totalReduction: currentTotal - simulatedTotal,
    percentageReduction: ((currentTotal - simulatedTotal) / currentTotal) * 100,
    reductions,
  }
}

// AI Suggestions schema
const suggestionsSchema = z.object({
  suggestions: z.array(z.object({
    title: z.string(),
    description: z.string(),
    impact: z.string(),
    category: z.string(),
    priority: z.enum(['high', 'medium', 'low']),
  })),
})

// AI Summary schema
const summarySchema = z.object({
  summary: z.string(),
  highlights: z.array(z.string()),
  encouragement: z.string(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { action, simulationOptions } = body
    
    // Generate mock carbon data
    const carbonData = generateMockCarbonData()
    const patterns = analyzePatterns(carbonData)
    const riskAlerts = checkRiskAlerts(carbonData)
    
    // Historical emissions for charts
    const historicalEmissions = carbonData.map(d => d.totalEmission)
    
    // Predictions
    const predictions7Days = predictEmissions(historicalEmissions, 7)
    const predictions30Days = predictEmissions(historicalEmissions, 30)
    
    // Generate dates for predictions
    const today = new Date()
    const predictionDates7 = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today)
      date.setDate(date.getDate() + i + 1)
      return date.toISOString().split('T')[0]
    })
    const predictionDates30 = Array.from({ length: 30 }, (_, i) => {
      const date = new Date(today)
      date.setDate(date.getDate() + i + 1)
      return date.toISOString().split('T')[0]
    })
    
    // Prepare response data
    const responseData: Record<string, unknown> = {
      carbonData: carbonData.map(d => ({
        date: d.date,
        emission: parseFloat(d.totalEmission.toFixed(2)),
      })),
      patterns,
      riskAlerts,
      predictions: {
        next7Days: predictionDates7.map((date, i) => ({
          date,
          predicted: predictions7Days[i],
        })),
        next30Days: predictionDates30.map((date, i) => ({
          date,
          predicted: predictions30Days[i],
        })),
        averagePredicted7: predictions7Days.reduce((a, b) => a + b, 0) / 7,
        averagePredicted30: predictions30Days.reduce((a, b) => a + b, 0) / 30,
      },
    }
    
    // What-if simulation
    if (action === 'simulate' && simulationOptions) {
      responseData.simulation = simulateWhatIf(carbonData, simulationOptions)
    } else {
      responseData.simulation = simulateWhatIf(carbonData, { flights: false, meat: false, carUsage: false })
    }
    
    // Generate AI suggestions
    if (action === 'suggestions' || action === 'full') {
      try {
        const { output } = await generateText({
          model: 'openai/gpt-4o-mini',
          output: Output.object({ schema: suggestionsSchema }),
          messages: [
            {
              role: 'system',
              content: 'You are an AI sustainability advisor. Generate personalized, actionable suggestions to reduce carbon footprint based on user data. Be specific with numbers and percentages.',
            },
            {
              role: 'user',
              content: `Based on this carbon footprint data, generate 3 personalized suggestions:
              
Monthly Analysis:
- Total Emission: ${patterns.totalEmission.toFixed(1)} kg CO2
- Transport: ${patterns.percentages.transport}% (${patterns.emissions.transport.toFixed(1)} kg)
- Food: ${patterns.percentages.food}% (${patterns.emissions.food.toFixed(1)} kg)
- Energy: ${patterns.percentages.energy}% (${patterns.emissions.energy.toFixed(1)} kg)
- Shopping: ${patterns.percentages.shopping}% (${patterns.emissions.shopping.toFixed(1)} kg)

Details:
- Total car travel: ${patterns.totals.car.toFixed(0)} km
- Total flights: ${patterns.totals.flight.toFixed(0)} km
- Non-veg meals: ${patterns.totals.nonVegMeals} meals
- Electricity usage: ${patterns.totals.electricity.toFixed(0)} kWh

Generate specific, actionable suggestions with exact impact percentages.`,
            },
          ],
          maxOutputTokens: 500,
        })
        
        responseData.suggestions = output?.suggestions || []
      } catch {
        // Fallback suggestions if AI fails
        responseData.suggestions = generateFallbackSuggestions(patterns)
      }
    }
    
    // Generate AI monthly summary
    if (action === 'summary' || action === 'full') {
      try {
        const { output } = await generateText({
          model: 'openai/gpt-4o-mini',
          output: Output.object({ schema: summarySchema }),
          messages: [
            {
              role: 'system',
              content: 'You are an encouraging sustainability advisor. Write a brief, positive monthly summary about carbon footprint progress. Be encouraging and sustainability-focused.',
            },
            {
              role: 'user',
              content: `Write a monthly carbon footprint summary for a user with:
              
This Month:
- Total emissions: ${patterns.totalEmission.toFixed(1)} kg CO2
- Daily average: ${patterns.averageDaily.toFixed(1)} kg CO2
- Main contributor: Transport (${patterns.percentages.transport}%)

Compared to typical averages:
- National average: ~240 kg/month
- Global average: ~400 kg/month

Risk status: ${riskAlerts.hasRisk ? `Weekly increase of ${riskAlerts.percentageChange.toFixed(1)}%` : 'Stable'}

Write an encouraging 2-3 sentence summary, list 2-3 highlights, and end with an encouraging message.`,
            },
          ],
          maxOutputTokens: 300,
        })
        
        responseData.aiSummary = output || generateFallbackSummary(patterns, riskAlerts)
      } catch {
        responseData.aiSummary = generateFallbackSummary(patterns, riskAlerts)
      }
    }
    
    return Response.json(responseData)
  } catch (error) {
    console.error('AI Insights API Error:', error)
    return Response.json(
      { error: 'Failed to generate insights' },
      { status: 500 }
    )
  }
}

// Fallback suggestions if AI is unavailable
function generateFallbackSuggestions(patterns: ReturnType<typeof analyzePatterns>) {
  const suggestions = []
  
  if (parseFloat(patterns.percentages.transport) > 40) {
    suggestions.push({
      title: 'Reduce Car Usage',
      description: `Switch to public transport 2 days per week to cut emissions by approximately 18%.`,
      impact: '18% reduction in transport emissions',
      category: 'transport',
      priority: 'high' as const,
    })
  }
  
  if (patterns.totals.nonVegMeals > 20) {
    suggestions.push({
      title: 'Try Meatless Mondays',
      description: 'Replacing 4 non-veg meals with plant-based alternatives weekly can save 6kg CO2.',
      impact: '6kg CO2 saved weekly',
      category: 'food',
      priority: 'medium' as const,
    })
  }
  
  if (patterns.totals.electricity > 150) {
    suggestions.push({
      title: 'Energy Efficiency',
      description: 'Unplug devices when not in use and switch to LED bulbs to reduce electricity consumption by 15%.',
      impact: '15% reduction in energy bills',
      category: 'energy',
      priority: 'medium' as const,
    })
  }
  
  if (patterns.totals.flight > 0) {
    suggestions.push({
      title: 'Consider Carbon Offsetting',
      description: 'Offset your flight emissions through verified carbon offset programs.',
      impact: 'Neutralize flight emissions',
      category: 'travel',
      priority: 'high' as const,
    })
  }
  
  return suggestions.slice(0, 3)
}

// Fallback summary if AI is unavailable
function generateFallbackSummary(
  patterns: ReturnType<typeof analyzePatterns>,
  riskAlerts: ReturnType<typeof checkRiskAlerts>
) {
  const comparison = patterns.totalEmission < 240 ? 'below' : 'above'
  const status = riskAlerts.hasRisk ? 'slightly increased' : 'remained stable'
  
  return {
    summary: `This month, your carbon footprint ${status} at ${patterns.totalEmission.toFixed(1)} kg CO2, which is ${comparison} the national average. Your main impact area is transport at ${patterns.percentages.transport}% of total emissions.`,
    highlights: [
      `Daily average: ${patterns.averageDaily.toFixed(1)} kg CO2`,
      `Transport accounts for ${patterns.percentages.transport}% of your footprint`,
      `You're ${comparison} the 240kg national monthly average`,
    ],
    encouragement: 'Every small action counts toward a sustainable future. Keep tracking and making conscious choices!',
  }
}

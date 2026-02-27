"use client"

import { Trophy, Medal, Award, Crown, User } from "lucide-react"

const leaderboardData = [
  { rank: 1, name: "Emma Wilson", score: 2.1, badge: "Eco Champion", isCurrentUser: false },
  { rank: 2, name: "James Chen", score: 2.8, badge: "Green Warrior", isCurrentUser: false },
  { rank: 3, name: "Sofia Martinez", score: 3.2, badge: "Nature Friend", isCurrentUser: false },
  { rank: 4, name: "You", score: 4.5, badge: "Rising Star", isCurrentUser: true },
  { rank: 5, name: "Alex Thompson", score: 5.1, badge: "Eco Starter", isCurrentUser: false },
]

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Crown className="w-6 h-6 text-yellow-500" />
    case 2:
      return <Medal className="w-6 h-6 text-gray-400" />
    case 3:
      return <Award className="w-6 h-6 text-amber-600" />
    default:
      return <span className="w-6 h-6 flex items-center justify-center text-lg font-bold text-gray-400">{rank}</span>
  }
}

const getRankStyle = (rank: number) => {
  switch (rank) {
    case 1:
      return "bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200"
    case 2:
      return "bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200"
    case 3:
      return "bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200"
    default:
      return "bg-white border-gray-100"
  }
}

export function Leaderboard() {
  return (
    <section id="leaderboard" className="py-20 lg:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full text-emerald-700 text-sm font-medium mb-6">
            <Trophy className="w-4 h-4" />
            Community Leaderboard
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 text-balance">
            Top{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Eco Warriors
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
            Join our community and compete for the lowest carbon footprint
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Podium for top 3 - Desktop */}
          <div className="hidden lg:flex items-end justify-center gap-4 mb-12">
            {/* 2nd Place */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-slate-200 rounded-full flex items-center justify-center mb-3 ring-4 ring-gray-300">
                <User className="w-10 h-10 text-gray-600" />
              </div>
              <div className="text-lg font-semibold text-gray-900">{leaderboardData[1].name}</div>
              <div className="text-sm text-gray-500">{leaderboardData[1].score} kg CO₂</div>
              <div className="w-24 h-28 bg-gradient-to-b from-gray-200 to-gray-300 rounded-t-lg mt-4 flex items-center justify-center">
                <span className="text-3xl font-bold text-gray-600">2</span>
              </div>
            </div>

            {/* 1st Place */}
            <div className="flex flex-col items-center -mt-8">
              <Crown className="w-8 h-8 text-yellow-500 mb-2 animate-bounce" />
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-100 to-amber-200 rounded-full flex items-center justify-center mb-3 ring-4 ring-yellow-400 shadow-lg">
                <User className="w-12 h-12 text-yellow-700" />
              </div>
              <div className="text-xl font-bold text-gray-900">{leaderboardData[0].name}</div>
              <div className="text-sm text-emerald-600 font-medium">{leaderboardData[0].score} kg CO₂</div>
              <div className="w-28 h-36 bg-gradient-to-b from-yellow-300 to-amber-400 rounded-t-lg mt-4 flex items-center justify-center">
                <span className="text-4xl font-bold text-yellow-800">1</span>
              </div>
            </div>

            {/* 3rd Place */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-200 rounded-full flex items-center justify-center mb-3 ring-4 ring-amber-400">
                <User className="w-10 h-10 text-amber-700" />
              </div>
              <div className="text-lg font-semibold text-gray-900">{leaderboardData[2].name}</div>
              <div className="text-sm text-gray-500">{leaderboardData[2].score} kg CO₂</div>
              <div className="w-24 h-20 bg-gradient-to-b from-amber-300 to-orange-400 rounded-t-lg mt-4 flex items-center justify-center">
                <span className="text-3xl font-bold text-amber-800">3</span>
              </div>
            </div>
          </div>

          {/* Full Leaderboard List */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4 text-white">
              <div className="flex items-center justify-between text-sm font-medium">
                <span>Rank</span>
                <span>User</span>
                <span>Carbon Score</span>
                <span className="hidden sm:block">Badge</span>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {leaderboardData.map((user) => (
                <div
                  key={user.rank}
                  className={`flex items-center justify-between p-4 transition-all hover:bg-emerald-50 ${
                    user.isCurrentUser
                      ? "bg-emerald-50 border-l-4 border-l-emerald-500"
                      : getRankStyle(user.rank)
                  }`}
                >
                  <div className="flex items-center gap-3 w-12">
                    {getRankIcon(user.rank)}
                  </div>

                  <div className="flex items-center gap-3 flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      user.isCurrentUser 
                        ? "bg-gradient-to-br from-emerald-400 to-teal-500" 
                        : "bg-gradient-to-br from-gray-100 to-gray-200"
                    }`}>
                      <User className={`w-5 h-5 ${user.isCurrentUser ? "text-white" : "text-gray-600"}`} />
                    </div>
                    <span className={`font-medium ${user.isCurrentUser ? "text-emerald-700" : "text-gray-900"}`}>
                      {user.name}
                      {user.isCurrentUser && (
                        <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                          You
                        </span>
                      )}
                    </span>
                  </div>

                  <div className="text-right min-w-[80px]">
                    <span className={`font-semibold ${
                      user.rank === 1 ? "text-yellow-600" : 
                      user.isCurrentUser ? "text-emerald-600" : "text-gray-700"
                    }`}>
                      {user.score} kg
                    </span>
                    <span className="text-gray-400 text-sm ml-1">CO₂</span>
                  </div>

                  <div className="hidden sm:block min-w-[120px] text-right">
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      user.rank === 1 
                        ? "bg-yellow-100 text-yellow-700" 
                        : user.rank === 2
                        ? "bg-gray-100 text-gray-700"
                        : user.rank === 3
                        ? "bg-amber-100 text-amber-700"
                        : "bg-emerald-100 text-emerald-700"
                    }`}>
                      {user.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Join CTA */}
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              Start tracking your carbon footprint to join the leaderboard!
            </p>
            <button
              onClick={() => document.querySelector("#calculator")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full font-medium hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl"
            >
              <Trophy className="w-5 h-5" />
              Join the Competition
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

import React from 'react'
import AppRoutes from './routes/AppRoutes'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-700">
      <Navbar />

      {/* Offset equals navbar height (h-20) */}
      <main className="flex-1 pt-20">
        <AppRoutes />
      </main>

      <Footer />
    </div>
  )
}

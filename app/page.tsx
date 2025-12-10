'use client';

import Hero from '@/components/Hero';
import LiveVelocityMetrics from '@/components/LiveVelocityMetrics';
import TimeMatters from '@/components/TimeMatters';
import ThreeCees from '@/components/ThreeCees';
import Comparison from '@/components/Comparison';
import Features from '@/components/Features';
import NotPlacementAgents from '@/components/NotPlacementAgents';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Hero />
      <LiveVelocityMetrics />
      <TimeMatters />
      <ThreeCees />
      <Comparison />
      <Features />
      <NotPlacementAgents />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}

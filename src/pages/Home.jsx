import React from "react";
import { WaitlistProvider } from "@/components/waitlist/WaitlistContext";
import Navigation from "@/components/sections/Navigation";
import Hero from "@/components/sections/Hero";
import ScrollStory from "@/components/sections/ScrollStory";
import About from "@/components/sections/About";
import Capabilities from "@/components/sections/Capabilities";
import Scenarios from "@/components/sections/Scenarios";
import Readiness from "@/components/sections/Readiness";
import Process from "@/components/sections/Process";
import Pricing from "@/components/sections/Pricing";
import Contact from "@/components/sections/Contact";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <WaitlistProvider>
      <div className="relative min-h-screen bg-background text-foreground antialiased">
        <Navigation />
        <main>
          <Hero />
          <ScrollStory />
          <About />
          <Capabilities />
          <Scenarios />
          <Readiness />
          <Process />
          <Pricing />
          <Contact />
          <FinalCTA />
        </main>
      </div>
    </WaitlistProvider>
  );
}
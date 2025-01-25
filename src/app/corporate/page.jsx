"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionSeven from "@/app/component/corporate/v2.1/components/SectionSeven";
import SectionThree from "@/app/component/corporate/v2.1/components/SectionThree";
import Header from "../component/common/header/Header";
import "./styles.css";
import StatisticsSection from "@/app/component/StatisticsSection";

gsap.registerPlugin(ScrollTrigger);

const CorporatePage = () => {
  const lenisRef = useRef();

  useEffect(() => {
    // Initialize Lenis smooth scroll
    lenisRef.current = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Connect lenis scroll to RAF and GSAP ticker
    function raf(time) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Update ScrollTrigger on scroll
    lenisRef.current.on("scroll", ScrollTrigger.update);

    // Connect GSAP ticker to Lenis
    gsap.ticker.add((time) => {
      lenisRef.current?.raf(time * 1000);
    });

    // Disable GSAP ticker lag smoothing
    gsap.ticker.lagSmoothing(0);

    // Initialize scroll to anchor functionality
    const handleAnchorClick = (e) => {
      const target = e.currentTarget;
      if (target.hasAttribute("data-anchor-target")) {
        e.preventDefault();
        const targetId = target.getAttribute("data-anchor-target");
        lenisRef.current?.scrollTo(targetId, {
          offset: 0,
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      }
    };

    // Add click listeners to anchor elements
    document.querySelectorAll("[data-anchor-target]").forEach((anchor) => {
      anchor.addEventListener("click", handleAnchorClick);
    });

    // Cleanup function
    return () => {
      // Destroy Lenis instance
      lenisRef.current?.destroy();

      // Remove GSAP ticker
      gsap.ticker.remove(lenisRef.current?.raf);

      // Remove anchor click listeners
      document.querySelectorAll("[data-anchor-target]").forEach((anchor) => {
        anchor.removeEventListener("click", handleAnchorClick);
      });

      // Kill all ScrollTrigger instances
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section className="min-vh-100">
      <Header />
      <SectionThree />
      {/* <SectionSix /> */}
      <StatisticsSection
        statistics={[
          { value: "1M+++++++", label1: "Active", label2: "Users" },
          { value: "200K", label1: "Daily", label2: "Visits" },
          { value: "99%", label1: "Customer", label2: "Satisfaction" },
        ]}
      />

      <SectionSeven />
    </section>
  );
};

export default CorporatePage;

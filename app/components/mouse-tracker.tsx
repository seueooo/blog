"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export function MouseTracker() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  const animate = useCallback((time: number) => {
    if (previousTimeRef.current !== null) {
      // Smooth interpolation for the cursor ring
      const ease = 0.15;
      currentRef.current.x +=
        (targetRef.current.x - currentRef.current.x) * ease;
      currentRef.current.y +=
        (targetRef.current.y - currentRef.current.y) * ease;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentRef.current.x}px, ${currentRef.current.y}px, 0)`;
      }
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${targetRef.current.x}px, ${targetRef.current.y}px, 0)`;
      }
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    // Detect if device has fine pointer (mouse)
    const hasFinePionter = window.matchMedia("(pointer: fine)").matches;
    if (!hasFinePionter) return;

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.getAttribute("role") === "button"
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.getAttribute("role") === "button"
      ) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseEnter);
    document.addEventListener("mouseout", handleMouseLeave);

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseout", handleMouseLeave);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate]);

  if (!isVisible) return null;

  return (
    <>
      {/* Gradient spotlight that follows cursor */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-700"
        style={{
          background: `radial-gradient(450px circle at ${mousePosition.x}px ${mousePosition.y}px, var(--spotlight-color), transparent 50%)`,
        }}
      />

      {/* Custom cursor ring */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-50"
        style={{
          width: isHovering ? "48px" : "32px",
          height: isHovering ? "48px" : "32px",
          marginLeft: isHovering ? "-24px" : "-16px",
          marginTop: isHovering ? "-24px" : "-16px",
          border: "1px solid var(--cursor-color)",
          borderRadius: "50%",
          transition:
            "width 0.2s ease-out, height 0.2s ease-out, margin 0.2s ease-out, opacity 0.2s ease-out",
          opacity: isHovering ? 0.8 : 0.4,
          willChange: "transform",
        }}
      />

      {/* Custom cursor dot */}
      <div
        ref={cursorDotRef}
        className="pointer-events-none fixed left-0 top-0 z-50"
        style={{
          width: "4px",
          height: "4px",
          marginLeft: "-2px",
          marginTop: "-2px",
          backgroundColor: "var(--cursor-color)",
          borderRadius: "50%",
          willChange: "transform",
        }}
      />
    </>
  );
}

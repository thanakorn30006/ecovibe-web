"use client";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";
import { Box } from "@mui/material";

export default function Background() {
  // ใช้ type Engine เพื่อไม่ให้ ESLint/TS ฟ้อง และเลี่ยง async/await
  const particlesInit = useCallback((engine: Engine) => {
    loadFull(engine).catch(() => {}); // swallow error เผื่อ runtime network ล้ม
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        overflow: "hidden",
        backgroundColor: "#0f172a", // 🌌 dark base
      }}
    >
      {/* 🌊 Gradient Glow Layer */}
      <Box
        sx={{
          position: "absolute",
          width: "200%",
          height: "200%",
          top: "-50%",
          left: "-50%",
          background: `
            radial-gradient(circle at 20% 30%, rgba(47,164,111,0.35), transparent 70%),
            radial-gradient(circle at 80% 70%, rgba(86,197,150,0.35), transparent 70%)
          `,
          animation: "waveMove 20s ease-in-out infinite alternate",
          filter: "blur(90px)",
        }}
      />

      {/* ✨ Sparkle Particles */}
      <Particles
        id="sparkles"
        init={particlesInit}
        options={{
          fpsLimit: 60,
          particles: {
            number: { value: 70, density: { enable: true, area: 800 } },
            color: { value: ["#2FA46F", "#56C596", "#ffffff"] },
            opacity: {
              value: 0.6,
              animation: { enable: true, speed: 2, minimumValue: 0.1, sync: false },
            },
            size: {
              value: { min: 1, max: 3 },
              animation: { enable: true, speed: 3, minimumValue: 0.5, sync: false },
            },
            move: {
              enable: true,
              speed: 0.4,
              direction: "none",
              random: true,
              outModes: { default: "out" },
            },
            twinkle: {
              particles: { enable: true, frequency: 0.05, opacity: 1 },
            },
          },
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" }, resize: true },
          },
          detectRetina: true,
        }}
      />

      {/* 🌊 Extra Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(15,23,42,0.2), rgba(15,23,42,0.6))",
        }}
      />

      {/* 🌊 Keyframes */}
      <style jsx global>{`
        @keyframes waveMove {
          0% {
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          100% {
            transform: translate(40px, -30px) scale(1.1) rotate(15deg);
          }
        }
      `}</style>
    </Box>
  );
}

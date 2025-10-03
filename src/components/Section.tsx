"use client";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

type SectionProps = {
  title: string;
  subtitle: string;
  variant?: "intro" | "problem" | "solution" | "demo" | "future" | "thankyou";
};

const animations = {
  intro: { initial: { opacity: 0, y: 60, scale: 0.9 }, animate: { opacity: 1, y: 0, scale: 1 } },
  problem: { initial: { opacity: 0, x: -80 }, animate: { opacity: 1, x: 0 } },
  solution: { initial: { opacity: 0, x: 80 }, animate: { opacity: 1, x: 0 } },
  demo: { initial: { opacity: 0, rotate: -5 }, animate: { opacity: 1, rotate: 0 } },
  future: { initial: { opacity: 0, y: 80 }, animate: { opacity: 1, y: 0 } },
  thankyou: { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 } },
};

const Section = React.forwardRef<HTMLDivElement, SectionProps>(
  ({ title, subtitle, variant = "intro" }, ref) => {
    const anim = animations[variant] || animations.intro;

    return (
      <Box
        ref={ref}
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          px: 3,
        }}
      >
        <motion.div
          initial={anim.initial}
          whileInView={anim.animate}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
        >
          {/* Title */}
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              mb: 3,
              background: "linear-gradient(90deg,#2FA46F,#56C596)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 25px rgba(47,164,111,0.5)",
            }}
          >
            {title}
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="h6"
            sx={{
              color: "rgba(255,255,255,0.85)",
              maxWidth: 750,
              lineHeight: 1.6,
              textShadow: "0 2px 8px rgba(0,0,0,0.4)",
            }}
          >
            {subtitle}
          </Typography>
        </motion.div>
      </Box>
    );
  }
);

Section.displayName = "Section";
export default Section;

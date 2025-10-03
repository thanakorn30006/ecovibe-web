"use client";
import { AppBar, Toolbar, Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const menu = [
  { key: "intro", label: "Intro" },
  { key: "problem", label: "Problem" },
  { key: "solution", label: "Solution" },
  { key: "demoApp", label: "Demo App" },
  { key: "demoModel", label: "EcoBox Model" },
  { key: "sdg", label: "SDGs" },
  { key: "revenue", label: "Revenue" },     
  { key: "advantage", label: "Why Us" },
  { key: "future", label: "Future" },
  { key: "thankyou", label: "Thank You" },
];

type NavbarProps = {
  onNavigate: (key: string) => void;
  active: string;
};

export default function Navbar({ onNavigate, active }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        transition: "all 0.3s ease",
        background: scrolled
          ? "linear-gradient(90deg, rgba(15,23,42,0.95), rgba(47,164,111,0.9))"
          : "linear-gradient(90deg, rgba(15,23,42,0.7), rgba(47,164,111,0.6))",
        backdropFilter: "blur(16px)",
        boxShadow: scrolled
          ? "0 6px 25px rgba(0,0,0,0.5)"
          : "0 4px 20px rgba(0,0,0,0.3)",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.15)"
          : "1px solid rgba(255,255,255,0.05)",
        py: 0.5,
        zIndex: 1200,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", gap: 4 }}>
        {/* 🔹 Logo */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            background: "linear-gradient(90deg,#2FA46F,#56C596)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            cursor: "pointer",
            letterSpacing: "1px",
          }}
          onClick={() => onNavigate("intro")}
        >
          🌱 EcoVibe
        </Typography>

        {/* 🔹 Center Menu */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 3,
            alignItems: "center",
          }}
        >
          {menu.map((item) => (
            <Box
              key={item.key}
              sx={{
                position: "relative",
                cursor: "pointer",
                px: 1,
                fontSize: "1rem",
                fontWeight: active === item.key ? "700" : "400",
                color: active === item.key ? "#56C596" : "white",
                transition: "all 0.3s ease",
                "&:hover": { color: "#56C596" },
              }}
              onClick={() => onNavigate(item.key)}
            >
              {item.label}
              {active === item.key && (
                <motion.div
                  layoutId="underline"
                  style={{
                    position: "absolute",
                    bottom: -4,
                    left: 0,
                    right: 0,
                    height: "3px",
                    borderRadius: "4px",
                    background: "linear-gradient(90deg,#2FA46F,#56C596)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Box>
          ))}
        </Box>

        {/* 🔹 CTA Button */}
        <Button
          variant="contained"
          sx={{
            background: "linear-gradient(90deg,#2FA46F,#56C596)",
            color: "white",
            fontWeight: "bold",
            textTransform: "none",
            px: 3,
            py: 1,
            borderRadius: "999px",
            boxShadow: "0 4px 15px rgba(47,164,111,0.5)",
            "&:hover": {
              background: "linear-gradient(90deg,#56C596,#2FA46F)",
              boxShadow: "0 6px 20px rgba(47,164,111,0.7)",
            },
          }}
          onClick={() => alert("Contact Us Clicked!")}
        >
          Contact Us
        </Button>
      </Toolbar>
    </AppBar>
  );
}

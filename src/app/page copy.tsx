"use client";

import React, { useRef, useState, useEffect } from "react";
import { Box, Container, Typography, Grid, Card, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import Image from "next/image";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MenuIcon from "@mui/icons-material/Menu";

/* --------------------------------------------------------------------------
   🔹 Background (Glow + Gradient)
-------------------------------------------------------------------------- */
function Background() {
  return (
    <Box
      aria-hidden
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        background:
          "radial-gradient(1200px 800px at -10% -10%, rgba(47,164,111,0.20), transparent 50%), radial-gradient(1000px 700px at 110% 110%, rgba(77,208,225,0.18), transparent 50%), linear-gradient(180deg, #0b1014 0%, #0d1117 100%)",
      }}
    />
  );
}

/* --------------------------------------------------------------------------
   🔹 Navbar (12 เมนูครบ + active highlight)
-------------------------------------------------------------------------- */
type SectionKey =
  | "intro"
  | "problem"
  | "solution"
  | "demoApp"
  | "demoModel"
  | "coretech"
  | "valueprop"
  | "competitor"
  | "market"
  | "partners"
  | "team";

function TopNav({
  active,
  onNavigate,
}: {
  active: SectionKey;
  onNavigate: (key: SectionKey) => void;
}) {
  const items: { key: SectionKey; label: string }[] = [
    { key: "intro", label: "Intro" },
    { key: "problem", label: "Problem" },
    { key: "solution", label: "Solution" },
    { key: "demoApp", label: "Demo App" },
    { key: "demoModel", label: "Demo Model" },
    { key: "coretech", label: "Core Tech" },
    { key: "valueprop", label: "Value Prop" },
    { key: "competitor", label: "Competitor" },
    { key: "market", label: "Market" },
    { key: "partners", label: "Partners" },
    { key: "team", label: "Team" },
  ];

  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 12,
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <Box
        sx={{
          pointerEvents: "auto",
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          px: { xs: 1.25, md: 2 },
          py: 1,
          borderRadius: 999,
          bgcolor: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 28px rgba(0,0,0,0.35)",
          maxWidth: { xs: "95%", md: "80%" },
          overflowX: { xs: "auto", md: "visible" },
        }}
      >
        <IconButton
          onClick={() => setOpen(!open)}
          sx={{ display: { xs: "inline-flex", md: "none" }, color: "white" }}
        >
          <MenuIcon />
        </IconButton>

        <Box
          sx={{
            display: { xs: open ? "flex" : "none", md: "flex" },
            gap: { xs: 1, md: 1.25 },
            flexWrap: "nowrap",
          }}
        >
          {items.map((it) => (
            <button
              key={it.key}
              onClick={() => onNavigate(it.key)}
              style={{
                border: "none",
                padding: "10px 14px",
                borderRadius: 999,
                cursor: "pointer",
                fontWeight: 700,
                color: "white",
                background:
                  active === it.key
                    ? "linear-gradient(90deg,#2FA46F,#4DD0E1)"
                    : "transparent",
                opacity: active === it.key ? 1 : 0.8,
                whiteSpace: "nowrap",
              }}
            >
              {it.label}
            </button>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

/* --------------------------------------------------------------------------
   🔹 Motion Wrapper (ใช้ซ้ำในทุก Section)
-------------------------------------------------------------------------- */
const MotionBox = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.9, ease: "easeOut" }}
    viewport={{ once: false, amount: 0.45 }}
    style={{
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    {children}
  </motion.div>
);

/* --------------------------------------------------------------------------
   🔹 Main Page
-------------------------------------------------------------------------- */
export default function Page() {
  const sections = {
    intro: useRef<HTMLDivElement>(null),
    problem: useRef<HTMLDivElement>(null),
    solution: useRef<HTMLDivElement>(null),
    demoApp: useRef<HTMLDivElement>(null),
    demoModel: useRef<HTMLDivElement>(null),
    coretech: useRef<HTMLDivElement>(null),
    valueprop: useRef<HTMLDivElement>(null),
    business: useRef<HTMLDivElement>(null),
    competitor: useRef<HTMLDivElement>(null),
    market: useRef<HTMLDivElement>(null),
    partners: useRef<HTMLDivElement>(null),
    team: useRef<HTMLDivElement>(null),
  };

  const [active, setActive] = useState<SectionKey>("intro");
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id as SectionKey;
            setActive(id);
            if (id === "team") setShowConfetti(true);
          }
        }),
      { threshold: 0.6 }
    );
    Object.values(sections).forEach((ref) => ref.current && observer.observe(ref.current));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (key: SectionKey) => sections[key].current?.scrollIntoView({ behavior: "smooth" });

  return (
    <Box sx={{ position: "relative", color: "white", minHeight: "100vh" }}>
      <Background />
      <TopNav active={active} onNavigate={scrollTo} />

      <Box sx={{ scrollSnapType: "y mandatory", overflowY: "scroll", height: "100vh" }}>
        <SectionIntro refProp={sections.intro} />
        <SectionProblem refProp={sections.problem} />
        <SectionSolution refProp={sections.solution} />
        <SectionDemoApp refProp={sections.demoApp} />
        <SectionDemoModel refProp={sections.demoModel} />
        <SectionCoreTech refProp={sections.coretech} />
        <SectionValueProp refProp={sections.valueprop} />
        <SectionCompetitor refProp={sections.competitor} />
        <SectionMarket refProp={sections.market} />
        <SectionPartners refProp={sections.partners} />
        <SectionTeam refProp={sections.team} showConfetti={showConfetti} width={width} height={height} />
      </Box>
    </Box>
  );
}

/* ========================================================================== */
/*                                   SECTIONS                                 */
/* ========================================================================== */

// ✅ 1. Intro
function SectionIntro({ refProp }: { refProp: React.RefObject<HTMLDivElement> }) {
  return (
    <section id="intro" ref={refProp} style={{ height: "100vh", scrollSnapAlign: "start" }}>
      <MotionBox>
        <Container maxWidth="lg" sx={{ textAlign: "center", position: "relative" }}>
          <Box
            sx={{
              position: "absolute",
              top: "-120px",
              left: "-120px",
              width: 340,
              height: 340,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(47,164,111,0.5), transparent 70%)",
              filter: "blur(110px)",
              zIndex: -1,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: "-120px",
              right: "-120px",
              width: 340,
              height: 340,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(86,197,150,0.4), transparent 70%)",
              filter: "blur(110px)",
              zIndex: -1,
            }}
          />
          <Typography
            variant="h1"
            fontWeight="bold"
            sx={{
              fontSize: { xs: "3rem", md: "5rem" },
              background: "linear-gradient(90deg,#2FA46F,#4DD0E1,#FFD93D)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 3,
              letterSpacing: { xs: 0.5, md: 1.5 },
            }}
          >
            GreenMakers Pitch Deck
          </Typography>
          <Typography variant="h5" sx={{ color: "rgba(255,255,255,0.92)", mb: 1 }}>
            Smart Recycling Kiosk & App Ecosystem
          </Typography>
          <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.75)", mb: 6 }}>
          </Typography>
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => document.getElementById("problem")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              background: "linear-gradient(90deg,#2FA46F,#4DD0E1,#FFD93D)",
              border: "none",
              color: "white",
              fontWeight: 800,
              padding: "14px 36px",
              borderRadius: 999,
              cursor: "pointer",
              fontSize: "1.1rem",
              boxShadow: "0 12px 35px rgba(0,0,0,0.45)",
            }}
          >
            Explore More
          </motion.button>
        </Container>
      </MotionBox>
    </section>
  );
}

/// ✅ 2. Problem (Only Images)
function SectionProblem({ refProp }: { refProp: React.RefObject<HTMLDivElement> }) {
  const problems = [
    "/problem333.png",
    "/problem111.png",
    "/problem222.png",
  ];

  return (
    <section
      id="problem"
      ref={refProp}
      style={{ height: "100vh", scrollSnapAlign: "start" }}
    >
      <MotionBox>
        <Container maxWidth="xl" sx={{ textAlign: "center", position: "relative" }}>
          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{
              fontSize: { xs: "3 rem", md: "4rem" },
              background: "linear-gradient(90deg,#2FA46F,#4DD0E1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 6,
              letterSpacing: 2,
            }}
          >
            Problem
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 4,
              justifyContent: "center",
              alignItems: "stretch",
              flexWrap: { xs: "wrap", md: "nowrap" },
            }}
          >
            {problems.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                whileHover={{ scale: 1.05 }}
                style={{ flex: "1 1 0", maxWidth: 1000 }}
              >
                <Card
                  sx={{
                    overflow: "hidden",
                    borderRadius: 4,
                    boxShadow: "0 10px 28px rgba(0,0,0,0.45)",
                    height: 450,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box sx={{ flex: 1, position: "relative" }}>
                    <Image
                      src={img}
                      alt={`Problem ${i + 1}`}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </Box>
                </Card>
              </motion.div>
            ))}
          </Box>
        </Container>
      </MotionBox>
    </section>
  );
}
// ✅ 3. Solution – Visual Flow (รูปภาพแทนเส้นทาง)
function SectionSolution({ refProp }: { refProp: React.RefObject<HTMLDivElement> }) {
  const solutionImages = [
    { img: "/solution1.png" },
    { img: "/solution2.png" },
    { img: "/solution3.png" },
  ];

  return (
    <section
      id="solution"
      ref={refProp}
      style={{ height: "100vh", scrollSnapAlign: "start" }}
    >
      <MotionBox>
        <Container maxWidth="xl" sx={{ textAlign: "center", position: "relative" }}>
          {/* 🔹 Title */}
          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{
              fontSize: { xs: "2.6rem", md: "4rem" },
              background: "linear-gradient(90deg,#56C596,#2FA46F)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 8,
              letterSpacing: 2,
            }}
          >
            💡 Solution
          </Typography>

          {/* 🔹 ภาพแสดง Flow */}
          <Box
            sx={{
              display: "flex",
              gap: 4,
              justifyContent: "center",
              alignItems: "stretch",
              flexWrap: { xs: "wrap", md: "nowrap" },
            }}
          >
            {solutionImages.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.2 }}
                whileHover={{ scale: 1.05 }}
                style={{ flex: "1 1 0", maxWidth: 1000}}
              >
                <Card
                  sx={{
                    overflow: "hidden",
                    borderRadius: 4,
                    boxShadow: "0 10px 28px rgba(0,0,0,0.45)",
                    height: 450,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    src={s.img}
                    alt={`Solution ${i + 1}`}
                    width={400}
                    height={320}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Card>
              </motion.div>
            ))}
          </Box>
        </Container>
      </MotionBox>
    </section>
  );
}

// ✅ 10. Demo – App (เวอร์ชันสวยของคุณ)
function SectionDemoApp({ refProp }: { refProp: React.RefObject<HTMLDivElement> }) {
  return (
    <section id="demoApp" ref={refProp} style={{ height: "100vh", scrollSnapAlign: "start" }}>
      <MotionBox>
        <Container maxWidth="lg" sx={{ textAlign: "center", position: "relative" }}>
          <Box
            sx={{
              position: "absolute",
              top: "-100px",
              left: "50%",
              transform: "translateX(-50%)",
              width: 520,
              height: 520,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(86,197,150,0.35), transparent 70%)",
              filter: "blur(130px)",
              zIndex: -1,
            }}
          />
          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{
              fontSize: { xs: "2.4rem", md: "3.6rem" },
              background: "linear-gradient(90deg,#2FA46F,#56C596)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 4,
            }}
          >
            📱 Demo – App
          </Typography>

          <motion.div
            initial={{ opacity: 0, scale: 0.86, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            whileHover={{ scale: 1.03 }}
            style={{ display: "inline-block" }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: "440px",
                aspectRatio: "430/932",
                mx: "auto",
                borderRadius: "40px",
                overflow: "hidden",
                background: "#000",
                boxShadow:
                  "0 0 0 12px #000, 0 12px 34px rgba(0,0,0,0.65), 0 0 55px rgba(86,197,150,0.45)",
              }}
            >
              <iframe
                src="/web/index.html"
                style={{ width: "100%", height: "100%", border: "none", borderRadius: "32px" }}
              />
            </Box>
          </motion.div>

          <Typography
            variant="body1"
            sx={{ mt: 3, color: "rgba(255,255,255,0.8)", fontStyle: "italic" }}
          >
            *Interactive Prototype – เชื่อมต่อกับระบบ EcoQuest จริง*
          </Typography>
        </Container>
      </MotionBox>
    </section>
  );
}

// ✅ 11. Demo – EcoBox Model (เวอร์ชันสวยของคุณ)
function SectionDemoModel({ refProp }: { refProp: React.RefObject<HTMLDivElement> }) {
  return (
    <section id="demoModel" ref={refProp} style={{ height: "100vh", scrollSnapAlign: "start" }}>
      <MotionBox>
        <Container maxWidth="lg" sx={{ textAlign: "center", position: "relative" }}>
          <Box
            sx={{
              position: "absolute",
              top: "20%",
              left: "50%",
              transform: "translateX(-50%)",
              width: 620,
              height: 620,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(86,197,150,0.28), transparent 70%)",
              filter: "blur(120px)",
              zIndex: -1,
            }}
          />
          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{
              fontSize: { xs: "2.4rem", md: "3.6rem" },
              background: "linear-gradient(90deg,#56C596,#2FA46F)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 3,
            }}
          >
            ♻️ Demo – EcoBox Model
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "rgba(255,255,255,0.85)", mb: 6, maxWidth: 760, mx: "auto" }}
          >
            โมเดลตู้รีไซเคิลอัจฉริยะ ที่เชื่อมกับแอป EcoQuest แบบเรียลไทม์
          </Typography>

          <motion.div
            initial={{ opacity: 0, scale: 0.86, y: 60 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ display: "inline-block" }}
          >
            <Box
              sx={{
                maxWidth: 540,
                mx: "auto",
                borderRadius: "22px",
                overflow: "hidden",
                boxShadow: "0 10px 32px rgba(0,0,0,0.5), 0 0 55px rgba(86,197,150,0.44)",
                p: 2,
                bgcolor: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(12px)",
              }}
            >
              <Image
                src="/EcoBox.jpg"
                alt="EcoBox Model"
                width={520}
                height={720}
                style={{ objectFit: "contain", borderRadius: "16px", width: "100%", height: "auto" }}
              />
            </Box>
          </motion.div>
        </Container>
      </MotionBox>
    </section>
  );
}

// ✅ 4. Core Technology – Tech Flow Line Style
function SectionCoreTech({ refProp }: { refProp: React.RefObject<HTMLDivElement> }) {
  const tech = [
    { icon: "🤖", title: "AI Image Recognition" },
    { icon: "📡", title: "IoT Smart Sensors" },
    { icon: "☁️", title: "Cloud Dashboard" },
    { icon: "📱", title: "Mobile App Integration" },
  ];

  return (
    <section
      id="coretech"
      ref={refProp}
      style={{ height: "100vh", scrollSnapAlign: "start" }}
    >
      <MotionBox>
        <Container
          maxWidth="lg"
          sx={{
            textAlign: "center",
            position: "relative",
            color: "white",
            pt: 8,
          }}
        >
          {/* 🌌 Background Glow */}
          <Box
            sx={{
              position: "absolute",
              top: "10%",
              left: "-10%",
              width: 400,
              height: 400,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(77,208,225,0.2), transparent 70%)",
              filter: "blur(120px)",
              zIndex: -1,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: "5%",
              right: "-10%",
              width: 400,
              height: 400,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,217,61,0.25), transparent 70%)",
              filter: "blur(120px)",
              zIndex: -1,
            }}
          />

          {/* 🔹 Title */}
          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{
              mb: 6,
              fontSize: { xs: "2.6rem", md: "4rem" },
              background: "linear-gradient(90deg,#4DD0E1,#FFD93D)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: 1,
            }}
          >
            Core Technology
          </Typography>

          {/* 🔸 Description */}
          <Typography
            sx={{
              color: "rgba(255,255,255,0.8)",
              mb: 10,
              maxWidth: 780,
              mx: "auto",
              fontSize: "1.1rem",
              lineHeight: 1.6,
            }}
          >
            เทคโนโลยีหลักที่ทำให้ EcoBox และ EcoQuest เชื่อมต่อกันอย่างสมบูรณ์
            ตั้งแต่การตรวจจับ การประมวลผล ไปจนถึงการสื่อสารข้อมูลแบบเรียลไทม์
          </Typography>

          {/* 🧩 Tech Flow Line */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
              flexWrap: { xs: "wrap", md: "nowrap" },
              position: "relative",
            }}
          >
            {/* เส้นสายหลัก */}
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: 0,
                right: 0,
                height: 4,
                background: "linear-gradient(90deg,#4DD0E1,#FFD93D)",
                borderRadius: 999,
                opacity: 0.6,
                zIndex: -1,
              }}
            />

            {tech.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                whileHover={{ scale: 1.08 }}
              >
                <Card
                  sx={{
                    width: 190,
                    height: 190,
                    borderRadius: "50%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(12px)",
                    border: "2px solid rgba(255,255,255,0.1)",
                    boxShadow: "0 0 20px rgba(77,208,225,0.25)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      border: "2px solid rgba(255,217,61,0.6)",
                      boxShadow: "0 0 35px rgba(255,217,61,0.35)",
                      transform: "translateY(-6px)",
                    },
                  }}
                >
                  <Typography sx={{ fontSize: "2.8rem", mb: 1 }}>
                    {t.icon}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    fontWeight={700}
                    sx={{ color: "rgba(255,255,255,0.9)", fontSize: "1rem" }}
                  >
                    {t.title}
                  </Typography>
                </Card>
              </motion.div>
            ))}
          </Box>
        </Container>
      </MotionBox>
    </section>
  );
}


// ✅ 5. Value Proposition – Creative Flow Design
function SectionValueProp({ refProp }: { refProp: React.RefObject<HTMLDivElement> }) {
  const values = [
    {
      title: "ความสะดวกสบาย",
      desc: "ใช้งานง่าย ไม่ต้องมีผู้ดูแล ระบบอัตโนมัติเต็มรูปแบบ",
      color: "#4DD0E1",
      icon: "🪄",
    },
    {
      title: "ความรวดเร็ว",
      desc: "ประมวลผลและคัดแยกได้ทันที ลดเวลาทำงานมากกว่า 50%",
      color: "#56C596",
      icon: "⚡",
    },
    {
      title: "แยกขยะอัตโนมัติ",
      desc: "AI วิเคราะห์วัสดุอย่างแม่นยำ แยกขยะได้ดีกว่ามนุษย์ 10–30 เท่า",
      color: "#FFD93D",
      icon: "🤖",
    },
    {
      title: "วิเคราะห์เรียลไทม์",
      desc: "ข้อมูลทั้งหมดแสดงบนแดชบอร์ดแบบเรียลไทม์ พร้อมระบบแจ้งเตือนอัจฉริยะ",
      color: "#FF6B6B",
      icon: "📊",
    },
  ];

  return (
    <section
      id="valueprop"
      ref={refProp}
      style={{
        height: "100vh",
        scrollSnapAlign: "start",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <MotionBox>
        <Container
          maxWidth="lg"
          sx={{
            textAlign: "center",
            color: "white",
            pt: 8,
            pb: 12,
            position: "relative",
          }}
        >
          {/* 🌈 Gradient Background Glow */}
          <Box
            sx={{
              position: "absolute",
              top: "10%",
              left: "50%",
              transform: "translateX(-50%)",
              width: 800,
              height: 800,
              background:
                "radial-gradient(circle at center, rgba(47,164,111,0.15), transparent 70%)",
              filter: "blur(150px)",
              zIndex: -2,
            }}
          />

          {/* 🌟 Title */}
          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{
              mb: 2,
              fontSize: { xs: "2.8rem", md: "4rem" },
              background: "linear-gradient(90deg,#FFD93D,#56C596,#4DD0E1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: 1,
            }}
          >
            Value Proposition
          </Typography>

          {/* Subtitle */}
          <Typography
            sx={{
              color: "rgba(255,255,255,0.8)",
              mb: 8,
              fontSize: "1.1rem",
              maxWidth: 720,
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            จุดแข็งของเทคโนโลยีที่ทำให้ EcoBox AI แตกต่างอย่างแท้จริง
          </Typography>

          {/* 🔷 Central Energy Line */}
          <Box
            sx={{
              position: "absolute",
              top: "52%",
              left: 0,
              width: "100%",
              height: 4,
              background: "linear-gradient(90deg,#56C596,#4DD0E1,#FFD93D,#FF6B6B)",
              opacity: 0.8,
              borderRadius: 999,
              boxShadow: "0 0 20px rgba(86,197,150,0.6)",
              transform: "translateY(-50%)",
              zIndex: -1,
            }}
          />

          {/* 💡 4 Value Cards in Flow */}
          <Grid
            container
            spacing={6}
            justifyContent="center"
            alignItems="center"
            sx={{
              position: "relative",
              zIndex: 1,
            }}
          >
            {values.map((v, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  whileHover={{ scale: 1.08 }}
                >
                  <Card
                    sx={{
                      p: 4,
                      height: 240,
                      borderRadius: 5,
                      background: `linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))`,
                      backdropFilter: "blur(10px)",
                      border: `1px solid ${v.color}40`,
                      boxShadow: `0 0 25px ${v.color}50`,
                      transition: "0.3s",
                      "&:hover": {
                        transform: "translateY(-6px)",
                        boxShadow: `0 0 35px ${v.color}80`,
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "2.5rem",
                        mb: 2,
                        textShadow: `0 0 10px ${v.color}70`,
                      }}
                    >
                      {v.icon}
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      sx={{
                        color: v.color,
                        mb: 1,
                        fontSize: "1.1rem",
                      }}
                    >
                      {v.title}
                    </Typography>
                    <Typography
                      sx={{
                        color: "rgba(255,255,255,0.85)",
                        fontSize: "0.95rem",
                        lineHeight: 1.55,
                      }}
                    >
                      {v.desc}
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </MotionBox>
    </section>
  );
}



// ✅ 7. Competitor Analysis – Matching Value Proposition Theme
function SectionCompetitor({ refProp }: { refProp: React.RefObject<HTMLDivElement> }) {
  const features = [
    { name: "ความสะดวกสบาย", machine: true, human: false },
    { name: "ความรวดเร็ว", machine: true, human: false },
    { name: "แยกขยะอัตโนมัติ", machine: true, human: false },
    { name: "วิเคราะห์เรียลไทม์", machine: true, human: false },
  ];

  return (
    <section
      id="competitor"
      ref={refProp}
      style={{
        height: "100vh",
        scrollSnapAlign: "start",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <MotionBox>
        <Container
          maxWidth="lg"
          sx={{
            textAlign: "center",
            color: "white",
            pt: 8,
            pb: 12,
            position: "relative",
          }}
        >
          {/* 🌈 Gradient Background Glow (เหมือน ValueProp) */}
          <Box
            sx={{
              position: "absolute",
              top: "10%",
              left: "50%",
              transform: "translateX(-50%)",
              width: 900,
              height: 900,
              background:
                "radial-gradient(circle at center, rgba(47,164,111,0.15), transparent 70%)",
              filter: "blur(150px)",
              zIndex: -2,
            }}
          />

          {/* 🌟 Title */}
          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{
              mb: 2,
              fontSize: { xs: "2.8rem", md: "4rem" },
              background: "linear-gradient(90deg,#FFD93D,#56C596,#4DD0E1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: 1,
            }}
          >
            Competitor Analysis
          </Typography>

          {/* Subtitle */}
          <Typography
            sx={{
              color: "rgba(255,255,255,0.8)",
              mb: 8,
              fontSize: "1.1rem",
              maxWidth: 720,
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            เปรียบเทียบความสามารถระหว่าง EcoBox AI กับการคัดแยกแบบใช้แรงงานคน
          </Typography>

          {/* ⚡ White Table */}
          <Box
            sx={{
              bgcolor: "rgba(255,255,255,0.95)",
              borderRadius: 5,
              boxShadow: "0 15px 50px rgba(0,0,0,0.45)",
              width: "90%",
              maxWidth: 900,
              mx: "auto",
              p: 3,
              backdropFilter: "blur(6px)",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontFamily: "inherit",
                fontSize: "1.1rem",
                borderRadius: "12px",
                textAlign: "center",
              }}
            >
              <thead>
                <tr>
                  <th style={thStyleMain}></th>
                  <th style={thStyle}>ใช้ตู้ (EcoBox AI)</th>
                  <th style={thStyle}>ใช้คน</th>
                </tr>
              </thead>
              <tbody>
                {features.map((f, i) => (
                  <tr key={i} style={i % 2 ? rowAlt : undefined}>
                    <td style={tdFeature}>{f.name}</td>
                    <td style={f.machine ? tdCheck : tdX}>{f.machine ? "✅" : "❌"}</td>
                    <td style={f.human ? tdCheckGray : tdX}>{f.human ? "✅" : "❌"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>

          {/* 🧠 Note */}
          <Typography
            variant="body2"
            sx={{
              mt: 4,
              color: "rgba(255,255,255,0.7)",
              fontStyle: "italic",
            }}
          >
            * EcoBox AI ให้ประสิทธิภาพสูงกว่าในทุกด้าน ทั้งความเร็ว ความแม่นยำ และการวิเคราะห์แบบเรียลไทม์
          </Typography>
        </Container>
      </MotionBox>
    </section>
  );
}

/* 🎨 Table Styles */
const thStyleMain = {
  textAlign: "left" as const,
  padding: "22px 28px",
  color: "#2FA46F",
  fontWeight: 800,
  fontSize: "1.2rem",
  borderBottom: "2px solid rgba(0,0,0,0.08)",
  backgroundColor: "#f9fafb",
};

const thStyle = {
  textAlign: "center" as const,
  padding: "22px 16px",
  color: "#1e293b",
  fontWeight: 700,
  fontSize: "1.2rem",
  borderBottom: "2px solid rgba(0,0,0,0.08)",
  backgroundColor: "#f9fafb",
};

const tdFeature = {
  textAlign: "left" as const,
  padding: "22px 28px",
  fontWeight: 600,
  color: "#111827",
  borderBottom: "1px solid rgba(0,0,0,0.05)",
  fontSize: "1.05rem",
  backgroundColor: "#fff",
};

const tdCheck = {
  textAlign: "center" as const,
  padding: "22px",
  color: "#56C596",
  fontSize: "1.8rem",
  fontWeight: 700,
  backgroundColor: "#ecfdf5",
  borderBottom: "1px solid rgba(0,0,0,0.05)",
};

const tdCheckGray = {
  textAlign: "center" as const,
  padding: "22px",
  color: "#9e9e9e",
  fontSize: "1.8rem",
  fontWeight: 700,
  backgroundColor: "#f3f4f6",
  borderBottom: "1px solid rgba(0,0,0,0.05)",
};

const tdX = {
  textAlign: "center" as const,
  padding: "22px",
  color: "#bbb",
  fontSize: "1.8rem",
  backgroundColor: "#f8fafc",
  borderBottom: "1px solid rgba(0,0,0,0.05)",
};

const rowAlt = {
  backgroundColor: "#f9fafb",
};


// ✅ 8. Market Size – Thailand Waste Machine Market
function SectionMarket({ refProp }: { refProp: React.RefObject<HTMLDivElement> }) {
  const market = [
    {
      label: "TAM",
      value: "฿7,500 – 15,000 ล้าน",
      desc: "ตลาดเครื่องจักรแยกขยะรวมในประเทศไทย",
      color: "#FFD93D",
    },
    {
      label: "SAM",
      value: "฿2,500 – 6,000 ล้าน",
      desc: "ตลาดเครื่องจักรแยกขยะในเขตเมืองและอุตสาหกรรม",
      color: "#56C596",
    },
    {
      label: "SOM",
      value: "฿125 – 600 ล้าน",
      desc: "ส่วนแบ่งตลาดที่ EcoBox AI ตั้งเป้าในปีแรก",
      color: "#4DD0E1",
    },
  ];

  return (
    <section
      id="market"
      ref={refProp}
      style={{
        height: "100vh",
        scrollSnapAlign: "start",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <MotionBox>
        <Container
          maxWidth="lg"
          sx={{
            textAlign: "center",
            color: "white",
            pt: 8,
            pb: 10,
            position: "relative",
          }}
        >
          {/* 🌈 Background Glow */}
          <Box
            sx={{
              position: "absolute",
              top: "15%",
              left: "50%",
              transform: "translateX(-50%)",
              width: 900,
              height: 900,
              background:
                "radial-gradient(circle at center, rgba(47,164,111,0.15), transparent 70%)",
              filter: "blur(150px)",
              zIndex: -2,
            }}
          />

          {/* 🌟 Title */}
          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{
              mb: 1,
              fontSize: { xs: "2.8rem", md: "4rem" },
              background: "linear-gradient(90deg,#FFD93D,#56C596,#4DD0E1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: 1,
            }}
          >
            Market Size
          </Typography>

          <Typography
            sx={{
              color: "rgba(255,255,255,0.8)",
              mb: 10,
              fontSize: "1.1rem",
            }}
          >
            ตลาดเครื่องจักรแยกขยะในประเทศไทย
          </Typography>

          {/* 📊 3 Cards */}
          <Grid container spacing={5} justifyContent="center">
            {market.map((m, i) => (
              <Grid item xs={12} md={4} key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card
                    sx={{
                      p: 5,
                      height: 250,
                      borderRadius: 5,
                      background: `linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.03))`,
                      border: `1px solid ${m.color}40`,
                      boxShadow: `0 0 35px ${m.color}40`,
                      backdropFilter: "blur(12px)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: `0 0 45px ${m.color}80`,
                        transform: "translateY(-8px)",
                      },
                    }}
                  >
                    <Typography
                      variant="h3"
                      fontWeight="900"
                      sx={{
                        background: `linear-gradient(90deg,${m.color},#ffffff)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        mb: 1,
                      }}
                    >
                      {m.label}
                    </Typography>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      sx={{ color: "white", mb: 2 }}
                    >
                      {m.value}
                    </Typography>
                    <Typography
                      sx={{
                        color: "rgba(255,255,255,0.85)",
                        fontSize: "1rem",
                        lineHeight: 1.6,
                      }}
                    >
                      {m.desc}
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </MotionBox>
    </section>
  );
}


// ✅ 9. Partners & Channels – Professional Layout
function SectionPartners({ refProp }: { refProp: React.RefObject<HTMLDivElement> }) {
  const partners = [
    { name: "CP Group", img: "/partner1.png" },
    { name: "PTT", img: "/partner2.png" },
    { name: "Krungthai", img: "/partner3.png" },
    { name: "Batago", img: "/partner4.png" },
    { name: "Central Group", img: "/partner5.png" },
    { name: "BJC", img: "/partner6.png" },
    { name: "SCG", img: "/partner7.png" },
  ];

  const channels = [
    { name: "TikTok", img: "/chanal1.png" },
    { name: "Instagram", img: "/chanal2.png" },
    { name: "Facebook", img: "/chanal3.png" },
  ];

  return (
    <section
      id="partners"
      ref={refProp}
      style={{
        height: "100vh",
        scrollSnapAlign: "start",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <MotionBox>
        <Container
          maxWidth="lg"
          sx={{
            textAlign: "center",
            color: "white",
            pt: 8,
            pb: 10,
            position: "relative",
          }}
        >
          {/* 🌈 Gradient Glow Background */}
          <Box
            sx={{
              position: "absolute",
              top: "10%",
              left: "50%",
              transform: "translateX(-50%)",
              width: 900,
              height: 900,
              background:
                "radial-gradient(circle at center, rgba(47,164,111,0.15), transparent 70%)",
              filter: "blur(150px)",
              zIndex: -2,
            }}
          />

          {/* 🏢 Partners */}
          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{
              mb: 1,
              fontSize: { xs: "2.8rem", md: "4rem" },
              background: "linear-gradient(90deg,#FFD93D,#56C596,#4DD0E1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: 1,
            }}
          >
            Partners & Channels
          </Typography>

          <Typography
            sx={{
              color: "rgba(255,255,255,0.8)",
              mb: 6,
              fontSize: "1.1rem",
            }}
          >
            พันธมิตรหลักและช่องทางประชาสัมพันธ์ของโครงการ EcoBox AI
          </Typography>

          {/* 🤝 Partner Logos */}
          <Typography
            variant="h5"
            sx={{
              color: "#56C596",
              mb: 3,
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            Strategic Partners
          </Typography>

          <Grid
            container
            spacing={4}
            justifyContent="center"
            sx={{ mb: 10 }}
          >
            {partners.map((p, i) => (
              <Grid item xs={6} sm={4} md={3} key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card
                    sx={{
                      p: 2,
                      borderRadius: 4,
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      backdropFilter: "blur(8px)",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: 120,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: "0 0 25px rgba(86,197,150,0.5)",
                      },
                    }}
                  >
                    <Image
                      src={p.img}
                      alt={p.name}
                      width={140}
                      height={80}
                      style={{ objectFit: "contain", opacity: 0.95 }}
                    />
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* 📣 Channels */}
          <Typography
            variant="h5"
            sx={{
              color: "#FFD93D",
              mb: 3,
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            Marketing Channels
          </Typography>

          <Grid
            container
            spacing={6}
            justifyContent="center"
            alignItems="center"
          >
            {channels.map((c, i) => (
              <Grid item xs={4} sm={3} md={2} key={i}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                >
                  <Box
                    sx={{
                      borderRadius: "50%",
                      overflow: "hidden",
                      p: 2,
                      bgcolor: "rgba(255,255,255,0.06)",
                      boxShadow: "0 0 18px rgba(255,255,255,0.08)",
                      backdropFilter: "blur(6px)",
                      transition: "0.3s",
                      "&:hover": {
                        transform: "scale(1.1)",
                        boxShadow: "0 0 30px rgba(255,255,255,0.2)",
                      },
                    }}
                  >
                    <Image
                      src={c.img}
                      alt={c.name}
                      width={100}
                      height={100}
                      style={{ objectFit: "contain" }}
                    />
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </MotionBox>
    </section>
  );
}




// ✅ 12. Team – Hero Visual Layout (Full-width)
function SectionTeam({
  refProp,
  showConfetti,
  width,
  height,
}: {
  refProp: React.RefObject<HTMLDivElement>;
  showConfetti: boolean;
  width: number;
  height: number;
}) {
  const members = [
    {
      name: "Thanakorn Sombatboon",
      role: "Lead Developer",
      branch: "Computer & Information Systems",
      img: "/member1.png",
    },
    {
      name: "Sirawit P.",
      role: "UI/UX Designer",
      branch: "Creative Technology",
      img: "/member2.png",
    },
    {
      name: "Pattarapon C.",
      role: "Data & Research Analyst",
      branch: "Information Engineering",
      img: "/member3.png",
    },
  ];

  return (
    <section
      id="team"
      ref={refProp}
      style={{
        height: "100vh",
        scrollSnapAlign: "start",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <MotionBox>
        <Container
          maxWidth="xl"
          sx={{
            textAlign: "center",
            color: "white",
            position: "relative",
            pt: 8,
          }}
        >
          {/* 🌈 Gradient Glow Background */}
          <Box
            sx={{
              position: "absolute",
              top: "10%",
              left: "50%",
              transform: "translateX(-50%)",
              width: 1100,
              height: 900,
              background:
                "radial-gradient(circle at center, rgba(86,197,150,0.15), transparent 70%)",
              filter: "blur(150px)",
              zIndex: -2,
            }}
          />

          {/* ✨ Title */}
          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{
              mb: 2,
              fontSize: { xs: "2.8rem", md: "4rem" },
              background: "linear-gradient(90deg,#56C596,#4DD0E1,#FFD93D)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: 1,
            }}
          >
            Team
          </Typography>

          <Typography
            sx={{
              color: "rgba(255,255,255,0.8)",
              mb: 8,
              fontSize: "1.1rem",
              maxWidth: 720,
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            กลุ่มนักศึกษาผู้พัฒนาโครงการ 
          </Typography>

          {/* 👥 Team Display */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 6,
              flexWrap: { xs: "wrap", md: "nowrap" },
            }}
          >
            {members.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                whileHover={{ scale: 1.03 }}
              >
                <Box sx={{ textAlign: "center" }}>
                  {/* รูปเด่นแบบไม่มีกรอบ */}
                  <Box
                    sx={{
                      width: { xs: 260, md: 320 },
                      height: { xs: 260, md: 320 },
                      borderRadius: "50%",
                      overflow: "hidden",
                      mx: "auto",
                      mb: 3,
                      boxShadow: "0 0 40px rgba(86,197,150,0.5)",
                    }}
                  >
                    <Image
                      src={m.img}
                      alt={m.name}
                      width={400}
                      height={400}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>

                  {/* ข้อมูลชื่อและตำแหน่ง */}
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{
                      background: "linear-gradient(90deg,#FFD93D,#4DD0E1)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontSize: "1.3rem",
                    }}
                  >
                    {m.name}
                  </Typography>
                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.85)",
                      fontWeight: 600,
                      mb: 0.5,
                      fontSize: "1.05rem",
                    }}
                  >
                    {m.role}
                  </Typography>
                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.7)",
                      fontSize: "0.95rem",
                      fontStyle: "italic",
                    }}
                  >
                    {m.branch}
                  </Typography>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Container>
      </MotionBox>

      {/* 🎉 Confetti Effect */}
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={700}
          gravity={0.25}
        />
      )}
    </section>
  );
}

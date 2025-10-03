"use client";

import { Box, Container, Typography, Grid, Card } from "@mui/material";
import { useRef, useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Background from "@/components/Background";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import Image from "next/image";

/* --------------------------------------------------------------------------
   🔹 Motion Wrapper (ใช้ซ้ำในทุก Section)
-------------------------------------------------------------------------- */
const MotionBox = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, ease: "easeOut" }}
    viewport={{ once: false, amount: 0.4 }}
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
   🔹 Main HomePage
-------------------------------------------------------------------------- */
export default function HomePage() {
  const sections = {
    intro: useRef<HTMLDivElement>(null),
    problem: useRef<HTMLDivElement>(null),
    solution: useRef<HTMLDivElement>(null),
    demoApp: useRef<HTMLDivElement>(null),
    demoModel: useRef<HTMLDivElement>(null),
    sdg: useRef<HTMLDivElement>(null),
    revenue: useRef<HTMLDivElement>(null),
    advantage: useRef<HTMLDivElement>(null),
    future: useRef<HTMLDivElement>(null),
    thankyou: useRef<HTMLDivElement>(null),
  };

  const [active, setActive] = useState<keyof typeof sections>("intro");
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  // 📌 Section Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id as keyof typeof sections;
            setActive(id);
            if (id === "thankyou") setShowConfetti(true);
          }
        }),
      { threshold: 0.6 }
    );

    Object.values(sections).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (key: keyof typeof sections) =>
    sections[key].current?.scrollIntoView({ behavior: "smooth" });

  return (
    <Box sx={{ position: "relative", color: "white", minHeight: "100vh" }}>
      <Background />
      <Navbar onNavigate={(key) => scrollTo(key)} active={active} />

      {/* 🌍 Main Scroll */}
      <Box sx={{ scrollSnapType: "y mandatory", overflowY: "scroll", height: "100vh" }}>
        <SectionIntro refProp={sections.intro} />
        <SectionProblem refProp={sections.problem} />
        <SectionSolution refProp={sections.solution} />
        <SectionDemoApp refProp={sections.demoApp} />
        <SectionDemoModel refProp={sections.demoModel} />
        <SectionSDG refProp={sections.sdg} />
        <SectionRevenue refProp={sections.revenue} />
        <SectionAdvantage refProp={sections.advantage} />
        <SectionFuture refProp={sections.future} />
        <SectionThankYou refProp={sections.thankyou} showConfetti={showConfetti} width={width} height={height} />
      </Box>
    </Box>
  );
}

/* ========================================================================== */
/*                                   SECTIONS                                 */
/* ========================================================================== */

// ✅ Intro – Hackathon On The Beach (SDGs Edition)
function SectionIntro({ refProp }: { refProp: React.RefObject<HTMLDivElement> }) {
  const members = [
    { name: "Member 1", role: "Developer", img: "/member11.png" },
    { name: "Member 2", role: "Designer", img: "/member22.png" },
    { name: "Member 3", role: "Researcher", img: "/member33.png" },
  ];

  return (
    <div id="intro" ref={refProp} style={{ height: "100vh", scrollSnapAlign: "start" }}>
      <MotionBox>
        <Container maxWidth="lg" sx={{ textAlign: "center", position: "relative" }}>
          {/* 🌊 Background Glow */}
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

          {/* 🌍 Title */}
          <Typography
            variant="h1"
            fontWeight="bold"
            sx={{
              fontSize: { xs: "3rem", md: "5rem" },
              background: "linear-gradient(90deg,#2FA46F,#4DD0E1,#FFD93D)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: { xs: 0.5, md: 1.5 },
            }}
          >
            GreenMarker
          </Typography>

          {/* 📌 Tagline */}
          <Typography
            variant="h5"
            sx={{
              color: "rgba(255,255,255,0.92)",
              mt: 2,
              mb: 6,
              fontWeight: 500,
              maxWidth: "760px",
              mx: "auto",
            }}
          >
            Hackathon on the Beach · Gamification for SDGs
          </Typography>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            style={{
              background: "linear-gradient(90deg,#2FA46F,#4DD0E1,#FFD93D)",
              border: "none",
              color: "white",
              fontWeight: 800,
              padding: "16px 48px",
              borderRadius: "999px",
              cursor: "pointer",
              fontSize: "1.25rem",
              boxShadow: "0 12px 35px rgba(0,0,0,0.45)",
            }}
          >
            🚀 Explore More
          </motion.button>

          {/* Team */}
          <Grid container spacing={6} justifyContent="center" sx={{ mt: 6 }}>
            {members.map((m, i) => (
              <Grid item xs={12} sm={4} key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card
                    sx={{
                      bgcolor: "rgba(255,255,255,0.05)",
                      backdropFilter: "blur(12px)",
                      borderRadius: 4,
                      p: 3,
                      textAlign: "center",
                      transition: "all 0.3s ease",
                      "&:hover": { transform: "translateY(-8px)", boxShadow: "0 14px 34px rgba(0,0,0,0.5)" },
                    }}
                  >
                    <Box sx={{ width: 180, height: 180, borderRadius: "50%", overflow: "hidden", margin: "0 auto" }}>
                      <Image src={m.img} alt={m.name} width={180} height={180} style={{ objectFit: "cover" }} />
                    </Box>
                    <Typography variant="h6" sx={{ mt: 2, fontWeight: 800 }}>
                      {m.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.72)" }}>
                      {m.role}
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </MotionBox>
    </div>
  );
}

// ✅ Problem
function SectionProblem({ refProp }: { refProp: React.RefObject<HTMLDivElement> }) {
  const problems = [
    { title: "มลพิษ", desc: "อากาศ น้ำ และขยะที่เพิ่มขึ้นทุกปี", color: "#FF6B6B" },
    { title: "โลกร้อน", desc: "อุณหภูมิเฉลี่ยโลกสูงขึ้นอย่างต่อเนื่อง", color: "#FFD93D" },
    { title: "พลาสติก", desc: "ขยะพลาสติกกว่า 8 ล้านตัน/ปี ไหลลงสู่มหาสมุทร", color: "#4DD0E1" },
  ];

  return (
    <div id="problem" ref={refProp} style={{ height: "100vh", scrollSnapAlign: "start" }}>
      <MotionBox>
        <Container maxWidth="lg" sx={{ textAlign: "center", position: "relative" }}>
          {/* glow */}
          <Box
            sx={{
              position: "absolute",
              top: "-120px",
              left: "-100px",
              width: 280,
              height: 280,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,107,107,0.45), transparent 70%)",
              filter: "blur(110px)",
              zIndex: -1,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: "-120px",
              right: "-100px",
              width: 280,
              height: 280,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,217,61,0.45), transparent 70%)",
              filter: "blur(110px)",
              zIndex: -1,
            }}
          />

          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{
              fontSize: { xs: "2.4rem", md: "3.6rem" },
              background: "linear-gradient(90deg,#FF6B6B,#FFD93D)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 4,
            }}
          >
            🌎 ปัญหาที่โลกกำลังเผชิญ
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {problems.map((p, i) => (
              <Grid item xs={12} md={4} key={i}>
                <motion.div whileHover={{ scale: 1.06 }}>
                  <Card
                    sx={{
                      height: "100%",
                      bgcolor: "rgba(255,255,255,0.06)",
                      backdropFilter: "blur(14px)",
                      borderRadius: 4,
                      p: 3,
                      textAlign: "center",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.45)",
                    }}
                  >
                    <Typography variant="h5" fontWeight={800} sx={{ color: p.color, mb: 1 }}>
                      {p.title}
                    </Typography>
                    <Typography sx={{ color: "rgba(255,255,255,0.86)" }}>{p.desc}</Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </MotionBox>
    </div>
  );
}

// ✅ Solution
function SectionSolution({ refProp }: { refProp: React.RefObject<HTMLDivElement> }) {
  const solutions = [
    { title: "Gamification", desc: "สร้างระบบภารกิจ (Quest) รายวัน/รายสัปดาห์" },
    { title: "EcoPoints", desc: "สะสมแต้มจากการทำกิจกรรมรักษ์โลก" },
    { title: "Rewards", desc: "แลกรางวัล / ส่วนลด / ปลูกต้นไม้ดิจิทัล" },
  ];

  return (
    <div id="solution" ref={refProp} style={{ height: "100vh", scrollSnapAlign: "start" }}>
      <MotionBox>
        <Container maxWidth="lg" sx={{ textAlign: "center", position: "relative" }}>
          {/* glow */}
          <Box
            sx={{
              position: "absolute",
              top: "-120px",
              left: "-100px",
              width: 280,
              height: 280,
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
              right: "-100px",
              width: 280,
              height: 280,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(86,197,150,0.35), transparent 70%)",
              filter: "blur(110px)",
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
            💡 Solution
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {solutions.map((s, i) => (
              <Grid item xs={12} md={4} key={i}>
                <motion.div whileHover={{ scale: 1.06 }}>
                  <Card
                    sx={{
                      height: "100%",
                      bgcolor: "rgba(255,255,255,0.06)",
                      backdropFilter: "blur(14px)",
                      borderRadius: 4,
                      p: 3,
                      textAlign: "center",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.45)",
                    }}
                  >
                    <Typography variant="h5" fontWeight={800} sx={{ color: "#56C596", mb: 1 }}>
                      {s.title}
                    </Typography>
                    <Typography sx={{ color: "rgba(255,255,255,0.86)" }}>{s.desc}</Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </MotionBox>
    </div>
  );
}

// ✅ Demo – App
function SectionDemoApp({ refProp }: { refProp: React.RefObject<HTMLDivElement> }) {
  return (
    <div id="demoApp" ref={refProp} style={{ height: "100vh", scrollSnapAlign: "start" }}>
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
                boxShadow: "0 0 0 12px #000, 0 12px 34px rgba(0,0,0,0.65), 0 0 55px rgba(86,197,150,0.45)",
              }}
            >
              <iframe src="/web/index.html" style={{ width: "100%", height: "100%", border: "none", borderRadius: "32px" }} />
            </Box>
          </motion.div>

          <Typography variant="body1" sx={{ mt: 3, color: "rgba(255,255,255,0.8)", fontStyle: "italic" }}>
            *Interactive Prototype – เชื่อมต่อกับระบบ EcoQuest จริง*
          </Typography>
        </Container>
      </MotionBox>
    </div>
  );
}

// ✅ Demo – EcoBox Model
function SectionDemoModel({ refProp }: { refProp: React.RefObject<HTMLDivElement> }) {
  return (
    <div id="demoModel" ref={refProp} style={{ height: "100vh", scrollSnapAlign: "start" }}>
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
          <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.85)", mb: 6, maxWidth: 760, mx: "auto" }}>
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
              <Image src="/EcoBox.jpg" alt="EcoBox Model" width={520} height={720} style={{ objectFit: "contain", borderRadius: "16px" }} />
            </Box>
          </motion.div>
        </Container>
      </MotionBox>
    </div>
  );
}

// ✅ SDG – Official Colors + Glow (no borders)
function SectionSDG({ refProp }: { refProp: React.RefObject<HTMLDivElement> }) {
  const sdgs = [
    { goal: "SDG 11", color: "#FD9D24", img: "/sdg11.png", desc: "Sustainable Cities & Communities" },
    { goal: "SDG 12", color: "#BF8B2E", img: "/sdg12.png", desc: "Responsible Consumption & Production" },
    { goal: "SDG 13", color: "#3F7E44", img: "/sdg13.png", desc: "Climate Action" },
  ];

  return (
    <div id="sdg" ref={refProp} style={{ height: "100vh", scrollSnapAlign: "start" }}>
      <MotionBox>
        <Container maxWidth="lg" sx={{ textAlign: "center" }}>
          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{
              fontSize: { xs: "2.4rem", md: "3.6rem" },
              background: "linear-gradient(90deg,#FD9D24,#BF8B2E,#3F7E44)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 4,
            }}
          >
            🎯 Sustainable Development Goals
          </Typography>

          <Grid container spacing={5} justifyContent="center">
            {sdgs.map((sdg, i) => (
              <Grid item xs={12} md={4} key={i}>
                <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: i * 0.2 }}>
                  <Box sx={{ p: 3 }}>
                    <Box
                      sx={{
                        width: 140,
                        height: 140,
                        borderRadius: "18px",
                        overflow: "hidden",
                        margin: "0 auto 18px",
                        boxShadow: `0 0 34px ${sdg.color}`,
                      }}
                    >
                      <img src={sdg.img} alt={sdg.goal} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </Box>
                    <Typography variant="h6" fontWeight="bold" sx={{ color: sdg.color }}>
                      {sdg.goal}
                    </Typography>
                    <Typography sx={{ color: "rgba(255,255,255,0.9)" }}>{sdg.desc}</Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <Typography variant="body1" sx={{ mt: 5, color: "rgba(255,255,255,0.85)", fontStyle: "italic", maxWidth: 760, mx: "auto" }}>
            GreenMarker ช่วยขับเคลื่อน SDGs โดยสร้างเมืองที่ยั่งยืน ส่งเสริมการบริโภคที่รับผิดชอบ และลดการเปลี่ยนแปลงสภาพภูมิอากาศ
          </Typography>
        </Container>
      </MotionBox>
    </div>
  );
}

// ✅ Revenue – “เส้นรายได้แตกสาย” ระดับมือโปร (SVG Lines + Circle Nodes)
function SectionRevenue({ refProp }: { refProp: React.RefObject<HTMLDivElement> }) {
  const revenues = useMemo(
    () => [
      { icon: "🏢", title: "Subscription", desc: "ค่าบริการรายเดือน 1,500–3,000 บาท/ตู้/เดือน", color: "#56C596" },
      { icon: "📢", title: "Advertising", desc: "สื่อโฆษณาบนตู้/แอป: Banner, Pop-up, Sponsor Quest", color: "#FFD93D" },
      { icon: "🛒", title: "Marketplace Fee", desc: "ค่าธรรมเนียมร้านค้า/แบรนด์ใน Marketplace", color: "#4DD0E1" },
      { icon: "💎", title: "Point Exchange", desc: "ร้านค้าซื้อแต้ม EcoPoint สำหรับแคมเปญ", color: "#FF6B6B" },
    ],
    []
  );

  const size = 560; // canvas size
  const center = size / 2;
  const radius = 210; // distance of nodes
  const nodeR = 56;

  // คำนวณจุดของสาย (polar -> cartesian)
  const points = revenues.map((_, i) => {
    const angle = (i / revenues.length) * 2 * Math.PI - Math.PI / 2; // เริ่มบนสุด
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    return { x, y, angle };
  });

  return (
    <div id="revenue" ref={refProp} style={{ height: "100vh", scrollSnapAlign: "start" }}>
      <MotionBox>
        <Container maxWidth="lg" sx={{ textAlign: "center", position: "relative" }}>
          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{
              fontSize: { xs: "2.4rem", md: "3.6rem" },
              background: "linear-gradient(90deg,#2FA46F,#56C596)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 3,
            }}
          >
            💰 Revenue Model
          </Typography>
          <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.86)", mb: 6 }}>
            เส้นทางรายได้หลัก และสายย่อยแบบแตกแขนง
          </Typography>

          {/* แคนวาสไดอะแกรม */}
          <Box sx={{ maxWidth: size, mx: "auto", position: "relative" }}>
            <svg width="100%" viewBox={`0 0 ${size} ${size}`} style={{ overflow: "visible" }}>
              {/* เส้นจากจุดกลางไปยังแต่ละโนด */}
              {points.map((p, i) => (
                <line
                  key={`line-${i}`}
                  x1={center}
                  y1={center}
                  x2={p.x}
                  y2={p.y}
                  stroke="url(#revGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.9"
                />
              ))}

              {/* Gradient สำหรับเส้น */}
              <defs>
                <linearGradient id="revGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#2FA46F" />
                  <stop offset="50%" stopColor="#56C596" />
                  <stop offset="100%" stopColor="#4DD0E1" />
                </linearGradient>
              </defs>

              {/* วงกลาง Revenue */}
              <g>
                <circle cx={center} cy={center} r={64} fill="url(#revGradient)" filter="url(#shadow)" />
                <text x={center} y={center + 6} textAnchor="middle" fontWeight="800" fontSize="18" fill="#ffffff">
                  Revenue
                </text>
              </g>

              {/* เงา */}
              <defs>
                <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="6" stdDeviation="8" floodOpacity="0.4" />
                </filter>
              </defs>

              {/* โหนดรอบนอก + สายย่อยเล็ก */}
              {points.map((p, i) => {
                const color = revenues[i].color;
                // สายย่อย (ติ่งเล็ก) ออกจากโหนดหลัก 2 เส้น
                const branchLen = 50;
                const a1 = p.angle - Math.PI / 8;
                const a2 = p.angle + Math.PI / 8;
                const bx1 = p.x + branchLen * Math.cos(a1);
                const by1 = p.y + branchLen * Math.sin(a1);
                const bx2 = p.x + branchLen * Math.cos(a2);
                const by2 = p.y + branchLen * Math.sin(a2);

                return (
                  <g key={`node-${i}`} filter="url(#shadow)">
                    {/* เส้นติ่ง */}
                    <line x1={p.x} y1={p.y} x2={bx1} y2={by1} stroke={color} strokeWidth="2" opacity="0.8" />
                    <line x1={p.x} y1={p.y} x2={bx2} y2={by2} stroke={color} strokeWidth="2" opacity="0.8" />

                    {/* โหนดหลัก */}
                    <circle cx={p.x} cy={p.y} r={nodeR} fill={color} />
                    <text x={p.x} y={p.y + 8} textAnchor="middle" fontSize="26" aria-hidden="true">
                      {revenues[i].icon}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* คำอธิบายใต้แต่ละโหนด (HTML จัดตำแหน่ง) */}
            {points.map((p, i) => (
              <motion.div
                key={`label-${i}`}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{
                  position: "absolute",
                  left: p.x - 120,
                  top: p.y + nodeR + 10,
                  width: 240,
                  textAlign: "center",
                }}
              >
                <Typography variant="subtitle1" fontWeight={800} sx={{ color: revenues[i].color }}>
                  {revenues[i].title}
                </Typography>
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.85)" }}>
                  {revenues[i].desc}
                </Typography>
              </motion.div>
            ))}
          </Box>
        </Container>
      </MotionBox>
    </div>
  );
}

// ✅ Why Us – Text Only Pro Style
function SectionAdvantage({ refProp }: { refProp: React.RefObject<HTMLDivElement> }) {
  const advantages = [
    {
      title: "Multi-material",
      desc: "รองรับการรีไซเคิลหลายประเภท: พลาสติก แก้ว กระดาษ เสื้อผ้า อิเล็กทรอนิกส์",
      color: "#56C596",
    },
    {
      title: "Full App Integration",
      desc: "แต้มจากตู้ → ใช้ต่อบนแอป EcoQuest ได้จริง (แลกเงิน ซื้อของ ร่วม Quest)",
      color: "#FFD93D",
    },
    {
      title: "AI Engagement",
      desc: "AI ทักทาย/ขอบคุณ เพิ่มประสบการณ์ใช้งานและการกลับมาใช้ซ้ำ",
      color: "#4DD0E1",
    },
    {
      title: "Sustainable Business",
      desc: "รายได้หลายทาง: Subscription, Marketplace Fee, Ads, Point Exchange",
      color: "#FF6B6B",
    },
  ];

  return (
    <div id="advantage" ref={refProp} style={{ height: "100vh", scrollSnapAlign: "start" }}>
      <MotionBox>
        <Container maxWidth="md">
          <Typography
            variant="h2"
            fontWeight="bold"
            align="center"
            sx={{
              fontSize: { xs: "2.4rem", md: "3.6rem" },
              background: "linear-gradient(90deg,#FF6B6B,#FFD93D)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 6,
            }}
          >
            🚀 Why Us?
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {advantages.map((a, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: i % 2 ? 40 : -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                <Box
                  sx={{
                    p: 3,
                    borderLeft: `6px solid ${a.color}`,
                    borderRadius: "8px",
                    background: "rgba(255,255,255,0.045)",
                    backdropFilter: "blur(8px)",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.28)",
                  }}
                >
                  <Typography variant="h6" fontWeight={900} sx={{ color: a.color, mb: 0.5 }}>
                    {a.title}
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.88)" }}>{a.desc}</Typography>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Container>
      </MotionBox>
    </div>
  );
}

// ✅ Future
function SectionFuture({ refProp }: { refProp: React.RefObject<HTMLDivElement> }) {
  const roadmap = [
    { phase: "Phase 1", desc: "เปิดใช้กับโรงเรียนและมหาวิทยาลัย", color: "#56C596" },
    { phase: "Phase 2", desc: "ขยายสู่ภาคเอกชนและองค์กร", color: "#2FA46F" },
    { phase: "Phase 3", desc: "ขับเคลื่อนระดับประเทศ", color: "#00E676" },
  ];

  return (
    <div id="future" ref={refProp} style={{ height: "100vh", scrollSnapAlign: "start" }}>
      <MotionBox>
        <Container maxWidth="lg" sx={{ textAlign: "center" }}>
          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{
              fontSize: { xs: "2.4rem", md: "3.6rem" },
              background: "linear-gradient(90deg,#2FA46F,#56C596)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 3,
            }}
          >
            🛣️ Future Roadmap
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 6, maxWidth: 720, mx: "auto" }}>
            {roadmap.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: i % 2 ? 50 : -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
                <Card sx={{ bgcolor: "rgba(255,255,255,0.05)", p: 3, borderRadius: 3 }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ color: item.color }}>
                    {item.phase}
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.88)" }}>{item.desc}</Typography>
                </Card>
              </motion.div>
            ))}
          </Box>
        </Container>
      </MotionBox>
    </div>
  );
}

// ✅ Thank You + คำคมฮาๆ
function SectionThankYou({
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
  return (
    <div id="thankyou" ref={refProp} style={{ height: "100vh", scrollSnapAlign: "start" }}>
      <MotionBox>
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Typography
            variant="h1"
            fontWeight="bold"
            sx={{
              fontSize: { xs: "3rem", md: "4.2rem" },
              background: "linear-gradient(90deg,#2FA46F,#56C596)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 2,
            }}
          >
            🙏 ขอบคุณครับ
          </Typography>
          <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.88)", mb: 6 }}>
            พร้อมเปลี่ยนโลกไปด้วยกัน 💚
          </Typography>

          <motion.button
            whileHover={{ scale: 1.08, rotate: -1 }}
            whileTap={{ scale: 0.96 }}
            style={{
              background: "linear-gradient(90deg,#2FA46F,#56C596)",
              border: "none",
              color: "white",
              fontWeight: 800,
              padding: "16px 44px",
              borderRadius: "999px",
              cursor: "pointer",
              fontSize: "1.25rem",
              boxShadow: "0 10px 28px rgba(0,0,0,0.4)",
            }}
            onClick={() => alert("Let's collaborate! 🚀")}
          >
            Join Us
          </motion.button>

          {/* คำคมฮาๆ ปิดท้าย */}
          <Typography variant="h6" sx={{ mt: 6, fontStyle: "italic", color: "rgba(255,255,255,0.8)" }}>
            “โลกไม่ได้ต้องการฮีโร่… แค่คุณแยกขยะให้ถูกถังก็หล่อแล้ว 🌍♻️”
          </Typography>
          <Typography variant="body2" sx={{ mt: 2, color: "rgba(255,255,255,0.65)" }}>
            ปล. ถังเหลืองคือขยะรีไซเคิล ไม่ใช่ที่ทิ้งแฟนเก่านะครับ 😂
          </Typography>
        </Container>
      </MotionBox>

      {showConfetti && <Confetti width={width} height={height} recycle={false} numberOfPieces={700} gravity={0.3} />}
    </div>
  );
}

"use client";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Prompt } from "next/font/google";
import React from "react";

const prompt = Prompt({ subsets: ["latin"], weight: ["400", "600", "700"] });

const theme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#0d1117", paper: "#0b1014" },
    text: { primary: "#fff" },
  },
  typography: {
    fontFamily: prompt.style.fontFamily,
  },
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className={prompt.className}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

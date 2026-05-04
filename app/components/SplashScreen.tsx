"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface SplashScreenProps {
  onDone: () => void;
}

export default function SplashScreen({ onDone }: SplashScreenProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 3200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!show) {
      const timer = setTimeout(onDone, 600);
      return () => clearTimeout(timer);
    }
  }, [show, onDone]);

  const logoSize    = 120;
  const textVisualH = Math.round(logoSize * 0.66);
  const textImgH    = Math.round(textVisualH / 0.22);
  const textWidth   = Math.round(textImgH * 0.58);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ backgroundColor: "var(--background)" }}
        >
          {/* S + POTON same line */}
          <motion.div
            style={{ display: "flex", alignItems: "center" }}
            initial={{ scale: 0.1, opacity: 0 }}
            animate={{ scale: [0.1, 1.15, 0.95, 1], opacity: 1 }}
            transition={{
              duration: 0.8,
              times: [0, 0.6, 0.8, 1],
              ease: "easeOut",
            }}
          >
            {/* S circle */}
            <img
              src="/logo.png"
              alt="S"
              style={{
                width: logoSize,
                height: logoSize,
                objectFit: "contain",
                display: "block",
              }}
            />

            {/* POTON */}
            <div
              style={{
                height: textVisualH,
                width: textWidth,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                marginLeft: -90,
                marginTop: 12,
              }}
            >
              <img
                src="/logo-text.png"
                alt="POTON"
    style={{
      height: textImgH,
      width: "auto",
      display: "block",
      flexShrink: 0,
    }}

              />
            </div>
          </motion.div>

          {/* Soundwave */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.4 }}
            className="flex items-center gap-1 mt-8"
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                animate={{ height: ["8px", "24px", "8px"] }}
                transition={{
                  duration: 0.7,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut",
                }}
                style={{
                  width: "4px",
                  borderRadius: "2px",
                  backgroundColor: "#1DB954",
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CrystalBowl from "@/components/CrystalBowl";
import FloatingLights, { type LightParticle } from "@/components/FloatingLights";
import TowerBeam from "@/components/TowerBeam";
import OpalPendant from "@/components/OpalPendant";

const LIGHT_COLORS = [
  "hsl(168, 60%, 88%)",   // crystal mint
  "hsl(275, 35%, 90%)",   // opal lavender
  "hsl(340, 60%, 70%)",   // tower pink
  "hsl(155, 60%, 55%)",   // tower green
  "hsl(200, 50%, 75%)",   // soft blue
  "hsl(45, 70%, 80%)",    // warm gold
];

type Phase = "input" | "integrating" | "complete";

const Index = () => {
  const [text, setText] = useState("");
  const [particles, setParticles] = useState<LightParticle[]>([]);
  const [phase, setPhase] = useState<Phase>("input");
  const particleIdRef = useRef(0);
  const bowlRef = useRef<HTMLDivElement>(null);

  const addParticle = useCallback(() => {
    const angle = Math.random() * Math.PI * 2;
    const radius = 120 + Math.random() * 60;
    const newParticle: LightParticle = {
      id: particleIdRef.current++,
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      color: LIGHT_COLORS[Math.floor(Math.random() * LIGHT_COLORS.length)],
      size: 15 + Math.random() * 25,
      delay: Math.random() * 0.5,
    };
    setParticles((prev) => [...prev.slice(-20), newParticle]);
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    if (e.target.value.length > 0 && Math.random() > 0.3) {
      addParticle();
    }
  };

  const handleIntegrate = () => {
    if (!text.trim()) return;
    setPhase("integrating");
  };

  const handleBeamComplete = () => {
    setPhase("complete");
    setParticles([]);
  };

  const handleReset = () => {
    setPhase("input");
    setText("");
    setParticles([]);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* Background stars */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-foreground"
          style={{
            width: Math.random() * 2 + 1,
            height: Math.random() * 2 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{ opacity: [0.1, 0.4, 0.1] }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Title */}
      <AnimatePresence>
        {phase === "input" && (
          <motion.h1
            className="absolute top-12 font-display text-sm md:text-base tracking-[0.3em] text-muted-foreground"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 0.6, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            こころの器
          </motion.h1>
        )}
      </AnimatePresence>

      {/* Main crystal area */}
      <div ref={bowlRef} className="relative flex items-center justify-center">
        {/* Floating light particles */}
        <AnimatePresence>
          {phase !== "complete" && <FloatingLights particles={particles} />}
        </AnimatePresence>

        {/* Crystal bowl */}
        <AnimatePresence>
          {phase !== "complete" && (
            <motion.div
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 1.5 }}
            >
              <CrystalBowl
                isActive={text.length > 0}
                isIntegrating={phase === "integrating"}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tower beam */}
        <TowerBeam
          show={phase === "integrating"}
          onComplete={handleBeamComplete}
        />

        {/* Opal pendant */}
        <OpalPendant show={phase === "complete"} />
      </div>

      {/* Input area */}
      <AnimatePresence>
        {phase === "input" && (
          <motion.div
            className="absolute bottom-16 md:bottom-20 w-full max-w-md px-6 flex flex-col items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            <textarea
              value={text}
              onChange={handleTextChange}
              placeholder="いま感じていることを、ここに..."
              className="w-full bg-transparent border-b border-border text-foreground placeholder:text-muted-foreground font-body text-sm md:text-base resize-none focus:outline-none focus:border-primary/40 transition-colors pb-2 text-center"
              style={{ caretColor: "hsl(168, 60%, 88%)" }}
              rows={2}
            />
            <motion.button
              onClick={handleIntegrate}
              className="font-display text-xs tracking-[0.25em] px-8 py-2.5 rounded-full crystal-border transition-all"
              style={{
                color: text.trim()
                  ? "hsl(168, 60%, 88%)"
                  : "hsl(210, 20%, 40%)",
                background: text.trim()
                  ? "hsl(168, 60%, 88%, 0.08)"
                  : "transparent",
              }}
              whileHover={text.trim() ? { scale: 1.05, boxShadow: "0 0 20px hsl(168, 60%, 88%, 0.2)" } : {}}
              whileTap={text.trim() ? { scale: 0.97 } : {}}
            >
              統 合
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reset button */}
      <AnimatePresence>
        {phase === "complete" && (
          <motion.button
            className="absolute bottom-12 font-display text-xs tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            whileHover={{ opacity: 1 }}
            onClick={handleReset}
          >
            もう一度
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;

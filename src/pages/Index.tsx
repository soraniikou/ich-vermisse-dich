import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
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

type Phase = "input" | "integrating" | "complete" | "stopped";

const Index = () => {
  const [text, setText] = useState("");
  const [particles, setParticles] = useState<LightParticle[]>([]);
  const [phase, setPhase] = useState<Phase>("input");
  const particleIdRef = useRef(0);

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
    <div className="min-h-screen bg-background">
      <motion.div
        className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden ${phase === "stopped" ? "pointer-events-none" : ""}`}
        animate={{ opacity: phase === "stopped" ? 0 : 1 }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
      >
      {/* Background stars - memoize positions */}
      <BackgroundStars />

      {/* Title */}
      <AnimatePresence>
        {phase === "input" && (
          <motion.h1
            className="absolute top-12 px-4 text-center font-display text-[1.225rem] md:text-[1.4rem] tracking-[0.3em] text-muted-foreground"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 0.6, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            超えられない夜を抱きしめる
          </motion.h1>
        )}
      </AnimatePresence>

      {/* Main crystal area */}
      <div className="relative flex items-center justify-center">
        {/* Floating light particles */}
        <AnimatePresence>
          {(phase === "input" || phase === "integrating") && <FloatingLights particles={particles} />}
        </AnimatePresence>

        {/* Crystal bowl */}
        <AnimatePresence>
          {(phase === "input" || phase === "integrating") && (
            <motion.div
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
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
        <OpalPendant show={phase === "complete" || phase === "stopped"} />
      </div>

      {/* Input area */}
      <AnimatePresence>
        {phase === "input" && (
          <motion.div
            className="absolute bottom-16 w-full max-w-md px-6 flex flex-col items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-full">
              <motion.div
                className="absolute -left-2 top-1/2 -translate-y-1/2 text-primary/40 text-[1.575rem]"
                animate={{ x: [0, 3, 0], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ›
              </motion.div>
              <textarea
                value={text}
                onChange={handleTextChange}
                placeholder="Gently lay down what you're carrying..."
                 className="w-full bg-muted/20 rounded-lg px-4 py-3 border border-border text-foreground placeholder:text-muted-foreground font-body text-[1.225rem] md:text-[1.4rem] resize-none focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all text-center relative z-20 caret-primary"
                rows={2}
              />
            </div>
            <Button asChild variant="outline" className="h-auto min-h-11 rounded-full border-primary/20 bg-primary/5 px-8 py-2.5 font-display text-[1.05rem] tracking-[0.25em] text-primary hover:bg-primary/10 hover:text-primary">
              <motion.button onClick={handleIntegrate} disabled={!text.trim()} whileHover={text.trim() ? { scale: 1.05 } : undefined} whileTap={text.trim() ? { scale: 0.97 } : undefined}>
                tap
              </motion.button>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Final actions */}
      <AnimatePresence>
        {phase === "complete" && (
          <motion.div
            className="absolute bottom-16 flex items-center justify-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Button variant="ghost" onClick={handleReset} className="min-w-20 font-display text-[1.05rem] tracking-[0.2em] text-foreground/85 hover:bg-primary/5 hover:text-foreground">
              back
            </Button>
            <Button variant="ghost" onClick={() => setPhase("stopped")} className="min-w-20 font-display text-[1.05rem] tracking-[0.2em] text-foreground/85 hover:bg-primary/5 hover:text-foreground">
              stop
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      </motion.div>
    </div>
  );
};

const STAR_DATA = Array.from({ length: 30 }).map((_, i) => ({
  id: i,
  w: Math.random() * 2 + 1,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  dur: 3 + Math.random() * 4,
  delay: Math.random() * 3,
}));

const BackgroundStars = () => (
  <>
    {STAR_DATA.map((s) => (
      <motion.div
        key={s.id}
        className="absolute rounded-full bg-foreground"
        style={{ width: s.w, height: s.w, left: s.left, top: s.top }}
        animate={{ opacity: [0.1, 0.4, 0.1] }}
        transition={{ duration: s.dur, repeat: Infinity, delay: s.delay }}
      />
    ))}
  </>
);

export default Index;

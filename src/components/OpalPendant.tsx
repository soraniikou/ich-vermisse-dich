import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

interface OpalPendantProps {
  show: boolean;
}

const MESSAGE = "超えられない夜をそっと抱きしめる";

const TEAR_DELAY = MESSAGE.length * 0.3 + 2; // wait for message to finish + 2s

const OpalPendant = ({ show }: OpalPendantProps) => {
  const [touched, setTouched] = useState(false);
  const [showTears, setShowTears] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Reset state when hiding
  useEffect(() => {
    if (!show) {
      setTouched(false);
      setShowTears(false);
    }
  }, [show]);

  // Pre-load and unlock audio on user touch (critical for mobile)
  const handleTouch = () => {
    if (!touched) {
      // First tap: unlock audio on mobile and start sequence
      const audio = new Audio("/audio/voice.m4a");
      audio.volume = 0.8;
      audio.load();
      const unlockPromise = audio.play();
      if (unlockPromise) {
        unlockPromise.then(() => {
          audio.pause();
          audio.currentTime = 0;
        }).catch(() => {});
      }
      audioRef.current = audio;
      setTouched(true);
    } else {
      // Subsequent taps: replay voice immediately
      const audio = audioRef.current;
      if (audio) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      }
    }
  };

  useEffect(() => {
    if (!touched) {
      setShowTears(false);
      return;
    }
    const timer = setTimeout(() => setShowTears(true), TEAR_DELAY * 1000);
    return () => clearTimeout(timer);
  }, [touched]);

  // Play voice 2 seconds after tears appear
  useEffect(() => {
    if (!showTears) return;
    const voiceTimer = setTimeout(() => {
      const audio = audioRef.current;
      if (audio) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      }
    }, 2000);
    return () => clearTimeout(voiceTimer);
  }, [showTears]);

  return (
    <AnimatePresence>
      {show && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Pulsing tap indicator ring */}
          <AnimatePresence>
            {!touched && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="absolute w-24 h-28 rounded-full border border-primary/30"
                  style={{ borderRadius: "45% 45% 50% 50%" }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 0, 0.4],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating opal */}
          <motion.div
            className="relative cursor-pointer z-10"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: touched ? 1.3 : 1,
              opacity: 1,
              y: touched ? [0, -8, 0] : [0, -15, -5, -20, 0],
              x: touched ? [0, 3, 0] : [0, 8, -5, 3, 0],
              rotate: touched ? [0, 1, 0] : [0, 3, -2, 1, 0],
            }}
            transition={{
              scale: { duration: 1.5, ease: "easeOut" },
              opacity: { duration: 1 },
              y: { duration: touched ? 8 : 12, repeat: Infinity, ease: "easeInOut" },
              x: { duration: touched ? 10 : 15, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 10, repeat: Infinity, ease: "easeInOut" },
            }}
            onClick={handleTouch}
            whileHover={{ scale: touched ? 1.35 : 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Outer glow ring when touched */}
            <AnimatePresence>
              {touched && (
                <motion.div
                  className="absolute -inset-6 rounded-full"
                  style={{
                    background: `radial-gradient(circle, hsl(190 80% 75% / 0.15), hsl(195 70% 80% / 0.08), transparent 70%)`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [1, 1.3, 1], opacity: [0, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
            </AnimatePresence>

            {/* Pendant shape */}
            <motion.div
              className="w-16 h-20 opal-shimmer relative"
              style={{
                borderRadius: "45% 45% 50% 50%",
                boxShadow: touched
                  ? `0 0 40px hsl(190 80% 75% / 0.5), 0 0 80px hsl(195 70% 80% / 0.3), 0 0 120px hsl(200 60% 70% / 0.15), inset 0 0 20px hsl(190 80% 75% / 0.2)`
                  : `0 0 30px hsl(190 80% 75% / 0.3), 0 0 60px hsl(195 70% 80% / 0.2), inset 0 -5px 15px hsl(200 60% 70% / 0.15)`,
              }}
            >
              {/* Thread */}
              <div
                className="absolute -top-8 left-1/2 -translate-x-1/2 w-px h-8"
                style={{
                  background: `linear-gradient(to bottom, transparent, hsl(190 80% 75% / 0.4))`,
                }}
              />
              {/* Crystal accent on top */}
              <motion.div
                className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
                style={{
                  background: `radial-gradient(circle, hsl(190 80% 75% / 0.8), transparent)`,
                }}
                animate={{
                  opacity: touched ? [0.6, 1, 0.6] : [0.5, 1, 0.5],
                  scale: touched ? [1, 1.5, 1] : 1,
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              {/* Inner light when touched */}
              <AnimatePresence>
                {touched && (
                  <motion.div
                    className="absolute inset-2 rounded-full"
                    style={{
                      background: `radial-gradient(circle at 40% 40%, hsl(190 80% 75% / 0.4), hsl(195 70% 80% / 0.2), transparent)`,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  />
                )}
              </AnimatePresence>
            </motion.div>

            {/* Teardrops flowing from opal */}
            <AnimatePresence>
              {showTears && (
                <>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={`tear-${i}`}
                      className="absolute rounded-full"
                      style={{
                        width: 5 + Math.random() * 3,
                        height: 8 + Math.random() * 5,
                        left: `${40 + i * 5}%`,
                        top: "80%",
                        background: `radial-gradient(ellipse at 50% 30%, hsl(190 90% 85% / 0.9), hsl(195 80% 70% / 0.5))`,
                        borderRadius: "50% 50% 50% 50% / 70% 70% 30% 30%",
                        clipPath: "polygon(50% 0%, 85% 45%, 100% 70%, 85% 90%, 50% 100%, 15% 90%, 0% 70%, 15% 45%)",
                      }}
                      initial={{ opacity: 0, y: 0, scale: 0.3 }}
                      animate={{
                        opacity: [0, 0.8, 0.6, 0],
                        y: [0, 30, 70, 120],
                        scale: [0.3, 1, 0.8, 0.4],
                        x: [0, (i - 2) * 3, (i - 2) * 5],
                      }}
                      transition={{
                        duration: 3 + i * 0.5,
                        delay: i * 1.2,
                        repeat: Infinity,
                        repeatDelay: 2,
                        ease: "easeIn",
                      }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Touch hint label */}
          <AnimatePresence>
            {!touched && (
              <motion.span
                className="mt-6 font-body text-xs tracking-[0.2em] text-foreground/70"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: [0.5, 0.85, 0.5], y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ opacity: { duration: 2.5, repeat: Infinity }, y: { duration: 0.8 } }}
              >
                touch
              </motion.span>
            )}
          </AnimatePresence>

          {/* Revealed message - one character at a time below pendant */}
          <AnimatePresence>
            {touched && (
              <motion.div
                className="mt-8 z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex flex-nowrap justify-center">
                  {MESSAGE.split("").map((char, i) => (
                    <motion.span
                      key={i}
                      className="font-display text-lg md:text-2xl inline-block"
                      style={{
                      color: "hsl(190 80% 80% / 0.7)",
                      textShadow: "0 0 20px hsl(190 80% 75% / 0.3)",
                      }}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 0.8, y: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: i * 0.3,
                        ease: "easeOut",
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
};

export default OpalPendant;

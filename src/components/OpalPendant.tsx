import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface OpalPendantProps {
  show: boolean;
}

const MESSAGE = "超えられない夜をそっと抱きしめる";

const OpalPendant = ({ show }: OpalPendantProps) => {
  const [touched, setTouched] = useState(false);

  return (
    <AnimatePresence>
      {show && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
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
            onClick={() => setTouched(true)}
            whileHover={{ scale: touched ? 1.35 : 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Outer glow ring when touched */}
            <AnimatePresence>
              {touched && (
                <motion.div
                  className="absolute -inset-6 rounded-full"
                  style={{
                    background: `radial-gradient(circle, hsl(168 60% 88% / 0.15), hsl(275 35% 90% / 0.08), transparent 70%)`,
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
                  ? `0 0 40px hsl(168 60% 88% / 0.5), 0 0 80px hsl(275 35% 90% / 0.3), 0 0 120px hsl(340 60% 70% / 0.15), inset 0 0 20px hsl(168 60% 88% / 0.2)`
                  : `0 0 30px hsl(168 60% 88% / 0.3), 0 0 60px hsl(275 35% 90% / 0.2), inset 0 -5px 15px hsl(340 60% 70% / 0.15)`,
              }}
            >
              {/* Thread */}
              <div
                className="absolute -top-8 left-1/2 -translate-x-1/2 w-px h-8"
                style={{
                  background: `linear-gradient(to bottom, transparent, hsl(168 60% 88% / 0.4))`,
                }}
              />
              {/* Crystal accent on top */}
              <motion.div
                className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
                style={{
                  background: `radial-gradient(circle, hsl(168 60% 88% / 0.8), transparent)`,
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
                      background: `radial-gradient(circle at 40% 40%, hsl(168 60% 88% / 0.4), hsl(275 35% 90% / 0.2), transparent)`,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Touch hint label */}
          <AnimatePresence>
            {!touched && (
              <motion.span
                className="mt-6 font-body text-xs tracking-[0.2em] text-muted-foreground"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: [0.3, 0.6, 0.3], y: 0 }}
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
                className="mt-8 flex flex-wrap justify-center gap-0 max-w-xs z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {MESSAGE.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    className="font-display text-lg md:text-2xl tracking-widest"
                    style={{
                      color: "hsl(168 60% 88% / 0.7)",
                      textShadow: "0 0 20px hsl(168 60% 88% / 0.3)",
                    }}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 0.8, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.15,
                      ease: "easeOut",
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
};

export default OpalPendant;

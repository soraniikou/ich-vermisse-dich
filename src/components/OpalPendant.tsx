import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface OpalPendantProps {
  show: boolean;
}

const OpalPendant = ({ show }: OpalPendantProps) => {
  const [touched, setTouched] = useState(false);

  return (
    <AnimatePresence>
      {show && (
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Floating opal */}
          <motion.div
            className="relative cursor-pointer z-10"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              y: [0, -15, -5, -20, 0],
              x: [0, 8, -5, 3, 0],
              rotate: [0, 3, -2, 1, 0],
            }}
            transition={{
              scale: { duration: 1, ease: "easeOut" },
              opacity: { duration: 1 },
              y: { duration: 12, repeat: Infinity, ease: "easeInOut" },
              x: { duration: 15, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 10, repeat: Infinity, ease: "easeInOut" },
            }}
            onClick={() => setTouched(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Pendant shape */}
            <div
              className="w-16 h-20 rounded-full opal-shimmer relative"
              style={{
                borderRadius: "45% 45% 50% 50%",
                boxShadow: `
                  0 0 30px hsl(168 60% 88% / 0.3),
                  0 0 60px hsl(275 35% 90% / 0.2),
                  inset 0 -5px 15px hsl(340 60% 70% / 0.15)
                `,
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
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* Revealed message */}
          <AnimatePresence>
            {touched && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
              >
                {/* Blurred backdrop */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(circle, 
                      hsl(210 38% 16% / 0.6), 
                      transparent 70%)`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 3 }}
                />
                <motion.p
                  className="font-display text-lg md:text-2xl tracking-widest text-center leading-relaxed z-10"
                  style={{
                    color: "hsl(168 60% 88% / 0.7)",
                    textShadow: "0 0 30px hsl(168 60% 88% / 0.3)",
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: [0, 0.8, 0.6] }}
                  transition={{ duration: 4, ease: "easeOut" }}
                >
                  超えられない夜を
                  <br />
                  そっと抱きしめる
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
};

export default OpalPendant;

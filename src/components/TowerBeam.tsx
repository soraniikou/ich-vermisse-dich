import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

interface TowerBeamProps {
  show: boolean;
  onComplete: () => void;
}

const TowerBeam = ({ show, onComplete }: TowerBeamProps) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onComplete, 9600);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="absolute left-1/2 bottom-1/2 w-1 -translate-x-1/2 origin-bottom"
          style={{
            background: `linear-gradient(to top, 
              hsl(155 60% 55% / 0.9), 
              hsl(340 60% 70% / 0.7), 
              hsl(168 60% 88% / 0.5), 
              transparent)`,
          }}
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: ["0vh", "50vh", "60vh"],
            opacity: [0, 1, 0.8],
            width: ["4px", "6px", "2px"],
          }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 9, ease: "easeOut" }}
        >
          {/* Glow around beam */}
          <motion.div
            className="absolute inset-0 blur-lg"
            style={{
              background: `linear-gradient(to top, 
                hsl(155 60% 55% / 0.4), 
                hsl(340 60% 70% / 0.3), 
                transparent)`,
              width: "30px",
              left: "-13px",
            }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TowerBeam;

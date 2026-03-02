import { motion } from "framer-motion";

interface CrystalBowlProps {
  isActive: boolean;
  isIntegrating: boolean;
}

const CrystalBowl = ({ isActive, isIntegrating }: CrystalBowlProps) => {
  return (
    <motion.div
      className="relative w-56 h-56 md:w-72 md:h-72 rounded-full crystal-glow crystal-border flex items-center justify-center"
      style={{
        background: `radial-gradient(circle at 40% 35%, 
          hsl(168 60% 88% / 0.08), 
          hsl(275 35% 90% / 0.05), 
          hsl(210 38% 16% / 0.3))`,
      }}
      animate={{
        scale: isActive ? [1, 1.02, 1] : 1,
        boxShadow: isActive
          ? [
              "0 0 30px hsl(168 60% 88% / 0.15), 0 0 60px hsl(275 35% 90% / 0.1)",
              "0 0 50px hsl(168 60% 88% / 0.25), 0 0 80px hsl(275 35% 90% / 0.15)",
              "0 0 30px hsl(168 60% 88% / 0.15), 0 0 60px hsl(275 35% 90% / 0.1)",
            ]
          : "0 0 30px hsl(168 60% 88% / 0.1), 0 0 60px hsl(275 35% 90% / 0.05)",
      }}
      transition={{ duration: isIntegrating ? 2 : 3, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Inner crystal reflections */}
      <div
        className="absolute inset-4 rounded-full opacity-30"
        style={{
          background: `radial-gradient(circle at 30% 30%, 
            hsl(168 60% 88% / 0.2), 
            transparent 60%)`,
        }}
      />
      <div
        className="absolute inset-8 rounded-full opacity-20"
        style={{
          background: `radial-gradient(circle at 60% 70%, 
            hsl(275 35% 90% / 0.15), 
            transparent 50%)`,
        }}
      />
    </motion.div>
  );
};

export default CrystalBowl;

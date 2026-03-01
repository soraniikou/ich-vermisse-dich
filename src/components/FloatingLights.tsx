import { motion } from "framer-motion";

interface LightParticle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  delay: number;
}

interface FloatingLightsProps {
  particles: LightParticle[];
}

const FloatingLights = ({ particles }: FloatingLightsProps) => {
  return (
    <>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full blur-md pointer-events-none"
          style={{
            width: p.size,
            height: p.size,
            background: p.color,
          }}
          initial={{ x: p.x, y: p.y, opacity: 0, scale: 0 }}
          animate={{
            x: [p.x, p.x + Math.random() * 60 - 30, p.x + Math.random() * 40 - 20],
            y: [p.y, p.y - 20 - Math.random() * 30, p.y - 10],
            opacity: [0, 0.7, 0.5],
            scale: [0, 1.2, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            delay: p.delay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
};

export default FloatingLights;
export type { LightParticle };

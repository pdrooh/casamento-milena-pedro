import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          setIsLoaded(true);
          setTimeout(onComplete, 1000);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{
        opacity: 1,
        filter: "blur(0px)",
        backgroundColor: "rgba(0,0,0,1)",
      }}
      animate={{
        opacity: isLoaded ? 0 : 1,
        filter: isLoaded ? `blur(${20 - progress / 5}px)` : "blur(0px)",
        backdropFilter: isLoaded ? `blur(${20 - progress / 5}px)` : "blur(0px)",
        backgroundColor: isLoaded
          ? "rgba(0,0,0,0)"
          : `rgba(0,0,0,${1 - progress / 100})`,
        scale: isLoaded ? 1.05 : 1,
      }}
      transition={{
        duration: 1.5,
        ease: "easeInOut",
      }}
      className="
      fixed 
      inset-0 
      z-[9999] 
      bg-black 
      flex 
      items-center 
      justify-center 
      flex-col 
      space-y-8 
      overflow-hidden
    "
    >
      {/* Fundo Animado com Gradiente Dinâmico */}
      <motion.div
        className="
        absolute 
        inset-0 
        pointer-events-none 
        opacity-30
      "
        initial={{ opacity: 0 }}
        animate={{
          opacity: 0.3,
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          background: `
          radial-gradient(
            circle at center, 
            rgba(212, 184, 106, 0.1) 0%, 
            rgba(0,0,0,0.8) 70%
          )
        `,
          backgroundSize: "200% 200%",
        }}
      />

      {/* Elemento Central */}
      <motion.div
        initial={{
          scale: 0.5,
          opacity: 0,
        }}
        animate={{
          scale: isLoaded ? 1.5 : 1,
          opacity: isLoaded ? 0 : 1,
          rotate: isLoaded ? 360 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
        }}
      >
        <div className="relative">
          {/* Órbita Decorativa */}
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
            absolute 
            -inset-4 
            border-2 
            border-dashed 
            border-[#d4b86a]/30 
            rounded-full 
            animate-spin-slow
          "
          />

          <Heart
            className="
            text-[#d4b86a] 
            w-24 
            h-24 
            opacity-80 
            animate-pulse
          "
            strokeWidth={1}
          />
        </div>
      </motion.div>

      {/* Texto */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: isLoaded ? 0 : 1,
          y: isLoaded ? 20 : 0,
        }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-4"
      >
        <h2
          className="
          text-3xl 
          font-light 
          tracking-wider 
          text-[#d4b86a]
        "
        >
          Milena <span className="text-white">&</span> Pedro
        </h2>
        <p
          className="
          text-white/70 
          text-lg
        "
        >
          Preparando nosso momento especial...
        </p>
      </motion.div>

      {/* Barra de Progresso Circular */}
      <motion.svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute bottom-16"
      >
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="rgba(212, 184, 106, 0.2)"
          strokeWidth="6"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#d4b86a"
          strokeWidth="6"
          strokeDasharray="283"
          strokeDashoffset={283 - (283 * progress) / 100}
          style={{ transition: "stroke-dashoffset 0.5s linear" }}
        />
      </motion.svg>
    </motion.div>
  );
};

export default Preloader;

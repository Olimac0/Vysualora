import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  color: string;
  velocity: {
    x: number;
    y: number;
    rotation: number;
  };
}

const Confetti = ({ trigger = false }: { trigger?: boolean }) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (!trigger) return;

    const colors = [
      '#7C3AED', // Purple
      '#22D3EE', // Cyan
      '#A855F7', // Violet
      '#F9FAFB', // White
      '#FBBF24', // Amber
    ];

    const newPieces: ConfettiPiece[] = [];

    for (let i = 0; i < 150; i++) {
      newPieces.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -50,
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        velocity: {
          x: (Math.random() - 0.5) * 10,
          y: 2 + Math.random() * 8,
          rotation: (Math.random() - 0.5) * 20,
        },
      });
    }

    setPieces(newPieces);

    // Remove confetti after animation
    const timer = setTimeout(() => {
      setPieces([]);
    }, 3000);

    return () => clearTimeout(timer);
  }, [trigger]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[10000]">
      <AnimatePresence>
        {pieces.map((piece) => (
          <motion.div
            key={piece.id}
            className="absolute w-3 h-3 rounded-sm"
            style={{
              left: piece.x,
              top: piece.y,
              backgroundColor: piece.color,
              rotate: piece.rotation,
              scale: piece.scale,
            }}
            initial={{
              y: piece.y,
              x: piece.x,
              rotate: piece.rotation,
            }}
            animate={{
              y: piece.y + window.innerHeight + 100,
              x: piece.x + piece.velocity.x * 100,
              rotate: piece.rotation + piece.velocity.rotation * 100,
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              ease: "easeOut",
            }}
            exit={{ opacity: 0 }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Confetti;
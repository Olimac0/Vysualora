import { useEffect, useState } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  id: number;
}

const CursorTrail = () => {
  const [trails, setTrails] = useState<TrailPoint[]>([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (window.innerWidth < 768) return; // Disable on mobile

    const handleMouseMove = (e: MouseEvent) => {
      setTrails(prev => {
        const newTrail = { x: e.clientX, y: e.clientY, id: counter };
        const updated = [...prev, newTrail].slice(-8); // Keep only last 8 trails
        return updated;
      });
      
      setCounter(prev => prev + 1);
      
      // Auto remove trails
      trails.forEach((trail, index) => {
        if (index < trails.length - 1) {
          setTimeout(() => {
            setTrails(prev => prev.filter(t => t.id !== trail.id));
          }, 300);
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [counter, trails]);

  return (
    <>
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="fixed w-6 h-6 rounded-full pointer-events-none z-[9997]"
          style={{
            left: trail.x - 12,
            top: trail.y - 12,
            background: `radial-gradient(circle, 
              rgba(${124 + index * 10}, ${58 + index * 5}, ${237 - index * 20}, ${0.3 - index * 0.03}) 0%, 
              transparent 70%)`,
            transform: `scale(${0.8 + index * 0.05})`,
            transition: 'transform 0.1s linear, opacity 0.3s ease-out'
          }}
        />
      ))}
    </>
  );
};

export default CursorTrail;
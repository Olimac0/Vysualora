import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Environment, Stars, Lightformer } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSphere() {
  const sphereRef = useRef<THREE.Mesh>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleScroll = () => {
      const progress = window.scrollY / (document.body.offsetHeight - window.innerHeight);
      setScrollProgress(progress);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (sphereRef.current) {
      // Smooth rotation
      sphereRef.current.rotation.x = time * 0.15;
      sphereRef.current.rotation.y = time * 0.2;
      
      // Parallax movement based on mouse
      sphereRef.current.position.x = THREE.MathUtils.lerp(
        sphereRef.current.position.x,
        mousePosition.x * 2,
        0.05
      );
      
      sphereRef.current.position.y = THREE.MathUtils.lerp(
        sphereRef.current.position.y,
        mousePosition.y * 2,
        0.05
      );
      
      // Scroll-based movement
      const targetZ = -scrollProgress * 3 + 5;
      sphereRef.current.position.z = THREE.MathUtils.lerp(
        sphereRef.current.position.z,
        targetZ,
        0.05
      );
      
      // Pulse effect
      const scale = 1.8 + Math.sin(time * 2) * 0.1;
      sphereRef.current.scale.setScalar(scale);
    }
  });
  
  return (
    <Float
      speed={2}
      rotationIntensity={1.5}
      floatIntensity={2}
    >
      <Sphere ref={sphereRef} args={[1.2, 128, 128]}>
        <MeshDistortMaterial
          color="#7C3AED"
          speed={5}
          distort={0.6}
          radius={1}
          emissive="#5B21B6"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.9}
          wireframe={false}
          transparent
          opacity={0.9}
          envMapIntensity={2}
        />
      </Sphere>
    </Float>
  );
}

function OrbitingRings() {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.2;
      ring1Ref.current.rotation.y = time * 0.3;
    }
    
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = time * 0.3;
      ring2Ref.current.rotation.y = time * 0.2;
    }
  });
  
  return (
    <>
      <Torus ref={ring1Ref} args={[2.5, 0.02, 16, 100]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#22D3EE"
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </Torus>
      
      <Torus ref={ring2Ref} args={[3, 0.015, 16, 100]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#A855F7"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </Torus>
    </>
  );
}

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 500;
  
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  
  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 20;
    positions[i + 1] = (Math.random() - 0.5) * 20;
    positions[i + 2] = (Math.random() - 0.5) * 20;
    
    colors[i] = Math.random() * 0.5 + 0.5; // Purple to cyan range
    colors[i + 1] = Math.random() * 0.3 + 0.2;
    colors[i + 2] = Math.random() * 0.5 + 0.5;
  }
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x = state.clock.getElapsedTime() * 0.05;
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    }
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function CameraController() {
  const { camera } = useThree();
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const progress = window.scrollY / (document.body.offsetHeight - window.innerHeight);
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useFrame(() => {
    // Smooth camera movement based on scroll
    const targetY = -scrollProgress * 2;
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);
    
    // Look at center
    camera.lookAt(0, 0, 0);
  });
  
  return null;
}

export default function Scene3D() {
  return (
    <div className="fixed inset-0 -z-20 pointer-events-none opacity-70">
      <Canvas 
        camera={{ 
          position: [0, 0, 8], 
          fov: 60,
          near: 0.1,
          far: 100
        }} 
        dpr={[1, 2]}
      >
        <CameraController />
        
        {/* Ambient light */}
        <ambientLight intensity={0.4} />
        
        {/* Colored spotlights */}
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.3} 
          penumbra={1} 
          intensity={1.5} 
          color="#7C3AED" 
          castShadow
        />
        <spotLight 
          position={[-10, -10, 5]} 
          angle={0.3} 
          penumbra={1} 
          intensity={1} 
          color="#22D3EE" 
        />
        <pointLight 
          position={[0, 5, -5]} 
          intensity={0.8} 
          color="#A855F7" 
        />
        
        {/* Stars background */}
        <Stars 
          radius={100} 
          depth={50} 
          count={5000} 
          factor={4} 
          saturation={0} 
          fade 
          speed={0.5}
        />
        
        {/* Environment */}
        <Environment preset="city" />
        
        {/* Lightformers for glow */}
        <Lightformer
          form="ring"
          intensity={2}
          position={[0, 0, -5]}
          scale={10}
          color="#7C3AED"
          onUpdate={(self) => self.lookAt(0, 0, 0)}
        />
        
        {/* Main 3D objects */}
        <AnimatedSphere />
        <OrbitingRings />
        <ParticleField />
        
        {/* Fog for depth */}
        <fog attach="fog" args={['#050507', 10, 25]} />
      </Canvas>
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-cyan-900/5 mix-blend-overlay" />
    </div>
  );
}
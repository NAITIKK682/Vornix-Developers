import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Float, 
  MeshDistortMaterial, 
  PerspectiveCamera, 
  ContactShadows, 
  Environment,
  MeshTransmissionMaterial 
} from '@react-three/drei';
import * as THREE from 'three';

/**
 * Professional Hero 3D Scene
 * Features: Adaptive scaling, interactive floating particles, 
 * high-end glass transmission materials, and performance-optimized rendering.
 */

function AnimatedShape() {
  const meshRef = useRef();
  const { viewport } = useThree();
  
  // Responsive scaling based on viewport width
  const adaptiveScale = Math.min(viewport.width / 4, 1.2);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      // Subtle organic rotation
      meshRef.current.rotation.x = Math.cos(t / 4) / 4;
      meshRef.current.rotation.y = Math.sin(t / 4) / 4;
      meshRef.current.rotation.z = Math.sin(t / 1.5) / 10;
      // Gentle floating motion
      meshRef.current.position.y = Math.sin(t / 1.5) / 5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef} scale={adaptiveScale}>
        <torusKnotGeometry args={[1, 0.35, 256, 32]} />
        {/* High-end Translucent Material */}
        <MeshTransmissionMaterial
          backside
          samples={8}
          thickness={0.2}
          chromaticAberration={0.02}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.3}
          temporalDistortion={0.5}
          color="#8B5CF6"
          attenuationDistance={0.5}
          attenuationColor="#ffffff"
        />
      </mesh>
    </Float>
  );
}

function BackgroundParticles({ count = 40 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 15;
      p[i * 3 + 1] = (Math.random() - 0.5) * 15;
      p[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return p;
  }, [count]);

  const pointsRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.05;
    pointsRef.current.rotation.x = t * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#F97316" // Brand Orange accent
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

export default function HeroScene() {
  return (
    <div className="w-full h-[60vh] md:h-full cursor-grab active:cursor-grabbing">
      <Canvas 
        shadows 
        dpr={[1, 2]} // Performance optimization for high-density screens
        gl={{ antialias: true, alpha: true }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={40} />
        
        {/* Cinematic Lighting */}
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8B5CF6" />
        
        {/* Professional Environment & Effects */}
        <Environment preset="city" />
        
        <group position={[0, -0.5, 0]}>
          <AnimatedShape />
          
          <ContactShadows
            resolution={1024}
            scale={10}
            blur={2.5}
            opacity={0.4}
            far={10}
            color="#000000"
          />
        </group>

        <BackgroundParticles count={60} />

        {/* Global movement that follows the mouse subtly */}
        <Rig />
      </Canvas>
    </div>
  );
}

// Subcomponent to add mouse-following inertia (Premium feel)
function Rig() {
  const { camera, mouse } = useThree();
  const vec = new THREE.Vector3();

  return useFrame(() => {
    camera.position.lerp(vec.set(mouse.x * 0.5, mouse.y * 0.5, 5), 0.05);
    camera.lookAt(0, 0, 0);
  });
}
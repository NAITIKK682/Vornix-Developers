import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Float, 
  PerspectiveCamera, 
  ContactShadows, 
  Environment 
} from '@react-three/drei';
import * as THREE from 'three';

/**
 * Animated Robot Character (Replaces Torus Knot)
 */
function AnimatedRobot() {
  const groupRef = useRef();
  const { viewport } = useThree();
  const adaptiveScale = Math.min(viewport.width / 6, 1);

  // Refs for individual parts
  const headRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Gentle floating
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.1;
    }

    // Head nod & tilt
    if (headRef.current) {
      headRef.current.rotation.x = Math.sin(t * 0.7) * 0.05;
      headRef.current.rotation.y = Math.cos(t * 0.5) * 0.07;
    }

    // Arm swing
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = Math.sin(t * 1.2) * 0.2 - 0.3;
    }
    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = Math.cos(t * 1.2) * 0.2 + 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef} scale={adaptiveScale}>
        {/* Body */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.8, 1.2, 0.4]} />
          <meshStandardMaterial color="#e0e0e0" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Head */}
        <mesh ref={headRef} position={[0, 1.1, 0]} castShadow>
          <sphereGeometry args={[0.45, 16, 16]} />
          <meshStandardMaterial color="#d0d0d0" metalness={0.6} roughness={0.4} />
        </mesh>

        {/* Eyes */}
        <mesh position={[-0.2, 1.2, 0.44]} castShadow>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.8} />
        </mesh>
        <mesh position={[0.2, 1.2, 0.44]} castShadow>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.8} />
        </mesh>

        {/* Left Arm */}
        <mesh ref={leftArmRef} position={[-0.6, 0, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.8, 12]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Right Arm */}
        <mesh ref={rightArmRef} position={[0.6, 0, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.8, 12]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Legs */}
        <mesh position={[-0.25, -1.1, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.9, 12]} />
          <meshStandardMaterial color="#b0b0b0" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0.25, -1.1, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.9, 12]} />
          <meshStandardMaterial color="#b0b0b0" metalness={0.7} roughness={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

// BackgroundParticles aur Rig same rehenge
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
        color="#60A5FA"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

function Rig() {
  const { camera, mouse } = useThree();
  const vec = new THREE.Vector3();
  return useFrame(() => {
    camera.position.lerp(vec.set(mouse.x * 0.5, mouse.y * 0.5, 5), 0.05);
    camera.lookAt(0, 0, 0);
  });
}

export default function HeroScene() {
  return (
    <div className="w-full h-[60vh] md:h-full cursor-grab active:cursor-grabbing">
      <Canvas 
        shadows 
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={40} />
        
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3B82F6" />
        
        <Environment preset="city" />
        
        <group position={[0, -0.5, 0]}>
          <AnimatedRobot />
          <ContactShadows
            resolution={1024}
            scale={10}
            blur={2}
            opacity={0.3}
            far={10}
            color="#000000"
          />
        </group>

        <BackgroundParticles count={60} />
        <Rig />
      </Canvas>
    </div>
  );
}
import React, { useRef, useMemo, useEffect, Suspense, useState, memo } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { 
  Float, 
  PerspectiveCamera, 
  ContactShadows, 
  Environment,
  useGLTF,
  useAnimations,
  Html,
  Center,
  useProgress,
  PresentationControls,
  Text,
  MeshDistortMaterial,
  SpotLight,
  Preload
} from '@react-three/drei';
import * as THREE from 'three';

/** * ==============================================================================
 * 1. ADVANCED ASSET PRE-LOADER & ERROR BOUNDARY
 * ==============================================================================
 */

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center zIndexRange={[100, 0]}>
      <div className="flex flex-col items-center justify-center w-screen h-screen bg-[#050505]">
        <div className="relative w-48 h-[2px] bg-white/10 mb-4">
          <div 
            className="absolute top-0 left-0 h-full bg-blue-500 shadow-[0_0_15px_#3b82f6] transition-all duration-500" 
            style={{ width: `${progress}%` }} 
          />
        </div>
        <div className="text-blue-500 font-mono text-[10px] tracking-[0.3em] uppercase animate-pulse">
          Neural Link: {Math.round(progress)}%
        </div>
      </div>
    </Html>
  );
}

/** * ==============================================================================
 * 2. THE ROBOT COMPONENT (ENTERPRISE GRADE)
 * ==============================================================================
 */

const RobotModel = ({ path, ...props }) => {
  const group = useRef();
  const { viewport } = useThree();
  
  // Load model with potential Draco support
  // Note: Ensure your public folder has: /models/robot.glb
  const { scene, animations } = useGLTF(path);
  const { actions, names } = useAnimations(animations, group);

  // Responsive Scaling logic
  const scale = useMemo(() => {
    const baseScale = viewport.width < 5 ? 0.8 : 1.2;
    return baseScale;
  }, [viewport.width]);

  // Initial Animation Logic
  useEffect(() => {
    if (names.length > 0) {
      // Priority: Idle -> Hover -> Walk -> First Animation Found
      const primaryAction = names.find(n => n.toLowerCase().includes('idle')) || 
                            names.find(n => n.toLowerCase().includes('hover')) || 
                            names[0];
      
      const action = actions[primaryAction];
      if (action) {
        action.reset().fadeIn(0.8).play();
        // Set slightly slower time scale for 'Premium' feel
        action.timeScale = 0.8; 
      }
    }
    
    // Cleanup
    return () => {
      names.forEach(name => actions[name]?.fadeOut(0.5));
    };
  }, [actions, names]);

  // Real-time micro-interactions
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      // Gentle floating offset
      group.current.position.y = Math.sin(t * 0.8) * 0.05;
      
      // Subtle lean into the mouse
      const targetRotationY = (state.mouse.x * Math.PI) / 10;
      const targetRotationX = (state.mouse.y * Math.PI) / 20;
      
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRotationY, 0.05);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -targetRotationX, 0.05);
    }
  });

  return (
    <group ref={group} {...props} scale={scale} dispose={null}>
      <Center top>
        <primitive 
          object={scene} 
          castShadow 
          receiveShadow 
        />
      </Center>
    </group>
  );
};

/** * ==============================================================================
 * 3. FALLBACK GHOST MODEL (Prevent White Screen)
 * ==============================================================================
 */

const FallbackGhost = () => {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshDistortMaterial
          color="#3b82f6"
          speed={2}
          distort={0.4}
          radius={1}
          wireframe
        />
        <Html center>
          <div className="text-blue-500/50 text-[8px] whitespace-nowrap uppercase tracking-tighter">
            System: Asset Not Found / Check Path
          </div>
        </Html>
      </mesh>
    </Float>
  );
};

/** * ==============================================================================
 * 4. LIGHTING & ENVIRONMENT SYSTEM
 * ==============================================================================
 */

const CinematicLights = () => {
  return (
    <>
      {/* Key Light */}
      <SpotLight
        position={[5, 5, 5]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        castShadow
        color="#ffffff"
      />
      {/* Rim Light for that 'Awwwards' glow */}
      <SpotLight
        position={[-5, 2, -5]}
        angle={0.2}
        penumbra={1}
        intensity={3}
        color="#3b82f6"
      />
      <ambientLight intensity={0.4} />
      <pointLight position={[0, -2, 2]} intensity={0.5} color="#blue" />
    </>
  );
};

/** * ==============================================================================
 * 5. SCENE CORE COMPONENTS
 * ==============================================================================
 */

function BackgroundParticles({ count = 100 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 25;
      p[i * 3 + 1] = (Math.random() - 0.5) * 25;
      p[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return p;
  }, [count]);

  const pointsRef = useRef();
  useFrame((state) => {
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.01;
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
        size={0.035}
        color="#3b82f6"
        transparent
        opacity={0.2}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

const Rig = () => {
  const { camera, mouse } = useThree();
  const vec = new THREE.Vector3();
  return useFrame(() => {
    camera.position.lerp(vec.set(mouse.x * 0.5, mouse.y * 0.2, 5.5), 0.05);
    camera.lookAt(0, 0, 0);
  });
};

/** * ==============================================================================
 * 6. FINAL SCENE EXPORT
 * ==============================================================================
 */

export default function HeroScene() {
  const [hasError, setHasError] = useState(false);

  // Absolute path to your model in the /public folder
  const MODEL_PATH = "/models/robot.glb";

  return (
    <div className="relative w-full h-screen bg-[#020202] overflow-hidden">
      {/* Interactive Background Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,_rgba(59,130,246,0.05)_0%,_transparent_100%)]" />
      
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ 
          antialias: true, 
          alpha: true, 
          stencil: false, 
          depth: true,
          powerPreference: "high-performance" 
        }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.outputEncoding = THREE.sRGBEncoding;
        }}
      >
        <Suspense fallback={<Loader />}>
          {/* 1. Perspective System */}
          <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={35} />
          
          {/* 2. Environment & Background */}
          <Environment preset="night" />
          <BackgroundParticles count={150} />
          
          {/* 3. Interaction Wrapper */}
          <PresentationControls
            global
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 4, tension: 1500 }}
            rotation={[0, 0.3, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
          >
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
              <group position={[0, -1, 0]}>
                
                {/* 4. The Model with Local Error Boundary Logic */}
                <ErrorBoundary setHasError={setHasError}>
                  {!hasError ? (
                    <RobotModel path={MODEL_PATH} />
                  ) : (
                    <FallbackGhost />
                  )}
                </ErrorBoundary>

                {/* Ground Shadow */}
                <ContactShadows
                  position={[0, -0.01, 0]}
                  opacity={0.6}
                  scale={12}
                  blur={2.8}
                  far={10}
                  color="#000000"
                />
              </group>
            </Float>
          </PresentationControls>

          {/* 5. Lighting & Effects */}
          <CinematicLights />
          <Rig />
          
          {/* Performance Preloading */}
          <Preload all />
        </Suspense>
      </Canvas>

      {/* Hero UI Overlay Elements */}
      <div className="absolute bottom-10 left-10 pointer-events-none">
        <h2 className="text-white/20 font-mono text-xs uppercase tracking-[0.5em]">
          Agency OS v2.0
        </h2>
      </div>
    </div>
  );
}

/** * Simple Error Boundary Helper
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error) {
    console.error("3D Model Load Error:", error);
    this.props.setHasError(true);
  }
  render() {
    return this.props.children;
  }
}

// Pre-load outside the component to prevent mounting lag
useGLTF.preload("/models/robot.glb");
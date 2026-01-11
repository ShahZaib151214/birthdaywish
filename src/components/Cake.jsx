import React, { useState, useRef, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Stars,
  Float,
  ContactShadows,
  Torus,
  Cylinder,
} from "@react-three/drei";
import confetti from "canvas-confetti";
import { memory } from "../memory";
import { themes } from "../data/themes";

const Candle = ({ position, color }) => {
  const flameRef = useRef();

  useFrame(({ clock }) => {
    if (flameRef.current) {
      const t = clock.getElapsedTime();
      flameRef.current.scale.y = 1 + Math.sin(t * 10) * 0.1;
      flameRef.current.scale.x = 1 + Math.sin(t * 15) * 0.1;
    }
  });

  return (
    <group position={position}>
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.8, 16]} />
        <meshStandardMaterial color={color} roughness={0.3} />
      </mesh>
      <mesh ref={flameRef} position={[0, 0.9, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color="#ffaa00"
          emissive="#ff5500"
          emissiveIntensity={3}
        />
      </mesh>
    </group>
  );
};

// Procedural Cake: Using Torus for icing piping
const CakeModel = ({ themeColor, onCut, isCut }) => {
  const cakeGroup = useRef();
  const sliceRef = useRef();

  useFrame((state) => {
    if (!isCut && cakeGroup.current) {
      cakeGroup.current.rotation.y += 0.005;
    }
    // Animate slice moving out
    if (isCut && sliceRef.current) {
      const lerp = (start, end, factor) => start + (end - start) * factor;
      sliceRef.current.position.x = lerp(
        sliceRef.current.position.x,
        1.5,
        0.05
      );
      sliceRef.current.position.y = lerp(
        sliceRef.current.position.y,
        0.5,
        0.05
      );
      sliceRef.current.rotation.z = lerp(
        sliceRef.current.rotation.z,
        -0.2,
        0.05
      );
    }
  });

  // Helper for Icing
  const IcingTorus = ({ y, scale }) => (
    <Torus
      args={[1.55, 0.1, 16, 32]}
      position={[0, y, 0]}
      rotation={[Math.PI / 2, 0, 0]}
      scale={[scale, scale, 1]}
    >
      <meshStandardMaterial color="#fff" roughness={0.2} metalness={0.1} />
    </Torus>
  );

  return (
    <group ref={cakeGroup} onClick={onCut}>
      {/* Plate */}
      <mesh position={[0, -1.2, 0]} receiveShadow>
        <cylinderGeometry args={[2.6, 2.8, 0.2, 50]} />
        <meshStandardMaterial color="#f8f9fa" roughness={0.1} metalness={0.2} />
      </mesh>

      {/* Main Cake Body */}
      <group>
        {/* Bottom Tier */}
        <mesh position={[0, -0.6, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[2.2, 2.2, 1.2, 50]} />
          <meshStandardMaterial color={themeColor} roughness={0.5} />
        </mesh>
        <IcingTorus y={-0.1} scale={1.42} />

        {/* Top Tier */}
        <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.6, 1.6, 1.2, 50]} />
          <meshStandardMaterial color={themeColor} roughness={0.5} />
        </mesh>

        {/* Top Icing */}
        <mesh position={[0, 1.25, 0]}>
          <cylinderGeometry args={[1.65, 1.65, 0.1, 50]} />
          <meshStandardMaterial color="white" roughness={0.3} />
        </mesh>
        <IcingTorus y={1.2} scale={1.05} />

        {/* Decorations / Cherries */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <mesh
            key={i}
            position={[
              Math.cos((angle * Math.PI) / 180) * 1.3,
              1.35,
              Math.sin((angle * Math.PI) / 180) * 1.3,
            ]}
          >
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial
              color="#d00000"
              roughness={0.1}
              metalness={0.3}
            />
          </mesh>
        ))}
      </group>

      {/* Slice Geometry (Simplified: just a hidden wedge that appears/moves? 
          Actually, building a cut cake is hard. Let's make a separate "Piece" that starts inside and moves out. 
          For "Realistic" look without models, we stick to solid shapes. 
      */}
      {isCut && (
        <group ref={sliceRef} position={[0, 0, 0]}>
          <mesh position={[0, 0.2, 0]}>
            <boxGeometry args={[0.8, 0.8, 0.8]} />
            <meshStandardMaterial color="#f5e6c8" roughness={0.8} />
          </mesh>
          {/* This is a placeholder for a complex slice. 
                 A true cut requires CSG or pre-split models. 
                 We will rely on the "Expansion" animation instead which looks fun.
             */}
        </group>
      )}

      {/* Candles */}
      <Candle position={[0, 1.35, 0]} color="#ff4081" />
      <Candle position={[0.6, 1.35, 0]} color="#7c4dff" />
      <Candle position={[-0.6, 1.35, 0]} color="#448aff" />
    </group>
  );
};
const Cake = () => {
  const navigate = useNavigate();
  const { month } = memory.date;
  const theme = themes[month];
  const [isCut, setIsCut] = useState(false);

  const handleCut = (e) => {
    e.stopPropagation();
    if (isCut) return;
    setIsCut(true);

    // Explosive Confetti
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: theme.balloonColors,
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: theme.balloonColors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: theme.colors.background,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "5%",
          width: "100%",
          textAlign: "center",
          zIndex: 10,
          color: "white",
          pointerEvents: "none",
          textShadow: "0 4px 10px rgba(0,0,0,0.4)",
        }}
      >
        <h1
          style={{
            fontFamily: "Dancing Script",
            fontSize: "3.5rem",
            margin: 0,
          }}
        >
          Make a Wish...
        </h1>
        <p style={{ fontFamily: "Outfit", fontSize: "1.2rem", opacity: 0.9 }}>
          Touch the cake to cut it!
        </p>
      </div>

      <Canvas shadows camera={{ position: [0, 2, 7], fov: 40 }} dpr={[1, 2]}>
        <ambientLight intensity={0.7} />
        <spotLight
          position={[10, 10, 5]}
          angle={0.2}
          penumbra={1}
          intensity={2}
          castShadow
          color="#fff"
        />
        <pointLight
          position={[-10, 5, -5]}
          intensity={1}
          color={theme.colors.secondary}
        />

        <Stars
          radius={100}
          depth={50}
          count={3000}
          factor={4}
          saturation={1}
          fade
          speed={0.5}
        />

        {/* Environment particles or sparkle could go here */}

        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <Suspense fallback={null}>
            <CakeModel
              themeColor={theme.modelColor}
              onCut={handleCut}
              isCut={isCut}
            />
          </Suspense>
        </Float>

        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.5}
          scale={10}
          blur={2}
          far={4}
        />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>

      {isCut && (
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 20,
            textAlign: "center",
            width: "100%",
          }}
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            style={{
              fontFamily: "Dancing Script",
              fontSize: "4rem",
              color: "white",
              textShadow:
                "0 0 10px rgba(0,0,0,0.5), 0 0 20px " + theme.colors.primary,
              marginBottom: "20px",
            }}
          >
            Happy Birthday {memory.name}!
          </motion.h2>

          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              fontFamily: "Outfit",
              fontSize: "2rem",
              color: "white",
              marginBottom: "40px",
              textShadow: "0 0 10px rgba(0,0,0,0.5)",
            }}
          >
            From: {memory.from}
          </motion.h3>

          <button
            onClick={() => navigate("/birthdaywish/letter")}
            style={{
              background: "white",
              color: theme.colors.primary,
              padding: "16px 45px",
              borderRadius: "50px",
              fontSize: "1.4rem",
              fontWeight: "800",
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
              transition: "transform 0.2s",
              cursor: "pointer",
              border: `3px solid ${theme.colors.secondary}`,
            }}
          >
            Read Letter &rarr;
          </button>
        </div>
      )}
    </div>
  );
};

export default Cake;

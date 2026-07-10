"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// @react-three/fiber 9.6.1's render loop still calls the now-deprecated
// THREE.Clock internally; there's no fixed upstream release yet (10.x is
// alpha-only). Silence just this one known, harmless warning.
if (typeof window !== "undefined") {
  const originalWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    if (typeof args[0] === "string" && args[0].includes("THREE.Clock")) return;
    originalWarn(...args);
  };
}

// The mark is the terminal glyph ">_" on a yellow coin, matching the brand
// logo. Geometry is derived from the same SVG the 2D logo uses
// (chevron: M35,35 L50,50 L35,65 ; underscore: 55,65 -> 70,65) so the 3D and
// 2D marks stay in sync.
const S = 0.045; // svg-unit -> world-unit
const STROKE = 0.16; // glyph tube radius (svg strokeWidth 8 -> radius 4)
const ZG = 0.28; // glyph offset in front of the disc face

function pt(x: number, y: number): [number, number, number] {
  return [(x - 52.5) * S, -(y - 50) * S, ZG];
}

function Stroke({ a, b }: { a: [number, number, number]; b: [number, number, number] }) {
  const start = new THREE.Vector3(...a);
  const end = new THREE.Vector3(...b);
  const dir = new THREE.Vector3().subVectors(end, start);
  const len = dir.length();
  const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
  const quat = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    dir.clone().normalize()
  );
  return (
    <mesh position={mid} quaternion={quat}>
      <capsuleGeometry args={[STROKE, len, 8, 20]} />
      <meshStandardMaterial color="#111111" roughness={0.3} metalness={0.2} />
    </mesh>
  );
}

function LogoMark({ scale = 1 }: { scale?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const [pulse, setPulse] = useState(0);
  const [hovered, setHovered] = useState(false);

  // 36 random outward velocity vectors for the energy particle explosion
  const { positions, velocities } = useMemo(() => {
    const count = 36;
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const speed = 2.8 + Math.random() * 4.0;
      vel[i * 3] = Math.sin(phi) * Math.cos(theta) * speed;
      vel[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * speed;
      vel[i * 3 + 2] = Math.cos(phi) * speed;
    }
    return { positions: pos, velocities: vel };
  }, []);

  useFrame((state, delta) => {
    const g = groupRef.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    
    // Smooth breathing float & responsive mouse parallax
    const swayY = Math.sin(t * 0.5) * 0.3;
    const targetY = swayY + (state.pointer.x * Math.PI) / 6;
    const targetX = -(state.pointer.y * Math.PI) / 8 + Math.cos(t * 0.4) * 0.1;
    
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, targetY, 0.08);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, targetX, 0.08);
    g.rotation.z = Math.sin(t * 0.8) * 0.05;
    g.position.y = Math.sin(t * 1.2) * 0.15;

    // Handle interactive pulse burst & explosion
    if (pulse > 0) {
      const nextPulse = Math.max(0, pulse - delta * 2.2);
      setPulse(nextPulse);
      
      // Coin elastic bounce kick
      g.scale.setScalar(scale * (1 + Math.sin(pulse * Math.PI) * 0.35));

      // Expand & fade Golden Shockwave Ring
      if (ring1Ref.current) {
        ring1Ref.current.visible = true;
        const r1Scale = 1 + (1 - pulse) * 3.5;
        ring1Ref.current.scale.set(r1Scale, r1Scale, r1Scale);
        (ring1Ref.current.material as THREE.MeshBasicMaterial).opacity = pulse * 0.85;
      }
      // Expand & fade Cyan Energy Ring
      if (ring2Ref.current) {
        ring2Ref.current.visible = true;
        const r2Scale = 1 + (1 - pulse) * 4.8;
        ring2Ref.current.scale.set(r2Scale, r2Scale, r2Scale);
        (ring2Ref.current.material as THREE.MeshBasicMaterial).opacity = pulse * 0.55;
      }

      // Shoot outward energy particles
      if (particlesRef.current) {
        particlesRef.current.visible = true;
        const geom = particlesRef.current.geometry;
        const posAttr = geom.attributes.position as THREE.BufferAttribute;
        const progress = Math.pow(1 - pulse, 0.7); // Fast launch, smooth deceleration
        for (let i = 0; i < 36; i++) {
          posAttr.setXYZ(
            i,
            velocities[i * 3] * progress,
            velocities[i * 3 + 1] * progress,
            velocities[i * 3 + 2] * progress
          );
        }
        posAttr.needsUpdate = true;
        (particlesRef.current.material as THREE.PointsMaterial).opacity = pulse;
      }
    } else {
      g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, scale * (hovered ? 1.08 : 1), 0.1));
      if (ring1Ref.current) ring1Ref.current.visible = false;
      if (ring2Ref.current) ring2Ref.current.visible = false;
      if (particlesRef.current) particlesRef.current.visible = false;
    }
  });

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setPulse(1);
  };

  return (
    <group
      ref={groupRef}
      scale={scale}
      onClick={handleClick}
      onPointerOver={() => { setHovered(true); document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = "default"; }}
    >
      {/* 1. Golden Inner Shockwave Ring */}
      <mesh ref={ring1Ref} visible={false} rotation={[0, 0, 0]}>
        <ringGeometry args={[1.7, 2.0, 48]} />
        <meshBasicMaterial color="#FACC15" transparent opacity={0} side={THREE.DoubleSide} />
      </mesh>

      {/* 2. Cyan Outer Energy Ring */}
      <mesh ref={ring2Ref} visible={false} rotation={[0, 0, 0]}>
        <ringGeometry args={[2.0, 2.2, 48]} />
        <meshBasicMaterial color="#38BDF8" transparent opacity={0} side={THREE.DoubleSide} />
      </mesh>

      {/* 3. 3D Explosion Sparks / Particles */}
      <points ref={particlesRef} visible={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.18} color="#FEF08A" transparent opacity={0} sizeAttenuation />
      </points>

      <Float speed={2.5} rotationIntensity={0.3} floatIntensity={1.2}>
        {/* Coin / disc */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.6, 1.6, 0.4, 64]} />
          <meshStandardMaterial
            color="#FACC15"
            roughness={0.2}
            metalness={0.4}
            emissive="#EAB308"
            emissiveIntensity={hovered || pulse > 0 ? 0.7 : 0.35}
          />
        </mesh>

        {/* Glyph:  >  (chevron) */}
        <Stroke a={pt(35, 35)} b={pt(50, 50)} />
        <Stroke a={pt(50, 50)} b={pt(35, 65)} />
        {/* Glyph:  _  (underscore) */}
        <Stroke a={pt(55, 65)} b={pt(70, 65)} />
      </Float>
    </group>
  );
}

export function Scene({ className, scale = 1 }: { className?: string; scale?: number }) {
  return (
    <div className={className || "w-full h-full absolute inset-0 pointer-events-none z-0 overflow-hidden"}>
      <Canvas
        dpr={1}
        performance={{ min: 0.5 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance", precision: "mediump" }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 6.5]} fov={50} />

        {/* Ambient and directional lights for rich 3D shading */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 10]} intensity={2.0} color="#FFFFFF" />
        <directionalLight position={[-10, -10, -10]} intensity={0.8} color="#FACC15" />
        <pointLight position={[0, 4, 5]} intensity={1.5} color="#FEF08A" distance={15} />
        <pointLight position={[-5, -5, -2]} intensity={1} color="#38BDF8" distance={15} />

        <LogoMark scale={scale} />

        {/* Floating background particles (2 depth layers) */}
        <Sparkles count={26} scale={14} size={3.5} speed={0.5} opacity={0.7} color="#FACC15" />
        <Sparkles count={16} scale={18} size={2} speed={0.3} opacity={0.4} color="#38BDF8" />
      </Canvas>
    </div>
  );
}

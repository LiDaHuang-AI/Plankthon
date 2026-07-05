"use client";

import React, { useRef } from "react";
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
  // SVG viewBox is 0..100, y-down; center on the disc face and flip Y.
  return [(x - 52.5) * S, -(y - 50) * S, ZG];
}

// A single rounded stroke (capsule) whose cap centers sit exactly on a and b,
// so strokes sharing an endpoint blend into a smooth rounded joint.
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
      <meshStandardMaterial color="#171717" roughness={0.5} metalness={0} />
    </mesh>
  );
}

function LogoMark({ scale = 1 }: { scale?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const g = groupRef.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    // Gentle idle sway keeps the flat logo readable (a full spin would turn it
    // edge-on and hide the mark), plus subtle mouse parallax.
    const swayY = Math.sin(t * 0.6) * 0.35;
    const targetY = swayY + (state.pointer.x * Math.PI) / 10;
    const targetX = -(state.pointer.y * Math.PI) / 12;
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, targetY, 0.06);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, targetX, 0.06);
    g.rotation.z = Math.sin(t * 0.9) * 0.04;
  });

  return (
    <group ref={groupRef} scale={scale}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
        {/* Coin / disc */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.5, 1.5, 0.4, 96]} />
          <meshStandardMaterial
            color="#FACC15"
            roughness={0.35}
            metalness={0.15}
            emissive="#EAB308"
            emissiveIntensity={0.25}
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
    <div className={className || "w-full h-full absolute inset-0 pointer-events-none z-0"}>
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={50} />

        {/* Ambient and directional lights for rich 3D shading */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} color="#FFFFFF" />
        <directionalLight position={[-10, -10, -10]} intensity={0.5} color="#FACC15" />
        <pointLight position={[0, 5, 5]} intensity={1} color="#FEF08A" />

        <LogoMark scale={scale} />

        {/* Floating background particles */}
        <Sparkles count={60} scale={12} size={3} speed={0.4} opacity={0.6} color="#FACC15" />
      </Canvas>
    </div>
  );
}

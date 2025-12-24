"use client";

import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Float } from "@react-three/drei";
import * as THREE from "three";
import { Repository } from "@/types";

interface CDProps {
  repo: Repository;
  index: number;
  onClick: (repo: Repository) => void;
}

export function BurntCD({ repo, index, onClick }: CDProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Random marker colors (Blue, Red, Green, Black)
  const markerColors = ["#0c0c0c", "#1a2a6c", "#b21f1f", "#1b4d3e"];
  const markerColor = markerColors[index % markerColors.length];

  // High fidelity data rings simulation
  const dataRings = useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => ({
      radius: 0.3 + i * 0.18,
      roughness: 0.1 + Math.random() * 0.4,
      opacity: 0.05 + Math.random() * 0.15,
    }));
  }, []);

  return (
    <group
      ref={groupRef}
      onPointerOver={() => {
        document.body.style.cursor = "pointer";
        setHovered(true);
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
        setHovered(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick(repo);
      }}
      scale={hovered ? 1.05 : 1}
    >
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
        {/* === THE CD === */}

        {/* 1. POLYCARBONATE BASE (With Real IOR and Thickness) */}
        <mesh castShadow receiveShadow>
          <ringGeometry args={[0.2, 1.5, 64]} />
          <meshPhysicalMaterial
            color="#fff"
            roughness={0.02}
            transmission={0.4}
            thickness={0.2}
            ior={1.49} // Real polycarbonate IOR
            clearcoat={1}
            clearcoatRoughness={0}
          />
        </mesh>

        {/* 2. DATA LAYER (Iridescent Bottom) */}
        <group position={[0, -0.015, 0]} rotation={[Math.PI, 0, 0]}>
          {/* Metalized Reflective Layer */}
          <mesh>
            <ringGeometry args={[0.2, 1.5, 64]} />
            <meshPhysicalMaterial
              color="#adb5bd"
              metalness={1}
              roughness={0.15}
              iridescence={1}
              iridescenceIOR={1.4}
              iridescenceThicknessRange={[200, 500]}
            />
          </mesh>

          {/* High-Density Data Pits (Simulated with multiple thin rings) */}
          {dataRings.map((ring, i) => (
            <mesh key={i} position={[0, 0, 0.002]}>
              <ringGeometry args={[ring.radius, ring.radius + 0.02, 64]} />
              <meshStandardMaterial
                transparent
                opacity={ring.opacity}
                color="#000"
                roughness={ring.roughness}
              />
            </mesh>
          ))}
        </group>

        {/* 3. TOP LABEL (Matte White with Micro-text) */}
        <group position={[0, 0.015, 0]}>
          <mesh>
            <ringGeometry args={[0.2, 1.5, 64]} />
            <meshStandardMaterial color="#ededed" roughness={0.8} />
          </mesh>

          {/* Manufacturing Micro-text (The "Pro" touch) */}
          <Text
            position={[0, 0.001, 0.28]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={0.04}
            color="#999"
            anchorX="center"
            anchorY="middle"
            font="https://fonts.gstatic.com/s/roboto/v29/KFOmCnqEu92Fr1Mu4mxK.woff" // Using a standard font
          >
            CD-R 700MB / 80MIN XER-OPTIMIZED PREVALENCE #4200-99
          </Text>
        </group>

        {/* 4. MARKER TEXT (Simulated Ink Bleed) */}
        <group position={[0, 0.02, 0]}>
          {/* Primary Text */}
          <Text
            position={[0, 0, 0.5]}
            rotation={[-Math.PI / 2, 0, (Math.random() - 0.5) * 0.1]}
            fontSize={0.24}
            color={markerColor}
            maxWidth={2.2}
            textAlign="center"
            font="https://fonts.gstatic.com/s/caveat/v18/Wn7xhaU3vXYnBP8Eb6r6DDRY686p.woff"
          >
            {repo.name.substring(0, 18).toUpperCase()}
          </Text>

          {/* Shadow/Bleed Text (offset slightly for that thick ink look) */}
          <Text
            position={[0.005, -0.001, 0.505]}
            rotation={[-Math.PI / 2, 0, (Math.random() - 0.5) * 0.1]}
            fontSize={0.24}
            color={markerColor}
            fillOpacity={0.3}
            maxWidth={2.2}
            textAlign="center"
            font="https://fonts.gstatic.com/s/caveat/v18/Wn7xhaU3vXYnBP8Eb6r6DDRY686p.woff"
          >
            {repo.name.substring(0, 18).toUpperCase()}
          </Text>

          <Text
            position={[0, 0, -0.6]}
            rotation={[-Math.PI / 2, 0, (Math.random() - 0.5) * 0.1]}
            fontSize={0.15}
            color={markerColor}
            maxWidth={1.5}
            textAlign="center"
            font="https://fonts.gstatic.com/s/caveat/v18/Wn7xhaU3vXYnBP8Eb6r6DDRY686p.woff"
          >
            V{(index + 1.2).toFixed(1)} BUILD // {new Date().getFullYear()}
          </Text>

          {/* Sharpie Scribbles (Randomized) */}
          <group
            position={[0.7, -0.001, 0.2]}
            rotation={[0, Math.random() * Math.PI, 0]}
          >
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[0.4, 0.05]} />
              <meshBasicMaterial
                color={markerColor}
                opacity={0.4}
                transparent
              />
            </mesh>
          </group>
        </group>
      </Float>
    </group>
  );
}

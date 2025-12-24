"use client";

import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Float } from "@react-three/drei";
import * as THREE from "three";
import { Repository } from "@/types";
import { useCDPlayerSequence } from "@/hooks/useCDPlayerSequence";

interface CDProps {
  repo: Repository;
  index: number;
  onClick: (repo: Repository) => void;
}

export function BurntCD({ repo, index, onClick }: CDProps) {
  const { state, activeRepoId, loadRepo, setState } = useCDPlayerSequence();
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [initialPos] = useState(() => new THREE.Vector3());
  const [initialRot] = useState(() => new THREE.Euler());

  // Capture initial transform for return (if needed)
  useFrame((s, delta) => {
    if (groupRef.current && state === "IDLE") {
      initialPos.copy(groupRef.current.position);
      initialRot.copy(groupRef.current.rotation);
    }

    if (groupRef.current && state === "LOADING" && activeRepoId === repo.id) {
      // Fly to CD Player position [0, 0.82, -5]
      const targetPos = new THREE.Vector3(0, 0.82, -5);
      groupRef.current.position.lerp(targetPos, delta * 4);

      // Flatten rotation to lie flat on the tray
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -Math.PI / 2,
        delta * 4
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        0,
        delta * 4
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        0,
        delta * 4
      );
    }
  });

  // Hide CD when it's "inside" and lid is closing/locked
  const visible = !(
    activeRepoId === repo.id &&
    (state === "CLOSING" || state === "READING" || state === "PLAYING")
  );

  // Random marker colors
  const markerColors = ["#0c0c0c", "#1a2a6c", "#b21f1f", "#1b4d3e"];
  const markerColor = markerColors[index % markerColors.length];

  // High fidelity data rings simulation
  const dataRings = useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => ({
      radius: 0.3 + i * 0.18,
      roughness: 0.1 + Math.random() * 0.4,
      opacity: 0.05 + Math.random() * 0.15,
      scuff: Math.random() > 0.7, // Random scuffs on data layer
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
        if (useCDPlayerSequence.getState().state === "IDLE") {
          loadRepo(repo.id);
          // Wait briefly for the lid to open before starting flight to player
          setTimeout(() => {
            useCDPlayerSequence.getState().setState("LOADING");

            // Auto-navigate after mechanical sequence concludes
            setTimeout(() => {
              window.open(repo.html_url, "_blank");
            }, 6000); // Wait for flight (1s) + close (1s) + read (3s) + buffer
          }, 1000);
        }
      }}
      scale={hovered ? 1.05 : 1}
      visible={visible}
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

          {/* High-Density Data Pits + Scuffs */}
          {dataRings.map((ring, i) => (
            <mesh key={i} position={[0, 0, 0.002]}>
              <ringGeometry args={[ring.radius, ring.radius + 0.02, 64]} />
              <meshStandardMaterial
                transparent
                opacity={ring.scuff ? 0.3 : ring.opacity}
                color={ring.scuff ? "#fff" : "#000"} // Scuffs are white/silver
                roughness={ring.scuff ? 0.8 : ring.roughness}
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
            position={[0.008, -0.002, 0.508]}
            rotation={[-Math.PI / 2, 0, (Math.random() - 0.5) * 0.1]}
            fontSize={0.24}
            color={markerColor}
            fillOpacity={0.4}
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

          {/* Sharpie Scribbles (Organic Grit) */}
          {[...Array(3)].map((_, i) => (
            <group
              key={i}
              position={[
                (Math.random() - 0.5) * 2,
                -0.001,
                (Math.random() - 0.5) * 2,
              ]}
              rotation={[0, Math.random() * Math.PI, 0]}
            >
              <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[Math.random() * 0.6, 0.03]} />
                <meshBasicMaterial
                  color={markerColor}
                  opacity={0.3}
                  transparent
                />
              </mesh>
            </group>
          ))}
        </group>
      </Float>
    </group>
  );
}

"use client";

import { useMemo } from "react";
import { MeshTransmissionMaterial, Text } from "@react-three/drei";
import * as THREE from "three";

export function CDPlayer() {
  return (
    <group position={[0, 0, -5]}>
      {/* 1. MAIN CHASSIS (Heavy Matte Plastic) */}
      <mesh castShadow receiveShadow position={[0, 0.4, 0]}>
        <boxGeometry args={[10, 0.8, 8]} />
        <meshStandardMaterial color="#0d0d0d" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Chassis Top Plate (Slightly smaller for a seam check) */}
      <mesh position={[0, 0.81, 0]}>
        <boxGeometry args={[9.95, 0.02, 7.95]} />
        <meshStandardMaterial color="#111" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* 2. THE LID (Hinged look) */}
      <group position={[0, 0.8, -0.5]}>
        <mesh castShadow receiveShadow position={[0, 0.1, 0.5]}>
          <boxGeometry args={[9.4, 0.18, 6.8]} />
          <meshStandardMaterial
            color="#1a1a1a"
            roughness={0.4}
            metalness={0.3}
          />
        </mesh>

        {/* Metal Trim around Window */}
        <mesh position={[0, 0.2, 0.5]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.5, 2.7, 64]} />
          <meshStandardMaterial color="#444" metalness={1} roughness={0.2} />
        </mesh>

        {/* Transparent Window (High Fidelity) */}
        <mesh position={[0, 0.21, 0.5]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[2.5, 64]} />
          <meshPhysicalMaterial
            color="#444"
            transmission={0.9}
            thickness={2}
            roughness={0.1}
            ior={1.5}
            clearcoat={1}
            attenuationColor="#ffffff"
            attenuationDistance={1}
          />
        </mesh>
      </group>

      {/* 3. LCD SEGMENT DISPLAY */}
      <group position={[3, 0.65, 3.55]}>
        {/* Beveled Screen Inset */}
        <mesh rotation={[-Math.PI / 4, 0, 0]}>
          <planeGeometry args={[2.6, 1.3]} />
          <meshStandardMaterial color="#000" />
        </mesh>
        {/* LCD Backlight */}
        <mesh position={[0, 0.02, 0.05]} rotation={[-Math.PI / 4, 0, 0]}>
          <planeGeometry args={[2.4, 1.1]} />
          <meshBasicMaterial color="#39FF14" transparent opacity={0.15} />
        </mesh>
        {/* The Grid / Pixels (Simulated) */}
        <mesh position={[0, 0.03, 0.08]} rotation={[-Math.PI / 4, 0, 0]}>
          <planeGeometry args={[2.2, 0.9]} />
          <meshBasicMaterial color="#000" transparent opacity={0.2} />
        </mesh>

        <Text
          position={[0, 0.05, 0.12]}
          rotation={[-Math.PI / 4, 0, 0]}
          fontSize={0.25}
          color="#39FF14"
          font="https://fonts.gstatic.com/s/robotomono/v22/L0tkDF4m3GMw3p7_r6u7X_SncP9A8o6K.woff"
          anchorX="center"
          anchorY="middle"
        >
          LOAD_SECTOR_0
        </Text>
      </group>

      {/* 4. TACTILE BUTTONS (Recessed Metal) */}
      <group position={[-2, 0.82, 3.5]}>
        {/* Stop Button (Recessed) */}
        <group position={[-1.2, 0, 0]}>
          <mesh position={[0, -0.05, 0]}>
            <cylinderGeometry args={[0.35, 0.35, 0.1, 32]} />
            <meshStandardMaterial color="#000" />
          </mesh>
          <mesh position={[0, 0.05, 0]}>
            <cylinderGeometry args={[0.3, 0.3, 0.1, 32]} />
            <meshStandardMaterial color="#990000" metalness={0.2} />
          </mesh>
        </group>

        {/* Play/Pause (Iconic look) */}
        <group position={[-0.2, 0, 0]}>
          <mesh position={[0, -0.05, 0]}>
            <cylinderGeometry args={[0.45, 0.45, 0.1, 32]} />
            <meshStandardMaterial color="#000" />
          </mesh>
          <mesh position={[0, 0.05, 0]}>
            <cylinderGeometry args={[0.4, 0.4, 0.1, 32]} />
            <meshStandardMaterial color="#222" metalness={0.8} />
          </mesh>
        </group>
      </group>

      {/* Advanced Volume Wheel */}
      <group position={[5.01, 0.4, 1]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.5, 0.5, 0.3, 64]} />
          <meshStandardMaterial color="#111" />
        </mesh>
        {/* Notches on wheel */}
        {[...Array(12)].map((_, i) => (
          <mesh
            key={i}
            rotation={[0, (i / 12) * Math.PI * 2, 0]}
            position={[0, 0, 0.5]}
          >
            <boxGeometry args={[0.05, 0.3, 0.05]} />
            <meshBasicMaterial color="#333" />
          </mesh>
        ))}
      </group>

      {/* SCREWS (Detail makes it look real) */}
      {[
        [-4.5, 0.82, -3.5],
        [4.5, 0.82, -3.5],
        [-4.5, 0.82, 3.5],
        [4.5, 0.82, 3.5],
      ].map((pos, i) => (
        <mesh
          key={i}
          position={pos as [number, number, number]}
          rotation={[0, Math.random(), 0]}
        >
          <cylinderGeometry args={[0.08, 0.08, 0.02, 16]} />
          <meshStandardMaterial color="#444" metalness={1} roughness={0.3} />
          {/* Screw Slot */}
          <mesh position={[0, 0.015, 0]}>
            <boxGeometry args={[0.1, 0.005, 0.02]} />
            <meshBasicMaterial color="#111" />
          </mesh>
        </mesh>
      ))}

      {/* Headphone Jack (Deep Hole) */}
      <group position={[-4, 0.4, 4.01]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.2, 0.2, 0.1, 32]} />
          <meshStandardMaterial color="#111" metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.05, 32]} />
          <meshBasicMaterial color="#000" />
        </mesh>
      </group>
    </group>
  );
}

"use client";

import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Text } from "@react-three/drei";
import * as THREE from "three";
import { useCDPlayerSequence } from "@/hooks/useCDPlayerSequence";

export function CDPlayer() {
  const { state, lidRotation, cdRotation, lcdText, tick } =
    useCDPlayerSequence();

  useFrame((state, delta) => {
    tick(delta);
  });

  return (
    <group position={[0, 0, -5]}>
      {/* 1. MAIN CHASSIS (Heavy Matte Plastic) */}
      <mesh castShadow receiveShadow position={[0, 0.4, 0]}>
        <boxGeometry args={[10, 0.8, 8]} />
        <meshStandardMaterial color="#0d0d0d" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Chassis Top Plate */}
      <mesh position={[0, 0.81, 0]}>
        <boxGeometry args={[9.95, 0.02, 7.95]} />
        <meshStandardMaterial color="#111" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* 2. THE LID (Mechanical Hinge) */}
      <group position={[0, 0.8, -3.4]} rotation={[-lidRotation, 0, 0]}>
        <mesh castShadow receiveShadow position={[0, 0.09, 3.4]}>
          <boxGeometry args={[9.4, 0.18, 6.8]} />
          <meshStandardMaterial
            color="#1a1a1a"
            roughness={0.4}
            metalness={0.3}
          />
        </mesh>

        {/* Metal Trim around Window */}
        <mesh position={[0, 0.2, 3.4]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.5, 2.7, 64]} />
          <meshStandardMaterial color="#444" metalness={1} roughness={0.2} />
        </mesh>

        {/* Transparent Window (Smoked) */}
        <mesh position={[0, 0.21, 3.4]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[2.5, 64]} />
          <meshPhysicalMaterial
            color="#222"
            transmission={0.8}
            thickness={1}
            roughness={0.1}
            ior={1.5}
          />
        </mesh>
      </group>

      {/* 3. SPINNING DISC (Inside) */}
      <group
        position={[0, 0.82, 0]}
        rotation={[0, cdRotation, 0]}
        visible={
          state !== "IDLE" && state !== "OPENING" && state !== "WAITING_FOR_CD"
        }
      >
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.2, 2.4, 64]} />
          <meshPhysicalMaterial
            color="#adb5bd"
            metalness={1}
            roughness={0.1}
            iridescence={1}
            iridescenceIOR={1.4}
            iridescenceThicknessRange={[200, 500]}
          />
        </mesh>
      </group>

      {/* 4. LCD SEGMENT DISPLAY */}
      <group position={[3.5, 0.65, 3.55]}>
        {/* Beveled Screen Inset */}
        <mesh rotation={[-Math.PI / 4, 0, 0]}>
          <planeGeometry args={[2.8, 1.4]} />
          <meshStandardMaterial color="#000" />
        </mesh>
        {/* LCD Backlight */}
        <mesh position={[0, 0.02, 0.05]} rotation={[-Math.PI / 4, 0, 0]}>
          <planeGeometry args={[2.6, 1.2]} />
          <meshBasicMaterial color="#39FF14" transparent opacity={0.15} />
        </mesh>

        <Text
          position={[0, 0.05, 0.12]}
          rotation={[-Math.PI / 4, 0, 0]}
          fontSize={0.25}
          color="#39FF14"
          // Using VT323 via Google Fonts woff
          font="https://fonts.gstatic.com/s/vt323/v17/pxiLyp0ihS9PC9G9.woff"
          anchorX="center"
          anchorY="middle"
          fillOpacity={state === "READING" ? 0.7 + Math.random() * 0.3 : 1}
        >
          {lcdText}
        </Text>
      </group>

      {/* 4. TACTILE BUTTONS (Section III.2) */}
      <group position={[-1.8, 0.82, 3.5]}>
        {/* Play/Pause (Iconic look) */}
        <group position={[0, 0, 0]}>
          <mesh position={[0, -0.05, 0]}>
            <cylinderGeometry args={[0.45, 0.45, 0.1, 32]} />
            <meshStandardMaterial color="#000" />
          </mesh>
          <mesh position={[0, 0.05, 0]}>
            <cylinderGeometry args={[0.4, 0.4, 0.1, 32]} />
            <meshStandardMaterial
              color="#222"
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        </group>

        {/* Stop Button (Recessed) */}
        <group position={[-1.2, 0, 0]}>
          <mesh position={[0, -0.05, 0]}>
            <cylinderGeometry args={[0.35, 0.35, 0.1, 32]} />
            <meshStandardMaterial color="#000" />
          </mesh>
          <mesh position={[0, 0.05, 0]}>
            <cylinderGeometry args={[0.3, 0.3, 0.1, 32]} />
            <meshStandardMaterial
              color="#990000"
              metalness={0.2}
              roughness={0.1}
            />
          </mesh>
        </group>

        {/* Skip Forward */}
        <group position={[1.2, 0, 0]}>
          <mesh position={[0, -0.05, 0]}>
            <cylinderGeometry args={[0.35, 0.35, 0.1, 32]} />
            <meshStandardMaterial color="#000" />
          </mesh>
          <mesh position={[0, 0.05, 0]}>
            <cylinderGeometry args={[0.3, 0.3, 0.1, 32]} />
            <meshStandardMaterial
              color="#222"
              metalness={0.8}
              roughness={0.2}
            />
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

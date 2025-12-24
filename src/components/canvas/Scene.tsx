"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  ContactShadows,
  Text,
} from "@react-three/drei";
import { Repository } from "@/types";
import { BurntCD } from "./BurntCD";
import * as THREE from "three";

import { CDPlayer } from "./CDPlayer";

interface SceneProps {
  repos: Repository[];
}

function DustParticles() {
  const points = useMemo(() => {
    const p = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) {
      p[i * 3] = (Math.random() - 0.5) * 10;
      p[i * 3 + 1] = Math.random() * 5;
      p[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
    }
    return p;
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.001;
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={500}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#fff"
        transparent
        opacity={0.2}
        sizeAttenuation
      />
    </points>
  );
}

function Workbench() {
  return (
    <group position={[0, -0.02, 0]}>
      {/* Heavy Steel/Wood Table */}
      <mesh receiveShadow>
        <boxGeometry args={[25, 0.1, 25]} />
        <meshStandardMaterial color="#080808" roughness={0.9} metalness={0.2} />
      </mesh>

      {/* Industrial Scratches */}
      {[...Array(60)].map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 15,
            0.051,
            (Math.random() - 0.5) * 15,
          ]}
          rotation={[0, Math.random() * Math.PI, 0]}
        >
          <planeGeometry args={[Math.random() * 2, 0.01]} />
          <meshBasicMaterial color="#1a1a1a" transparent opacity={0.4} />
        </mesh>
      ))}

      {/* Oily Stains */}
      {[...Array(10)].map((_, i) => (
        <mesh
          key={`stain-${i}`}
          position={[
            (Math.random() - 0.5) * 10,
            0.052,
            (Math.random() - 0.5) * 10,
          ]}
          rotation={[-Math.PI / 2, 0, Math.random()]}
        >
          <circleGeometry args={[Math.random() * 1.5, 32]} />
          <meshStandardMaterial
            color="#000"
            transparent
            opacity={0.6}
            roughness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

function HeadphoneCable() {
  const points = useMemo(() => {
    const p = [];
    for (let i = 0; i < 40; i++) {
      p.push(
        new THREE.Vector3(
          -4 + Math.sin(i * 0.3) * 0.1 * i * 0.1,
          0.05 + i * 0.005,
          4 + i * 0.3
        )
      );
    }
    return p;
  }, []);

  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);

  return (
    <mesh position={[0, 0, 0]} castShadow>
      <tubeGeometry args={[curve, 100, 0.06, 12, false]} />
      <meshStandardMaterial color="#050505" roughness={0.2} metalness={0.1} />
    </mesh>
  );
}

function Sticker({
  position,
  rotation,
  color,
  text,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  text?: string;
}) {
  return (
    <group position={position} rotation={rotation}>
      {/* Sticker Paper (Minor Thickness) */}
      <mesh receiveShadow castShadow>
        <boxGeometry args={[1.0, 0.5, 0.01]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
      {text && (
        <Text
          position={[0, 0, 0.01]}
          fontSize={0.12}
          color="black"
          font="https://fonts.gstatic.com/s/robotomono/v22/L0tkDF4m3GMw3p7_r6u7X_SncP9A8o6K.woff"
        >
          {text}
        </Text>
      )}
    </group>
  );
}

export default function GraveyardCanvas({ repos }: { repos: Repository[] }) {
  return (
    <Canvas
      shadows
      camera={{ position: [8, 8, 12], fov: 35 }}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
      }}
    >
      <color attach="background" args={["#020202"]} />

      {/* Cinematic Lighting */}
      <ambientLight intensity={0.1} />

      <spotLight
        position={[5, 12, 5]}
        angle={0.2}
        penumbra={1}
        intensity={180}
        castShadow
        shadow-bias={-0.0001}
        shadow-mapSize={[2048, 2048]}
        color="#fff4e0"
      />

      <pointLight position={[-10, 5, -5]} intensity={40} color="#0044ff" />
      <pointLight position={[0, 2, 10]} intensity={20} color="#ff4400" />

      <Workbench />
      <CDPlayer />
      <HeadphoneCable />
      <DustParticles />

      {/* Scattered CDs */}
      <group>
        {repos.map((repo, i) => {
          const angle = (i / repos.length) * Math.PI * 2;
          const radius = 6.5 + Math.random() * 2;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;

          return (
            <group
              key={repo.id}
              position={[x, 0.05, z]}
              rotation={[0, Math.random() * Math.PI * 2, 0]}
            >
              <BurntCD
                repo={repo}
                index={i}
                onClick={(r) => window.open(r.html_url, "_blank")}
              />
            </group>
          );
        })}
      </group>

      {/* Metal Edge Bracket */}
      <mesh position={[0, -0.05, 10]}>
        <boxGeometry args={[50, 0.1, 0.5]} />
        <meshStandardMaterial color="#222" metalness={1} roughness={0.3} />
      </mesh>

      <ContactShadows
        opacity={1}
        scale={20}
        blur={2.5}
        far={2}
        resolution={1024}
        color="#000000"
      />

      <OrbitControls
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2.3}
        maxDistance={15}
        minDistance={5}
      />

      <Environment preset="night" blur={0.8} />
    </Canvas>
  );
}

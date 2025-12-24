"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  ContactShadows,
  Text,
  MeshReflectorMaterial,
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
      {/* Mahogany Reflective Table */}
      <mesh receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[25, 0.1, 25]} />
        <MeshReflectorMaterial
          mirror={0.4}
          resolution={1024}
          mixStrength={0.5}
          roughness={0.7}
          metalness={0.2}
          color="#1a120b"
          blur={[300, 100]}
          mixBlur={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
        />
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
          <meshBasicMaterial color="#332211" transparent opacity={0.3} />
        </mesh>
      ))}

      {/* Oily Stains (Simulated Shimmer) */}
      {[...Array(12)].map((_, i) => (
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
            color="#1a0f08"
            transparent
            opacity={0.4}
            metalness={0.8}
            roughness={0.05}
          />
        </mesh>
      ))}
    </group>
  );
}

function StickerWall() {
  const stickers = useMemo(() => {
    return [
      {
        pos: [-3, 2, -12],
        rot: [0, 0, 0.1],
        color: "#ffecb3",
        text: "TODO: UNBREAK WEBGL",
      },
      {
        pos: [0, 3, -12],
        rot: [0, 0, -0.05],
        color: "#e1f5fe",
        text: "GITHUB_TOKEN_EXPIRED",
      },
      {
        pos: [3, 2.5, -12],
        rot: [0, 0, 0.2],
        color: "#f8bbd0",
        text: "ARCHIVE_V1_CRASHED",
      },
      {
        pos: [-5, 4, -12],
        rot: [0, 0, -0.1],
        color: "#c8e6c9",
        text: "1998_CORE_DRV",
      },
    ];
  }, []);

  return (
    <group>
      {stickers.map((s, i) => (
        <Sticker
          key={i}
          position={s.pos as [number, number, number]}
          rotation={s.rot as [number, number, number]}
          color={s.color}
          text={s.text}
        />
      ))}
    </group>
  );
}

function DeskLamp() {
  return (
    <group position={[4, -0.4, -2]}>
      {/* Lamp Base */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.8, 1, 0.2, 32]} />
        <meshStandardMaterial color="#222" metalness={0.8} roughness={0.4} />
      </mesh>
      {/* Lamp Arm */}
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[0.2, 4, 0.2]} />
        <meshStandardMaterial color="#222" metalness={0.8} roughness={0.4} />
      </mesh>
      {/* Lamp Head */}
      <group position={[0, 4, 2]} rotation={[Math.PI / 3, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[1, 0.6, 1.5, 32, 1, true]} />
          <meshStandardMaterial
            color="#333"
            side={THREE.DoubleSide}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
        {/* Physical Bulb */}
        <mesh position={[0, -0.2, 0]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshBasicMaterial color="#fff4e0" />
        </mesh>
        {/* Primary Lighting */}
        <spotLight
          position={[0, 0, 0]}
          angle={0.8}
          penumbra={1}
          intensity={400}
          castShadow
          shadow-bias={-0.0001}
          color="#fff4e0"
        />
      </group>
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
  const pcMonitorRef = useRef<THREE.PointLight>(null);

  // Procedural scattering logic
  const scatteredRepos = useMemo(() => {
    return repos.map((repo, i) => {
      // Avoid a perfect circle, use spiral + noise
      const angle = i * 0.8 + (Math.random() - 0.5) * 0.5;
      const radius = 4 + i * 0.4 + Math.random() * 1.5;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      return {
        ...repo,
        pos: [x, 0.05, z] as [number, number, number],
        rot: [0, Math.random() * Math.PI * 2, 0] as [number, number, number],
      };
    });
  }, [repos]);

  useFrame((state) => {
    if (pcMonitorRef.current) {
      // Flickering PC Monitor Light (Ambient Blue Pulse)
      const flicker =
        Math.sin(state.clock.elapsedTime * 15) * 5 +
        Math.sin(state.clock.elapsedTime * 3) * 10;
      pcMonitorRef.current.intensity = 20 + flicker;
    }
  });

  return (
    <Canvas
      shadows
      camera={{ position: [9, 7, 11], fov: 35 }}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.0,
      }}
    >
      <color attach="background" args={["#050505"]} />

      <ambientLight intensity={0.05} />

      {/* PC Monitor Ambient Flicker */}
      <pointLight
        ref={pcMonitorRef}
        position={[-8, 4, -8]}
        distance={20}
        color="#0066ff"
      />

      <DeskLamp />
      <Workbench />
      <CDPlayer />
      <HeadphoneCable />
      <DustParticles />

      {/* Organically Scattered CDs */}
      <group>
        {scatteredRepos.map((repo, i) => (
          <group key={repo.id} position={repo.pos} rotation={repo.rot}>
            <BurntCD
              repo={repo}
              index={i}
              onClick={(r) => window.open(r.html_url, "_blank")}
            />
          </group>
        ))}
      </group>

      {/* Metal Edge Bracket / Table Edge */}
      <mesh position={[0, -0.05, 12]}>
        <boxGeometry args={[50, 0.2, 0.8]} />
        <meshStandardMaterial color="#111" metalness={1} roughness={0.2} />
      </mesh>

      <ContactShadows
        opacity={0.8}
        scale={25}
        blur={2}
        far={4}
        resolution={1024}
        color="#000000"
      />

      <OrbitControls
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2.1}
        maxDistance={18}
        minDistance={4}
      />

      <Environment preset="night" blur={0.8} />
    </Canvas>
  );
}

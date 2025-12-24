
"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Html, Float } from "@react-three/drei";
import * as THREE from "three";
import { Repository } from "@/types";

interface FloppyDiskProps {
  repo: Repository;
  index: number;
}

// Cyberpunk Neon Palette
const NEON_COLORS = ["#00f3ff", "#ff00ff", "#39ff14", "#ff5e00", "#7df9ff"];

export function FloppyDisk({ repo, index }: FloppyDiskProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHover] = useState(false);
  
  const color = NEON_COLORS[repo.id % NEON_COLORS.length];

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.position.y = Math.sin(t * 1.5 + index) * 0.15;
    meshRef.current.rotation.x = Math.sin(t * 0.5 + index) * 0.1;
    meshRef.current.rotation.z = Math.cos(t * 0.3 + index) * 0.05;
  });

  return (
    <group
      ref={meshRef}
      scale={hovered ? 1.2 : 1}
      onClick={() => window.open(repo.html_url, "_blank")}
      onPointerOver={() => { document.body.style.cursor = 'pointer'; setHover(true); }}
      onPointerOut={() => { document.body.style.cursor = 'auto'; setHover(false); }}
    >
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* === CYBER DISK BODY === */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.2, 2.2, 0.25]} />
          {/* Standard Glass/Plastic Material */}
          <meshPhysicalMaterial 
            color={color}
            metalness={0.1}
            roughness={0.2}
            transmission={0.6} // Glass-like
            thickness={0.5}
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Internal "Magnetic Media" Disc (Dark Circle inside) */}
        <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.8, 0.8, 0.24, 32]} />
            <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Metal Shutter */}
        <mesh position={[0, 0.7, 0.13]} castShadow>
          <boxGeometry args={[1.4, 0.7, 0.02]} />
          <meshStandardMaterial color="#C0C0C0" metalness={1} roughness={0.2} envMapIntensity={2} />
        </mesh>

        {/* Glowing Holographic Label */}
        <mesh position={[0, -0.4, 0.14]}>
          <planeGeometry args={[1.8, 0.8]} />
          <meshBasicMaterial color="black" />
        </mesh>

        {/* Repo Name Text */}
        <Text
          position={[0, -0.3, 0.15]}
          fontSize={0.2}
          color={color} // Text matches disk color
          maxWidth={1.6}
          textAlign="center"
          font="https://fonts.gstatic.com/s/sharetechmono/v15/J7aHnp1uDWRRFmbURQJxsVmoyWu5.woff" // Tech Mono Font
          anchorX="center"
          anchorY="middle"
        >
          {repo.name.toUpperCase()}
        </Text>

        <Text
            position={[0, -0.6, 0.15]}
            fontSize={0.08}
            color="#fff"
            font="https://fonts.gstatic.com/s/sharetechmono/v15/J7aHnp1uDWRRFmbURQJxsVmoyWu5.woff"
        >
            [{repo.language || "RAW_DATA"}]
        </Text>
      </Float>

      {/* === TERMINAL HOVER TOOLTIP === */}
      {hovered && (
        <Html position={[2.5, 0, 0]} center distanceFactor={8} style={{ pointerEvents: 'none' }}>
          <div className="bg-black/90 border border-green-500 p-4 w-[250px] font-mono text-xs shadow-[0_0_20px_rgba(0,255,0,0.3)] backdrop-blur-sm">
            <div className="text-green-500 mb-2 border-b border-green-900 pb-1 flex justify-between">
                <span>// MOUNTED_SOURCE</span>
                <span className="animate-pulse">●</span>
            </div>
            
            <div className="space-y-2 text-gray-300">
              <p><span className="text-green-700">{">"} ID:</span> {repo.name}</p>
              <p><span className="text-green-700">{">"} STATUS:</span> ABANDONED</p>
              <p><span className="text-green-700">{">"} STARS:</span> {repo.stargazers_count}</p>
              <div className="my-2 border-t border-dashed border-gray-700"></div>
              <p className="text-white italic">"{repo.epitaph}"</p>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

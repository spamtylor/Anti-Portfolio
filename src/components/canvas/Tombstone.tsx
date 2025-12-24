"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Float, Html } from "@react-three/drei";
import { Repository } from "../../types";
import { Group } from "three";

interface TombstoneProps {
  repo: Repository;
  position: [number, number, number];
}

export function Tombstone({ repo, position }: TombstoneProps) {
  const meshRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    // Subtle floating animation variance based on ID
    const t = state.clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(t + repo.id) * 0.1;
  });

  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <group
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          {/* Stone Block */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.5, 2, 0.4]} />
            <meshStandardMaterial
              color={hovered ? "#4a4a4a" : "#2a2a2a"}
              roughness={0.8}
              metalness={0.2}
            />
          </mesh>

          {/* Repo Name Engraving */}
          <Text
            position={[0, 0.2, 0.21]}
            fontSize={0.2}
            color={hovered ? "#ff0000" : "#aaaaaa"}
            maxWidth={1.3}
            textAlign="center"
          >
            {repo.name}
          </Text>

          {/* Date Engraving */}
          <Text
            position={[0, -0.5, 0.21]}
            fontSize={0.1}
            color="#666666"
          >
            {repo.pushed_at ? new Date(repo.pushed_at).getFullYear() : "RIP"}
          </Text>
          
          {/* HTML Tooltip on Hover */}
          {hovered && (
             <Html position={[0, 2, 0]} center distanceFactor={10}>
                <div className="bg-black/80 text-white p-4 rounded border border-red-500 w-64 backdrop-blur-sm">
                   <h3 className="font-bold text-red-500">{repo.name}</h3>
                   <p className="text-xs mt-1 text-gray-300 line-clamp-3">
                      {repo.description || "No epitaph found..."}
                   </p>
                   <div className="mt-2 text-[10px] text-gray-500 flex justify-between">
                      <span>⭐ {repo.stargazers_count}</span>
                      <span>{repo.language}</span>
                   </div>
                   <p className="mt-2 text-xs italic text-red-400 border-t border-red-900 pt-2">
                      &quot;{repo.epitaph}&quot;
                   </p>
                </div>
             </Html>
          )}
        </group>
      </Float>
    </group>
  );
}

"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Center, Stars, Text } from "@react-three/drei";
import { Tombstone } from "./Tombstone";
import { Repository } from "../../types";
import { Suspense } from "react";

interface SceneProps {
  repos: Repository[];
}

export default function Scene({ repos }: SceneProps) {
  return (
    <div className="w-full h-full bg-black">
      <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
        <Suspense fallback={null}>
          <fog attach="fog" args={['#000000', 5, 20]} />
          <ambientLight intensity={0.2} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.5}
            penumbra={1}
            intensity={100}
            color="red"
          />
          <pointLight position={[-10, -10, -10]} color="blue" intensity={50} />

          <group position={[0, -1, 0]}>
            <Center>
              {repos.length === 0 ? (
                <Text fontSize={0.5} color="gray">
                  NO GRAVES FOUND
                </Text>
              ) : (
                repos.map((repo, i) => {
                  // Simple grid layout logic
                  // const x = (i % 4) * 2.5 - 3;
                  // const z = Math.floor(i / 4) * 2.5; 
                  // Randomized scatter for "graveyard" feel
                  const x = (Math.random() - 0.5) * 10;
                  const z = (Math.random() - 0.5) * 5 - (i * 0.5); 
                  
                  return (
                    <Tombstone 
                      key={repo.id} 
                      repo={repo} 
                      position={[x, 0, z]} 
                    />
                  );
                })
              )}
            </Center>
            
            {/* Ground Plane */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
              <planeGeometry args={[50, 50]} />
              <meshStandardMaterial color="#050505" roughness={1} metalness={0} />
            </mesh>
          </group>

          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2}
          />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </Suspense>
      </Canvas>
    </div>
  );
}

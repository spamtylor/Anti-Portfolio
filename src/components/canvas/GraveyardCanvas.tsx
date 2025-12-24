"use client";

import dynamic from "next/dynamic";
import { Repository } from "../../types";

const Scene = dynamic(() => import("./Scene"), { 
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center text-red-600 font-mono animate-pulse">
      Summoning Spirits...
    </div>
  )
});

interface GraveyardCanvasProps {
  repos: Repository[];
}

export default function GraveyardCanvas({ repos }: GraveyardCanvasProps) {
  return <Scene repos={repos} />;
}

"use client";

import dynamic from "next/dynamic";
import { Repository } from "@/types";

const Scene = dynamic(() => import("./Scene"), { 
  ssr: false,
  loading: () => null,
});

interface GraveyardCanvasProps {
  repos: Repository[];
}

export default function GraveyardCanvas({ repos }: GraveyardCanvasProps) {
  return <Scene repos={repos} />;
}

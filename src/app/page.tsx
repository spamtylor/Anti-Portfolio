import { getAbandonedRepos } from "../lib/github";
import GraveyardCanvas from "../components/canvas/GraveyardCanvas";

export default async function Home() {
  const username = process.env.NEXT_PUBLIC_USERNAME || "octocat";
  const repos = await getAbandonedRepos(username);

  return (
    <main className="w-full h-screen relative bg-black overflow-hidden">
      {/* UI Overlay */}
      <div className="absolute top-8 left-8 z-10 pointer-events-none select-none">
        <h1 className="text-6xl font-black tracking-tighter text-red-600 drop-shadow-lg">
          ANTI
          <br />
          PORTFOLIO
        </h1>
        <p className="mt-4 text-green-500 uppercase text-sm tracking-widest font-mono">
          // A monument to {repos.length} broken dreams
          <br/>
          // USER: {username}
        </p>
      </div>

      {/* 3D Scene */}
      <div className="w-full h-full">
        <GraveyardCanvas repos={repos} />
      </div>
      
      {/* Footer Status */}
      <div className="absolute bottom-8 right-8 z-10 text-right pointer-events-none text-xs text-gray-500 font-mono">
        <p>SYSTEM_STATUS: ONLINE</p>
        <p>GRAVITY: HEAVY</p>
        <p>VIBE: TERMINAL</p>
      </div>
    </main>
  );
}

import { getAllRepos } from "@/lib/github";
import GraveyardCanvas from "../components/canvas/GraveyardCanvas";

export default async function PortfolioPage() {
  const username = process.env.NEXT_PUBLIC_USERNAME || "spamtylor";
  const repos = await getAllRepos(username);

  return (
    <main className="w-full h-screen relative bg-[#050505] font-mono overflow-hidden selection:bg-neon-green selection:text-black scanline-crt">
      {/* Header with Xerox Effect */}
      <div className="absolute top-10 left-10 z-10 pointer-events-none">
        <div className="bg-white text-black px-6 py-2 transform -rotate-1 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h1
            className="text-7xl font-black tracking-tighter uppercase leading-none"
            style={{ fontFamily: "Impact, sans-serif" }}
          >
            THE BURNT
            <br />
            ARCHIVES
          </h1>
        </div>
        <div className="mt-4 bg-[#39FF14] text-black inline-block px-3 py-1 font-bold transform rotate-1 uppercase text-sm border-2 border-black">
          SESSION://{username.toUpperCase()}
        </div>
      </div>

      {/* Manual / Post-it Note */}
      <div className="absolute top-10 right-10 z-10 w-64 p-4 bg-yellow-200 text-blue-900 shadow-xl transform rotate-3 border-b-4 border-yellow-400 font-handwriting hidden md:block">
        <p className="text-sm font-bold border-b border-blue-900/20 mb-2">
          QUICK START:
        </p>
        <ul className="text-xs list-disc pl-4 space-y-1">
          <li>Select a disc to "Play"</li>
          <li>Each CD is a burnt archive</li>
          <li>Orbit to explore the desk</li>
        </ul>
      </div>

      {/* 3D Canvas */}
      <div className="w-full h-screen">
        {repos.length > 0 ? (
          <GraveyardCanvas repos={repos} />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#39FF14] animate-pulse">
            INITIALIZING ARCHIVE...
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="absolute bottom-10 left-10 right-10 z-10 flex justify-between items-end pointer-events-none text-[#39FF14] mix-blend-screen">
        <div className="text-xs font-mono opacity-60">
          SYSTEM: PORTFOLIO_BUILD_V8.5
          <br />
          STATUS: ACTIVE_ARCHIVE
        </div>
        <div className="text-right">
          <div className="text-4xl font-black">{repos.length}</div>
          <div className="text-[10px] tracking-[0.3em] font-bold opacity-80 uppercase">
            TOTAL_PROJECTS
          </div>
        </div>
      </div>
    </main>
  );
}

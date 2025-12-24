import { Octokit } from "octokit";
import { Repository } from "../types";
import { generateEpitaph } from "./epitaphs";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function getAllRepos(username: string): Promise<Repository[]> {
  try {
    const { data } = await octokit.request("GET /users/{username}/repos", {
      username,
      sort: "updated",
      direction: "desc", 
      per_page: 20, // Focus on top 20
    });

    let filtered = data.filter((repo) => !repo.fork);

    // MOCK DATA FALLBACK
    // If we still have nothing (API error, rate limit, or fresh user), return fake data
    // so the user can verify the design.
    if (!filtered || filtered.length === 0) {
      console.log("⚠️ API returned empty. Switching to MOCK DATA.");
      return [
        {
          id: 1,
          name: "failed-startup-idea",
          description: "The 'Uber for Toasters' app that was going to change the world.",
          html_url: "https://github.com",
          pushed_at: "2023-01-01T00:00:00Z",
          created_at: "2023-01-01T00:00:00Z",
          language: "TypeScript",
          stargazers_count: 2,
          topics: ["startup", "fail"],
          epitaph: "Disrupted nothing but your sleep schedule.",
        },
        {
          id: 2,
          name: "abandoned-game-engine",
          description: "A custom C++ engine because Unity wasn't 'optimized' enough.",
          html_url: "https://github.com",
          pushed_at: "2022-05-12T00:00:00Z",
          created_at: "2022-01-01T00:00:00Z",
          language: "C++",
          stargazers_count: 0,
          topics: ["gamedev", "pain"],
          epitaph: "Premature optimization is the root of all abandoned repos.",
        },
        {
          id: 3,
          name: "my-first-blog",
          description: "Gatsby v2 blog that hasn't been updated since Gatsby v5 came out.",
          html_url: "https://github.com",
          pushed_at: "2021-08-20T00:00:00Z",
          created_at: "2021-01-01T00:00:00Z",
          language: "JavaScript",
          stargazers_count: 1,
          topics: ["blog", "deprecated"],
          epitaph: "A static site generator for a static career.",
        }, 
        {
            id: 4,
            name: "crypto-trading-bot",
            description: "Lost $500 in 15 minutes then crashed.",
            html_url: "https://github.com",
            pushed_at: "2021-11-20T00:00:00Z",
            created_at: "2021-11-01T00:00:00Z",
            language: "Python",
            stargazers_count: 0,
            topics: ["crypto", "regret"],
            epitaph: "HODLing onto this codebase forever.",
          }
      ];
    }

    return await Promise.all(filtered.map(async (repo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description ?? null,
      html_url: repo.html_url,
      pushed_at: repo.pushed_at ?? null,
      created_at: repo.created_at ?? null,
      language: repo.language ?? null,
      stargazers_count: repo.stargazers_count ?? 0,
      topics: repo.topics || [],
      epitaph: await generateEpitaph(repo.name, repo.description ?? null),
    })));
  } catch (error) {
    console.error("Error fetching repos:", error);
    // Return mock data on crash too
    return [
        {
          id: 99,
          name: "api-error-log",
          description: "System failed to fetch real data. Enjoy this simulation.",
          html_url: "#",
          pushed_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
          language: "System",
          stargazers_count: 404,
          topics: ["error"],
          epitaph: "Even the API gave up on you.",
        }
    ];
  }
}

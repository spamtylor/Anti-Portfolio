import { Octokit } from "octokit";
import { Repository } from "../types";
import { generateEpitaph } from "./epitaphs";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function getAbandonedRepos(username: string): Promise<Repository[]> {
  try {
    const { data } = await octokit.request("GET /users/{username}/repos", {
      username,
      sort: "pushed",
      direction: "asc", 
      per_page: 100,
    });

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    // Filter, then Map async to get Epitaphs
    const filtered = data.filter((repo) => {
      if (!repo.pushed_at) return true;
      const lastPush = new Date(repo.pushed_at);
      return lastPush < sixMonthsAgo && !repo.fork;
    });

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
    return [];
  }
}

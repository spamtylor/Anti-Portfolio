
const fs = require('fs');
const path = require('path');
const { Octokit } = require("octokit");

// Manual simple env parser
function loadEnv() {
    try {
        const envPath = path.resolve(__dirname, '../.env.local');
        const content = fs.readFileSync(envPath, 'utf8');
        content.split('\n').forEach(line => {
            const match = line.match(/^([^=]+)=(.*)$/);
            if (match) {
                const key = match[1].trim();
                const value = match[2].trim().replace(/^['"]|['"]$/g, ''); // strip quotes
                process.env[key] = value;
            }
        });
    } catch (e) {
        console.warn("Could not read .env.local", e.message);
    }
}

async function testFetch() {
    loadEnv();
    const token = process.env.GITHUB_TOKEN;
    const username = process.env.NEXT_PUBLIC_USERNAME || "octocat";
  
    console.log(`Checking repos for: ${username}`);
    console.log(`Token present: ${!!token ? 'Yes' : 'No'}`);
  
    const octokit = new Octokit({ auth: token });
  
    try {
      const { data } = await octokit.request("GET /users/{username}/repos", {
        username,
        sort: "pushed",
        direction: "asc", 
        per_page: 100,
      });
  
      console.log(`Total Public Repos Found: ${data.length}`);
  
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  
      const abandoned = data.filter((repo) => {
        if (!repo.pushed_at) return true;
        const lastPush = new Date(repo.pushed_at);
        return lastPush < sixMonthsAgo && !repo.fork;
      });
      
      console.log(`Criteria: Older than ${sixMonthsAgo.toISOString().split('T')[0]} and NOT a fork.`);
      console.log(`Abandoned Repos: ${abandoned.length}`);
      
      if (abandoned.length > 0) {
          console.log("\n--- Top 3 Abandoned ---");
          abandoned.slice(0, 3).forEach(r => console.log(`- ${r.name} (Last pushed: ${r.pushed_at})`));
      } else {
          console.log("No abandoned repos found.");
      }
  
    } catch (error) {
      console.error("Error fetching:", error.message);
    }
  }
  
  testFetch();

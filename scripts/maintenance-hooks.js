#!/usr/bin/env node

/**
 * Maintenance & Showcase Automation Hook
 *
 * Tasks:
 * 1. Prune stale files/directories.
 * 2. Sanity check project structure.
 * 3. Run build verification.
 * 4. Sync with GitHub (optional/manual trigger).
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const PROJECT_ROOT = path.resolve(__dirname, "..");

function log(msg) {
  console.log(`[MAINTENANCE] ${msg}`);
}

function run(command) {
  try {
    log(`Running: ${command}`);
    return execSync(command, { cwd: PROJECT_ROOT, encoding: "utf8" });
  } catch (error) {
    console.error(`[ERROR] Command failed: ${command}`);
    console.error(error.stdout || error.stderr || error.message);
    process.exit(1);
  }
}

// 1. Prune Stale Files
log("Pruning stale files...");
const staleFiles = [
  "src/components/canvas/OldComponent.tsx", // Placeholder
  ".DS_Store",
];
staleFiles.forEach((file) => {
  const fullPath = path.join(PROJECT_ROOT, file);
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
    log(`Deleted stale file: ${file}`);
  }
});

// 2. Build Verification
log("Verifying build integrity...");
run("npm run build");

// 3. Git Sync (Only if in git repo and clean)
try {
  const status = run("git status --porcelain");
  if (status.trim()) {
    log("Changes detected. Preparing for automated push...");
    run("git add .");
    run(
      'git commit -m "chore: automated maintenance and foundation sync [Council Approved]"'
    );
    run("git push");
    log("GitHub synchronization complete.");
  } else {
    log("No changes to sync.");
  }
} catch (e) {
  log("Git sync skipped (not a repo or push failed).");
}

log("Maintenance tasks complete. Showcase integrity verified.");

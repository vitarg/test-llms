import { cp, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = resolve(root, "pages-dist");

const projects = [
  { dir: "test-astra", target: "astra" },
  { dir: "test-claude", target: "claude" },
  { dir: "test-fable", target: "fable" },
  { dir: "test-gemma4", target: "gemma4" },
  { dir: "test-gpt", target: "gpt" },
  { dir: "test-laguna-2.1", target: "laguna" },
  { dir: "test-MiMo-V2.6-Pro", target: "mimo" },
  { dir: "test-ornith", target: "ornith" },
  { dir: "test-qwen27b", target: "qwen27b" },
  { dir: "test-Qwen3.6-35B-A3B/expense-tracker", target: "qwen35b" },
];

function run(command, args, cwd) {
  return new Promise((resolvePromise, reject) => {
    const child = spawn(command, args, {
      cwd,
      stdio: "inherit",
      shell: process.platform === "win32",
    });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolvePromise();
      } else {
        reject(new Error(`${command} ${args.join(" ")} failed in ${cwd} (exit ${code})`));
      }
    });
  });
}

async function buildProject(project) {
  const projectDir = resolve(root, project.dir);
  await run("npm", ["run", "build"], projectDir);
  await cp(resolve(projectDir, "dist"), resolve(outputDir, "apps", project.target), {
    recursive: true,
  });
  console.log(`Built ${project.target}`);
}

await rm(outputDir, { recursive: true, force: true });

const builds = projects.map((project) => buildProject(project));
const results = await Promise.allSettled(builds);
const failures = results.filter((result) => result.status === "rejected");

if (failures.length > 0) {
  for (const failure of failures) {
    console.error(failure.reason);
  }
  throw new Error(`${failures.length} of ${projects.length} app builds failed`);
}

await cp(resolve(root, "site"), outputDir, { recursive: true });
await cp(resolve(root, "prompt.md"), resolve(outputDir, "prompt.md"));

console.log(`GitHub Pages bundle is ready: ${outputDir}`);

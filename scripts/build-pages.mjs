import { cp, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = resolve(root, "pages-dist");

const projects = [
  { dir: "test-claude", target: "claude" },
  { dir: "test-gpt", target: "gpt" },
  { dir: "test-qwen27b", target: "qwen27b" },
];

function run(command, args, cwd) {
  const result = spawnSync(command, args, {
    cwd,
    stdio: "inherit",
    shell: process.platform === "win32",
  });

  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(" ")} failed in ${cwd}`);
  }
}

await rm(outputDir, { recursive: true, force: true });

for (const project of projects) {
  const projectDir = resolve(root, project.dir);
  run("npm", ["run", "build"], projectDir);

  await cp(resolve(projectDir, "dist"), resolve(outputDir, "apps", project.target), {
    recursive: true,
  });
}

await cp(resolve(root, "site"), outputDir, { recursive: true });
await cp(resolve(root, "prompt.md"), resolve(outputDir, "prompt.md"));

console.log(`GitHub Pages bundle is ready: ${outputDir}`);

// Assembles a Vercel Build Output API (v3) tree from the TanStack Start
// vite build (dist/client + dist/server). Run AFTER `vite build`.
//   dist/client/*        -> .vercel/output/static/*        (served by filesystem)
//   dist/server/*        -> .vercel/output/functions/index.func/server/*
//   index.func/index.mjs -> Web fetch adapter around dist/server/server.js
import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { build as esbuild } from "esbuild";

const root = process.cwd();
const out = join(root, ".vercel", "output");
const func = join(out, "functions", "index.func");

await rm(out, { recursive: true, force: true });
await mkdir(join(out, "static"), { recursive: true });
await mkdir(func, { recursive: true });

// 1. Static client assets
await cp(join(root, "dist", "client"), join(out, "static"), { recursive: true });

// 2. Bundle the SSR server into one self-contained file. The vite SSR build
//    leaves node deps (h3-v2, react-dom/server, etc.) external, but the Vercel
//    function has no node_modules — so inline everything except node builtins.
await esbuild({
  entryPoints: [join(root, "dist", "server", "server.js")],
  bundle: true,
  platform: "node",
  format: "esm",
  target: "node22",
  outfile: join(func, "server.mjs"),
  banner: {
    js: "import{createRequire as __cr}from'node:module';const require=__cr(import.meta.url);",
  },
  logLevel: "warning",
});

// 3. Node (req,res) -> Web Request/Response adapter around server.js { fetch }.
//    Vercel's Node launcher invokes handler(req, res) and waits for res.end(),
//    so we must bridge to/from the Web fetch handler explicitly.
await writeFile(
  join(func, "index.mjs"),
  [
    `import server from "./server.mjs";`,
    `import { Readable } from "node:stream";`,
    ``,
    `export default async function handler(req, res) {`,
    `  try {`,
    `    const host = req.headers.host || "localhost";`,
    `    const proto = req.headers["x-forwarded-proto"] || "https";`,
    `    const url = new URL(req.url, proto + "://" + host);`,
    `    const method = req.method || "GET";`,
    `    const headers = new Headers();`,
    `    for (const [k, v] of Object.entries(req.headers)) {`,
    `      if (Array.isArray(v)) v.forEach((val) => headers.append(k, val));`,
    `      else if (v != null) headers.set(k, v);`,
    `    }`,
    `    const hasBody = method !== "GET" && method !== "HEAD";`,
    `    const request = new Request(url, {`,
    `      method,`,
    `      headers,`,
    `      body: hasBody ? Readable.toWeb(req) : undefined,`,
    `      duplex: hasBody ? "half" : undefined,`,
    `    });`,
    `    const response = await server.fetch(request, process.env, {});`,
    `    res.statusCode = response.status;`,
    `    response.headers.forEach((value, key) => res.setHeader(key, value));`,
    `    if (response.body) Readable.fromWeb(response.body).pipe(res);`,
    `    else res.end();`,
    `  } catch (err) {`,
    `    console.error(err);`,
    `    res.statusCode = 500;`,
    `    res.end("Internal Server Error");`,
    `  }`,
    `}`,
    ``,
  ].join("\n"),
);

// 4. Mark the function dir as ESM
await writeFile(join(func, "package.json"), JSON.stringify({ type: "module" }, null, 2));

// 5. Vercel function config — Node runtime, Web handler, streaming SSR
await writeFile(
  join(func, ".vc-config.json"),
  JSON.stringify(
    {
      runtime: "nodejs22.x",
      handler: "index.mjs",
      launcherType: "Nodejs",
      shouldAddHelpers: false,
      supportsResponseStreaming: true,
    },
    null,
    2,
  ),
);

// 6. Routing — static files first, everything else to SSR function
await writeFile(
  join(out, "config.json"),
  JSON.stringify(
    {
      version: 3,
      routes: [{ handle: "filesystem" }, { src: "/(.*)", dest: "/index" }],
    },
    null,
    2,
  ),
);

console.log("Built .vercel/output (Build Output API v3)");

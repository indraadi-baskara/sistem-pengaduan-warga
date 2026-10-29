export { default } from "./main.mjs";
export const config = {
  name: "server handler",
  generator: "nuxt@4.6.1",
  path: "/*",
  nodeBundler: "none",
  includedFiles: ["**"],
  excludedPath: ["/.netlify/*","/_nuxt/*"],
  preferStatic: true,
};
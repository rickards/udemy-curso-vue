module.exports = {
  globDirectory: "dist/",
  globPatterns: ["**/*.{html,css,woff,ttf,eot,woff2,png,js,json,svg}"],
  swDest: "dist/sw.js",
  swSrc: "src/pwa/service-worker.js",
  globIgnores: ["src/pwa/workbox-config.js"],
};

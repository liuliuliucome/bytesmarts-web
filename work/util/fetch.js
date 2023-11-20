// node.js V17.5 之后自带fetch，在这之前需要安装第三方
const fetch =
  typeof globalThis.fetch === "function"
    ? globalThis.fetch
    : (...args) =>
        import("node-fetch").then(({ default: fetch }) => fetch(...args));

module.exports = fetch;

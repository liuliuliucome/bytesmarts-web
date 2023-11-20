class Logger {
  static client(...text) {
    if (typeof window !== "undefined") {
      console.log("[client]", ...text);
    }
  }
  static server(...text) {
    if (typeof window === "undefined") {
      console.log("[server]", ...text);
    }
  }
}

module.exports = Logger;

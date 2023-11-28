import * as fs from "node:fs/promises";
import path from "node:path";

export const contentDirPath = "content";

/**
 *
 * @param {import('contentlayer/core').DocumentGen} doc
 * @returns {string}
 */
export const urlFromFilePath = (doc) => {
  let urlPath = doc._raw.flattenedPath.replace(/^pages\/?/, "/");
  if (!urlPath.startsWith("/")) urlPath = `/${urlPath}`;
  if ("global_id" in doc) urlPath += `-${doc.global_id}`;
  // Remove preceding indexes from path segments
  urlPath = urlPath
    .split("/")
    .map((segment) => segment.replace(/^\d\d\d\-/, ""))
    .join("/");
  return urlPath;
};

/**
 *
 * @param {import('contentlayer/core').DocumentGen} doc
 * @returns {Promise<Date>}
 */
export const getLastEditedDate = async (doc) => {
  if (doc.date) {
    return new Date(doc.date);
  }

  const stats = await fs.stat(
    path.join(contentDirPath, doc._raw.sourceFilePath),
  );
  return stats.mtime;
};

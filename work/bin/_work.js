const { execSync } = require("child_process");
const { join } = require("path");

const husky = require("husky");

const pkg = require("../../package.json");
const { rootPath } = require("../config/path.config");

function main() {
  if (
    !(
      pkg.devDependencies["cz-conventional-changelog"] ||
      pkg.dependencies["cz-conventional-changelog"]
    )
  ) {
    execSync(
      "npx commitizen init cz-conventional-changelog --save-dev --save-exact",
    );
  }

  execSync("npm init release-it");

  husky.install();
  husky.add(
    join(rootPath, ".husky/commit-msg"),
    'npx --no -- commitlint --edit "$1"',
  );
}
main();

import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, extname } from "path";

function wrapMultiplicationWithCalc(line) {
  return line.replace(
    /  (--[\w-]+:\s*)([^;]+)(;)/g,
    (match, property, value, semicolon) => {
      if (/\*/.test(value)) {
        return `  ${property}calc(${value})${semicolon}`;
      }
      return line;
    },
  );
}

function processCSSFile(filePath) {
  const fileContent = readFileSync(filePath, "utf-8");
  const lines = fileContent.split("\n");

  const modifiedLines = lines.map((line) => {
    return wrapMultiplicationWithCalc(line);
  });

  const modifiedContent = modifiedLines.join("\n");

  writeFileSync(filePath, modifiedContent, "utf-8");
  console.log(`Processed: ${filePath}`);
}

function processCSSFilesInDirectory(directoryPath) {
  console.log("directoryPath: ", directoryPath)
  const files = readdirSync(directoryPath);

  files.forEach((file) => {
    const filePath = join(directoryPath, file);

    if (statSync(filePath).isDirectory()) {
      processCSSFilesInDirectory(filePath);
    } else if (extname(filePath) === ".css") {
      processCSSFile(filePath);
    }
  });
}

const rootDirectory = "./css";

processCSSFilesInDirectory(rootDirectory);

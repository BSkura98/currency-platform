import { readFileSync } from "fs";

export const helpHandler = () => {
  try {
    const content = readFileSync("commands.txt", "utf-8");
    console.log(content);
  } catch (error) {
    console.error("Error reading file:", error);
  }
};

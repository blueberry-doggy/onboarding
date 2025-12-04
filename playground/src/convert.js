import * as temperature from "./lib/temperature.js";
import * as distance from "./lib/distance.js";
import * as weight from "./lib/weight.js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const defaults = JSON.parse(
  readFileSync(join(__dirname, "../config/defaults.json"), "utf-8")
);

export function convert(type, value, from, to) {
  // Validate that value is numeric
  const numericValue = Number(value);
  if (isNaN(numericValue)) {
    throw new Error("Invalid input: value must be a valid number");
  }

  let result;
  switch (type) {
    case "temperature":
      result = temperature.convertTemperature(
        numericValue,
        from || defaults.temperature.defaultFrom,
        to || defaults.temperature.defaultTo
      );
      break;
    case "distance":
      result = distance.convertDistance(numericValue, from, to);
      break;
    case "weight":
      result = weight.convertWeight(numericValue, from, to);
      break;
    default:
      throw new Error("Unknown type " + type);
  }

  // Apply precision rounding
  return Number(result.toFixed(defaults.precision));
}

import { test } from "node:test";
import { strictEqual, throws } from "node:assert";
import { convert } from "../src/convert.js";

// Tests for input validation
// These tests should FAIL initially and pass after implementing validation

test("rejects non-numeric value", () => {
  throws(
    () => convert("temperature", "abc", "C", "F"),
    /invalid.*number|numeric/i,
    "Should throw error for non-numeric input"
  );
});

test("rejects NaN value", () => {
  throws(
    () => convert("temperature", NaN, "C", "F"),
    /invalid.*number|numeric/i,
    "Should throw error for NaN"
  );
});

test("rejects unknown conversion type", () => {
  throws(
    () => convert("volume", 100, "L", "gal"),
    /unknown.*type/i,
    "Should throw error for unsupported conversion type"
  );
});

test("accepts valid numeric strings", () => {
  // Should convert string to number and process
  const result = convert("temperature", "100", "C", "F");
  strictEqual(result, 212);
});

test("accepts negative values", () => {
  const result = convert("temperature", -40, "C", "F");
  strictEqual(result, -40); // -40°C = -40°F (special case!)
});

test("accepts zero", () => {
  const result = convert("temperature", 0, "C", "F");
  strictEqual(result, 32);
});

// Unit code validation tests
test("rejects unknown temperature unit (from)", () => {
  throws(
    () => convert("temperature", 100, "R", "F"),
    /unknown.*unit/i,
    "Should throw error for unknown temperature unit"
  );
});

test("rejects unknown temperature unit (to)", () => {
  throws(
    () => convert("temperature", 100, "C", "R"),
    /unknown.*unit/i,
    "Should throw error for unknown temperature unit"
  );
});

test("rejects unknown distance unit (from)", () => {
  throws(
    () => convert("distance", 100, "ft", "km"),
    /unknown.*unit/i,
    "Should throw error for unknown distance unit"
  );
});

test("rejects unknown distance unit (to)", () => {
  throws(
    () => convert("distance", 100, "km", "ft"),
    /unknown.*unit/i,
    "Should throw error for unknown distance unit"
  );
});

test("rejects unknown weight unit (from)", () => {
  throws(
    () => convert("weight", 100, "kg", "g"),
    /unknown.*unit/i,
    "Should throw error for unknown weight unit"
  );
});

test("rejects unknown weight unit (to)", () => {
  throws(
    () => convert("weight", 100, "g", "kg"),
    /unknown.*unit/i,
    "Should throw error for unknown weight unit"
  );
});

test("rejects invalid unit codes (case sensitivity)", () => {
  throws(
    () => convert("temperature", 100, "c", "f"),
    /unknown.*unit/i,
    "Unit codes should be case-sensitive"
  );
});

test("rejects completely invalid unit codes", () => {
  throws(
    () => convert("distance", 100, "xyz", "abc"),
    /unknown.*unit/i,
    "Should throw error for nonsense unit codes"
  );
});

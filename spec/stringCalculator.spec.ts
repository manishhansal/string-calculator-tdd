import { StringCalculator } from "../src/stringCalculator";

describe("String Calculator", () => {
  let calculator: StringCalculator;

  beforeEach(() => {
    calculator = new StringCalculator();
  });

  // 1. Base Case
  it("should return 0 for an empty string", () => {
    expect(calculator.add("")).toBe(0);
  });

  // 2. Single Numbers
  it("should return the number itself for a single positive number", () => {
    expect(calculator.add("5")).toBe(5);
    expect(calculator.add("123")).toBe(123);
  });

  it("should handle a single zero", () => {
    expect(calculator.add("0")).toBe(0);
  });

  it("should ignore leading and trailing spaces", () => {
    expect(calculator.add(" 42 ")).toBe(42);
    expect(calculator.add("9   ")).toBe(9);
  });

  it("should throw an error for a single negative number", () => {
    expect(() => calculator.add("-7")).toThrowError("negative numbers not allowed -7");
    expect(() => calculator.add("-100")).toThrowError("negative numbers not allowed -100");
    expect(() => calculator.add("   -8")).toThrowError("negative numbers not allowed -8");
  });

  it("should throw an error for non-numeric input", () => {
    expect(() => calculator.add("abc")).toThrow("Input must be a valid number");
    expect(() => calculator.add("!@#")).toThrow("Input must be a valid number");
    expect(() => calculator.add("5a")).toThrow("Input must be a valid number");
  });

  it("should throw an error for null or undefined input", () => {
    // @ts-ignore
    expect(() => calculator.add(null)).toThrow("Input cannot be null or undefined");
    // @ts-ignore
    expect(() => calculator.add(undefined)).toThrow("Input cannot be null or undefined");
  });

});

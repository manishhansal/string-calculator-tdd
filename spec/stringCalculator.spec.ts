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
    expect(() => calculator.add("abc")).toThrowError("Input must be a valid number");
    expect(() => calculator.add("!@#")).toThrowError("Input must be a valid number");
    expect(() => calculator.add("5a")).toThrowError("Input must be a valid number");
  });

  // 3. Two Numbers
  it("should return the sum of two positive numbers", () => {
    expect(calculator.add("5,10")).toBe(15);
    expect(calculator.add("20,30")).toBe(50);
  });

  it("should handle two zeros", () => {
    expect(calculator.add("0,0")).toBe(0);
  });

  it("should handle one zero and one positive number", () => {
    expect(calculator.add("0,7")).toBe(7);
    expect(calculator.add("8,0")).toBe(8);
  });

  it("should ignore leading and trailing spaces for both numbers", () => {
    expect(calculator.add(" 3 , 4 ")).toBe(7);
    expect(calculator.add("  12,34")).toBe(46);
    expect(calculator.add("56,  78 ")).toBe(134);
  });

  it("should throw an error if either number is negative", () => {
    expect(() => calculator.add("-5,10")).toThrowError("negative numbers not allowed -5");
    expect(() => calculator.add("10,-5")).toThrowError("negative numbers not allowed -5");
    expect(() => calculator.add("-20,30")).toThrowError("negative numbers not allowed -20");
    expect(() => calculator.add("30,-20")).toThrowError("negative numbers not allowed -20");
    expect(() => calculator.add("   -8,15")).toThrowError("negative numbers not allowed -8");
    expect(() => calculator.add("15,   -8")).toThrowError("negative numbers not allowed -8");
    expect(() => calculator.add(" -3 , -4 ")).toThrowError("negative numbers not allowed -3,-4");
    expect(() => calculator.add("-12,0")).toThrowError("negative numbers not allowed -12");
    expect(() => calculator.add("0,-12")).toThrowError("negative numbers not allowed -12");
  });

  it("should throw an error for two negative numbers", () => {
    expect(() => calculator.add("-5,-10")).toThrowError("negative numbers not allowed -5,-10");
    expect(() => calculator.add("-20,-30")).toThrowError("negative numbers not allowed -20,-30");
  });

  it("should throw an error for non-numeric input in either number", () => {
    expect(() => calculator.add("abc,5")).toThrowError("Input must be a valid number");
    expect(() => calculator.add("5,xyz")).toThrowError("Input must be a valid number");
    expect(() => calculator.add("!,@")).toThrowError("Input must be a valid number");
    expect(() => calculator.add("7a,8")).toThrowError("Input must be a valid number");
    expect(() => calculator.add("8,9b")).toThrowError("Input must be a valid number");
  });

});

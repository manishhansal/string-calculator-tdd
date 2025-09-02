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

  // 4. Multiple Numbers
  it("should return the sum of multiple positive numbers", () => {
    expect(calculator.add("1,2,3")).toBe(6);
    expect(calculator.add("10,20,30,40")).toBe(100);
    expect(calculator.add("5,10,15,20,25")).toBe(75);
  });

  it("should handle zeros among multiple numbers", () => {
    expect(calculator.add("0,1,2")).toBe(3);
    expect(calculator.add("0,0,0")).toBe(0);
    expect(calculator.add("7,0,8")).toBe(15);
  });

  it("should ignore leading and trailing spaces for all numbers", () => {
    expect(calculator.add(" 1 , 2 , 3 ")).toBe(6);
    expect(calculator.add("  4,5, 6 ")).toBe(15);
    expect(calculator.add("7 ,8 , 9 ")).toBe(24);
  });

  it("should throw an error if any number is negative", () => {
    expect(() => calculator.add("1,-2,3")).toThrowError("negative numbers not allowed -2");
    expect(() => calculator.add("-1,2,3")).toThrowError("negative numbers not allowed -1");
    expect(() => calculator.add("1,2,-3")).toThrowError("negative numbers not allowed -3");
    expect(() => calculator.add("1,-2,-3")).toThrowError("negative numbers not allowed -2,-3");
    expect(() => calculator.add("-1,-2,-3")).toThrowError("negative numbers not allowed -1,-2,-3");
  });

  it("should throw an error for non-numeric input among multiple numbers", () => {
    expect(() => calculator.add("1,2,a")).toThrowError("Input must be a valid number");
    expect(() => calculator.add("b,2,3")).toThrowError("Input must be a valid number");
    expect(() => calculator.add("1,!,3")).toThrowError("Input must be a valid number");
    expect(() => calculator.add("1,2,3c")).toThrowError("Input must be a valid number");
  });

  it("should throw an error for empty values between commas", () => {
    expect(() => calculator.add("1,,2")).toThrowError("Input must be a valid number");
    expect(() => calculator.add(",2,3")).toThrowError("Input must be a valid number");
    expect(() => calculator.add("1,2,")).toThrowError("Input must be a valid number");
  });

  // 5. Handle Newline Delimiters
  it("should return the sum when numbers are separated by newlines", () => {
    expect(calculator.add("1\n2")).toBe(3);
    expect(calculator.add("10\n20")).toBe(30);
    expect(calculator.add("5\n10\n15")).toBe(30);
  });

  it("should handle mixed commas and newlines as delimiters", () => {
    expect(calculator.add("1,2\n3")).toBe(6);
    expect(calculator.add("4\n5,6")).toBe(15);
    expect(calculator.add("7,8\n9,10")).toBe(34);
  });

  it("should handle zeros with newlines", () => {
    expect(calculator.add("0\n0")).toBe(0);
    expect(calculator.add("0,1\n2")).toBe(3);
  });

  it("should ignore leading and trailing spaces with newlines", () => {
    expect(calculator.add(" 1 \n 2 , 3 ")).toBe(6);
    expect(calculator.add("  4\n5, 6 ")).toBe(15);
    expect(calculator.add("7 ,8 \n 9 ")).toBe(24);
  });

  it("should throw an error if any number is negative with newlines", () => {
    expect(() => calculator.add("1\n-2,3")).toThrowError("negative numbers not allowed -2");
    expect(() => calculator.add("-1\n2,3")).toThrowError("negative numbers not allowed -1");
    expect(() => calculator.add("1,2\n-3")).toThrowError("negative numbers not allowed -3");
    expect(() => calculator.add("1,-2\n-3")).toThrowError("negative numbers not allowed -2,-3");
    expect(() => calculator.add("-1\n-2\n-3")).toThrowError("negative numbers not allowed -1,-2,-3");
  });

  it("should throw an error for non-numeric input with newlines", () => {
    expect(() => calculator.add("1\n2\na")).toThrowError("Input must be a valid number");
    expect(() => calculator.add("b\n2,3")).toThrowError("Input must be a valid number");
    expect(() => calculator.add("1\n!\n3")).toThrowError("Input must be a valid number");
    expect(() => calculator.add("1,2\n3c")).toThrowError("Input must be a valid number");
  });

  it("should throw an error for empty values between delimiters", () => {
    expect(() => calculator.add("1\n\n2")).toThrowError("Input must be a valid number");
    expect(() => calculator.add("1,2,\n")).toThrowError("Input must be a valid number");
    expect(() => calculator.add("1,\n2")).toThrowError("Input must be a valid number");
  });

  // 6. Support different delimiters (Custom Delimiters)
  it("should support custom single-character delimiter", () => {
    expect(calculator.add("//;\n1;2")).toBe(3);
    expect(calculator.add("//|\n4|5|6")).toBe(15);
    expect(calculator.add("//-\n7-8-9")).toBe(24);
  });

  it("should support custom multi-character delimiter in brackets", () => {
    expect(calculator.add("//[***]\n1***2***3")).toBe(6);
    expect(calculator.add("//[abc]\n4abc5abc6")).toBe(15);
    expect(calculator.add("//[--]\n7--8--9")).toBe(24);
  });

  it("should support custom delimiter with mixed whitespace", () => {
    expect(calculator.add("//[***]\n 1 *** 2 *** 3 ")).toBe(6);
    expect(calculator.add("//[;]\n 4 ; 5 ; 6 ")).toBe(15);
  });

  it("should throw an error for negative numbers with custom delimiter", () => {
    expect(() => calculator.add("//;\n1;-2")).toThrowError("negative numbers not allowed -2");
    expect(() => calculator.add("//[***]\n-1***-2***3")).toThrowError("negative numbers not allowed -1,-2");
  });

  it("should throw an error for non-numeric input with custom delimiter", () => {
    expect(() => calculator.add("//;\n1;a")).toThrowError("Input must be a valid number");
    expect(() => calculator.add("//[***]\n1***b***3")).toThrowError("Input must be a valid number");
  });

  it("should throw an error for empty values between custom delimiters", () => {
    expect(() => calculator.add("//;\n1;;2")).toThrowError("Input must be a valid number");
    expect(() => calculator.add("//[***]\n1*** ***2")).toThrowError("Input must be a valid number");
    expect(() => calculator.add("//[abc]\nabc2abc3")).toThrowError("Input must be a valid number");
    expect(() => calculator.add("//[--]\n1--2--")).toThrowError("Input must be a valid number");
  });

  // 7. Support multiple custom delimiters
  it("should support multiple custom single-character delimiters", () => {
    expect(calculator.add("//[;][|]\n1;2|3")).toBe(6);
    expect(calculator.add("//[;][,]\n4;5,6")).toBe(15);
    expect(calculator.add("//[|][*]\n7|8*9")).toBe(24);
  });

  it("should support multiple custom multi-character delimiters", () => {
    expect(calculator.add("//[***][%%]\n1***2%%3")).toBe(6);
    expect(calculator.add("//[abc][--]\n4abc5--6")).toBe(15);
    expect(calculator.add("//[##][@@]\n7##8@@9")).toBe(24);
  });

  it("should support multiple delimiters with mixed whitespace", () => {
    expect(calculator.add("//[***][;]\n 1 *** 2 ; 3 ")).toBe(6);
    expect(calculator.add("//[;][|]\n 4 ; 5 | 6 ")).toBe(15);
  });

  it("should throw an error for negative numbers with multiple custom delimiters", () => {
    expect(() => calculator.add("//[;][|]\n1;-2|3")).toThrowError("negative numbers not allowed -2");
    expect(() => calculator.add("//[***][%%]\n-1***-2%%3")).toThrowError("negative numbers not allowed -1,-2");
  });

  it("should throw an error for non-numeric input with multiple custom delimiters", () => {
    expect(() => calculator.add("//[;][|]\n1;2|a")).toThrowError("Input must be a valid number");
    expect(() => calculator.add("//[***][%%]\n1***b%%3")).toThrowError("Input must be a valid number");
  });

  it("should throw an error for empty values between multiple custom delimiters", () => {
    expect(() => calculator.add("//[;][|]\n1;;2|3")).toThrowError("Input must be a valid number");
    expect(() => calculator.add("//[***][%%]\n1*** ***2%%3")).toThrowError("Input must be a valid number");
    expect(() => calculator.add("//[abc][--]\nabc2--3")).toThrowError("Input must be a valid number");
    expect(() => calculator.add("//[##][@@]\n7##8@@")).toThrowError("Input must be a valid number");
  });

});

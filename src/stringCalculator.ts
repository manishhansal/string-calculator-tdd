export class StringCalculator {

  add(numbers: string): number {

    // Trim spaces
    const trimmedString = numbers.trim();

    // Base case: empty string
    if (trimmedString === "") {
      return 0;
    }

    // Split by comma for multiple numbers
    if (trimmedString.includes(",")) {
      const parts = trimmedString.split(",").map(part => part.trim());

      // Check for empty values between commas
      if (parts.some(part => part === "")) {
        throw new Error("Input must be a valid number");
      }

      // Validate all numbers
      const invalid = parts.some(part => !/^[-+]?\d+$/.test(part));
      if (invalid) {
        throw new Error("Input must be a valid number");
      }

      const nums = parts.map(part => parseInt(part, 10));
      const negatives = nums.filter(n => n < 0);

      if (negatives.length === 1) {
        throw new Error(`negative numbers not allowed ${negatives[0]}`);
      }
      if (negatives.length > 1) {
        throw new Error(`negative numbers not allowed ${negatives.join(",")}`);
      }

      return nums.reduce((sum, n) => sum + n, 0);
    }

    // Single number case
    if (!/^[-+]?\d+$/.test(trimmedString)) {
      throw new Error("Input must be a valid number");
    }

    const num = parseInt(trimmedString, 10);

    // Negative number case
    if (num < 0) {
      throw new Error(`negative numbers not allowed ${num}`);
    }

    return num;
  }

};

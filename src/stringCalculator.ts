export class StringCalculator {

  add(numbers: string): number {

    // Trim spaces
    const trimmed = numbers.trim();

    // Base case: empty string
    if (trimmed === "") {
      return 0;
    }

    // Check for two numbers separated by comma
    if (trimmed.includes(",")) {
      const parts = trimmed.split(",").map(part => part.trim());
      if (parts.length !== 2) {
        throw new Error("Input must be one or two numbers separated by a comma");
      }

      // Validate both numbers
      const invalid = parts.some(part => !/^[-+]?\d+$/.test(part));
      if (invalid) {
        throw new Error("Input must be a valid number");
      }

      const nums = parts.map(part => parseInt(part, 10));
      const negatives = nums.filter(n => n < 0);

      if (negatives.length === 1) {
        throw new Error(`negative numbers not allowed ${negatives[0]}`);
      }
      if (negatives.length === 2) {
        throw new Error(`negative numbers not allowed ${negatives[0]},${negatives[1]}`);
      }

      return nums[0] + nums[1];
    }

    // Single number case
    if (!/^[-+]?\d+$/.test(trimmed)) {
      throw new Error("Input must be a valid number");
    }

    const num = parseInt(trimmed, 10);

    // Negative number case
    if (num < 0) {
      throw new Error(`negative numbers not allowed ${num}`);
    }

    return num;
  }

};

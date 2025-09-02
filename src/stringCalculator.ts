export class StringCalculator {

  add(numbers: string): number {

    // Trim spaces
    const trimmedString = numbers.trim();

    // Base case: empty string
    if (trimmedString === "") {
      return 0;
    }

    // Check for empty values between delimiters (including mixed delimiters)
    if (
      /^[,\n\s]+/.test(trimmedString) || // starts with delimiter or spaces
      /[,\n\s]+$/.test(trimmedString) || // ends with delimiter or spaces
      /([,\n]\s*[,\n])/.test(trimmedString) // consecutive delimiters (with optional spaces)
    ) {
      throw new Error("Input must be a valid number");
    }

    // Replace all newlines with commas to unify delimiters
    const unified = trimmedString.replace(/\n/g, ",");

    // Split by comma for multiple numbers
    const parts = unified.split(",").map(part => part.trim());

    // Check for empty values between delimiters
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

};

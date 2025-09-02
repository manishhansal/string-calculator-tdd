export class StringCalculator {

  add(numbers: string): number {

    // Trim spaces
    const trimmed = numbers.trim();

    // Base case: empty string
    if (trimmed === "") {
      return 0;
    }

    // Check if valid number (integer)
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

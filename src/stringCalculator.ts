export class StringCalculator {

  add(numbers: string): number {

    if (!numbers.trim()) return 0;

    let delimiterPattern = /,|\n/; // default delimiters

    let input = numbers.trim();

    // Handle custom delimiter syntax
    if (input.startsWith("//")) {

      const delimiterSectionEnd = input.indexOf("\n");

      const delimiterSection = input.substring(2, delimiterSectionEnd);

      input = input.substring(delimiterSectionEnd + 1);

      // Multi-delimiter in [] syntax (can be multiple and multi-char)
      const multipleDelimiters = [...delimiterSection.matchAll(/\[(.+?)\]/g)].map(m => m[1]);

      if (multipleDelimiters.length > 0) {
        // Escape regex special characters in delimiters
        const escaped = multipleDelimiters.map(d => d.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
        delimiterPattern = new RegExp(escaped.join("|"));
      } else {
        // Single-character delimiter (no brackets)
        const singleDelimiter = delimiterSection.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        delimiterPattern = new RegExp(singleDelimiter);
      }
    }

    // Split input into tokens
    const tokens = input.split(delimiterPattern).map(t => t.trim());

    // Validate tokens
    const numbersList: number[] = [];
    const negatives: number[] = [];

    for (const token of tokens) {

      if (token === "") {
        throw new Error("Input must be a valid number");
      }

      const parsed = Number(token);

      if (isNaN(parsed)) {
        throw new Error("Input must be a valid number");
      }

      if (parsed < 0) {
        negatives.push(parsed);
      }

      // Ignoring numbers > 1000
      if (parsed <= 1000) {
        numbersList.push(parsed);
      }

    }

    // Handling negative integers
    if (negatives.length > 0) {

      throw new Error("negative numbers not allowed " + negatives.join(","));

    }

    return numbersList.reduce((sum, n) => sum + n, 0);
  }
}

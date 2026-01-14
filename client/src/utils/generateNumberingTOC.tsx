export function generateNumberingTOC(
  headings: { id: string; text: string; level: number }[]
) {
  const counters = [0, 0, 0, 0];
  return headings.map((h) => {
    const level = h.level;
    counters[level]++;
    for (let i = level + 1; i < counters.length; i++) {
      counters[i] = 0;
    }
    const numbering = counters
      .slice(2, level + 1)
      .filter(Boolean)
      .join(".");
    return {
      ...h,
      numbering,
    };
  });
}

export default function(from: number, to: number, step: number = 1) {
  let i: number = from;
  const range: number[] = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
}
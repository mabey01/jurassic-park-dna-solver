export function popRandomEntry<T>(array: T[]): T {
  const randomIndex = Math.round(Math.random() * (array.length - 1));
  const randomEntry = array[randomIndex];
  array.splice(randomIndex, 1);

  return randomEntry;
}

type GenericEntry = {
  id: string;
};

export function getIndexById<T extends GenericEntry>(array: T[], id: string) {
  return array.findIndex((entry) => entry.id === id);
}

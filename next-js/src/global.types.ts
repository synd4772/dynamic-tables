export const SortDirection = {
  asc: 'asc',
  desc: 'desc',
} as const;

export type SortDirection = typeof SortDirection[keyof typeof SortDirection];
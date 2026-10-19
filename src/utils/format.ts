export const formatINR = (amount: number): string => `₹${amount.toLocaleString('en-IN')}`;

export const todayLabel = (): string =>
  new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

export const randomId = (prefix: string, digits = 6): string => {
  const min = Math.pow(10, digits - 1);
  return `${prefix}-${Math.floor(min + Math.random() * 9 * min)}`;
};

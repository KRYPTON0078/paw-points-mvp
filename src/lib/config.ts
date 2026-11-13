export const rules = {
  votesPerDay: 3, carePerDay: 3, maxCartQuantity: 20,
  points: { firstFollow: 20, checkin: 5, interaction: 10, perMop: 1, referral: 30 },
  xp: { checkin: 20, interaction: 30, care: 5, weeklyBonus: 40 },
  levels: [0, 100, 300, 800],
} as const;
export const names = ['First Encounter', 'Close Friend', 'Best Companion', 'Lifelong Companion'];
export const carePackages = [
  {id: 'comfort', name: 'Comfort essentials', price: 15},
  {id: 'enrichment', name: 'Enrichment support', price: 20},
  {id: 'wellbeing', name: 'Wellbeing fund', price: 30},
];
export const themes = ['Peach garden', 'Lavender dreams', 'Cat constellation'];

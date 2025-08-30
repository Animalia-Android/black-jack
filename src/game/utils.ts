import type { Card, Rank, Suit } from './types';

export function createDeck(): Card[] {
  const suits: Suit[] = ['♠', '♥', '♦', '♣'];
  const ranks: { r: Rank; v: number }[] = [
    { r: 'A', v: 11 },
    { r: '2', v: 2 },
    { r: '3', v: 3 },
    { r: '4', v: 4 },
    { r: '5', v: 5 },
    { r: '6', v: 6 },
    { r: '7', v: 7 },
    { r: '8', v: 8 },
    { r: '9', v: 9 },
    { r: '10', v: 10 },
    { r: 'J', v: 10 },
    { r: 'Q', v: 10 },
    { r: 'K', v: 10 },
  ];
  const deck: Card[] = [];
  for (const s of suits)
    for (const { r, v } of ranks) deck.push({ rank: r, suit: s, value: v });
  return shuffle(deck);
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function handTotal(cards: Card[]): number {
  let total = 0,
    aces = 0;
  for (const c of cards) {
    total += c.value;
    if (c.rank === 'A') aces++;
  }
  while (total > 21 && aces > 0) {
    total -= 10;
    aces--;
  }
  return total;
}

export function isBlackjack(cards: Card[]): boolean {
  return cards.length === 2 && handTotal(cards) === 21;
}

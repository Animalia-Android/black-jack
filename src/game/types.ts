export type Suit = '♠' | '♥' | '♦' | '♣';
export type Rank =
  | 'A'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | 'J'
  | 'Q'
  | 'K';
export type Phase = 'ready' | 'player' | 'dealer' | 'done';

export interface Card {
  rank: Rank;
  suit: Suit;
  value: number;
}
export interface HandState {
  cards: Card[];
}
export interface GameState {
  deck: Card[];
  player: HandState;
  dealer: HandState;
  phase: Phase;
  message: string;
  outcome: null | 'win' | 'lose' | 'push';
  balance: number;
  bet: number;
}

export type Action =
  | { type: 'NEW_GAME' }
  | { type: 'DEAL' }
  | { type: 'HIT' }
  | { type: 'STAND' }
  | { type: 'SET_BET'; amount: number }
  | { type: 'ADD_FUNDS'; amount: number };

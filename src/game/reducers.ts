import type { Action, GameState } from './types';
import { createDeck, handTotal, isBlackjack } from './utils';

export const initialState: GameState = {
  deck: createDeck(),
  player: { cards: [] },
  dealer: { cards: [] },
  phase: 'ready',
  message: 'Click Deal to start',
  outcome: null,
  balance: 1000,
  bet: 0,
};

export function reducer(state: GameState, action: Action): GameState {
  console.log('Action:', action);
  switch (action.type) {
    case 'NEW_GAME':
      return { ...initialState, deck: createDeck() };

    case 'DEAL': {
      const deck = state.deck.length < 10 ? createDeck() : [...state.deck];
      const player = { cards: [deck.shift()!, deck.shift()!] };
      const dealer = { cards: [deck.shift()!, deck.shift()!] };

      const playerBJ = isBlackjack(player.cards);
      const dealerBJ = isBlackjack(dealer.cards);
      if (playerBJ || dealerBJ) {
        let outcome: GameState['outcome'] = 'push';
        let message = 'Both blackjack. Push.';
        if (playerBJ && !dealerBJ) {
          outcome = 'win';
          message = 'Blackjack! You win.';
          console.log('Player blackjack', Math.floor(state.bet * 1.5));
        } else if (!playerBJ && dealerBJ) {
          outcome = 'lose';
          message = 'Dealer blackjack.';
          console.log('Dealer blackjack', state.bet);
        }
        return {
          deck,
          player,
          dealer,
          phase: 'done',
          message,
          outcome,
          balance:
            state.balance +
            (outcome === 'win'
              ? Math.floor(state.bet * 1.5)
              : outcome === 'lose'
              ? -state.bet
              : 0),
          bet: state.bet,
        };
      }
      return {
        deck,
        player,
        dealer,
        phase: 'player',
        message: 'Your turn: Hit or Stand',
        outcome: null,
        balance: state.balance,
        bet: state.bet,
      };
    }

    case 'HIT': {
      if (state.phase !== 'player') return state;
      const deck = [...state.deck];
      const player = { cards: [...state.player.cards, deck.shift()!] };
      if (handTotal(player.cards) > 21) {
        return {
          ...state,
          deck,
          player,
          phase: 'done',
          outcome: 'lose',
          message: 'You busted. Dealer wins.',
          balance: state.balance - state.bet,
        };
      }
      return { ...state, deck, player, message: 'Your turn: Hit or Stand' };
    }

    case 'STAND': {
      if (state.phase !== 'player') return state;
      const deck = [...state.deck];
      const dealer = { cards: [...state.dealer.cards] };
      while (handTotal(dealer.cards) < 17) dealer.cards.push(deck.shift()!);
      const pt = handTotal(state.player.cards);
      const dt = handTotal(dealer.cards);
      let outcome: GameState['outcome'];
      let message: string;
      if (pt > 21) {
        outcome = 'lose';
        message = 'You busted. Dealer wins.';
      } else if (dt > 21) {
        outcome = 'win';
        message = 'Dealer busted. You win!';
      } else if (pt > dt) {
        outcome = 'win';
        message = 'You win!';
      } else if (pt < dt) {
        outcome = 'lose';
        message = 'Dealer wins.';
      } else {
        outcome = 'push';
        message = 'Push.';
      }

      let balance = state.balance;
      console.log('Outcome:', outcome, 'Bet:', state.bet);

      if (outcome === 'win') balance += state.bet; // even payout for MVP
      else if (outcome === 'lose') balance -= state.bet;

      return {
        ...state,
        deck,
        dealer,
        phase: 'done',
        outcome,
        message,
        balance,
      };
    }

    case 'SET_BET': {
      const amt = Math.max(1, Math.floor(action.amount || 0));
      // optional guard so you can't bet more than you have:
      const capped = Math.min(amt, state.balance);
      return { ...state, bet: capped };
    }

    case 'ADD_FUNDS':
      return { ...state, balance: state.balance + Math.max(0, action.amount) };

    default:
      return state;
  }
}

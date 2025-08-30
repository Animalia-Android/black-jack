import { useEffect, useReducer } from 'react';
import { reducer, initialState } from '../game/reducers';
import Hand from '../components/Hand';
import Controls from '../components/Controls';
import { Collapsible } from '../components/Collapsible';

export default function BlackjackPage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const canHit = state.phase === 'player';
  const canStand = state.phase === 'player';
  const canDeal = state.phase === 'ready' || state.phase === 'done';

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === 'd') dispatch({ type: 'DEAL' });
      if (k === 'h') dispatch({ type: 'HIT' });
      if (k === 's') dispatch({ type: 'STAND' });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // BlackjackPage.tsx
  useEffect(() => {
    const saved = localStorage.getItem('bj_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      // restore only the money/bet if you want
      if (
        typeof parsed.balance === 'number' &&
        typeof parsed.bet === 'number'
      ) {
        dispatch({
          type: 'ADD_FUNDS',
          amount: parsed.balance - initialState.balance,
        });
        dispatch({ type: 'SET_BET', amount: parsed.bet });
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'bj_state',
      JSON.stringify({ balance: state.balance, bet: state.bet })
    );
  }, [state.balance, state.bet]);

  return (
    <div className="bg-emerald-700 rounded-xl text-stone-100 flex items-center justify-center p-20">
      <div className="w-full max-w-3xl rounded-2xl border border-stone-800 bg-stone-900/60 backdrop-blur p-6 shadow-2xl">
        <header className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight">Dealers Table</h1>
          <button
            className="px-3 py-2 text-sm rounded-lg bg-stone-800 border border-stone-700 hover:bg-stone-700"
            onClick={() => dispatch({ type: 'NEW_GAME' })}
          >
            New Deck
          </button>
        </header>

        <div className="grid gap-6">
          <section className="space-y-3">
            <Hand
              title="Dealer"
              cards={state.dealer.cards}
              hideHole={state.phase === 'player'}
            />
            <div className="h-px bg-stone-800" />
            <Hand title="You" cards={state.player.cards} />
          </section>
          <p className="text-sm text-stone-300">{state.message}</p>
          <span className="h-px bg-stone-800"></span>
          <div className="flex items-center justify-between text-sm text-stone-300">
            <div className="bg-white/10 rounded-md px-3 py-1">
              Balance: ${state.balance}
            </div>
            <label className="bg-white/10 rounded-md flex items-center gap-2 px-3 py-1">
              Bet:
              <input
                type="number"
                min={1}
                max={state.balance}
                value={state.bet}
                onChange={(e) =>
                  dispatch({ type: 'SET_BET', amount: Number(e.target.value) })
                }
                className="w-20 rounded bg-stone-800 border border-stone-700 px-2 py-1"
              />
            </label>
          </div>

          <Controls
            canDeal={canDeal}
            canHit={canHit}
            canStand={canStand}
            onDeal={() => dispatch({ type: 'DEAL' })}
            onHit={() => dispatch({ type: 'HIT' })}
            onStand={() => dispatch({ type: 'STAND' })}
          />
          {state.phase === 'done' && (
            <div className="mt-2 text-sm">
              <span
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg border ${
                  state.outcome === 'win'
                    ? 'bg-emerald-900/40 border-emerald-700 text-emerald-300'
                    : state.outcome === 'lose'
                    ? 'bg-rose-900/40 border-rose-700 text-rose-300'
                    : 'bg-stone-800 border-stone-700 text-stone-200'
                }`}
              >
                {state.message}
              </span>
            </div>
          )}
          <Collapsible title="How to Play" defaultOpen={false}>
            <footer className="pt-4 mt-2 border-t border-stone-800 text-xs text-stone-400">
              Rules: single 52-card deck; Blackjack pays even and resolves
              immediately; dealer stands on all 17; no betting/splits/doubles in
              this MVP.
            </footer>
          </Collapsible>
        </div>
      </div>
    </div>
  );
}

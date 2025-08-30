import { useMemo } from 'react';
import CardView from './CardView';
import { handTotal } from '../game/utils';
import type { Card } from '../game/types';

export default function Hand({
  title,
  cards,
  hideHole = false,
}: {
  title: string;
  cards: Card[];
  hideHole?: boolean;
}) {
  const total = useMemo(() => handTotal(cards), [cards]);
  return (
    <div className="space-y-2">
      <div className="flex items-baseline gap-2">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-300">
          {title}
        </h3>
        <span className="text-xs text-gray-400">
          Total: {hideHole ? '?' : total}
        </span>
      </div>
      <div className="flex gap-2">
        {cards.map((c, i) => (
          <CardView key={i} card={c} hidden={hideHole && i === 1} />
        ))}
      </div>
    </div>
  );
}

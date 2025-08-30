import type { Card } from '../game/types';

export default function CardView({
  card,
  hidden = false,
}: {
  card: Card;
  hidden?: boolean;
}) {
  if (hidden) {
    return (
      <div className="w-14 h-20 rounded-xl border border-gray-500 bg-gray-800 flex items-center justify-center text-gray-400 shadow">
        ?
      </div>
    );
  }
  const isRed = card.suit === '♥' || card.suit === '♦';
  return (
    <div
      className={`w-14 h-20 rounded-xl border bg-white flex flex-col items-center justify-center shadow ${
        isRed ? 'text-red-600 border-red-300' : 'text-gray-900 border-gray-300'
      }`}
    >
      <div className="text-lg leading-none">{card.rank}</div>
      <div className="text-xl">{card.suit}</div>
    </div>
  );
}

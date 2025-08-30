export default function Controls({
  canDeal,
  canHit,
  canStand,
  onDeal,
  onHit,
  onStand,
}: {
  canDeal: boolean;
  canHit: boolean;
  canStand: boolean;
  onDeal: () => void;
  onHit: () => void;
  onStand: () => void;
}) {
  return (
    <div className="flex gap-3">
      <button
        disabled={!canDeal}
        onClick={onDeal}
        className={`px-4 py-2 rounded-lg text-sm font-medium border ${
          canDeal
            ? 'bg-emerald-600 border-emerald-500 hover:bg-emerald-500'
            : 'bg-stone-800 border-stone-700 text-stone-400 cursor-not-allowed'
        }`}
      >
        Deal
      </button>
      <button
        disabled={!canHit}
        onClick={onHit}
        className={`px-4 py-2 rounded-lg text-sm font-medium border ${
          canHit
            ? 'bg-sky-600 border-sky-500 hover:bg-sky-500'
            : 'bg-stone-800 border-stone-700 text-stone-400 cursor-not-allowed'
        }`}
      >
        Hit
      </button>
      <button
        disabled={!canStand}
        onClick={onStand}
        className={`px-4 py-2 rounded-lg text-sm font-medium border ${
          canStand
            ? 'bg-amber-600 border-amber-500 hover:bg-amber-500'
            : 'bg-stone-800 border-stone-700 text-stone-400 cursor-not-allowed'
        }`}
      >
        Stand
      </button>
    </div>
  );
}

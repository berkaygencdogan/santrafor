"use client";

export default function LiveTicker() {
  const matches = [
    "Alagöz Holding Iğdır FK - Ümraniyespor 17:00",
    "Boluspor - İstanbulspor 20:00",
    "Fenerbahçe - Galatasaray 21:00",
    "Beşiktaş - Trabzonspor 19:30",
  ];

  return (
    <div className="flex-1 overflow-hidden">
      <div className="ticker-track">
        {[...matches, ...matches].map((item, i) => (
          <div key={i} className="ticker-item">
            <span>⚽</span>
            <span>{item}</span>
          </div>
        ))}
      </div>

      <style jsx global>{`
        .ticker-track {
          display: flex;
          white-space: nowrap;
          will-change: transform;
          animation: ticker 25s linear infinite;
        }
        .ticker-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 24px;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.8);
        }
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}

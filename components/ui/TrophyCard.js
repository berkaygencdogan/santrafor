const getLogo = (t) => {
  return t.league?.image_path || t.team?.image_path || "/placeholder.png";
};

const getName = (t) => {
  return t.league?.name || t.trophy?.name || "Unknown";
};

export const TrophyCard = ({ t }) => {
  const isWinner = t.trophy?.name === "Winner";

  return (
    <div className="border rounded-xl p-4 text-center bg-gray-50 hover:shadow-md transition relative">
      {/* BADGE */}
      <div className="absolute top-2 right-2">
        <span
          className={`text-xs px-2 py-1 rounded-full font-semibold ${
            isWinner
              ? "bg-green-100 text-green-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {t.trophy?.name}
        </span>
      </div>

      {/* LEAGUE LOGO */}
      <div className="flex justify-center mb-2">
        <img src={t.league?.image_path} className="w-10 h-10 object-contain" />
      </div>

      {/* NAME */}
      <p className="font-semibold text-sm">{t.league?.name}</p>

      {/* YEAR */}
      <p className="text-gray-500 text-xs mt-1">{t.season?.name}</p>
    </div>
  );
};

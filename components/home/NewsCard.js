import Link from "next/link";

export default function NewsCard({ item, team = "" }) {
  return (
    <Link href={`/${team}/${item.slug}`}>
      <div className="group cursor-pointer flex flex-col">
        <div className="relative overflow-hidden rounded-xl h-[180px]">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <h3 className="mt-3 text-[15px] font-semibold leading-snug text-white line-clamp-2 min-h-[44px] group-hover:text-yellow-400 transition">
          {item.title}
        </h3>
      </div>
    </Link>
  );
}

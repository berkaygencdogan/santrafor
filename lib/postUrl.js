export default function buildPostUrl({ league, team, slug }) {
  const teamSegment = team ? team : "genel";

  return `/${league}/${teamSegment}/${slug}`;
}

import { redirect } from "next/navigation";

export default function TeamPage({ params }) {
  const { team } = params;

  // 👉 direkt futbol aç
  redirect(`/${team}/futbol`);
}

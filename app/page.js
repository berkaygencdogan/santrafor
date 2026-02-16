import Hero from "@/components/home/Hero";

export default async function Home() {
  const data = [];

  return (
    <main>
      <Hero sliders={data.sliders} featured={data.featured} />
    </main>
  );
}

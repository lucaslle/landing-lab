import { CrButton } from "@cristal-ui/react/ssr";

export default function Home() {
  return (
    <main style={{ padding: 32, display: "grid", gap: 16, justifyItems: "start" }}>
      <h1>Starter</h1>
      <p>Landing page built with Next.js and Cristal UI.</p>
      <div style={{ display: "flex", gap: 8 }}>
        <CrButton variant="primary">Get started</CrButton>
        <CrButton variant="secondary">Learn more</CrButton>
      </div>
    </main>
  );
}

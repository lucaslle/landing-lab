"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CrButton, CrCommandPalette, CrKbd } from "@cristal-ui/react";
import type { Landing } from "./landings";

const groups = { live: "En ligne", draft: "Brouillons" };

export function LandingSearch({ landings }: { landings: Landing[] }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <CrButton variant="outline" size="s" onClick={() => setOpen(true)}>
        Rechercher <CrKbd keys="Mod+K" />
      </CrButton>
      <CrCommandPalette
        lang="fr"
        label="Aller à une landing"
        placeholder="Nom de la landing…"
        open={open}
        onCrSelect={(event) => router.push(`/l/${event.detail}`)}
        onCrClose={() => setOpen(false)}
      >
        {landings.map((landing) => (
          <option key={landing.slug} value={landing.slug} data-group={groups[landing.status]}>
            {landing.title}
          </option>
        ))}
      </CrCommandPalette>
    </>
  );
}

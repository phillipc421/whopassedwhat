"use client";
import { getLaws } from "@/fetchers";
import { useEffect, useState } from "react";

import { PRESIDENTS_CONGRESS } from "@/constants/presidentCongress";

export default function LawsPassed({ president }: { president: string }) {
  const [laws, setLaws] = useState(null);
  const congresses = PRESIDENTS_CONGRESS[president];

  useEffect(() => {
    const lawRequests = congresses.congresses.map(({ name }) => getLaws(name));
    Promise.all(lawRequests)
      .then((response) => setLaws(response))
      .catch((e) => console.log(e));
  }, []);
  console.log(laws);
  return (
    <section>
      <h1>Laws Signed by {president}.</h1>
    </section>
  );
}

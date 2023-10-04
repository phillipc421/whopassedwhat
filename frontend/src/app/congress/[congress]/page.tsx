import LawsPassed from "@/components/LawsPassed";

import { CongressLawResponse } from "@/components/CongressSelector";

// FOR PAGINATION IN FUTURE
// always plus 1 as last key must be used as the next start point to avoid duplicate listings

export default async function PresidentPage({
  params,
}: {
  params: { congress: string };
}) {
  const url = `https://whopassedwhat-default-rtdb.firebaseio.com/v3/congresses/${decodeURIComponent(
    params.congress
  )}.json`;
  const lawsResponse = await fetch(url);
  const lawsData = (await lawsResponse.json()) as CongressLawResponse;
  return (
    <main>
      <h1>
        Laws Passed by the {params.congress} congress. ({lawsData.total})
      </h1>
      <LawsPassed
        president={""}
        laws={lawsData.laws}
        congress={params.congress}
      ></LawsPassed>
    </main>
  );
}

import LawsPassed from "@/components/LawsPassed";

// FOR PAGINATION IN FUTURE
// always plus 1 as last key must be used as the next start point to avoid duplicate listings

export default async function PresidentPage({
  params,
}: {
  params: { president: string };
}) {
  const lawsResponse = await fetch(
    `https://whopassedwhat-default-rtdb.firebaseio.com/v3/presidents/${decodeURIComponent(
      params.president
    )}.json`
  );
  const lawsData = (await lawsResponse.json()) as PresidentLawResponse;
  return (
    <main>
      <h1>
        Laws Passed during{" "}
        {params.president
          .split("-")
          .map((word) => word[0].toUpperCase() + word.slice(1))
          .join(" ")}
        's Administration. ({lawsData.total})
      </h1>
      <LawsPassed
        president={decodeURIComponent(params.president)}
        laws={lawsData.laws}
        congress=""
      ></LawsPassed>
    </main>
  );
}

export interface PresidentLawResponse {
  laws: { [key: string]: PresidentLaw };
  total: number;
}

export interface PresidentLaw {
  billLink: string;
  billNumber: string;
  billTitle: string;
  congress: string;
  id: string;
  passedDate: string;
  president: President;
  publicLawNumber: string;
  textLink: string;
}

export interface President {
  name: string;
  slug: string;
}

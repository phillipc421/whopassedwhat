import LawsPassed from "@/components/LawsPassed";
import Link from "next/link";
import Pagination from "@/components/Pagination";
const PAGINATION_LIMIT = 10;
// always plus 1 as last key must be used as the next start point to avoid duplicate listings

export default async function PresidentPage({
  params,
  searchParams,
}: {
  params: { president: string };
  searchParams: { pStart: string; prev: string };
}) {
  const lawsResponse = await fetch(
    `https://whopassedwhat-default-rtdb.firebaseio.com/v2/presidents/${decodeURIComponent(
      params.president
    )}.json?orderBy="$key"&limitTo${searchParams.prev ? "Last" : "First"}=${
      PAGINATION_LIMIT + 1
    }${
      searchParams.pStart
        ? `&${searchParams.prev ? "end" : "start"}At="${searchParams.pStart}"`
        : ""
    }`
  );
  const lawsData = (await lawsResponse.json()) as PresidentLawResponse;
  const lawKeys = Object.keys(lawsData);
  const firstKey = lawKeys[0];
  const lastKey = lawKeys[lawKeys.length - 1];
  return (
    <main>
      <h1>
        Laws Passed during{" "}
        {params.president
          .split("-")
          .map((word) => word[0].toUpperCase() + word.slice(1))
          .join(" ")}
        's Administration.
      </h1>
      <LawsPassed
        president={decodeURIComponent(params.president)}
        laws={lawsData}
        congress=""
      ></LawsPassed>
      <Pagination
        prevLink={`/president/${params.president}?pStart=${firstKey}&prev=1`}
        nextLink={`/president/${params.president}?pStart=${lastKey}`}
      ></Pagination>
    </main>
  );
}

export interface PresidentLawResponse {
  [key: string]: PresidentLaw;
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

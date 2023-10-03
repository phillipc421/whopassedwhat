import LawsPassed from "@/components/LawsPassed";
import Link from "next/link";
import { CongressLawResponse } from "@/components/CongressSelector";
import Pagination from "@/components/Pagination";
const PAGINATION_LIMIT = 10;
// always plus 1 as last key must be used as the next start point to avoid duplicate listings

export default async function PresidentPage({
  params,
  searchParams,
}: {
  params: { congress: string };
  searchParams: { pStart: string; prev: string };
}) {
  const url = `https://whopassedwhat-default-rtdb.firebaseio.com/v2/congresses/${decodeURIComponent(
    params.congress
  )}.json?orderBy="$key"&limitTo${searchParams.prev ? "Last" : "First"}=${
    PAGINATION_LIMIT + 1
  }${
    searchParams.pStart
      ? `&${searchParams.prev ? "end" : "start"}At="${searchParams.pStart}"`
      : ""
  }`;

  console.log(url);
  const lawsResponse = await fetch(url);
  const lawsData = (await lawsResponse.json()) as CongressLawResponse;
  const lawKeys = Object.keys(lawsData);
  const firstKey = lawKeys[0];
  const lastKey = lawKeys[lawKeys.length - 1];
  return (
    <main>
      <h1>Laws Passed by the {params.congress} congress.</h1>
      <LawsPassed
        president={""}
        laws={lawsData}
        congress={params.congress}
      ></LawsPassed>
      <Pagination
        prevLink={`/congress/${params.congress}?pStart=${firstKey}&prev=1`}
        nextLink={`/congress/${params.congress}?pStart=${lastKey}`}
      ></Pagination>
    </main>
  );
}

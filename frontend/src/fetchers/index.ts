import { CongressLawResponse } from "@/components/CongressSelector";

export async function getLaws(congress: string): Promise<CongressLawResponse> {
  const response = await fetch(
    `https://whopassedwhat-default-rtdb.firebaseio.com/v2/congresses/${congress}.json`
  );
  return await response.json();
}

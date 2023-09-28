export interface LawsReponse {
  laws: {
    [key: string]: LawsEntry;
  };
  total: number;
}

export interface LawsEntry {
  bill: BillInfo;
  date: string;
  id: string;
  law: LawInfo;
}

export interface BillInfo {
  link: string;
  number: string;
  title: string;
}

export interface LawInfo {
  [key: string]: string;
}

export interface LawsState extends LawsReponse {
  congress: string;
}

export async function getLaws(congress: string): Promise<LawsState> {
  const response = await fetch(
    `https://whopassedwhat-default-rtdb.firebaseio.com/v1/${congress}-congress.json`
  );
  const data = (await response.json()) as LawsReponse;
  return { ...data, congress };
}

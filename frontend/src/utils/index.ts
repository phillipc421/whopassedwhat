import { CONGRESSES } from "@/constants/congresses";
import { PRESIDENTS } from "@/constants/presidents";

export interface PresidentCongressMap {
  [key: string]: {
    president: { name: string; start: string; end: string };
    congresses: { name: string; start: string; end: string }[];
  };
}
export const presidentCongressMap = (): PresidentCongressMap => {
  const lookupTable = PRESIDENTS.reduce((table, president, i) => {
    const { start, end } = president;
    const presidentStart = parseInt(start);
    const presidentEnd = parseInt(end) || 1;

    const congresses = CONGRESSES.filter((congress) => {
      const { start: congressStart, end: congressEnd } = congress;
      if (i === PRESIDENTS.length - 1) {
        return presidentStart <= congressStart;
      }
      return (
        presidentStart <= congressStart &&
        presidentEnd >= congressStart &&
        presidentEnd !== congressStart
      );
    });

    return { ...table, [president.name]: { president, congresses } };
  }, {});
  return lookupTable;
};

import { LawsState } from "@/fetchers";
import LawEntry from "./LawEntry";

export default function LawsList({ law }: { law: LawsState }) {
  return (
    <section>
      <h2>{law.congress} Congress</h2>
      <ul>
        {Object.entries(law.laws).map(([id, val]) => (
          <LawEntry key={id} law={val}></LawEntry>
        ))}
      </ul>
    </section>
  );
}

import { LawsState } from "@/fetchers";
import styles from "./CongressTab.module.css";

export default function CongressesTab({
  congresses,
  setCurrentCongress,
  currentCongress,
}: {
  congresses: LawsState[];
  setCurrentCongress: React.Dispatch<React.SetStateAction<number>>;
  currentCongress: number;
}) {
  return (
    <nav>
      <p>Congresses:</p>
      <ul className={styles["container"]}>
        {congresses.map((congress, i) => (
          <li
            key={congress.congress}
            onClick={() => setCurrentCongress(i)}
            className={`${styles["list-item"]} ${
              currentCongress === i ? styles["selected"] : ""
            }`}
          >
            <span>Number: {congress.congress}</span>
            <span>Laws Passed: {congress.total}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}

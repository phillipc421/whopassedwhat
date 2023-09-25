import PresidentSelector from "../PresidentSelector";
import Link from "next/link";
import styles from "./SiteHeader.module.css";
export default function SiteHeader() {
  return (
    <header>
      <div className={styles["logo"]}>
        <Link href="/">WhoPassedWhat? 🇺🇸</Link>
      </div>
      <PresidentSelector></PresidentSelector>
    </header>
  );
}

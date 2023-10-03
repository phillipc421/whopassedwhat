import PresidentSelector from "../PresidentSelector";
import CongressSelector from "../CongressSelector";
import Link from "next/link";
import styles from "./SiteHeader.module.css";
export default function SiteHeader() {
  return (
    <header>
      <div className={styles["logo"]}>
        <Link href="/">WhoPassedWhat? 🇺🇸</Link>
      </div>
      <PresidentSelector></PresidentSelector>
      <CongressSelector></CongressSelector>
    </header>
  );
}

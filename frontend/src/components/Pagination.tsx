import Link from "next/link";
import styles from "./Pagination.module.css";

export default function Pagination({
  prevLink,
  nextLink,
}: {
  prevLink: string;
  nextLink: string;
}) {
  return (
    <nav className={styles["container"]}>
      <Link href={prevLink}>Prev Page</Link>
      <Link href={nextLink}>Next Page</Link>
    </nav>
  );
}

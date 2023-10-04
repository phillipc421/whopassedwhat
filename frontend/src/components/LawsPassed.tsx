import Link from "next/link";
import ScrollTop from "./ScrollTop";
import { PresidentLaw } from "@/app/president/[president]/page";
import { CongressLaw, CongressLawResponse } from "./CongressSelector";
import styles from "./LawsPassed.module.css";

export default function LawsPassed<
  T extends { [key: string]: PresidentLaw | CongressLaw }
>({
  president,
  laws,
  congress,
}: {
  president: string;
  laws: T;
  congress: string;
}) {
  return (
    <section className={styles["container"]}>
      <ScrollTop></ScrollTop>
      {Object.entries(laws).map(([id, law]) => (
        <article key={id} className={styles["law"]}>
          <p>Bill Title: {law.billTitle}</p>
          <p>Bill Number: {law.billNumber}</p>
          <p>Public Law Number: {law.publicLawNumber}</p>
          <p>Congress: {law.congress}</p>
          <p>President at time of passing: {law.president.name}</p>
          <p>
            Passed on:{" "}
            <time dateTime={law.passedDate}>
              {new Date(law.passedDate).toLocaleDateString()}
            </time>
          </p>
          <div className={styles["law_links"]}>
            <Link href={law.billLink} target="_blank">
              Bill Link
            </Link>
            {law.textLink && (
              <Link href={law.textLink} target="_blank">
                Law Text Link
              </Link>
            )}
          </div>
        </article>
      ))}
    </section>
  );
}

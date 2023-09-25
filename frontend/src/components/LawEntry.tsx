import { LawsEntry } from "@/fetchers";
import Link from "next/link";
import LawLinks from "./LawLinks";

export default function LawEntry({ law }: { law: LawsEntry }) {
  const { bill, date, law: lawInfo } = law;
  return (
    <li>
      <article>
        <header>
          <h3>
            <Link href={bill.link}>{bill.title.slice(2)}</Link>
          </h3>
          <p>
            Number: {bill.number} | Date: <time dateTime={date}>{date}</time>
          </p>
        </header>
        <LawLinks lawLinks={lawInfo}></LawLinks>
      </article>
    </li>
  );
}

import { LawInfo } from "@/fetchers";
import Link from "next/link";
export default function LawLinks({ lawLinks }: { lawLinks: LawInfo }) {
  const entries = Object.entries(lawLinks);
  return (
    <section>
      <ul>
        {entries.map(([type, link], i) => (
          <li key={link + i}>
            <Link href={link} target="_blank">
              {type}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

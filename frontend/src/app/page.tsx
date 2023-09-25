import CongressSelector from "@/components/CongressSelector";
import PresidentSelector from "@/components/PresidentSelector";
import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <h1>Welcome to WhoPassedWhat?</h1>
      <ol>
        <li>Select a presidential term from the dropdown above.</li>
        <li>
          View all the bills that became law during that president's
          administration, sorted by Congress.
        </li>
      </ol>
      <h2>Caveats</h2>
      <p>
        While all the laws shown were passed during said president's term, it is
        technically inaccurate to say that all of them were <em>passed</em> by
        that president. There are instances, although uncommon, in which the
        president vetoed a bill and it was then overriden by congress. Please
        confirm by following the links to the bills in question to determine
        which body of government was ultimately responsible for passing said
        bill.
      </p>
      <p>
        There are no official digital records on{" "}
        <Link href="https://www.congress.gov/" target="_blank">
          congress’s
        </Link>{" "}
        website for congresses prior to the 82nd. Therefore, I've limited the
        choice of presidential terms to those that began on or after the 82nd
        congress (Harry S. Truman).
      </p>
    </main>
  );
}

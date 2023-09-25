"use client";
import { getLaws } from "@/fetchers";
import { useEffect, useState } from "react";
import { LawsReponse, LawsState } from "@/fetchers";
import { PRESIDENTS_CONGRESS } from "@/constants/presidentCongress";
import Link from "next/link";
import LawLinks from "./LawLinks";
import CongressesTab from "./CongressesTab";
import LawsList from "./LawsList";
import styles from "./LawsPassed.module.css";
import ScrollTop from "./ScrollTop";

export default function LawsPassed({ president }: { president: string }) {
  const [currentCongress, setCurrentCongress] = useState<number>(0);
  const [laws, setLaws] = useState<LawsState[] | null>(null);
  const congresses = PRESIDENTS_CONGRESS[president];

  useEffect(() => {
    const lawRequests = congresses.congresses.map(({ name }) => getLaws(name));
    Promise.all(lawRequests)
      .then((response) => setLaws(response))
      .catch((e) => console.log(e));
  }, []);
  console.log(laws);

  const selected = laws ? laws[currentCongress] : null;

  return (
    laws &&
    selected && (
      <section className={styles["container"]}>
        <ScrollTop></ScrollTop>
        <h1>Laws Passed During {president}'s Administration</h1>
        <CongressesTab
          congresses={laws}
          setCurrentCongress={setCurrentCongress}
          currentCongress={currentCongress}
        ></CongressesTab>
        <LawsList law={selected}></LawsList>
      </section>
    )
  );
}

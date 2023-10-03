"use client";
import { CONGRESSES } from "@/constants/congresses";
import { getLaws } from "@/fetchers";
import { FormEventHandler } from "react";
import { useRouter } from "next/navigation";
import styles from "./CongressSelector.module.css";

const formKey = "congresses";

export default function CongressSelector() {
  const router = useRouter();
  const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const congress = formData.get("congresses");
    if (!congress) return;
    router.push(`/congress/${encodeURIComponent(congress.toString())}`);
  };

  return (
    <form onSubmit={submitHandler} className={styles["container"]}>
      <label htmlFor={formKey}>Congress:</label>
      <select id={formKey} name={formKey}>
        {CONGRESSES.map((congress) => (
          <option key={congress.name} value={congress.name}>
            {congress.name} Congress, {congress.start} - {congress.end}
          </option>
        ))}
      </select>
      <input type="submit" value="Go"></input>
    </form>
  );
}

export interface CongressLawResponse {
  [key: string]: CongressLaw;
}

export interface CongressLaw {
  billLink: string;
  billNumber: string;
  billTitle: string;
  congress: string;
  id: string;
  passedDate: string;
  president: President;
  publicLawNumber: string;
  textLink: string;
}

export interface President {
  name: string;
  slug: string;
}

"use client";
import { PRESIDENTS } from "@/constants/presidents";
import { FormEventHandler } from "react";
import { useRouter } from "next/navigation";
import styles from "./PresidentSelector.module.css";

const formKey = "presidents";

export default function PresidentSelector() {
  const router = useRouter();
  const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const president = formData.get(formKey);
    if (!president) return;
    router.push(`/${encodeURIComponent(president.toString())}`);
  };

  return (
    <form onSubmit={submitHandler} className={styles["container"]}>
      <label htmlFor={formKey}>President:</label>
      <select id={formKey} name={formKey}>
        {PRESIDENTS.map((president) => (
          <option key={president.name} value={president.name}>
            {president.name}, {president.start} - {president.end}
          </option>
        ))}
      </select>
      <input type="submit" value="Go"></input>
    </form>
  );
}

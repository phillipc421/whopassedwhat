"use client";
import { PRESIDENTS } from "@/constants/presidents";
import { getLaws } from "@/fetchers";
import { FormEventHandler } from "react";
import { presidentCongressMap } from "@/utils";
import { useRouter } from "next/navigation";

const formKey = "presidents";

export default function PresidentSelector() {
  const router = useRouter();
  const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const president = formData.get(formKey);
    if (!president) return;
    // await getLaws(president.toString());
    router.push(`/${encodeURIComponent(president.toString())}`);
  };

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor={formKey}>President</label>
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

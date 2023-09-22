"use client";
import { CONGRESSES } from "@/constants/congresses";
import { getLaws } from "@/fetchers";
import { FormEventHandler } from "react";

const formKey = "congresses";

export default function CongressSelector() {
  const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const congress = formData.get("congresses");
    if (!congress) return;
    await getLaws(congress.toString());
  };

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor={formKey}>Congress</label>
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

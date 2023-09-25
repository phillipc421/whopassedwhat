"use client";
import styles from "./ScrollTop.module.css";
import { useEffect, useState } from "react";

const SCROLL_AMOUNT = 500;

export default function ScrollTop() {
  const [hideButton, setHideButton] = useState(true);

  useEffect(() => {
    const scrollListener = (e: Event) => {
      const { scrollY } = window;
      return scrollY > SCROLL_AMOUNT
        ? setHideButton(false)
        : setHideButton(true);
    };
    window.addEventListener("scroll", scrollListener);
    return () => window.removeEventListener("scroll", scrollListener);
  }, []);

  const clickHandler = () => {
    document.querySelector("h1")?.scrollIntoView();
  };

  return (
    <button
      onClick={clickHandler}
      className={styles["container"]}
      disabled={hideButton}
    >
      Back to Top
    </button>
  );
}

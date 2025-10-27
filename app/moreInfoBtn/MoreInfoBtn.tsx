"use client";

import styles from "./btnStyle.module.css";
import { useLiffContext } from "../context/LiffContext";

export default function MoreInfoBtn() {
  const { isInitialized, isLoggedIn, login } = useLiffContext();

  const handleClick = () => {
    if (!isInitialized) {
      console.warn("LIFF is not initialized yet");
      return;
    }

    if (!isLoggedIn) {
      login(
        "https://campaign.utaggo.com.tw/roadside-assist/index.html?_gl=1*jd1wwd*_gcl_au*MjE0NjgyNzU5My4xNzU1NDk4MTEw*_ga*MTg2Mjg3MjM5Ny4xNzU1NDk4MTEw*_ga_1R4Z350EYB*czE3NjE1NTcxMDIkbzQ5JGcwJHQxNzYxNTU3MTAxJGo2MCRsMCRoMTE0NjYzMzU4OQ..*_ga_NK2MGC0GYB*czE3NjE1NTcxMDIkbzQ3JGcwJHQxNzYxNTU3MTAyJGo2MCRsMCRoMA.."
      );
      console.log("Redirecting to login...");
    }
  };

  return (
    <button
      className={styles.btn}
      onClick={() => handleClick()}
      disabled={!isInitialized}
    >
      想知道更多? 想!!
    </button>
  );
}

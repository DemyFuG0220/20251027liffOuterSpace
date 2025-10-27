import Image from "next/image";
import styles from "./page.module.css";
import aliens from "../public/images (1).png";
import MoreInfoBtn from "./moreInfoBtn/MoreInfoBtn";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image src={aliens} alt={"三眼怪問號"} />
        <MoreInfoBtn />
      </main>
    </div>
  );
}

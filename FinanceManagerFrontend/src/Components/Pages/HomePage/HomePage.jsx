import styles from "./HomePage.module.css";
import { Header } from "../../Organisms/Header/Header";

export function HomePage(){
  return(
    <section className={styles.home_page}>
      <Header />
      <div className={styles.home_contentn}>
        <h1>Home Page</h1>
      </div>
    </section>
  );
}
import styles from "./CreateCardPage.module.css";
import {CreateCardForm} from "../../Cards/CreateCardForm/CreateCardForm.jsx";

export function CreateCardPage() {
  return(
    <section className={styles.create_card_page}>
      <CreateCardForm />
    </section>
  );
}
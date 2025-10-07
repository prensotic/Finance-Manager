import styles from "./CreateCardPage.module.css";
import { CreateCardForm } from "../../Moleculs/Card/CreateCardForm/CreateCardForm";

export function CreateCardPage() {
  return(
    <section className={styles.create_card_page}>
      <CreateCardForm />
    </section>
  );
}
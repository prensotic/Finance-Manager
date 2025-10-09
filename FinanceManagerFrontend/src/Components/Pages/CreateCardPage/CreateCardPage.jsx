import styles from "./CreateCardPage.module.css";
import { CreateCardForm } from "../../Moleculs/Card/CreateCardForm/CreateCardForm";
import { CardLayout } from "../../Templates/CardLayout/CardLayout";

export function CreateCardPage() {
  return(
    <CardLayout className={styles.create_card_page}>
      <CreateCardForm />
    </CardLayout>
  );
}
import styles from "./AddCardButton.module.css";

export function AddCardButton({...props}){
  return(
    <button type="button" {...props} className={styles.add_card_button}>
      Добавить карту
    </button>
  );
}
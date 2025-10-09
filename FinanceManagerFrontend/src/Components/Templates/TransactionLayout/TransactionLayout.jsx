import styles from "./TransactionLayout.module.css";

export function TransactionLayout({children}){
  return(
    <section className={styles.transaction_section}>
      {children}
    </section>
  );
}
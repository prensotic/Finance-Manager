import styles from "./CardLayout.module.css"

export function CardLayout({children}){
  return(
    <section className={styles.create_card_section}>
      {children}
    </section>
  );
}
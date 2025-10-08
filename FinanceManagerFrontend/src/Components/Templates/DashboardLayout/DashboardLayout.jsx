import styles from "./DashboardLayout.module.css";
import { SideBar } from "../../Organisms/SideBar/SideBar";

export function DashboardLayout({children}){
  return(
    <section className={styles.dashboard_section}>
      <SideBar />
      {children}
    </section>
  );
}
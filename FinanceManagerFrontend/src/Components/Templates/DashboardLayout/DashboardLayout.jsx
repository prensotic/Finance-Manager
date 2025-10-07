import styles from "./DashboardLayout.module.css";
import { SideBar } from "../../Organisms/SideBar/SideBar";

export function DashboardLayout({children}){
  return(
    <section>
      <SideBar />
      {children}
    </section>
  );
}
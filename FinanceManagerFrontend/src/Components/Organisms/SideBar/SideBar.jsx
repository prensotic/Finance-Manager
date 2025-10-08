import styles from "./SideBar.module.css";
import { Button } from "../../Atoms/Button/Button";
import { SideBarNavigation } from "../../Moleculs/SideBarNavigation/SideBarNavigation";
import { Logo } from "../../Atoms/Logo/Logo";
import { SideBarButtons } from "../../Moleculs/SideBarButtons/SideBarButtons";

export function SideBar(){
  return(
    <div className={styles.side_bar}>
      <Logo />
      <SideBarNavigation />
      <SideBarButtons />
    </div>
  );
}
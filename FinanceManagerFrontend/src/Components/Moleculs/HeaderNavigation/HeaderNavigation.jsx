import styles from "./HeaderNavigation.module.css";
import {NavigationLink} from "../../Atoms/NavigationLink/NavigationLink.jsx";

export function HeaderNavigation(){
  return(
    <nav className={styles.header_navigation}>
      <NavigationLink isActive={true}>Главная</NavigationLink>
      <NavigationLink isActive={false}>О нас</NavigationLink>
      <NavigationLink isActive={false}>Сервисы</NavigationLink>
    </nav>
  );
}
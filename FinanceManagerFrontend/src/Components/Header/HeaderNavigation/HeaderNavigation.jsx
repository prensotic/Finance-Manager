import styles from "./HeaderNavigation.module.css";
import {HeaderNavigationLink} from "./HeaderNavigationLink/HeaderNavigationLink.jsx";

export function HeaderNavigation(){
  return(
    <nav className={styles.header_navigation}>
      <HeaderNavigationLink isActive={true}>Главная</HeaderNavigationLink>
      <HeaderNavigationLink isActive={false}>О нас</HeaderNavigationLink>
      <HeaderNavigationLink isActive={false}>Сервисы</HeaderNavigationLink>
    </nav>
  );
}
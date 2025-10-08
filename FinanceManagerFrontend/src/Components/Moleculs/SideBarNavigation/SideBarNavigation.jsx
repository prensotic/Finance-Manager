import styles from "./SideBarNavigation.module.css";
import { NavigationLink } from "../../Atoms/NavigationLink/NavigationLink";
import { useParams } from "react-router-dom";

export function SideBarNavigation(){

  const {dashId} = useParams();

  return(
    <div className={styles.side_bar_navigation}>
      <NavigationLink isActive={dashId == "cards" ? true : false} style={{"fontSize" : "25px"}}>Карты</NavigationLink>
      <NavigationLink isActive={dashId == "transactions" ? true : false} style={{"fontSize" : "25px"}}>Транзакции</NavigationLink>
      <NavigationLink isActive={dashId == "info" ? true : false} style={{"fontSize" : "25px"}}>Статистика</NavigationLink>
    </div>
  );
}
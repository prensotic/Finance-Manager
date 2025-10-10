import styles from "./SideBarNavigation.module.css";
import { NavigationLink } from "../../Atoms/NavigationLink/NavigationLink";
import { useNavigate, useParams } from "react-router-dom";

export function SideBarNavigation(){

  const navigate = useNavigate();

  const {dashId} = useParams();

  return(
    <div className={styles.side_bar_navigation}>
      <NavigationLink onClick={()=>navigate("/dashboard/cards")} isActive={dashId == "cards" ? true : false} style={{"fontSize" : "25px"}}>Карты</NavigationLink>
      <NavigationLink onClick={()=>navigate("/dashboard/transactions")} isActive={dashId == "transactions" ? true : false} style={{"fontSize" : "25px"}}>Транзакции</NavigationLink>
      <NavigationLink onClick={()=>navigate("/dashboard/statistics")} isActive={dashId == "statistics" ? true : false} style={{"fontSize" : "25px"}}>Статистика</NavigationLink>
    </div>
  );
}
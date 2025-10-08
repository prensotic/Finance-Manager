import styles from "./NavigationLink.module.css";

export function NavigationLink({children, isActive, ...props}){
  return(
    <a className={isActive ? styles.link_active : styles.link_default} {...props}>{children}</a>
  );
}
import styles from "./HeaderNavigationLink.module.css";

export function HeaderNavigationLink({children, isActive, ...props}){
  return(
    <a className={isActive ? styles.link_active : styles.link_default} {...props}>{children}</a>
  );
}
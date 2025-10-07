import styles from "./Input.module.css";

export function Input({...props}){
  return(<input className={styles.input} {...props}/>);
}
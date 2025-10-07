import { Header } from "../../Organisms/Header/Header";
import { Footer } from "../../Organisms/Footer/Footer";
import styles from "./MainLayout.module.css"

export function MainLayout({children}){
  return(
    <section>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </section>
  );
}
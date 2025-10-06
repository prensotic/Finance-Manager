import {Routes, Route} from "react-router-dom";
import { AuthPage } from "../Components/Pages/AuthPage/AuthPage";
import { HomePage } from "../Components/Pages/HomePage/HomePage";
import { ProfilePage } from "../Components/Pages/ProfilePage/ProfilePage";
import { CardsPage } from "../Components/Pages/CardsPage/CardsPage";
import {CreateCardPage} from "../Components/Pages/CreateCardPage/CreateCardPage.jsx"


export function AppRoutes(){
  return(
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/auth/:id" element={<AuthPage/>}/>
      <Route path="/profile" element={<ProfilePage/>}/>
      <Route path="cards" element ={<CardsPage />}/>
      <Route path="/cards/create" element={<CreateCardPage />}/>
    </Routes>
  );
} 
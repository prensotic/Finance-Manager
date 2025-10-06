import {Routes, Route} from "react-router-dom";
import { AuthPage } from "../Components/Pages/AuthPage/AuthPage";
import { HomePage } from "../Components/Pages/HomePage/HomePage";
import { ProfilePage } from "../Components/Pages/ProfilePage/ProfilePage";

export function AppRoutes(){
  return(
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/auth/:id" element={<AuthPage/>}/>
      <Route path="/profile" element={<ProfilePage/>}/>
    </Routes>
  );
}
import {Routes, Route} from "react-router-dom";
import { AuthPage } from "../Components/Pages/AuthPage/AuthPage";
import { HomePage } from "../Components/Pages/HomePage/HomePage";
import { ProfilePage } from "../Components/Pages/ProfilePage/ProfilePage";
import {CreateCardPage} from "../Components/Pages/CreateCardPage/CreateCardPage.jsx"
import {DashboardPage} from "../Components/Pages/DashboardPage/DashboardPage.jsx";
import { EditCardPage } from "../Components/Pages/EditCardPage/EditCardPage.jsx";
import {CreateTransactionPage} from "../Components/Pages/CreateTransactionPage/CreateTransactionPage.jsx";

export function AppRoutes(){
  return(
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/auth/:id" element={<AuthPage/>}/>
      <Route path="/profile" element={<ProfilePage/>}/>
      <Route path="/dashboard/:dashId" element ={<DashboardPage />}/>
      <Route path="/dashboard/cards/create" element={<CreateCardPage />}/>
      <Route path="/dashboard/cards/edit/:cardId" element={<EditCardPage />}/>
      <Route path="dashboard/transactions/create" element={<CreateTransactionPage />}/>
    </Routes>
  );
} 
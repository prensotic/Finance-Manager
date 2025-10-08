import { useParams } from "react-router-dom";
import { LoginForm } from "../../Moleculs/Auth/LoginForm/LoginForm";
import { RegisterForm } from "../../Moleculs/Auth/RegisterForm/RegisterForm";
import {AuthLayout} from "../../Templates/AuthLayout/AuthLayout.jsx";

export function AuthPage(){
  const {id} = useParams();
  return(
    <AuthLayout>
      {id == "login" ? <LoginForm /> : <RegisterForm/>}
    </AuthLayout>
  );
}
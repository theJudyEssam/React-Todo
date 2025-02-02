import Button from '../Button';
import  AuthForm from '../AuthForm';


function Login({islogin}) {



  return (
    <div>
   
      <AuthForm isLogin = {islogin}/>
      
    </div>
  );
}

export default Login;
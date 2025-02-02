import Button from "./Button";


function AuthForm({isLogin}){

    if(isLogin){

        return(

            <div className="auth-form">
            <h1>Welcome Back</h1>
            <input type="text" placeholder="Email"/>
            <input type="password" placeholder="Password"/>
            <div className="form-footer">
                <Button  text="Login"/>
            <a href="/register">Don't have an account?</a>
            </div>
            
            </div>
    
        )

    }

    else{

        return(

            <div className="auth-form">
            <h1>Welcome to Todo</h1>
           
            <div>
            <input type="text" placeholder="Name"/>
            <input type="text" placeholder="Username"/>
            </div>
            
            <input type="text" placeholder="Email"/>
            <input type="password" placeholder="Password"/>
            <input type="password" placeholder="Confirm Password"/>

            <div className="form-footer">
                <Button text="Sign up"/>
                <a href="/">Already have an account?</a>    
            </div>
            
            </div>
        )

    }


}

export default AuthForm;
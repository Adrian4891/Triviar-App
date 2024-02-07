import { Link } from "react-router-dom"
import { FcGoogle } from "react-icons/fc"
import { useState } from "react";
import { validateLog } from "../../validateData";
import { userSignIn, signInGoogle  } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { getProfile } from "../../redux/actions";
import imgSignIn from "../../images/headerLogo.svg";
import FormSiSu from "../formSiSu/FormSiSu";

const Login = () => {
    const [ userData, setUserData ]= useState({
       email:"",
       password:""
    });
    const [ load, setLoad ] = useState(false);
    const [ error, setError ] = useState({});
    const [ errorRes, setErrorRes ] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
 
    const handleInp = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        });
        setError(
            validateLog({
                ...userData, 
                [event.target.name]: event.target.value
            })
        );
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
       
        const response = await userSignIn(userData); 
  
        if(response === "auth/invalid-login-credentials"){
            return setErrorRes("Email o Password incorrecto")
        }
        if(response.user.uid){
            Cookies.set("userId", response.user.uid, {expires:1});
            dispatch(getProfile(response.user.uid));
            navigate("/welcome")          
        }        
    } 
    
    const handleLoginGoogle = async () => {
       const response = await signInGoogle(); 
       if(response === "auth/invalid-login-credentials"){
          return setErrorRes("Email o Password incorrecto")
       }
       if(response.user.uid){
           Cookies.set("userId", response.user.uid, {expires:1});
           dispatch(getProfile(response.user.uid));
           navigate("/welcome")          
        }      
    }

    
    return(
        <div className=" d-flex justify-center items-center min-h-screen sm:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-600">
            <div className="d-flex justify-center items-center flex-col w-96 sm:border  drop-shadow-sm rounded py-3 bg-white"> 
                <h2 className=" text-3xl font-bold text-indigo-600">Sign In</h2>
                <img 
                src={imgSignIn} 
                alt="img-sign-in" 
                className="w-20 pt-3"
                />
                { errorRes !== "" && <p className="text-red-500">{errorRes}</p>}
                <FormSiSu
                userData={userData}
                handleInp={handleInp}
                handleSubmit={handleSubmit}
                error={error}
                />
                <div className="d-flex items-center gap-2 pt-4">
                    <hr className="w-20 h-px2 " />
                        <span className="text-gray-400">O</span>
                    <hr className="w-20 h-px2 "/>
                </div>
                    
                <Link className="d-flex items-center pt-3 gap-2 text-sky-600" onClick={()=>handleLoginGoogle()}>
                    <FcGoogle className="text-xl"/>Usa tu cuenta de Google
                </Link>
                <p className="pt-3 pb-2 text-zinc-600">
                    ¿No tienes una cuenta? 
                    <Link to="/signUp" className="text-blue-500 hover:underline"> Sign Up </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
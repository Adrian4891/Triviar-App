import { Link } from "react-router-dom";
import { useState } from "react";
import { validateSignUp } from "../../validateData";
import { userSignUp } from "../../firebaseConfig";
import axios from "axios";
import { URL_BASE } from "../../utils";
import { useNavigate } from "react-router-dom";
import imgSignUp  from "../../images/headerLogo.svg";
import FormSiSu from "../formSiSu/FormSiSu";

const SignUp = () => {

    const navigate = useNavigate();
    const [ userData, setUserData ] = useState({
        email:"",
        password:""
    });
    const [ error, setError ] = useState({});
    const [ errorRes, setErrorRes ] = useState("");

    const handleInp = (event) => {
        console.log(event.target.value)
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        });
        setError(
            validateSignUp({
                ...userData, 
                [event.target.name]: event.target.value
            })
        );
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const respSingUp = await userSignUp(userData); 

        if(respSingUp === "auth/email-already-in-use"){
           return setErrorRes("El email esta en uso")
        }
        if(respSingUp?.user.uid){
            navigate("/signIn");
        } 
        
    }

    return(
        <div className="d-flex justify-center items-center min-h-screen sm:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-600">
            <div className="d-flex justify-center items-center flex-col w-96 min-h-min drop-shadow-sm sm:border rounded py-4 bg-white"> 
                <h2 className=" text-3xl font-bold text-indigo-600 pb-3">Sign Up</h2>
                <img 
                src={imgSignUp} 
                alt="img-signIn" 
                className="w-20"
                />
                { errorRes !== "" && <p>{errorRes}</p> }
                <FormSiSu
                userData={userData}
                handleInp={handleInp}
                handleSubmit={handleSubmit}
                error={error}
                />
                <p className="py-5 text-zinc-600">
                    ¿Ya tienes una cuenta? 
                    <Link to="/signIn" className="text-blue-500 hover:underline"> Sign In</Link>
                </p>
            </div>
        </div>
    );
}

export default SignUp;
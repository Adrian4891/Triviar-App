import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { URL_BASE } from "../../utils";
import axios from "axios";
import imgLogo from "../../images/headerLogo.svg";
const Welcome = () => {
    const userId = Cookies.get("userId");
    const navigate = useNavigate("/");

    const getProfile = async () => {
        try {
            const { data } = await axios(`${URL_BASE}/profile/${userId}`);
            if(data[0]?.userName){
                return navigate("/");
            }
            else {
                return  navigate("/profile/create");
            } 
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(()=>{
        setTimeout(() => {
            getProfile();  
        }, 1000);
       
    },[]);

    return(
        <div className="flex justify-center items-center bg-dark w-full h-screen flex-col gap-3">
            <p className=" text-white font-bold text-4xl">
                Bienvenido...
            </p>
            <img
            src={imgLogo}
            alt="image-logo"
            className="w-32"
            />
        </div>
    )
}
export default Welcome;
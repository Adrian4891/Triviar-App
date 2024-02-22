import { Link } from "react-router-dom";
import imgNotFound from "../../images/site-not-found.svg";
import { IoMdArrowBack } from "react-icons/io";


const NotFound = () => {
    return(
        <section className=" flex justify-center items-center flex-column gap-3  bg-purple-200 h-screen">
            <h1 className="text-4xl font-semibold">Not Found Page</h1> 
            <article className="">
               <img 
               src={imgNotFound} 
               alt="image-notFound"
               className="w-96"
               />
               <Link 
               to="/"
               className=" block text-center text-xl text-sky-400 hover:text-sky-300"
               ><IoMdArrowBack className="inline text-center"/>Volver</Link>
            </article>
        </section>
    )
}

export default NotFound;
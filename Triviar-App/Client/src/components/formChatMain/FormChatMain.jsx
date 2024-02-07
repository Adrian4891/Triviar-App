import { IoMdSend } from "react-icons/io";

const FormChatMain = ({handleChange, handleSubmit, selectMsg, setSelectMsg, inpText}) => {
    return(
        <form onSubmit={handleSubmit} className="flex flex-col items-end w-full mt-3 p-1 bg-dark rounded-top-1 rounded-bottom-1 relative w-full">
            {selectMsg.userName &&
                <div className="w-full d-flex justify-between py-1 px-2 bg-dark h-8 t overflow-y-scroll rounded-top-1 ">
                    <p className=" w-96 text-orange-300 text-xs">
                    {selectMsg.userName } :{ selectMsg.message}
                    </p>
                    <button
                    onClick={()=>setSelectMsg({})}
                    className="text-orange-300 hover:text-orange-500 "
                    >X</button>
                </div>
            }
            <textarea
            type="text" 
            placeholder="Escribe tu mensaje ..." 
            rows="2"
            cols="88"
            className=" bg-dark text-xs md:text-sm text-sky-200 text-start p-2 border-none focus:border-pink-white rounded-bottom-1
            focus:ring-sky-300 resize-none focus:outline-none focus:ring-2 focus:shadow-lg focus:shadow-sky-300 w-full"
            value={inpText}
            onChange={handleChange}
            />
            <button 
            type="submit"
            className="bg-dark text-sky-400 hover:text-sky-300 p-1 mt-2 p-1 rounded-full absolute bottom-1 right-2 text-xl ">
               <IoMdSend/>
            </button>    
       </form>
    );
}

export default FormChatMain;
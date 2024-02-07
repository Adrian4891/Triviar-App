
const FormSiSu = ({userData,handleInp, handleSubmit, error}) => {

    return (
        <form className="d-flex justify-center flex-col gap-3 pt-5 pb-2" onSubmit={handleSubmit}>
            <fieldset className="d-flex justify-center flex-col border-1">
                <label htmlFor="" className="font-semibold text-zinc-500" >
                    Email:
                </label>
                <input 
                type="email"
                name="email"
                value={userData.email} 
                className={`rounded-1 px-3 py-1 w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500
                    ${error.email ? "border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500" : "border"}`
                }
                onChange={handleInp}
                />
                <p className="pt-2 text-xs text-red-600"> 
                    {error?.email}
                </p>
            </fieldset>
            <fieldset className="d-flex justify-center flex-col">
                <label htmlFor="" className="font-semibold text-zinc-500">
                    Password:
                </label>
                <input
                type="password"
                name="password"
                value={userData.password} 
                className={`border rounded-1 px-3 py-1 w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500
                    ${error.password ? "border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500" : "border"}`
                }
                onChange={handleInp}
                />
                <p className="pt-2 text-xs text-red-600">
                    {error?.password}
                </p>
            </fieldset>
            <input 
            type="submit" 
            className={`bg-indigo-600 rounded-1 hover:bg-indigo-500 text-white font-semibold mt-3 py-1 drop-shadow-md`
                
            }
            disabled={!Object.keys(error).length  ? false : true}
            />
        </form>
    )
}

export default FormSiSu;
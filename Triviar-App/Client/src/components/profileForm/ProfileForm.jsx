const ProfileForm = ({
  userData,
  error,
  handleInput,
  handleSubmit,
  errorPost,
  getCountries,
  countries,
}) => {
  return (
    <form
      className=" bg-white d-flex justify-center items-center flex-col gap-2"
      onSubmit={handleSubmit}
    >
      <fieldset>
        <label
          htmlFor="userName"
          className="block text-zinc-500 font-semi-bold "
        >
          User Name:
        </label>
        <input
          name="userName"
          id="userName"
          className={`inline-block w-72 py-1 px-3 rounded-2 border border-zinc-300 text-zinc-500 font-semi-bold
                ${
                  error.userName
                    ? " focus:outline-none focus:ring-1 focus:ring-red-500"
                    : "focus:outline-none focus:ring-1 focus:ring-green-500"
                } 
                `}
          type="text"
          value={userData.userName}
          onChange={handleInput}
        />
        {error.userName && (
          <p className="text-sm text-red-500 p-1">{error.userName}</p>
        )}
        {errorPost && <p className="text-sm text-red-500 p-1">{errorPost}</p>}
      </fieldset>
      <fieldset>
        <label htmlFor="country" className="block text-zinc-500 font-semi-bold">
          Pais:
        </label>
        <select
          name="country"
          id="country"
          onChange={handleInput}
          className={`inline-block w-72 py-1 px-3 rounded-2  border border-zinc-300 text-zinc-500 font-semi-bold
                ${
                  error.country
                    ? " focus:outline-none focus:ring-1 focus:ring-red-500"
                    : "focus:outline-none focus:ring-1 focus:ring-green-500"
                } 
            `}
        >
          <option value="">Seleccione</option>
          {countries.map((country) => {
            return <option value={country}>{country}</option>;
          })}
        </select>
        {error.country && (
          <p className="text-sm text-red-500 p-1">{error.country}</p>
        )}
      </fieldset>
      <fieldset>
        <label
          htmlFor="birthday"
          className="block text-zinc-500 font-semi-bold"
        >
          Edad:
        </label>
        <input
          name="birthday"
          id="bithday"
          className={`inline-block w-72 py-1 px-3 rounded-2  border border-zinc-300 text-zinc-500 font-semi-bold fill-gray-300
                ${
                  error.birthday
                    ? " focus:outline-none focus:ring-1 focus:ring-red-500"
                    : "focus:outline-none focus:ring-1 focus:ring-green-500"
                } 
            `}
          type="date"
          value={userData.birthday}
          onChange={handleInput}
        />
        {error.birthday && (
          <p className="text-sm text-red-500 p-1">{error.birthday}</p>
        )}
      </fieldset>
      <button
        disabled={Object.keys(error).length ? true : false}
        className="border-1 border-blue-500 w-64 mt-4 py-1 rounded-2 text-blue-500 font-medium hover:bg-blue-500 hover:text-white"
      >
        Enviar
      </button>
    </form>
  );
};

export default ProfileForm;

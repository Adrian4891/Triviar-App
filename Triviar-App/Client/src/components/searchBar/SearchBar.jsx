import { useState } from "react";
import axios from "axios";
import { URL_BASE } from "../../utils";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ setSearch, search, setResSearch }) => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  const getProfileSearch = async (event) => {
    try {
      event.preventDefault();
      const { data } = await axios(
        `${URL_BASE}/profile/search?userName=${input}`
      );
      if (!data.length) throw Error("No se encontro el perfil");
      setResSearch(data);
      navigate("/profile/results/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form
        className={`w-10/12 sm:w-96 h-24 bg-purple-500 absolute  flex items-center justify-center gap-2 rounded-1 z-30 px-2 border-1 border-purple-600 shadow-md shadow-purple-400
      ${
        search ? "top-10  right-5 md:top-10 md:left-1/3" : "-top-40 -left-1/3"
      }`}
        onSubmit={getProfileSearch}
      >
        <span
          className=" absolute top-0 right-0 px-2 font-semibold text-purple-100 hover:text-white cursor-pointer"
          onClick={() => setSearch(!search)}
        >
          X
        </span>
        <input
          className="w-64 py-1 rounded-1 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 "
          type="search"
          id="search"
          value={input}
          onChange={handleInput}
          placeholder="Ingresar usuario..."
        />
        <button className="text-white p-1" type="submit">
          <FaSearch />
        </button>
      </form>
      <div
        className={`${
          search
            ? "w-full h-screen fixed top-0 bg-zinc-500 z-20 opacity-80"
            : "none"
        }`}
        onClick={() => setSearch(!search)}
      ></div>
    </>
  );
};
export default SearchBar;

import AvatarsImg from "../avatarsImg/AvatarsImg";
import { useState, useEffect } from "react";
import { validateDataProfile } from "../../validateData";
import axios from "axios";
import { URL_BASE } from "../../utils";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProfileForm from "../profileForm/ProfileForm";
import { CiEdit } from "react-icons/ci";
import { getProfile } from "../../redux/actions";

const CreateProfile = () => {
  const img =
    "https://waterfordwhispersnews.com/wp-content/uploads/2021/02/dicap.jpg";
  const navigate = useNavigate();
  const userId = Cookies.get("userId");
  const dispatch = useDispatch();
  const [errorPost, setErrorPost] = useState("");
  const [openList, setOpenList] = useState(false);
  const [userData, setUserData] = useState({
    picture: img,
    userName: "",
    country: "",
    birthday: "",
  });
  const [countries, setCountries] = useState([]);

  const postProfileUser = async () => {
    try {
      const { data } = await axios.post(
        `${URL_BASE}/profile/${userId}`,
        userData
      );
      return data;
    } catch (error) {
      return error.response;
    }
  };

  const [error, setError] = useState({});

  const handleInput = (event) => {
    console.log(event);
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
    setError(
      validateDataProfile({
        ...userData,
        [event.target.name]: event.target.value,
      })
    );
  };

  const getCountries = async () => {
    try {
      const { data } = await axios(`https://restcountries.com/v3.1/all`);
      let names = [];
      data.forEach((dat) => {
        names.push(dat.name.common);
      });
      names.sort();
      setCountries(names);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await postProfileUser();
    if (response.data) setErrorPost(response.data);
    dispatch(getProfile(userId));
    if (response[0].userName) navigate("/");
  };

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <div className="w-full h-screen sm:bg-blue-100 d-flex justify-center items-center py-2">
      <AvatarsImg
        openList={openList}
        setOpenList={setOpenList}
        userData={userData}
        setUserData={setUserData}
      />
      <div className=" bg-white h-max sm:w-96 d-flex justify-center items-center flex-col sm:border rounded-2 gap-4 sm:p-4">
        <div>
          <img
            src={!userData.picture ? img : userData.picture}
            alt="img-avatar"
            className="w-32 h-32 border rounded-full mb-2"
          />
          <div className="w-full flex justify-center items-center">
            <button
              className="mb-2 border-1 px-2 flex items-center gap-2 rounded-1 border-sky-300 text-sky-500 hover:text-white hover:bg-sky-500 font-semibild"
              onClick={() => setOpenList(!openList)}
            >
              Edit <CiEdit />
            </button>
            <p>{error?.picture}</p>
          </div>
        </div>
        <ProfileForm
          userData={userData}
          error={error}
          handleInput={handleInput}
          handleSubmit={handleSubmit}
          errorPost={errorPost}
          getCountries={getCountries}
          countries={countries}
        />
      </div>
    </div>
  );
};

export default CreateProfile;

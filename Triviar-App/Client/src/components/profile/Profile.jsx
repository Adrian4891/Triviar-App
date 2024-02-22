import { useSelector } from "react-redux";
import CardProfile from "../cardProfile/CardProfile";

const Profile = () => {
  const profile = useSelector((state) => state.profile);

  return (
    <CardProfile
      userId={profile?.userId}
      userName={profile?.userName}
      picture={profile?.picture}
      points={profile?.points}
      country={profile?.country}
      birthday={profile?.birthday}
    />
  );
};

export default Profile;

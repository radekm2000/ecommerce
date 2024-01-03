import { Navbar } from "../Navbar";
import { useUserContext } from "../../contexts/UserContext";
import { useEffect } from "react";
import { useProfileInfo } from "../../hooks/useProfileInfo";

export const MainPage = () => {
  const { setUser } = useUserContext();
  const {
    data: userProfileInfo,
    isLoading: isUserProfileInfoLoading,
    isSuccess,
  } = useProfileInfo();

  useEffect(() => {
    if (isSuccess) {
      setUser(userProfileInfo);
    }
  }, [isSuccess, setUser, userProfileInfo]);

  if (isUserProfileInfoLoading) {
    return "userProfileInfo loading...";
  }

  return (
    <>
      <div>haahah main page</div>
    </>
  );
};

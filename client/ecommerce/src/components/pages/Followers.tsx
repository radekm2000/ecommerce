import { useParams } from "wouter";
import { useUserInfo } from "../../hooks/useUserInfo";

export const Followers = () => {
  const params = useParams();
  const userId = params?.userId;
  const { data: user, isLoading: isUserLoading } = useUserInfo(
    parseInt(userId!)
  );
  if (isUserLoading) {
    return "isLoading...";
  }
  if (!user) {
    return;
  }
  if (!userId) {
    return;
  }
  return <div>Followers</div>;
};

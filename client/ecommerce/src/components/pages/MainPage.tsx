import { useQuery } from "@tanstack/react-query";
import { Navbar } from "../Navbar";
import { axiosApi } from "../../api/axios";

export const MainPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["page"],
    queryFn: async () => {
      const response = await axiosApi.get("main");
      return response.data;
    },
  });
  if (isLoading) {
    return "isLoading...";
  }
  console.log(data);
  return (
    <>
      <Navbar />
      <h1>{data}</h1>
    </>
  );
};

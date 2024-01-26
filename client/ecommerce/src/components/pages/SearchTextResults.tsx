import React from "react";
import { useParams } from "wouter";

const SearchTextResults = () => {
  const params = useParams();
  const search = params.searchText?.indexOf("=");
  const searchText = params?.searchText?.substring(search! + 1);

  return <div>SearchTextResults</div>;
};

export default SearchTextResults;

import React, { createContext, useEffect, useState } from "react";
import PublicController from "../APIs/PublicController";

const SearchContext = createContext({
  data: [],
  getSearchData: (e) => {},
  setData: () => {},
});

const SearchProvider = (props) => {
  const [results, setResults] = useState([]);
  const publicController = new PublicController();

  const searchDataHandler = async (e) => {
    const response = await publicController.getSearch(e);
    setResults(response);
  };

  const initValue = {
    data: results,
    getSearchData: (e) => searchDataHandler(e),
    setData: () => {},
  };

  return (
    <SearchContext.Provider value={initValue}>
      {props.children}
    </SearchContext.Provider>
  );
};

export { SearchProvider, SearchContext };

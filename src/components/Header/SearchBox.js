import React, { useContext, useState } from "react";
import { FiSearch } from "react-icons/fi";
import Utils from "../../Utils/Utils";
import Modal from "../../Utils/Modal";
import { SearchContext } from "../../Context/SearchContext";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const searchContext = useContext(SearchContext);
  const [show, setShow] = useState(false);

  function performSearch(query) {
    console.log("perform search");
    if (!show && query.length > 2) {
      searchContext.getSearchData(query);
      setShow(true);
    } else {
      setShow(false);
    }
  }

  function debounce(func, delay) {
    let debounceTimer;
    return function (...args) {
      const context = this;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  }

  const handleSearch = debounce((event) => {
    performSearch(event.target.value);
  }, 500);

  return (
    <div
      style={{ backgroundColor: Utils.color.tertiary }}
      className="rounded-full px-4 py-2 w-1/2 flex items-center gap-2"
    >
      <FiSearch size={20} style={{color:Utils.color.senary}} />
      <input
        id="main-search"
        onChange={handleSearch}
        style={{ backgroundColor: Utils.color.tertiary,color:Utils.color.senary}}
        type="text"
        className="border-0 border-gray-500 outline-0 w-full"
        placeholder="Search"
      />

      <SearchModal show={show} onClose={() => setShow(false)}>
        {searchContext.data &&
          searchContext.data.length > 0 &&
          searchContext.data.map((item, index) => {
            return <SearchItem key={index} {...item} />;
          })}
      </SearchModal>
    </div>
  );
};

const SearchItem = (props) => {
  const navigate = useNavigate();

  const handleNav = () => {
    console.log(console.log("Clicking"));
    switch (props.type) {
      case "User":
        navigate(`/account/${props.id}`);
        window.location.reload();
        break;
      case "Lawyer":
        navigate(`/account/${props.id}`);
        window.location.reload();
        break;
      case "Query":
        navigate(`/post/${props.id}`);
        window.location.reload();
        break;
      case "Law":
        navigate(`/library/details/${props.id}`);
        window.location.reload();
        break;
      case "Case":
        navigate(`/library/details/${props.id}`);
        window.location.reload();
        break;
    }
  };

  return (
    <div
      onClick={(e) => {
        handleNav();
      }}
      className="my-2 px-4 py-2 w-full flex justify-between items-center gap-4 border-b border-gray-900 cursor-pointer"
    >
      <div className="flex flex-col items-start justify-start">
        <p className="text-left text-md font-semibold line-clamp-1">
          {props.title ?? ""}
        </p>
        <p className="text-left text-sm line-clamp-1">{props.data ?? ""}</p>
      </div>
      <div className="text-sm bg-orange-900 text-white font-bold rounded-lg px-2">
        {props.type ?? ""}
      </div>
    </div>
  );
};

const SearchModal = ({ show, children, onClose }) => {
  if (!show) return null;
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
      className="w-full h-full fixed z-50 right-0 left-0 top-16"
    >
      <div
        className="fixed z-50 top-16 border border-gray-500 bg-white w-1/2 h-2/4 shadow-lg overflow-auto"
        style={{ left: "50%", transform: "translateX(-55%)" }}
      >
        <div className="px-4 py-4">{children}</div>
      </div>
    </div>
  );
};

export default SearchBox;

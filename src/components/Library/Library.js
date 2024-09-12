import React, { useEffect, useRef, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import LibraryItem from "../../Utils/LibraryPostCard";
import PublicController from "../../APIs/PublicController";
import UserContoller from "../../APIs/UserController";
import AddLibrary from "./AddLibrary";
import Spinner from "../../Utils/Spinner";
import Utils from "../../Utils/Utils";
import ExpertPage from "../Home/ExpertPage";
import "../Home/TopFeed/TopFeed.css";
import APIURLs from "../../APIs/APIUrls";

const Library = () => {
  const [selectedCategory, setSelectedCategory] = React.useState(0);
  const [selectedCateCase, setSelectedCateCase] = React.useState(8);
  const [selectedTab, setSelectedTab] = React.useState(0);

  const [libraries, setLibraries] = React.useState([]);
  const [categories, setCategories] = useState(null);
  const [cateCases, setCateCases] = useState([]);

  const publicController = new PublicController();

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getLibraries();
  }, [selectedTab, selectedCategory]);

  const getLibraries = async () => {
    const res = await publicController.getLibrary(
      "",
      selectedTab === 0 ? "Case" : "Law",
      selectedCategory
    );
    setLibraries(res);
  };

  const getCategories = async () => {
    const res = await publicController.getCategories();
    console.log(res);
    setCategories(res);
    getCateCases(res);
  };

  const getCateCases = (res) => {
    const filtered = res?.filter((i) => i.id !== 0);
    console.log("filtered", filtered);
    setCateCases(filtered);
  };

  const handleClick = (id) => {
    setSelectedCategory(id);
  };

  if (categories === null || libraries === null) return <Spinner />;

  return (
    <div className="flex">
      <div className="px-4 pt-4 relative w-3/4 h-full">
        <TabMenu selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        {selectedTab === 0 && (
          <div className="flex gap-4 hide-scrollbar overflow-x-auto my-4">
            {categories &&
              categories.map &&
              categories.map((category) => (
                <Chip
                  key={category.id}
                  selected={category.id === selectedCategory}
                  onClick={() => handleClick(category.id)}
                >
                  {category.category}
                </Chip>
              ))}
          </div>
        )}

        {selectedTab === 1 && (
          <div className="flex gap-4 hide-scrollbar overflow-x-auto my-4">
            {cateCases &&
              cateCases.map &&
              cateCases.map((cateCase) => (
                <Chip
                  key={cateCase.id}
                  selected={cateCase.id == selectedCateCase}
                  onClick={() => setSelectedCateCase(cateCase.id)}
                >
                  {cateCase.category}
                </Chip>
              ))}
          </div>
        )}

        {selectedTab === 0 && categories && categories.length > 0 && (
          <AddLibrary category={categories} />
        )}
        <div className="">
          {selectedTab == 0 &&
            libraries &&
            libraries.map &&
            libraries.map((item) => (
              <LibraryItem
                key={item.id}
                id={item.id}
                category={item.category}
                date={item.created_at}
                userName={item.name}
                profileURL={item.profile}
                title={item.title}
                description={item.data}
              />
            ))}

          {selectedTab == 1 && (
            <div className="h-screen">
              {" "}
              <embed
                src={`https://drive.google.com/viewerng/viewer?embedded=true&url=https://theoptimiz.com/files/${selectedCateCase}.pdf`}
                width="800"
                height="100%"
              />
            </div>
          )}
        </div>
      </div>
      <div style={{ marginTop: "15vh" }} className="1/4">
        <ExpertPage />
      </div>
    </div>
  );
};

const Chip = ({ children, selected, className, onClick }) => {
  return (
    <div
      style={{
        backgroundColor: selected ? Utils.color.secondary : "",
        whiteSpace: "nowrap", // Ensure text stays in a single line
        flexShrink: 0, // Prevents shrinking of the chip
      }}
      onClick={onClick}
      className={` rounded-full px-4 py-1 cursor-pointer ${
        selected ? "text-white" : "bg-gray-500 text-white"
      } ${className}`}
    >
      {children}
    </div>
  );
};

const TabMenu = ({ selectedTab, setSelectedTab }) => {
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box
      sx={{ width: "100%", backgroundColor: Utils.color.primary }}
      className="sticky top-0"
    >
      <Tabs
        color="secondary"
        value={selectedTab}
        onChange={handleChange}
        aria-label="secondary tabs example"
        TabIndicatorProps={{
          sx: {
            backgroundColor: Utils.color.tertiary,
          },
        }}
      >
        <Tab
          sx={{
            color: Utils.color.white,
            "&.Mui-selected": {
              color: Utils.color.tertiary,
            },
          }}
          value={0}
          label="Previous Cases"
        />
        <Tab
          sx={{
            color: Utils.color.white,
            "&.Mui-selected": {
              color: Utils.color.tertiary,
            },
          }}
          value={1}
          label="Laws/Rules"
        />
      </Tabs>
    </Box>
  );
};

export default Library;

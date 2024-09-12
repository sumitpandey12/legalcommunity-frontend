import React from "react";
import TopFeed from "./TopFeed/TopFeed";
import Feed from "./Feed/Feed";
import ExpertPage from "./ExpertPage";
import Utils from "../../Utils/Utils";

const Home = (props) => {
  return (
    <div
      style={{ backgroundColor: Utils.color.primary }}
      className={`p-4 bg-slate-900	 ${props.className}`}
    >
      <TopFeed />
      <div className="w-full flex gap-4">
        <div className="w-3/4">
          <Feed />
        </div>
        <div className="w-1/4">
          <ExpertPage />
        </div>
      </div>
    </div>
  );
};

export default Home;

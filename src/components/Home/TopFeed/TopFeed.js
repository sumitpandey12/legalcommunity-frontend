import React, { useContext, useEffect } from "react";
import "./TopFeed.css";
import TopFeedItem from "./TopFeedItem";
import { FeedContext } from "../../../Context/FeedContext";

const TopFeed = () => {
  const feedContext = useContext(FeedContext);
  return (
    <div className="flex hide-scrollbar overflow-x-scroll gap-4 p-4 rounded-lg">
      {feedContext.topPosts &&
        feedContext.topPosts.map((item, index) => (
          <TopFeedItem
            id={item.id}
            key={index}
            imageURL={item.file}
            title={item.query_content}
            desc={item.name}
          />
        ))}
    </div>
  );
};

export default TopFeed;

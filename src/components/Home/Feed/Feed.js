import React, { useContext, useEffect } from "react";
import FeedItem from "./FeedItem";
import { FeedContext } from "../../../Context/FeedContext";
import { Avatar, Card, Chip } from "@mui/material";
import Spinner from "../../../Utils/Spinner";

const Feed = () => {
  const feedContext = useContext(FeedContext);

  if (feedContext.topPosts === null) {
    return <Spinner />;
  }

  return (
    <div className="w-full flex gap-4">
      <div className="w-full overflow-y-auto">
        {feedContext.posts &&
          feedContext.posts.map((feed, index) => (
             feed && <FeedItem
              key={index}
              full_name={feed.name}
              comment_count={feed.comment_count}
              date={feed.created_at}
              description={feed.query_content}
              image_url={feed.file}
              id={feed.id}
              user_profile={feed.profile}
              like_count={feed.vote_count}
              auther_id={feed.author_id}
              is_following={feed.is_following}
              isLawyerRequest={feed.is_lawyer_request}
              categoryName={feed.user_category}
              userType={feed.user_type}
              votestatus={feed.vote_status}
            />
          ))}
      </div>
    </div>
  );
};

export default Feed;

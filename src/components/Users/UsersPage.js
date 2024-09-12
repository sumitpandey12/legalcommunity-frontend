import React, { useEffect } from "react";
import Divider from "../../Utils/Divider";
import { Box, Tab, Tabs } from "@mui/material";
import Utils from "../../Utils/Utils";
import PublicController from "../../APIs/PublicController";
import { useNavigate } from "react-router-dom";

const UsersPage = () => {
  const [selectedTab, setSelectedTab] = React.useState(1);
  const [users, setUsers] = React.useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await new PublicController().getUsers();
    setUsers(response);
  };

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div className="p-2 flex flex-col items-start">
      <TabMenu selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {selectedTab == 1 &&
        users.users &&
        (users.users.length > 0 ? (
          users.users.map((user) => <UserItem key={user.id} {...user} />)
        ) : (
          <div>No Users!</div>
        ))}

      {selectedTab == 2 &&
        users.lawyers &&
        (users.lawyers.length > 0 ? (
          users.lawyers.map((user) => <UserItem key={user.id} {...user} />)
        ) : (
          <div>No Lawers!</div>
        ))}
    </div>
  );
};

const TabMenu = ({ selectedTab, setSelectedTab }) => {
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
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
          value={1}
          label="List Of users"
        />
        <Tab
          sx={{
            color: Utils.color.white,
            "&.Mui-selected": {
              color: Utils.color.tertiary,
            },
          }}
          value={2}
          label="List of lawers"
        />
      </Tabs>
    </Box>
  );
};

const UserItem = (props) => {
  const navigate = useNavigate();

  const handleNav = () => {
    navigate(`/account/${props.id}`);
  };

  return (
    <div
      onClick={() => handleNav()}
      key={props.id}
      className="w-full flex flex-col gap-2 p-4 cursor-pointer hover:bg-gray-700 rounded-lg"
    >
      <div className="flex gap-2 items-center">
        <div className="w-10 h-10 text-center flex justify-center items-center rounded-full bg-red-500">
          {props.name[0].toUpperCase()}
        </div>
        <div className="text-start ms-2">
        <div className="text-white font-semibold">{props.name}</div>
        <div className="text-gray-300 font-regular">{props.category && props.category}</div>
        </div>
        
      </div>

      <Divider className={"my-1"} />
    </div>
  );
};

export default UsersPage;

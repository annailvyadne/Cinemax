import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/service-crew/Navbar/Navbar";
import Sidebar from "../../components/service-crew/Sidebar/Sidebar";
import axios from "axios";
import { notifySuccess, notifyError } from "../../Utils/notification";

const Home = () => {
  const user = useSelector((state) => state.user.user);
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const [orderCount, setOrderCount] = useState(0);

  const getNumberOfOrder = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_LINK}/orders/count`
      );
      console.log(response);
      setOrderCount(response.data.count);
    } catch (err) {
      console.error("Error fetching order count:", err);
    }
  };

  useEffect(() => {
    getNumberOfOrder();

    if (loggedIn && user && user.role === "crew") {
      notifySuccess("Successfully logged in");
    }
  }, [loggedIn, user]);

  return (
    <div>
      <div></div>
    </div>
  );
};

export default Home;
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Widget from "../../components/admin/Widget";
import BarChart from "../../components/admin/Chart/BarChart";
import LineChart from "../../components/admin/Chart/LineChart";
import PieChart from "../../components/admin/Chart/PieChart";
import Map from "../../components/admin/Map";
import ContactWidget from "../../components/admin/ContactWidget";
import TopMovies from "../../components/admin/TopMovies";
import { notifySuccess } from "../../Utils/helpers";
import axios from "axios";
import { Link } from "react-router-dom";
const Home = () => {
  const user = useSelector((state) => state.user.user);
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const [userCount, setUserCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);

  const getNumberofUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_LINK}/users/count`
      );
      console.log(response);
      setUserCount(response.data.count);
    } catch (err) {
      console.error("Error fetching user count:", err);
    }
  };

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

  const getNumberOfBooking = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_LINK}/bookings/count`
      );
      console.log(response);
      setBookingCount(response.data.count);
    } catch (err) {
      console.error("Error fetching booking count:", err);
    }
  };

  useEffect(() => {
    getNumberofUsers();
    getNumberOfOrder();
    getNumberOfBooking();

    if (loggedIn && user && user.role === "admin") {
      notifySuccess("Successfully logged in");
    }
  }, [loggedIn, user]);
  return (
    <div>
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p className="mt-4">
        Welcome to the admin dashboard. Here you can manage all aspects of your
        application.
      </p>

      <div className="flex mt-5 justify-between items-center">
        <Widget type="User" count={userCount}></Widget>
        <Widget type="Order" count={orderCount}></Widget>
        <Widget type="Booking" count={orderCount}></Widget>
      </div>
      <div className="container mt-5 bg-white p-4 shadow-md rounded-lg ">
        <BarChart />

        <div className="flex justify-between items-center mt-4">
          <div className="text-blue-500 flex justify-between gap-6 cursor-pointer">
            <Link className="hover:underline">View orders</Link>
            <Link className="hover:underline">View bookings</Link>
          </div>

          <button className="bg-transparent border border-green-500 text-green-500 px-4 py-2 rounded hover:bg-green-500 hover:text-white transition-colors duration-300">
            Download Report
          </button>
        </div>
      </div>

      <div className="flex justify-between gap-4 mt-5">
        <PieChart />
        <TopMovies />
        <ContactWidget />
      </div>

      <div className="container mt-5 bg-white p-4 shadow-md rounded-lg">
        <Map />
      </div>
    </div>
  );
};

export default Home;

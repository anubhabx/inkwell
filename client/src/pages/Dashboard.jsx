import React, { useEffect, useState } from "react";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardMain from "../components/DashboardMain";
import { useLocation } from "react-router-dom";
import DashboardSettings from "../components/DashboardSettings";
import DashboardPosts from "../components/DashboardPosts";
import DashboardUsers from "../components/DashboardUsers";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    setTab(urlParams.get("tab") || "profile");
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-72">
        <DashboardSidebar />
      </div>
      <div className="w-full my-12">
        {tab === "profile" && <DashboardMain />}
        {tab === "settings" && <DashboardSettings />}
        {tab === "posts" && <DashboardPosts />}
        {tab === "users" && <DashboardUsers />}
      </div>
    </div>
  );
};

export default Dashboard;

// "use client";
import React from "react";
import TopBanner from "./home/TopBanner";
import { HomeCards } from "./home/HomeCards";

const ClientDashboardPage = async () => {
  return (
    <main className="w-full no-scrollbar overflow-y-scroll mb-6">
      <TopBanner />
      <HomeCards />
    </main>
  );
};

export default ClientDashboardPage;

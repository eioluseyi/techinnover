"use client";

import { AppProvider } from "@/components/kanbanBoard/contexts";
import HomeContent from "@/components/pageContent/Home";

const Home = () => {
  return (
    <AppProvider>
      <HomeContent />
    </AppProvider>
  );
};

export default Home;

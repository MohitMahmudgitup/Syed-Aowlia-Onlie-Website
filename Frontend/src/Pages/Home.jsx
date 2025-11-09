import React from "react";
import Hero from "../Components/Hero";
import LatesCallection from "../Components/LatesCallection";
import BestSeller from "../Components/BestSeller";
import OuerPolicy from "../Components/OuerPolicy";
import NewsLetterBox from "../Components/NewsLetterBox";
import Category from "../Components/Category";

const Home = () => {
  const sectionPadding = "px-1 sm:px-[5vw] md:px-[7vw] xl:px-[8vw] 2xl:px-[16vw]";

  return (
    <main className="flex flex-col sm:gap-8">
      
      <div className={sectionPadding}>
        <Hero />
        <Category />
      </div>

      <div className={sectionPadding}>
        <BestSeller />
      </div>

      <div className={sectionPadding}>
        <LatesCallection />
        <OuerPolicy />
        <NewsLetterBox />
      </div>

    </main>
  );
};

export default Home;

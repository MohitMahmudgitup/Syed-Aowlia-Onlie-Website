import React from "react";
import Hero from "../Components/Common/Home/Common/Hero";
import LatesCallection from "../Components/Common/Home/Common/LatesCallection";
import BestSeller from "../Components/Common/Home/Common/BestSeller";
import OuerPolicy from "../Components/Common/Home/Common/OuerPolicy";
import NewsLetterBox from "../Components/Common/Home/Common/NewsLetterBox";
import Category from "../Components/Common/Home/Common/Category";

const Home = () => {
  const sectionPadding = "px-1 sm:px-[5vw] md:px-[7vw] xl:px-[8vw] 2xl:px-[16vw] flex flex-col gap-";

  return (
    <main className="flex flex-col gap-">

      <div className={sectionPadding}>
        <Hero />
        <Category />
      </div>
      <div className="px-0 sm:px-[5vw] md:px-[7vw] xl:px-[8vw] 2xl:px-[16vw]  flex flex-col ">
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

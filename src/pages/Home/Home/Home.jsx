import React, { useState } from "react";
import Banner from "../shared/Banner";
import HomePosts from "../shared/HomePosts";
import AllTags from "../shared/AllTags";
import Announcements from "../shared/Announcements";
import NewsLetter from "../shared/NewsLetter";
import FAQ from "../shared/FAQ";
import Reviews from "../shared/Reviews";
import PopularPosts from "../shared/PopularPosts";

const Home = () => {
  const [searchedTag, setSearchedTag] = useState("");

  return (
    <div>
      <Banner setSearchedTag={setSearchedTag}></Banner>
      <div className="space-y-8 my-8">
        <AllTags setSearchedTag={setSearchedTag}></AllTags>
        <HomePosts searchedTag={searchedTag}></HomePosts>
        <PopularPosts></PopularPosts>
        <Announcements></Announcements>
        <Reviews></Reviews>
        <FAQ></FAQ>
        <NewsLetter></NewsLetter>
      </div>
    </div>
  );
};

export default Home;

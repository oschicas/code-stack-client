import React, { useState } from 'react';
import Banner from '../shared/Banner';
import HomePosts from '../shared/HomePosts';
import AllTags from '../shared/AllTags';
import Announcements from '../shared/Announcements';
import NewsLetter from '../shared/NewsLetter';
import FAQ from '../shared/FAQ';

const Home = () => {
    const [searchedTag, setSearchedTag] = useState('');
    
    return (
        <div>
            <Banner setSearchedTag={setSearchedTag}></Banner>
            <AllTags setSearchedTag={setSearchedTag}></AllTags>
            <HomePosts searchedTag={searchedTag}></HomePosts>
            <Announcements></Announcements>
            <NewsLetter></NewsLetter>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;
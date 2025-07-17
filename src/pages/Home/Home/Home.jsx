import React, { useState } from 'react';
import Banner from '../shared/Banner';
import HomePosts from '../shared/HomePosts';

const Home = () => {
    const [searchedTag, setSearchedTag] = useState('');
    
    return (
        <div>
            <Banner setSearchedTag={setSearchedTag}></Banner>
            <HomePosts searchedTag={searchedTag}></HomePosts>
        </div>
    );
};

export default Home;
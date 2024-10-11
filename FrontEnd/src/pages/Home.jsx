import React, { Component } from 'react';

import MobileSearch from '../components/MobileSearch'
import TopBar from '../components/TopBar'
import Header from '../components/Header'

class Home extends Component {
    render() {
        return (
            <div>
                <MobileSearch />
                <TopBar />
                <Header />
            </div>
            
        );
    }
}

export default Home;
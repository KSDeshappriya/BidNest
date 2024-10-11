import React, { Component } from 'react';

import PreLoader from '../components/PreLoader'
import MobileSearch from '../components/MobileSearch'
import TopBar from '../components/TopBar'
// import Header from './components/Header'

class Home extends Component {
    render() {
        return (
            <PreLoader />,
            <MobileSearch />,
            <TopBar />
        );
    }
}

export default Home;
import React, { Component } from 'react';

class Admin extends Component {
    render() {
        return (
            <div>
                <h1>Admin Panel</h1>
                <p>Protected route, only logged in users can access this page.</p>
            </div>
        );
    }
}

export default Admin;

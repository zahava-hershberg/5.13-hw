import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

const Home = () => {



    return (
        <div className='container' style={{ marginTop: '80px' }}>
            <main role='main' class='pb-3'>
                <div>
                    <h1>Welcome to the React Bookmark Application</h1>
                    <h3>Top 5 most bookmarked links</h3>
                    <table className='table table-hover table-bordered table-striped'>
                        <thead>
                            <tr>
                                <th>Url</th>
                                <th>Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </table>
                </div>

            </main>
        </div>
    );
};

export default Home;
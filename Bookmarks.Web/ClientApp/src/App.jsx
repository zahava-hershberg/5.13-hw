import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './Pages/Home';
import { AuthContextComponent } from './AuthContext';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import AddBookmark from './Pages/AddBookmark';
import GetBookmarks from './Pages/GetBookmarks';
import Logout from './Pages/Logout';
const App = () => {
    return (
        <AuthContextComponent>
            <Layout>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/addbookmark' element={<AddBookmark />} />
                    <Route path='/mybookmarks' element={<GetBookmarks />} />
                    <Route path='/logout' element={<Logout />} />
                </Routes>
            </Layout>
        </AuthContextComponent>
    );
}

export default App;
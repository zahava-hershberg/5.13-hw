import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../AuthContext';

const GetBookmarks = () => {
    const [bookmarks, setBookmarks] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [currentBookmark, setCurrentBookmark] = useState(null);
    const [title, setTitle] = useState("");
    const { user } = useAuth();

    const getBookmarks = async () => {
        const { data } = await axios.get('/api/bookmark/getbookmarks');
        setBookmarks(data);
    }

        useEffect(() => {
            getBookmarks();
        }


            , []);

        const onEditClick = (bookmark) => {
            setEditMode(true);
            setCurrentBookmark(bookmark);
            setTitle(bookmark.title)
        }
        const onCancelClick = () => {
            setEditMode(false);
        }
        const onUpdateClick = async () => {
            const { data } = await axios.post('/api/bookmark/update', {currentBookmark,id:currentBookmark.id, title:title});
            setCurrentBookmark(data);
            getBookmarks();
            setEditMode(false);
          
        }
        const onDeleteClick=async(id)=>{
            await axios.post('/api/bookmark/delete', {id});
            getBookmarks();

        }



        return (
            <div className='container' style={{ marginTop: '80px' }}>
                <main role='main' className='pb-3'>
                    <div style={{ marginTop: '20px' }}>
                        <div className='row'>
                            <div className='col-md-12'>
                                <h1>Welcome Back {user.firstName} {user.lastName}</h1>
                                <Link to='/addbookmark'>
                                    <button className='btn btn-primary'>Add Bookmark</button>
                                </Link>
                            </div>
                        </div>
                        <div className='row' style={{ marginTop: '20px' }}>
                            <table className='table table-hover table-bordered table-striped'>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Url</th>
                                        <th>Edit/Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookmarks.map(b => (
                                        <tr key={b.id}>
                                            {!editMode || currentBookmark.id !== b.id ? (
                                                <>
                                                    <td>{b.title}</td>
                                                    <td><a href={b.url} target='blank'> {b.url}</a></td>
                                                    <td>
                                                        <button onClick={() => onEditClick(b)} className='btn btn-success'>Edit Title</button>
                                                        <button onClick={()=>onDeleteClick(b.id)} className='btn btn-danger' style={{ marginLeft: '10px' }}>Delete</button>
                                                    </td>
                                                </>
                                            ) : (
                                                <>
                                                    <td>
                                                        <input type='text' onChange={e => setTitle(e.target.value)} className='form-control' value={title} placeholder='Title' />
                                                    </td>
                                                    <td>{b.url}</td>
                                                    <td>
                                                        <button onClick={onUpdateClick} className='btn btn-warning'>Update</button>
                                                        <button onClick={onCancelClick} className='btn btn-info' style={{ marginLeft: '10px' }}>Cancel</button>
                                                        <button onClick={()=>onDeleteClick(b.id)} className='btn btn-danger' style={{ marginLeft: '10px' }}>Delete</button>
                                                    </td>
                                                </>
                                            )}
                                          
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        );
    };


    export default GetBookmarks;



import { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../AuthContext';
const AddBookmark=()=>{
    const { user } = useAuth();
    const navigate=useNavigate();
    const [title, setTitle]=useState('');
    const [url, setUrl]=useState('');

    const onAddClick=async()=>{
        const {data}=await axios.post('/api/bookmark/addbookmark', {title, url, userId:user.id}, );
        setTitle(data.title);
        setUrl(data.url);
        navigate('/mybookmarks')
        
    }
   
    return(
        <div className='container' style={{marginTop:'80px'}}>
            <main role='main' className='pb-3'>
                <div className='row' style={{minHeight: '80vh', display: 'flex', alignItems: 'center'}}>
                    <div className='col-md-6 offset-md-3 bg-light p-4 rounded shadow'>
                        <h3>Add Bookmark</h3>
                        <input type='text' onChange={e=>setTitle(e.target.value)} name='title' placeholder='Title' className='form-control' value={title}></input>
                        <br/>
                        <input type='text' onChange={e=>setUrl(e.target.value)} name='url' placeholder='Url' className='form-control' value={url}></input>
                        <br/>
                        <button onClick={onAddClick} className='btn btn-primary'>Add</button>
                    </div>
                </div>
            </main>

        </div>
    )

}
export default AddBookmark
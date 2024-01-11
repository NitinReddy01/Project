import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from '../Api/axios';
import { useDispatch } from 'react-redux';
import { setAuth } from '../Features/authSlice';

function EmailVerify() {
    const {search} = useLocation();
    const code:string | null =new URLSearchParams(search).get("code");

    useEffect(()=>{
        const verify = async ()=>{
            const res = await axios.post('')
        }
    },[])
    const dispatch = useDispatch();
    const handleClick=()=>{
        dispatch(setAuth({name:"nitin",id:1}));
    }

    return (
        <div>
            <button onClick={handleClick} >Click</button>
        </div>
    )
}

export default EmailVerify;

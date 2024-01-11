import { useState } from 'react';
import useAxiosPrivate from '../Hooks/useAxiosPrivate';
import { useAuth } from '../Hooks/useAuth';
// import axios from '../Api/axios';

const Home = () => {
  const axios = useAxiosPrivate();
  const [data,setData] = useState();
  const {auth} = useAuth();
  const func = async ()=>{
    const res= await axios.get('/');
    setData(res.data);
  }
  return (
    <div>
      <h1>{auth?.username}</h1>
      <h1>{data}</h1>
      <button onClick={func} >click</button>
    </div>
  )
}

export default Home

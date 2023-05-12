import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function About() {
  const history = useNavigate();
  const [userdata, setUserdata] = useState({});
  const [fileDetail, setfileDetail] = useState("")
  const handlefile = ({ target }) => {
    setfileDetail(target.files[0]);
  }

  const upload = async () => {
    const formData = new FormData();
    formData.append('image', fileDetail);
    // const imagedata = { "image": fileDetail };
    const res = await fetch("/upload", {
      method: 'POST',
      credentials: "include",
      body: formData
    });
    const data = await res.json()

    if (res.status === 422 || !data) {
      console.log("no file ")
    } else {
      window.location.reload()
      console.log("image successs")
    }
  }

  const Aboutpage = async () => {
    try {
      const res = await fetch("/about", {
        method: 'GET',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      })

      const data = await res.json()
      setUserdata(data);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log("err")
      history('/');
    }
  }

  useEffect(() => {
    upload();

  }, [fileDetail])

  useEffect(() => {
    Aboutpage()
    // upload();
  }, [])


  return (
    <div >
      <div className='flex justify-end '>
        <Link to="/logout">
          <button className='mt-10 mr-10 bg-stone-800 hover:bg-black text-white w-32 rounded p-2 ' >Logout</button>
        </Link>
      </div>
      <div className='h-screen flex flex-col items-center justify-center '>
        <h1 className='font-extrabold text-2xl mt-6 italic'>About Me</h1>
        <div className='flex'>
          <img className='w-28  mt-5 mb-0 h-28 rounded-full z-30' src={!userdata.profile?'https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png':userdata.profile} alt="" />
          <label className='text-3xl cursor-pointer font-extrabold -ml-6 mt-24 h-9 w-9 text-center z-40 bg-red-400 rounded-full' htmlFor="img">+</label>
          <input className=' outline hidden' id="img" type="file" name="image" accept="image/png, image/jpeg" onChange={handlefile} />
        </div>
        <div className='bg-slate-300 h-fit mt-5 w-fit  rounded drop-shadow-2xl '>
          <div className='grid sm:grid-cols-2 ml-5 mr-5 mt-10 mb-2'>
            <h1 className='text-blue-700'>User id</h1>
            <h1>{userdata._id}</h1>
          </div>
          <div className='grid sm:grid-cols-2 ml-5 mr-5 mb-2'>
            <h1 className='text-blue-700' >Name</h1>
            <h1>{userdata.name}</h1>
          </div>
          <div className='grid sm:grid-cols-2 ml-5 mr-5 mb-2'>
            <h1 className='text-blue-700'>Email</h1>
            <h1>{userdata.email}</h1>
          </div>
          <div className='grid sm:grid-cols-2 ml-5 mr-5 mb-2'>
            <h1 className='text-blue-700'> Phone</h1>
            <h1>{userdata.phone}</h1>
          </div>
          <div className='grid sm:grid-cols-2 ml-5 mr-5 mb-10'>
            <h1 className='text-blue-700'>profession</h1>
            <h1>{userdata.work}</h1>
          </div>
        </div>
        <Link to="/contect">
          <button className='mt-5 bg-stone-800 hover:bg-black text-white w-32 rounded p-2 ' >Contect</button>
        </Link>
      </div>
    </div>
  )
}

export default About
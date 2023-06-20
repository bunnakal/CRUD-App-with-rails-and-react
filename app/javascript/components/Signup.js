import React, { useRef } from 'react';

const Signup = ({setCurrUser, setShow}) => {

  const formRef = useRef();

  const signup = async (userInfo, setCurrUser) => {
    try {
      const response = await fetch("/signup", {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify(userInfo)
      })
      const data = await response.json()
      if (!response.ok) throw data.error
      localStorage.setItem('token', response.headers.get("Authorization"))
      setCurrUser(data)
    }catch (error){
      console.log("error", error)
    }
  }  

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current)
    const data = Object.fromEntries(formData)
    const userInfo = {
      "user": {
        email: data.email, 
        password: data.password
      }
    }
    signup(userInfo, setCurrUser)
    e.target.reset()
  }

  const handleClick = (e) => {
    e.preventDefault();
    setShow(true)
  }

  return(
    <div className="container">
      <h1>Signup</h1>
      <form ref={formRef} onSubmit = {handleSubmit}>
        <div className='mb-2'>
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" name="email" placeholder='email' className='form-control' />
        </div>
        <div className='mb-2'>
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" name = "password" placeholder='password' className='form-control' />
        </div>
        <div className='mb-2 form-action'>
          <input type ="submit" value= "Signup" className='btn btn-primary' />
        </div>
        
      </form>
      <br/>
      <div>
        Already registered, <a href='#login' onClick={handleClick}>Login</a> here.
      </div>
    </div>
  )

};

export default Signup;
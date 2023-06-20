import React, { useRef, useState } from "react";

const Login = ({setCurrUser, setShow}) => {
  const formRef = useRef()
  const login = async (userInfo, setCurrUser) => {
    try{
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          'content-type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify(userInfo)
      })
      const data = await response.json()
      if (!response.ok) throw data.error
      localStorage.setItem("token", response.headers.get("Authorization"))
      setCurrUser(data)
    }catch (error){
      console.log("error", error);
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
    login(userInfo, setCurrUser)
    e.target.reset()

  }

  const handleClick = (e) => {
    e.preventDefault();
    setShow(false);
  }

  return(
    <div className="container">
      <h1>Login</h1>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="mb-2">
          <label htmlFor="email" className="form-label">Email</label>
          <input type = "email" name = "email" placeholder="email" className="form-control" />
        </div>
        <div className="mb-2">
          <label htmlFor="password" className="form-label">Password</label>
          <input type = "password" name = "password" placeholder="password" className="form-control" />
        </div>
        <div className="form-action mb-2">
          <input type = "submit" value = "Login" className="btn btn-success" />
        </div>

      </form>
      <br/>
      <div>
        Not registered yet, <a href="#signup" onClick={handleClick}> Signup</a>
      </div>
    </div>
  )

};

export default Login;
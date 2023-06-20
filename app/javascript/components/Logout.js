import React from 'react';

const Logout = ({setCurrUser}) => {
  const logout = async (setCurrUser) => {
    try{
      const response = await fetch("/logout", {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          'authorization': localStorage.getItem("token")
        },
      })
      const data = await response.json()
      if (!response.ok) throw data.error;
      localStorage.removeItem("token");
      setCurrUser(null);
    }catch (error){
      console.log("Error", error);
    } 
  }

  const handleClick = (e) => {
    e.preventDefault();
    logout(setCurrUser);
  }

  return(
    <div>
      <input type="button" value= 'Logout' className='btn btn-danger' onClick={handleClick} />
    </div>
  );

};

export default Logout;
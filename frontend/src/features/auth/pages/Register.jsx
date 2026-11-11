import React from 'react'
import { Link, useNavigate } from 'react-router'

const Register = () => {


  const navigate = useNavigate()

  
  const handleSubmit = (e) =>{
    e.preventDefault()

  }




  return (
     <main>

      <div className="form-container">
        <h1>Register</h1>

        <form onSubmit={handleSubmit}>


          <div className="input-group">
            <label htmlFor='username' >username</label>
            <input type="email" id="username" name="username" placeholder='Enter username' ></input>
          </div>
          <div className="input-group">
            <label htmlFor='email' >email</label>
            <input type="email" id="email" name="email" placeholder='Enter email address' ></input>
          </div>
          <div className="input-group">
            <label htmlFor='password' >password</label>
            <input type="password" id="password" name="password" placeholder='Enter password' ></input>
          </div>  

          <button className='button primary-button'>Register</button>

        </form>

        <p>Already have an account ?  <Link to={"/login"}   >Login</Link></p>
      </div>
      


    </main>
  )
}

export default Register
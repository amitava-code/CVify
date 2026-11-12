import React, { useState } from 'react'
import "../auth.form.scss"
import { useNavigate,Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Login = () =>{

  const {loading, handlelogin} = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")



  const handleSubmit = async (e) =>{
    e.preventDefault()
    handlelogin({email,password})

  }


  if(loading){
    return(<main><h1>Loading.......</h1></main>)
  }


  return (
    <main>

      <div className="form-container">
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label htmlFor='email' >email</label>
            <input
            onChange={(e)=> {setEmail(e.target.value)}}
             type="email" id="email" name="email" placeholder='Enter email address' ></input>
          </div>
          <div className="input-group">
            <label htmlFor='password' >password</label>
            <input
            onChange={(e)=> {setPassword(e.target.value)}}
             type="password" id="password" name="password" placeholder='Enter password' ></input>
          </div>  

          <button className='button primary-button'>Login</button>

        </form>
        <p>Don't have an account ?  <Link to={"/register"}   >Register</Link></p>
      </div>
      


    </main>
  )
}

export default Login
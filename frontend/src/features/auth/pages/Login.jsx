import React from 'react'
import "../auth.form.scss"

const Login = () =>{

  const handleSubmit = (e) =>{
    e.preventDefault()

  }


  return (
    <main>

      <div className="form-container">
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label htmlFor='email' >email</label>
            <input type="email" id="email" name="email" placeholder='Enter email address' ></input>
          </div>
          <div className="input-group">
            <label htmlFor='password' >password</label>
            <input type="password" id="password" name="password" placeholder='Enter password' ></input>
          </div>  

          <button className='button primary-button'>Login</button>

        </form>
      </div>
      


    </main>
  )
}

export default Login
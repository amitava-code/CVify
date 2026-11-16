import React from 'react'
import '../styles/Home.scss'


const Home = () =>{
  return(
    <main className='home'>


      <div className="interview-input-grp">

            <div className="left">
        <textarea name='jobDescription' id='jobDescription' placeholder='
        Enter job description here...'  ></textarea>
      </div>
      <div className="right">
        <div className="input-group">
          <p>Resume <small className='highlight'>(Use resume and self description together for best results)</small></p>
          <label className='file-label' htmlFor='resume'  >Upload Resume</label>
          <input hidden type='file' name='resume' id='resume' accept='.pdf' ></input>
        </div>
        <div className="input-group">
          <label htmlFor='selfDescription' >Self description</label>
          <textarea name='selfDescription' id='selfDescription'  placeholder='Describe  Yourself in a few senteces,,,,'  ></textarea>
        </div>
        <button className='generate-btn'>Generate Interview Report</button>
      </div>


      </div>


    </main>
  )
}


export default Home



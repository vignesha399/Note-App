import React from "react";



export function Error404() {
  const hompage = () => {
    window.location.assign('/login');
  }
  return (<>
    <body style={{
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f4f4f9',
        color: '#333',
        textAlign: 'center',
        margin: 0,
        padding: 0,
      }}>
      <div className="container" style={{padding: '50px'}}>
        <h1 style={{fontSize: '100px', color: '#e74c3c'}}>404</h1>
        <p style={{fontSize: '20px'}}>Oops! The page you're looking for doesn't exist.</p>
        <p style={{fontSize: '20px'}}>It seems you've stumbled upon a broken link or an incorrect URL.</p>
        <a onClick={hompage} className="hover:bg-[#2980b9] hover:underline underline-offset-2" style={{
          display: 'inline-block',
          padding: '10px 20px',
          backgroundColor: '#3498db',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px',
          marginTop: '20px',
          fontSize: '18px'
        }} >Go to Homepage</a>
      </div>

    </body>

  </>)
}


export function Error401() {
  const hompage = () => {
    window.location.assign('/login');
  }
  return (<>
    <body style={{
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f4f4f9',
        color: '#333',
        textAlign: 'center',
        margin: 0,
        padding: 0,
      }}>
      <div className="container" style={{padding: '50px'}}>
        <h1 style={{fontSize: '100px', color: '#e74c3c'}}>Need to login</h1>
        <p style={{fontSize: '20px'}}>Oops! The page you're looking for doesn't exist.</p>
        <p style={{fontSize: '20px'}}>It seems you've stumbled upon a broken link or an incorrect URL.</p>
        <a onClick={hompage} className="hover:bg-[#2980b9] hover:underline underline-offset-2" style={{
          display: 'inline-block',
          padding: '10px 20px',
          backgroundColor: '#3498db',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px',
          marginTop: '20px',
          fontSize: '18px'
        }} >Go to Login</a>
      </div>

    </body>

  </>)
}
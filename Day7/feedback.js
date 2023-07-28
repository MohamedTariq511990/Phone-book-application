import React, { useState } from 'react';
import "./feedback.css"
import axios from 'axios';

const Comments = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      description: message,
    };

    axios.post("http://localhost:8081/addsupport", data);

    // Do something with the contact form data (e.g., send it to an API)
    console.log({
      name,
      email,
      message,
    });

    // Clear the form
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className='imgi'>
      
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <div className='contact-container'>
        <form onSubmit={handleSubmit}>
          <h1 className='contact-heading'>Write about your experience</h1>
          <label className='form-label' htmlFor="name">Name:</label>
          <input
            className='input-field'
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label className='form-label' htmlFor="email">Email:</label>
          <input
            className='input-field'
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className='form-label' htmlFor="message">Message:</label>
          <textarea
            className='textarea-field'
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>

          <button className="submit-button" type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Comments;


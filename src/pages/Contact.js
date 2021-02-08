import React, { useState } from 'react';
import './Contact.css';

/****************************************************
 * Constants
 ****************************************************/

const INVALID_EMAIL = 'PLEASE ENTER A VALID EMAIL';
const INVALID_NAME = 'PLEASE ENTER A VALID NAME';
const INVALID_NAME_AND_EMAIL = 'PLEASE ENTER A VALID NAME AND EMAIL';
const INVALID_MESSAGE = 'PLEASE ENTER A VALID MESSAGE';
const EMAIL_SENDING = 'SENDING EMAIL...';
const EMAIL_SENT = "THANKS FOR REACHING OUT! I'LL BE IN TOUCH WITH YOU SOON.";
const EMAIL_DOWN =
  'SORRY, IT LOOKS LIKE THE EMAIL SERVER IS DOWN. PLEASE TRY AGAIN LATER!';
const TEMPLATE_ID = 'template_hbEERvyT';
const toName = 'Mikki';

const Contact = () => {
  /****************************************************
   * State
   ****************************************************/
  const [feedback, setFeedback] = useState('');
  const [fromName, setFromName] = useState('');
  const [email, setEmail] = useState('');
  const [toast, setToast] = useState(false);
  const [msg, setMsg] = useState('');
  const [success, setSuccess] = useState(false);

  /****************************************************
   * Event Handlers
   ***************************************************/

  function handleSubmit(event) {
    setToast(true);
    if (!isValidEmail(email)) {
      if (!fromName) setMsg(INVALID_NAME_AND_EMAIL);
      else setMsg(INVALID_EMAIL);
    } else if (!fromName) setMsg(INVALID_NAME);
    else if (!feedback) setMsg(INVALID_MESSAGE);
    else {
      setMsg(EMAIL_SENDING);
      sendFeedback(TEMPLATE_ID, {
        message_html: feedback,
        toName: toName,
        fromName: fromName,
        reply_to: email,
      });
      setFeedback('');
      setFromName('');
      setEmail('');
    }
  }

  function sendFeedback(templateId, variables) {
    try {
      window.emailjs.send('gmail', templateId, variables).then(
        (value) => {
          setMsg(EMAIL_SENT);
          setSuccess(true);
        },
        (reason) => {
          setMsg(EMAIL_DOWN);
        }
      );
    } catch (e) {
      console.log(e);
    }
  }

  function isValidEmail(email) {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) return true;
    else return false;
  }

  function handleMessageChange(event) {
    setFeedback(event.target.value);
  }
  function handleNameChange(event) {
    setFromName(event.target.value);
  }
  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  /****************************************************
   * Render
   ****************************************************/
  return (
    <div className='contact-card'>
      {success ? null : (
        <form>
          <div>
            <input
              className='contact input'
              onChange={handleNameChange}
              placeholder='Name'
              required
              value={fromName}
            />

            <input
              className='contact input'
              onChange={handleEmailChange}
              placeholder='Email'
              required
              value={email}
            />

            <textarea
              className='contact message'
              onChange={handleMessageChange}
              placeholder='Message'
              required
              value={feedback}
            />
          </div>
          <input
            type='button'
            value='SUBMIT'
            className='submit'
            onClick={handleSubmit}
          />
        </form>
      )}
      {toast ? <p className='toast'>{msg}</p> : null}
    </div>
  );
};

export default Contact;

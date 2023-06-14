import React from 'react';
import gpt from'../assets/gpt.svg';

function chatMessage (message) {
	return (
		<div className={`chat-message ${message.user === "chatgpt" && "gpt"}`}>
            <div className="chat-message-center">
              <div className={`avatar ${message.user === "chatgpt" && "gpt"}`}>
                {/*{message.user == 'chatgpt' && <img src={gpt}/>}*/}
              {message.user == 'user' && 'f'}
              {message.user == 'chatgpt' ? <img src={gpt}/> : ""}
              </div>
              
              <div className="message">
                {message.message}
              </div>
            </div>
          </div>
	)
}

export default chatMessage;
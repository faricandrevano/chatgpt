import { useState,useEffect } from 'react';
import './style.css';
import './normal.css';
import gpt from'../../assets/gpt.svg';
import ButtonDropdown from '../ButtonDropdown/index';
import {auth} from '../../../firebase';
import {selectData} from '../../feature/dataSlice';
import {useSelector} from 'react-redux';
import { useSpeechSynthesis } from 'react-speech-kit';

// import MessageIcon from '../../assets/comment.png';
// import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';

// import loading from './components/loading';
function Index() {
  const { speak } = useSpeechSynthesis();
  const currentUser = useSelector(selectData);
  const [input,setInput] = useState("");
  const [message,setMessage] = useState(null);
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle,setCurrentTitle] = useState(null);
  const [isActive, setIsActive] = useState(false);

  // const [chatLog,setChatLog] = useState([]);
  // const [isLoading,setIsLoading] = useState(false);
  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   let chatLogNew = [...chatLog, {user: "user",message: `${input}`}];
  //   await setInput("");
  //   const messages = chatLogNew.map(message => message.message).join("\n");
  //   const response = await fetch("http://localhost:5000/",{
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       message: messages
  //     })
  //   });
  //   const data = await response.json();
  //   await setChatLog([...chatLogNew,{user:"chatgpt",message: `${data.message}`}])
  //   setMessage(data.message);
  //   console.log(data.message)
  //   setIsLoading(false);
  // }
  const sekarang = new Date();
  const tahun = sekarang.getFullYear();
  const bulan = sekarang.getMonth() + 1; // Ditambah 1 karena bulan dimulai dari 0
  const tanggal = sekarang.getDate();
  const detik = Math.floor(sekarang.getTime() / 1000);
  const menit = sekarang.getMinutes();
  const getMessages = async (e) => {
    e.preventDefault()
    const options = {
      method: "POST",
      body: JSON.stringify({
        messages: input,
      }),
      headers: {
        'Content-Type':'application/json'
      }
    }
    try {
      const response = await fetch('https://apikey.telsquiz.com/completions',options)
      const data = await response.json();
      setMessage(data.choices[0].message)
      
    } catch(err) {
      console.error(err);
    }
  }
  function clearChat () {
    // console.log(chatLog);
    // setChatLog([]);
    setMessage(null);
    setInput("");
    setCurrentTitle(null)
  }
  const handleClick = (unq) => {
    setIsActive(true)
    setCurrentTitle(unq);
    setMessage(null);
    setInput('');
  }
  useEffect(()=> {
      // console.log(currentTitle,value,message)
      if(!currentTitle && input && message) {
        setCurrentTitle(input)
      }
      if( currentTitle && input && message) {
        setPreviousChats(prevChats => (
          [...prevChats, 
            {
              title: currentTitle,
              role: "user",
              content: input,
              date: `${tanggal}/${bulan}/${tahun}`
            },
            {
              title: currentTitle,
              role: message.role,
              content: message.content
            }
          ]
        ))
      }
  },[message,currentTitle]);
  const currentChat = previousChats.filter(prc => prc.title === currentTitle);
  const uniquesTitle = Array.from(new Set(previousChats.map(prv => prv.title)));
  console.log(auth.currentUser);
  const options = ['Logout'];
  return (
    <>
      <div className="App">
        <aside className="sidemenu">
          <div className="side-menu-button" onClick={clearChat}>
            <span>+</span>
            New Chat
          </div>
          <div className="history">
            {uniquesTitle?.map((unique,index)=> <span key={index} onClick={() => handleClick(unique)} className={isActive ? 'active' : ''} >{unique}</span> )}
          </div>
          <div className="bottom-button">
            <ButtonDropdown title="user" image="./gg_profile.svg" options={options}/>
          </div>
        </aside>
        <section className="chatbox">
        <div className="chat-log">
          {!currentTitle && <h1>TELS GPT</h1>}
          
          <div className="feeello Chatd">
            {currentChat?.map((chatMsg,index) => <div key={index}>
              <ChatMessage key={index} message={chatMsg}/>
            </div>)}
          </div>
        </div>
          <div className="chat-input-holder">
            <form onSubmit={getMessages}>
              <input className="chat-input-textarea" placeholder="Send a message" value={input} onChange={(e)=> setInput(e.target.value)}></input>
            </form>
          </div>
        </section>
      </div>
    </>
  )
}

// const HistoryChat = ({message}) => {
//   console.log(message)
//   return (
//       <span onClick={() => handleClick(message)}>{message}</span>
//   );
// }
const ChatMessage = ({message}) => {
  const { speak } = useSpeechSynthesis();
  const [isCopied, setIsCopied] = useState(false);

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
  };
  return (
    <div className={`chat-message ${message.role == "assistant" && "assistant"}`}>
            <div className="chat-message-center">
              <div className={`avatar ${message.role == "assistant" && "assistant"}`}>
                {message.role == "assistant" && <img src={gpt}/>}
                {message.role == "user" && <img src="./gg_profile.svg"/>}
                {/*{console.log(message)}*/}
              </div>
              <div className="message">
                <div className="content">
                <span>{message.date}</span>
                <p>
                  {message.content}
                </p>
                </div>
                  <div className="option-dialog">
                    <button onClick={() => speak({text: message.content})}>Start</button>
                    <button onClick={() => copyText(message.content)}>
                      {isCopied ? 'Teks Tersalin' : 'Salin Teks'}
                    </button>
                  </div>
              </div>
            </div>
          </div>
  );
}

export default Index;

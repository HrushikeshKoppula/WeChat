import { useState }from 'react';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:5000');

function outputMyMessage(message) {
  const div = document.createElement('div');
  div.classList.add('mymessage');
  const p = document.createElement('p');
  p.classList.add('meta');
  p.innerText = message.author;
  p.innerHTML += `<span>${message.time}</span>`;
  div.appendChild(p);
  const para = document.createElement('p');
  para.classList.add('text');
  para.innerText = message.message;
  div.appendChild(para);
  document.querySelector('.chat-messages').appendChild(div);
}
function outputNotMyMessage(message) {
  const div = document.createElement('div');
  div.classList.add('notmymessage');
  const p = document.createElement('p');
  p.classList.add('meta');
  p.innerText = message.author;
  p.innerHTML += `<span>${message.time}</span>`;
  div.appendChild(p);
  const para = document.createElement('p');
  para.classList.add('text');
  para.innerText = message.message;
  div.appendChild(para);
  document.querySelector('.chat-messages').appendChild(div);
}

function App() {
  const [ state,setState ] = useState('login');
  const [ username,setUsername ] = useState(null);
  const [ roomid,setRoomid ] = useState(null);
  const loginAttempt = (e) => {
    e.preventDefault();
    socket.emit('login-attempt',{ username,roomid });
    setState('chat');
  }
  socket.off('entry').on('entry',(data)=>{
    if(data===username)
    document.getElementById("entry").innerText="Welcome "+data;
    else
    document.getElementById("entry").innerText=data+" Joined";
    setTimeout(()=>document.getElementById("entry").innerText='',4000);
  });
  const sendMessage = async () => {
    var msg = document.getElementById("msg").value;
    if(msg!==""){
      const messageData = {
        room:roomid,
        author:username,
        message:msg,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes()
      };
      await socket.emit('message2server',messageData);
    }
    document.getElementById("msg").value="";
  }
  socket.off('message').on('message',(data)=>{
    console.log(data);
    if(data.author===username)
    outputMyMessage(data);
    else
    outputNotMyMessage(data);
    const chatMessages = document.querySelector('.chat-messages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
  })
  if(state==='login'){
  return (
    <div className="App">
      <div className="join-container">
        <header className="join-header">
          <h1>WeChat</h1>
        </header>
        <main className="join-main">
        <form onSubmit={loginAttempt}>
          <label htmlFor="username">Username :</label><br />
          <input onChange={(e)=>setUsername(e.target.value)} type="text" id="username" placeholder="Enter username" required autoComplete="off" /><br /><br />
          <label htmlFor="roomname">Room:</label><br />
          <input onChange={(e)=>setRoomid(e.target.value)} type="text" id="roomname" placeholder="Enter Roomid" required autoComplete="off" /><br /><br />
          <input className="btn"type="submit" value="Join Room" />
          <br /><br />
        </form>
        </main>
      </div>
    </div>
  );
  }
  else{
  return (
    <div className="App">
      <div className="chat">
        <header className="chat-header">
          <h1> &lt;3 WeChat</h1>
          <button className='btn'>Leave Room</button>
        </header>
        <main className="chat-main">
          <div className="chat-sidebar">
            <h3>Room Name :</h3>
            <h2 id>{roomid}</h2>
            <ul id="rooms" />
          </div>
          <div className="chat-messages">
            <p id="entry"></p>
          </div>
        </main>
        <div className="chatbox">
          <input id="msg" type="text" placeholder="Enter Message" autoComplete="off" />
          <button onClick={sendMessage} className="btn">Send <i className="fa fa-paper-plane-o"></i></button>
        </div>
      </div>
    </div>
  );
  }
}

export default App;

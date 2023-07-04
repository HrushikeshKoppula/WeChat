import { useState,useEffect }from 'react';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:5000');

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
            <h3>Groups</h3>
            <ul id="rooms" />
          </div>
          <div className="chat-messages">
            <p id="entry"></p>
          </div>
        </main>
        <div className="chat-form-container">
          <form>
            <input id="msg" type="text" placeholder="Enter Message" required autoComplete="off" />
            <button className="btn">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
  }
}

export default App;

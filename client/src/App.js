import { useState,useEffect }from 'react'

function App() {
  const [ state,setState ] = useState('login');
  const [ username,setUsername ] = useState(null);
  const [ roomid,setRoomid ] = useState(null);
  if(state==='login'){
  return (
    <div className="App">
      <div className="join-container">
        <header className="join-header">
          <h1>WeChat</h1>
        </header>
        <main className="join-main">
        <form onSubmit={()=>setState('chat')}>
          <label htmlFor="username">Username :</label><br />
          <input onChange={(e)=>setUsername(e.target.value)} type="text" id="username" placeholder="Enter username" required autocomplete="off" /><br /><br />
          <label htmlFor="roomname">Room:</label><br />
          <input onChange={(e)=>setRoomid(e.target.value)} type="text" id="roomname" placeholder="Enter Roomid" required autocomplete="off" /><br /><br />
          <input class="btn"type="submit" value="Join Room" />
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
          <div className="chat-messages" />
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

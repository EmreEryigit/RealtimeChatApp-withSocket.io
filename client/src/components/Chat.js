import {useState} from 'react'
import io from "socket.io-client"
const socket = io('http://localhost:4000/', { transports: ['websocket', 'polling', 'flashsocket'] });
const Chat = () => {
    const [message, setMessage] = useState("")
    const [name, setName] = useState("")
    const [messages, setMessages] = useState([])
    const sendMessage = () => {
        socket.emit("message", {name, text: message})
        setMessage("")       
    }
    socket.on("message", ({name, text}) => {
        setMessages([...messages, {name, text}])

    })
  return (
    <div className='chatContainer'>
    <h4>Chat Messages</h4>

    {messages.map((message, index) => {
        return <div key={index}>
            <div style={{backgroundColor: name === message.name ? "gray" : "transparent"}}>
                <span>{message.name}: </span>
                <span>{message.text}</span>
            </div>
        </div>
    })}



      
        <input type="text" className='input'  placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className='input' type="text" placeholder="Enter your message" value={message} onChange={(e) => setMessage(e.target.value)}  />
        <button className='button' onClick={sendMessage}>Send</button>
    </div>
  )
}

export default Chat

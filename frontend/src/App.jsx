import {useState} from 'react'
import io from 'socket.io-client'
import './App.css'
import Chat from './Chat'

let socket = io.connect('http://localhost:5000')
function App() {
  
const [name,setName] = useState('')
const [room,setRoom] = useState('')
const [showChat,setShowChat] = useState(false)


const joinRoom = ()=>{
  if(name!=='' && room!==''){
    socket.emit('join_room',room);
    setShowChat(true)
  }
}

  return (
   
      <div className='App' >

    {!showChat?(

    

        <div className='joinChatContainer'>
        <h1>Chat App </h1>

        <input 
        type='text' 
        placeholder='enter something'
        onChange={(event)=>{
          setName(event.target.value)
        }}
        
        />

        <input type='text'
         placeholder='enter the room number' 
         onChange={(event)=>{
          setRoom(event.target.value)
         }}
         />

         <button onClick={joinRoom} >
          Join the room
         </button>
      </div>
):(


      <Chat  socket={socket} userName = {name} room ={room} />
    
    )}
    </div>
)}


export default App

import {useState} from 'react'
import io from 'socket.io-client'
import './App.css'
import Chat from './Chat'
import Swal from 'sweetalert2'

let socket = io.connect('http://localhost:5000')
function App() {
  
const [name,setName] = useState('')
const [room,setRoom] = useState('')
const [showChat,setShowChat] = useState(false)

const showAlert = ()=>{
      Swal.fire({
        title:'Error',
        text:'Check the Name and Room',
        icon:'error',
        confirmButtonText:'Try Again',
        width:'250px',
      })
    }


const joinRoom = ()=>{
  if(name!=='' && room!==''){
    socket.emit('join_room',room);
    setShowChat(true)
  }else{
    showAlert()
    console.log('user not entered credential')
  }
}
const callBackChild = (data)=>{
  socket.disconnect()
  socket = io.connect('http://localhost:5000'); 


  setName('')
  setShowChat(data)
  console.log('the data from the child call back is ',data)
  console.log('the socket is',socket)
}

  return (
   
      <div className='App' >

    {!showChat?(

      <div className='inner-app' > 
    

        <div className='joinChatContainer'>
        <h1>Login </h1>

        <input 
        type='text' 
        placeholder='Enter your Name'
        onChange={(event)=>{
          setName(event.target.value)
        }}
        
        />

        <input type='text'
         placeholder='Enter chat room' 
         onChange={(event)=>{
          setRoom(event.target.value)
         }}
         />

         <button onClick={joinRoom} >
          Join the room
         </button>
      </div>
      </div>
):(


      <Chat callBack = {callBackChild}  socket={socket} userName = {name} room ={room} />
    
    )}
    </div>
)}


export default App

import React, { useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import Swal from 'sweetalert2'

const Chat = ({callBack,socket,userName,room}) => {
  console.log('teh room',room)
  console.log('the socket',socket)
  console.log('the author name is ',name)

  const [messageList,setMessage] = useState([])
  const [currentMessage,setCurrentMessage]= useState('')
  const [live,setLive] = useState(false)

  const showAlert = (socket)=>{
    Swal.fire({
      title:'Succesfully',
      text:'Loged out',
      icon:'success',
      width:'300px'
    })

    callBack(false,socket)
    
  }

useEffect(()=>{
    // console.log('useEffect is working ')
socket.off('recieve_message').on('recieve_message',(data)=>{
  console.log('entire data ',data)
  setMessage((list)=>[...list,data])
  setCurrentMessage('')
     console.log('New message length:',messageList.length)
     messageList.length?setLive(false):setLive(true)
})
    
},[])


const showMessage = async ()=>{
    console.log('its presssed')
try {
  if(currentMessage!==''){
        let data = {
            message : currentMessage,
            author:userName,
            room:room,
        }
        await socket.emit('send_message',data)
    }


} catch (error) {
    console.log(error.message)
}
    
}

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h4>{live?' 🟢 Live Chat ':'Start chat'}</h4>
        <div className='flex-parant' >
          <div className='flex-child' >
            <p>Room: {room}</p>
            <h5>{userName}</h5>
         <button className='exit-chat-btn' onClick={()=>  showAlert(socket)} >Logout</button>
          </div>
        </div>
      </div>
      <div className='chat-body'>
        <ScrollToBottom className='message-container' >
        {messageList.map((msg, index) => {
          return (
            <div className='message' key={index} id={msg.author===userName?'you':'other'}>
              <div className='message-content'>
                <p>{msg.message}</p>
                
              </div>
              <div className='message-meta'>
                <p  >   {msg.time}</p>
                <p id='author' >  {msg.author}</p>
              </div>
            </div>
          );
        })}
        </ScrollToBottom>
      </div>
      <div className='chat-footer'>
        <input 
          type='text'
          placeholder='Hey..'
          value={currentMessage}
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event)=>{
            event.key==='Enter' && showMessage()
          }}
        />
        <button onClick={showMessage}>&#9658;</button>
      </div>
    </div>
);
}

export default Chat

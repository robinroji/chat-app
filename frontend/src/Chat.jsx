import React, { useEffect, useState } from 'react'

const Chat = ({socket,name,room}) => {

useEffect(()=>{
    console.log('useEffect is working ')
socket.on('recieve_message',(data)=>{
    console.log('kk',data)
})
    
},[socket])

    const [currentMessage,setCurrentMessage]= useState('')

const showMessage = async ()=>{
    console.log('its presssed')
try {
  if(currentMessage!==''){
        let data = {
            inputMsg : currentMessage,
            author:name,
            room:room,
        }
        await socket.emit('send_message',data)
    }


} catch (error) {
    console.log(error.message)
}
    
}




  return (
    <div>
      <div className='chat-header'>
        <h4>Start chat </h4>
         </div>
      <div className='chat-body'> </div>
      <div className='chat-footer'>
        
        <input type='text'
         placeholder='Hey..'  
         onChange={(event)=>{
            setCurrentMessage(event.target.value)
         }}
         />
        <button onClick={showMessage} > &#9658; </button>
         </div> 

    </div>
  )
}

export default Chat

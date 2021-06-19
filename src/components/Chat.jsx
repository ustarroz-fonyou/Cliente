import React, { useState, useEffect, useRef } from 'react';
import socket from './socket';
import sendIcon from '../assets/static/send-mail.png';
import '../assets/styles/components/Chat.scss'

const Chat = ({nombre}) => {
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);

  useEffect( ()=> {
    socket.emit('conectado',nombre);
  },[nombre]);


  useEffect( ()=> {
    socket.on('mensajes', (mensaje) => {
      setMensajes([...mensajes,mensaje]);
    })
    return () => { socket.off() }
  },[mensajes]);


  const divRef = useRef(null);
  useEffect( () => {
    divRef.current.scrollIntoView({behavior:'smooth'})
  })

  const submit = (e) => {
    e.preventDefault();
    if(mensaje !== ''){
      socket.emit('mensaje',nombre,mensaje);
      setMensaje("")
    }
  }

  const handleStyleMessage = (messageName, servidor) => {
    console.log({nombre})
    if(nombre === messageName){
      return 'chat--message'
    } else if(servidor){
      return 'chat--leave'
    }else{
      return 'other--message'
    }
  }

  return(
    <div className='chat'>
      <div className='chat--messages'>
        {
          mensajes.map((e, i) => (
            <div key={i} className={handleStyleMessage(e.nombre, e.servidor)}>
              <p className='chat--say'>{e.nombre} dice:</p>
              <p className='chat--text'>{e.mensaje }</p>
            </div>))
        }
        <div ref={divRef}></div>
      </div>
      <form className='chat--form'  onSubmit={submit} >
        <label>
          <p>Escriba su mensaje</p>
          <input type='text' onChange={e => setMensaje(e.target.value)} value={mensaje} />
        </label>
      <button type='submit'> 
        <img src={sendIcon} alt='send message' />
      </button>
    </form>
    </div>
    
  );
}

export default Chat;
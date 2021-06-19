import React, {useState} from 'react';
import Header from '../components/Header';
import Chat from '../components/Chat';
import avatarIcon from '../assets/static/usuario.png'
import '../assets/styles/App.scss';

const Home = () => {
  const [nombre, setNombre] = useState("");
  const [registrado, setRegistrado] = useState(false)
  
  const registrar = (e) => {
    e.preventDefault();
    if(nombre !== ''){
      setRegistrado(true);
    }
  }

  return(
    <div>
    {
      !registrado &&
      <section className='login'>
        <Header />
        <form className="login--form" onSubmit={registrar}>
          <img className='login--avatar' src={avatarIcon} alt='avatar' />
          <label>
            <p>Ingresa Tu Nombre</p>
            <input type='text' value={nombre} onChange={e => setNombre(e.target.value)} />
          </label>
          <input type='submit' value='Entrar al Chat' />
        </form>
      </section>
    }
    {
      registrado &&
      <Chat nombre={nombre} />
    }
      
    </div>
  )
};

export default Home;

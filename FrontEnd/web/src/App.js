import React, {useState ,useEffect} from 'react';
import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'
import api from './services/api'
import DevIten from './components/DevIten';
import DevForm from './components DevForm';


function App() {
  
  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs')

      setDevs(response.data)
    }
    loadDevs()
  },[])

  async function handleAddDev(data){

    const reponse = await api.post('/devs', data)
    setDevs([...devs, reponse.data]);

  }

  return (
    <div id='app'>
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevIten key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;

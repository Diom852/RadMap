import React, {useState, useEffect} from 'react'
import './styles.css'

function DevForm({onSubmit}){
    const [devs, setDevs] = useState([])

    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const [username, setUsername] = useState('');
    const [techs, setTechs] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const {latitude, longitude} = position.coords;
    
            setLatitude(latitude);
            setLongitude(longitude)
          },
    
          (err) => {
            console.log(err)
          },
    
          {
            timeout: 30000,
          }
        )
      }, [])

      async function DevSubmit(e) {
          e.preventDefault();

            await onSubmit({
                username,
                techs,
                latitude,
                longitude,
        })
        setUsername('')
        setTechs('');
      }

    return(
        <form onSubmit={DevSubmit}>
          <div className='input-block'>
            <label htmlFor="">Usuário do GitHub</label>
            <input 
            name="gituser" 
            id="gituser" 
            required 
            value={username}
            onChange={e => setUsername(e.target.value)}
            />
          </div>
          

          <div className='input-block'>
            <label htmlFor="">Tecnologias</label>
            <input 
            name="techs"
            id="techs" 
            required 
            value={techs}
            onChange={e => setTechs(e.target.value)}
             />
          </div>

          <div className="input-grup">
            <div className='input-block'>
              <label htmlFor="latitude">Latitude</label>
              <input
               type="number" 
               name="latitude" 
               id="latitude" 
               required  
               value={latitude}
               onChange={e => setLatitude(e.target.value)} //setar valor do input no state
               />
            </div>

            <div className='input-block'>
              <label htmlFor="longitude">Longitude</label>
              <input
                  type="number"
                  name="longitude"
                  id="longitude"
                  required 
                  value={longitude}
                  onChange={e => setLongitude(e.target.value)}
                />
            </div>
          </div>
          <button type='submit'>Salvar</button>
        </form>
    )
}

export default DevForm;
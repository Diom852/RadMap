import React from 'react';
import './styles.css'

function DevIten({ dev }) {
    return (
        <li className="dev-itens">
              <header>
                <img src={dev.avatar_url} alt='diom'></img>
                <div className='user-info'>
                <strong>{dev.name}</strong>
                  <span>{dev.techs.join(',')}</span>
                </div>
              </header>
              <p>{dev.bio}</p>
              <a href={`https://github.com/${dev.username}`}>Perfil no GitHub</a>
        </li>
    )   
}

export default DevIten;
import React from 'react';
import './home.css';
import logo from './ListaFácil_removebg.png';
import { Button } from 'primereact/button';

class Home extends React.Component {
    render() {       
        return (

            <div>
                <h1 style={{'padding-top': '60px', 'text-align':'center'}}>Bem vindo ao</h1>
                    
                <img src={logo} alt="listafácil" style={{'display':'block', 'margin-left': 'auto', 'margin-right': 'auto', 'padding-top':'60px' }}></img>
                <h3 style={{'padding-top': '60px', 'text-align':'center'}}>
                    Crie agora sua conta e faça sua primeira lista de compras inteligente!
                </h3>
                <div style={{'padding-top':'60px', 'text-align':'center' }}>
                    <Button label="Criar Conta" style={{'margin-right':'0.5rem'}} />
                    <Button label="Login" className="p-button-outlined" />
                </div>
            </div>
            
        )
    }
}

export default Home;
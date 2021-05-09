import React from 'react';
import './frontpage.css';
import logo from '../../images/ListaFácil_removebg.png';
import { Button } from 'primereact/button';

class Home extends React.Component {
    render() {       
        return (
        <React.Fragment>
            <div className="topnav">
                <div className="align-right" style={{'margin-right':'2rem'}}>
                    <a className="active" href="/login">Login</a>
                    <a href="https://github.com/RicardoTaverna/listafacil/issues">Problemas</a>
                    <a href="https://github.com/RicardoTaverna/listafacil#readme">Sobre</a>
                </div>
            </div>

            <header className="header-container">
                <div className="header-parallax p-px-4">
                    <h1 className="text-center">Bem vindo ao</h1>
                        
                    <img src={logo} alt="listafácil" className="header-image"></img>
                    <h3 className="text-center p-mt-5">
                        Crie agora sua conta e faça sua primeira lista de compras inteligente!
                    </h3>
                    <div className="mt-3 text-center">
                        <Button label="Criar Conta" className="p-button-primary" style={{'margin-right':'1rem'}} />
                        <Button label="Login" className="p-button-primary p-button-outlined" />
                    </div>
                </div>
            </header>

            <div className="footer p-mt-6">
                <p className="footer-text">CRIADO POR RICARDO TAVERNA & YGOR STENGRAT</p>
                <Button className="p-button-primary p-button-text">
                    <i className="pi pi-github p-px-3"></i>
                    <span className="p-px-3"> Código Fonte</span>
                </Button>
            </div>
        </React.Fragment>
        )
    }
}

export default Home;
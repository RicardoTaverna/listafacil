import React from 'react';
import './home.css';
import logo from '../../images/ListaFácil_removebg.png';
import { Button } from 'primereact/button';

class Home extends React.Component {
    render() {       
        return (
        <React.Fragment>
            <div class="topnav">
                <div class="align-right" style={{'margin-right':'2rem'}}>
                    <a class="active" href="/login">Login</a>
                    <a href="https://github.com/RicardoTaverna/listafacil/issues">Problemas</a>
                    <a href="https://github.com/RicardoTaverna/listafacil#readme">Sobre</a>
                </div>
            </div>

            <header>
                <div>
                    <h1 className="mt-3 text-center">Bem vindo ao</h1>
                        
                    <img src={logo} alt="listafácil" className="header-image"></img>
                    <h3 className="mt-3 text-center">
                        Crie agora sua conta e faça sua primeira lista de compras inteligente!
                    </h3>
                    <div className="mt-3 text-center">
                        <Button label="Criar Conta" className="p-button-primary" style={{'margin-right':'1rem'}} />
                        <Button label="Login" className="p-button-primary p-button-outlined" />
                    </div>
                </div>
            </header>

            <div className="footer">
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
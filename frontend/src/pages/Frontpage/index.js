import React from 'react';
import './frontpage.css';
import logo from '../../images/ListaFácil_removebg.png';
import { isAuthenticated, logout } from "../../services/auth";
import { Button } from 'primereact/button';


class Frontpage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            logged: false
        }
        this.onLogout = this.onLogout.bind(this);
    }

    componentDidMount(){
        if(isAuthenticated()){
            this.setState({ logged: true})
        }
    }

    onLogout(){
        logout()
        this.setState({ logged: false })
    }

    render() {     
        const navbarDeslogada = (
            <div className="align-right" style={{'margin-right':'2rem'}}>
                <a className="active" href="/login">Login</a>
                <a href="https://github.com/RicardoTaverna/listafacil/issues">Problemas</a>
                <a href="https://github.com/RicardoTaverna/listafacil#readme">Sobre</a>
            </div>
        );

        const navbarLogada = (
            <div className="align-right" style={{'margin-right':'2rem'}}>
                <a href="https://github.com/RicardoTaverna/listafacil/issues">Problemas</a>
                <a href="https://github.com/RicardoTaverna/listafacil#readme">Sobre</a>
                <a href="/" onClick={this.onLogout}>Sair</a>
            </div>
        );
        
        const { logged } = this.state;
        return (
        <React.Fragment>
            <div className="topnav">
                { logged ? navbarLogada : navbarDeslogada }
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

export default Frontpage;
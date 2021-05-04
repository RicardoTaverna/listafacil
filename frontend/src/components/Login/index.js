import React from 'react';
import { Link, withRouter } from "react-router-dom";
import logo from '../../images/ListaFácil_removebg.png';
import api from "../../services/api";
import { login } from "../../services/auth";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import './login.css';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            messageError: "",
        };
        this.onLogin = this.onLogin.bind(this);
        this.showError = this.showError.bind(this);
    }

    onLogin = async e => {
        const { email, password } = this.state;
        if (!email || !password) {
            this.setState(
                {messageError: "Preencha e-mail e senha para continuar!"},
                () => this.showError()
            );
        } else {
            try {
                const response = await api.post("/session", { email, password });
                login(response.data.token);
                this.props.history.push("/app");
                
            } catch (err) {
                this.setState(
                    {messageError: "Houve um problema com o login, verifique suas credenciais. T.T"},
                    () => this.showError()
                );
            }
        }
    };

    showError() {
        this.toast.show({severity:'error', summary: 'Error', detail: this.state.messageError , life: 3000});
    }
    render() {
        return (
            <React.Fragment>
                <Toast ref={(el) => this.toast = el} />
                <div class="topnav">
                    <div>
                        <Button label="Voltar Para Home" icon="pi pi-angle-left" className="p-button-text p-button-plain p-mt-3 p-ml-3 p-button-lg"/>
                    </div>
                </div>

                <div className="p-d-flex p-jc-center p-mt-2">
                    <div className="login-card">
                        <div className="p-fluid p-jc-center">
                            <div className="p-mb-2">
                                <img src={logo} alt="listafácil" className="logo-image"></img>
                            </div>                            
                            <form className="p-my-6">
                                <div className="p-field p-mt-2">
                                    <span className="p-float-label p-mb-4">
                                        <InputText id="email" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} />
                                        <label htmlFor="email">Endereço de E-mail</label>
                                    </span>
                                </div>

                                <div className="p-field">
                                    <span className="p-float-label">
                                        <Password className="p-m-auto" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} toggleMask feedback={false}/>
                                        <label htmlFor="password">Password*</label>
                                    </span>
                                </div>
                                <a href="/#" className="link p-my-2">Esqueci minha senha</a>
                            </form>
                            <Button label="Login" className="p-my-3 p-shadow-14" onClick={this.onLogin} />
                            <div className="p-text-center">
                                <p>Não possui uma conta ainda? <a href="/cadastro" className="link">Crie Agora</a></p>
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}

export default Login;
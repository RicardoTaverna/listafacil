import React from 'react';
import { withRouter } from "react-router-dom";
import logo from '../../images/ListaFácil_removebg.png';
import { api } from "../../services/api";

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Toast } from 'primereact/toast';
import './register.css';

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            displayBasic: false,
            username: "",
            email: "",
            password: "",
            passwordconfirm: "",
            messageError: "",
            
        };
        this.onSignUp = this.onSignUp.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.showError = this.showError.bind(this);
    }

    onSignUp = async e => {
        
        const { username, email, password, passwordconfirm } = this.state;
        if (!email || !password || !username || !passwordconfirm ) {
            this.setState(
                {messageError: "Para realizar seu cadastro preencha todos os campos!"},
                () => this.showError()
            );

        } else if(password !== passwordconfirm) {
            this.setState(
                {messageError: "Senhas não coincidem!" },
                () => this.showError()
                );

        } else{
            try {
                await api.post("/user", { username, email, password });
                this.renderFooter();

            } catch (err) {
                console.log(err);
                this.setState(
                    {messageError: "Ocorreu um erro ao registrar sua conta. T.T"},
                    () => this.showError()
                );
            }
        }
    };


    renderFooter() {

        this.toastBC.show({ severity: 'success', sticky: true, content: (
            <div className="p-flex p-flex-column  " style={{flex: '1'}}>
                <div className="p-text-center">
                    <i className="pi pi-check-circle" style={{fontSize: '3rem'}}></i>
                    <h4>Registrado!</h4>
                    <p>Sua conta foi criada com sucesso!</p>
                </div>
                <div className="p-grid p-fluid">
                    <div className="p-col-12">
                        <Button type="button" label="Ok" className="p-button-primary" onClick={() => this.props.history.push("/login")} />
                    </div>
                </div>
            </div>
        ) });
    }


    showError() {
        this.toast.show({severity:'error', summary: 'Error', detail: this.state.messageError , life: 3000});
    }
    

    render() {
        return (
        
            <React.Fragment>
                <section className="full-container">
                    <Toast ref={(el) => this.toast = el} />
                    <Toast ref={(el) => this.toastBC = el} position="bottom-center" />
                    <div class="topnav">
                        <div>
                            <Button label="Voltar Para Home" icon="pi pi-angle-left" className="p-button-text p-button-plain p-mt-3 p-ml-3 p-button-lg"/>
                        </div>
                    </div>
                    <div className="card-container p-d-flex p-jc-center">

                        <div className="registro-card">
                            <div className="p-fluid p-jc-center">
                                <div className="p-mb-2">
                                    <img src={logo} alt="listafácil" className="logo-image"></img>
                                </div>                            
                                <form className="p-my-6" >
                                    <div className="p-field p-mt-2">
                                        
                                        <span className="p-float-label p-mb-4">
                                            <InputText id="email" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} />
                                            <label htmlFor="email">Endereço de E-mail*</label>
                                        </span>
                                    </div>
                                    <div className="p-field">
                                        <span className="p-float-label">
                                            <InputText className="p-m-auto" value={this.state.username} onChange={(e) => this.setState({username: e.target.value})} />
                                            <label htmlFor="username">Usuario*</label>
                                        </span>
                                    </div>

                                    <div className="p-field">
                                        <span className="p-float-label">
                                            <Password className="p-m-auto" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} toggleMask feedback={true}/>
                                            <label htmlFor="password">Senha*</label>
                                        </span>
                                    </div>
                                    <div className="p-field">
                                        <span className="p-float-label">
                                            <Password className="p-m-auto" value={this.state.passwordconfirm} onChange={(e) => this.setState({passwordconfirm: e.target.value})} toggleMask feedback={false}/>
                                            <label htmlFor="passwordconfirm">Confirmar Senha</label>
                                        </span>
                                    </div>
                                    
                                </form>
                                <Button label="Registre-se" className="p-my-3 p-shadow-14" onClick={this.onSignUp } />
                                <div className="p-text-center">
                                    <p>Já possui uma conta? <a href="/login" className="link">Faça Login Aqui</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        )
    }
}

export default withRouter(Register);

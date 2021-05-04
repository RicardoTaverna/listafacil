import React from 'react';
import { Link, withRouter } from "react-router-dom";
import logo from '../../images/ListaFácil_removebg.png';
import api from "../../services/api";

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Dialog } from 'primereact/dialog';
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
        this.onHide = this.onHide.bind(this);
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
                this.setState({displayBasic: true});

            } catch (err) {
                console.log(err);
                this.setState(
                    {messageError: "Ocorreu um erro ao registrar sua conta. T.T"},
                    () => this.showError()
                );
            }
        }
    };

    onHide(name) {
        this.setState({
            [`${name}`]: false
        });
    }

    renderFooter(name) {

        return (
            <div className="p-d-flex p-jc-center">
                <Button label="OK" className="p-button-text" autoFocus onClick={() => this.props.history.push("/app")} />
            </div>
        );
    }


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
                <div className="form-demo">
                    <Dialog header="Header" visible={this.state.displayBasic}  footer={this.renderFooter('displayBasic')} onHide={() => this.onHide('displayBasic')} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                        <div className="p-d-flex p-ai-center p-dir-col p-pt-6 p-px-3">
                            <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                            <h5>Registrado!</h5>
                            <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                                Sua conta foi criada com sucesso!
                            </p>
                        </div>          
                    </Dialog>
                </div>
                <div className="p-d-flex p-jc-center p-mt-2">

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
                        </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}

export default withRouter(Register);

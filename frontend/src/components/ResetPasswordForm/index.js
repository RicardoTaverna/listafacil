import React from 'react';
import { withRouter } from "react-router-dom";
import logo from '../../images/ListaFácil_removebg.png';
import { api } from "../../services/api";


import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Toast } from 'primereact/toast';
import './resetForm.css';


class ResetPasswordForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayBasic: false,
            password: "",
            password_confirmation: "",
            messageError: "",
            
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.showError = this.showError.bind(this);
    }
    

    handleSubmit = async e => {
        e.preventDefault();
        const { password, password_confirmation } = this.state;
        const data = {
            token: this.props.match.params.id,
            password: password,
            password_confirmation: password_confirmation,
        }  
        
        if (!password_confirmation || !password) {
            this.setState(
                {messageError: "Para resetar sua senha digite sua nova senha!"},
                () => this.showError()
            );

        } else if(password !== password_confirmation) {
            this.setState(
                {messageError: "Senhas não coincidem!" },
                () => this.showError()
                );

        } else{
            try {
                api.post('/password/reset', data);
                
                this.renderFooter();

            } catch (err) {
                console.log(err);
                this.setState(
                    {messageError: "Ocorreu um ao trocar sua senha. T.T"},
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
                    <h4>Senha Resetada!</h4>
                    <p>Sua senha foi alterada com sucesso!</p>
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

                        <div className="reset-card">
                            <div className="p-fluid p-jc-center">
                                <div className="p-mb-2">
                                    <img src={logo} alt="listafácil" className="logo-image"></img>
                                </div>                            
                                <form className="p-my-6" >
                                    <div className="p-field">
                                        <span className="p-float-label">
                                            <Password className="p-m-auto"  value={this.state.password } onChange={(e) => this.setState({password: e.target.value})} toggleMask feedback={true}/>
                                            <label htmlFor="password">Senha*</label>
                                        </span>
                                    </div>
                                    <div className="p-field">
                                        <span className="p-float-label">
                                            <Password className="p-m-auto"  value={this.state.password_confirmation } onChange={(e) => this.setState({password_confirmation: e.target.value})} toggleMask feedback={false}/>
                                            <label htmlFor="passwordconfirm">Confirmar Senha</label>
                                        </span>
                                    </div>
                                    
                                </form>
                                <Button label="Trocar" className="p-my-3 p-shadow-14" onClick={this.handleSubmit } />
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>

        )};

    
}

export default withRouter(ResetPasswordForm);

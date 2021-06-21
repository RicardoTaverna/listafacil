import React from 'react';
import { withRouter } from "react-router-dom";
import logo from '../../images/ListaFácil_removebg.png';
import { api } from "../../services/api";

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import './reset.css';

class ResetPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            displayBasic: false,
            email: "",
            messageError: "",
            
        };
        this.renderFooter = this.renderFooter.bind(this);
        this.onReset = this.onReset.bind(this);
        this.showError = this.showError.bind(this);
    }

    onReset = async e => {
        
        const { email } = this.state;
        if (!email) {
            this.setState(
                {messageError: "Digite seu e-mail para recuperar sua senha!"},
                () => this.showError()
            );

        }else{
            try {
                await api.post("/forgot", { email });
                this.renderFooter();

            } catch (err) {
                console.log(err);
                this.setState(
                    {messageError: "Ocorreu um erro ao enviar o e-mail. T.T"},
                    console.log(email),
                    () => this.showError()
                );
            }
        }
    };



    renderFooter() {
        this.toastBC.show({ severity: 'success', sticky: true, content: (
            <div className="p-flex p-flex-column  " style={{flex: '1'}}>
                <div className="p-text-center">
                    <i className="pi pi-send" style={{fontSize: '3rem'}}></i>
                    <h4>E-mail Enviado!</h4>
                    <p>Enviamos o email de reset, verifique sua caixa de entrada!</p>
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
                                    <div className="p-field p-mt-2">
                                        
                                        <span className="p-float-label p-mb-4">
                                            <InputText id="email" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} />
                                            <label htmlFor="email">Endereço de E-mail*</label>
                                        </span>
                                    </div>                           
                                </form>
                                <Button label="Enviar Reset de Senha" className="p-my-3 p-shadow-14" onClick={this.onReset } />
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        )
    }
}

export default withRouter(ResetPassword);

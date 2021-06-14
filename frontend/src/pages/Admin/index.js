import React from 'react';
import './admin.css';
import logo from '../../images/ListaFácil_removebg.png';
import AdminHome from '../../components/AdminHome';
import { isAuthenticated } from "../../services/auth";
import { api } from '../../services/api';
import { login } from "../../services/auth";
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';


class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logged: false,
            username: '',
            password: '',
            severity: '',
            sumary: '',
            messageError: '',
            is_staff: 0,
        }
        this.renderLoginPage = this.renderLoginPage.bind(this);
        this.renderAdminPage = this.renderAdminPage.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.showMessage = this.showMessage.bind(this);
    }

    componentDidMount(){
        if(isAuthenticated()){
            this.setState(
                { logged: true }
            )
        }
    }

    onLogin = async e =>{
        const { username, password } = this.state;
        if (!username || !password) {
            this.setState(
                {
                    severity: 'error',
                    sumary: 'Erro',
                    messageError: "Preencha o usuário e senha para continuar!"
                },
                () => this.showMessage()
            );
        } else {
            try {
                const response = await api.post("/session/admin", { username, password });
                this.setState({ is_staff: response.data[1] })
                console.log(response.data)
                if (this.state.is_staff){
                    login(response.data[0].token);
                    this.setState(
                        { logged: true }
                    );
                } else {
                    this.setState(
                        {
                            severity: 'error',
                            sumary: 'Erro',
                            messageError: "Verifique suas credenciais, você precisa de permissões para acessar essa área!"
                        },
                        () => this.showMessage()
                    );
                }
                
            } catch (err) {
                this.setState(
                    {
                        severity: 'error',
                        sumary: 'Erro',
                        messageError: "Houve um problema com o login, verifique suas credenciais. T.T"
                    },
                    () => this.showMessage()
                );
            }
        }
    }

    showMessage() {
        this.toast.show({severity: this.state.severity, summary: this.state.summary, detail: this.state.messageError , life: 3000});
    }

    renderLoginPage(){
        return(
            <React.Fragment>
                <Toast ref={(el) => this.toast = el} />
                <div className="admin-card">
                    <div className="card">
                        <div className="p-grid">

                            <div className="p-col-5 p-d-flex p-ai-center p-jc-center">
                                <img alt="logo" src={logo} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} ></img>
                            </div>
                            
                            <div className="p-col-2">
                                <Divider layout="vertical">
                                </Divider>
                            </div>

                            <div className="p-col-4 p-ai-center p-jc-center">
                                <div className="p-fluid">
                                    <div className="p-text-center p-mb-6">
                                        <h1>Bem Vindo</h1>
                                        <p>FAÇA LOGIN PARA O PAINEL ADMINISTRATIVO</p>
                                    </div>
                                    
                                    <div className="p-field">
                                        <span className="p-float-label">
                                            <InputText id="username" type="text" value={this.state.username} onChange={(e) => this.setState({username: e.target.value})}/>
                                            <label htmlFor="username">Usuário</label>
                                        </span>
                                    </div>
                                    <div className="p-field">
                                        <span className="p-float-label">
                                            <InputText id="password" type="password" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})}/>
                                            <label htmlFor="password">Senha</label>
                                        </span>
                                    </div>
                                    <Button className="p-mt-3" label="Login" onClick={this.onLogin}></Button>
                                </div>
                            </div>

                            
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    renderAdminPage(){
        return(
            <AdminHome></AdminHome>
        )
    }

    render(){
        return(
            this.state.logged ? this.renderAdminPage() : this.renderLoginPage()
        )
    }
}

export default Admin;
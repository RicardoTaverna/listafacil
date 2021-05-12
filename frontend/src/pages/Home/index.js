import React from 'react';
import './home.css';
import api from "../../services/api";
import MenuTopBar from './../../components/MenuTopBar/index';
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';


class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: '',
            username: '',
            email: '',
            password: '',
            token: '',
        }
        this.onLogin = this.onLogin.bind(this);
        this.showMessage = this.showMessage.bind(this);
    }

    componentDidMount(){
        this.onLogin();
    }

    onLogin = async e => {
        try {
            api.get("/session").then((request) => {
                this.setState({id: request.data})
                api.get(`/user/${this.state.id}`).then((data) => {
                    this.setState({
                        username: data.data.username,
                        email: data.data.email
                    });
                })
;            })
        } catch (err){
            console.log("erro: ", err);
        };
    };

    showMessage() {
        this.toast.show({severity:'info', summary: 'Bem vindo', detail: "Essa é sua home do ListaFácil" , life: 3000});
    }

    render () {
        const lista_card = (
            <span className="p-d-flex p-jc-between">
                <p>ultima lista criada - 2 hrs</p>
                <Button label="Adicionar" className="p-button-primary p-button-text p-ml-2" />
            </span>
        );

        const produto_card = (
            <span className="p-d-flex p-jc-between">
                <p>última busca realizada - 1 min</p>
                <Button label="Buscar" className="p-button-primary p-button-text p-ml-2" />
            </span>
        );


        return (
            <React.Fragment>
                <MenuTopBar></MenuTopBar>
                <Toast ref={(el) => this.toast = el} />
                <section className="user-background">
                    <div className="p-p-4 p-m-4">
                        <h1 className="p-mb-5">Bem Vindo {this.state.username}</h1>
                        <p>Essa é sua home do app ListaFácil, agora você pode começar a criar</p>
                        <p>suas <b>listas</b>, procurar <b>produtos</b> e atualizar seu <b>perfil</b>!</p>
                    </div>
                </section>
                <div className="p-d-flex profile-container">
                    <div className="p-col-12 p-md-7 p-lg-7">
                        <div className="profile-card-left">
                            <div className="profile-title">
                                <div className="p-p-2 p-m-2 p-d-flex p-jc-between">
                                    <h2>Minha Conta</h2>
                                    <Button label="Salvar Alterações" className="p-button-sm"  />
                                </div>
                            </div>
                            <div className="p-p-2 p-m-2">
                                <h3>Informações do Usuário</h3>
                                <div className="p-fluid p-formgrid p-grid">
                                    <div className="p-field p-col">
                                        <span className="p-float-label">
                                            <InputText id="username" value={this.state.username} onChange={(e) => this.setState({ username: e.target.value })} />
                                            <label htmlFor="username">Usuário</label>
                                        </span>
                                    </div>
                                    <div className="p-field p-col">
                                        <span className="p-float-label">
                                            <InputText id="email" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} />
                                            <label htmlFor="email">E-mail</label>
                                        </span>
                                    </div>
                                </div>
                                <div className="p-fluid p-formgrid p-grid">
                                    <div className="p-field p-col">
                                        <span className="p-float-label">
                                            <InputText id="nome" value={this.state.firstname} onChange={(e) => this.setState({ firstname: e.target.value })} />
                                            <label htmlFor="nome">Nome</label>
                                        </span>
                                    </div>
                                    <div className="p-field p-col">
                                        <span className="p-float-label">
                                            <InputText id="sobrenome" value={this.state.lastname} onChange={(e) => this.setState({ lastname: e.target.value })} />
                                            <label htmlFor="sobrenome">Sobrenome</label>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-p-2 p-m-2">
                                <Divider/>
                                <h3>Informações de Contato</h3>
                                <div className="p-fluid p-formgrid p-grid">
                                    <div className="p-field p-col">
                                        <span className="p-float-label">
                                            <InputText id="bairro" value={this.state.bairro} onChange={(e) => this.setState({ bairro: e.target.value })} />
                                            <label htmlFor="bairro">Bairro</label>
                                        </span>
                                    </div>
                                    <div className="p-field p-col">
                                        <span className="p-float-label">
                                            <InputText id="cidade" value={this.state.cidade} onChange={(e) => this.setState({ cidade: e.target.value })} />
                                            <label htmlFor="cidade">Cidade</label>
                                        </span>
                                    </div>
                                    <div className="p-field p-col">
                                        <span className="p-float-label">
                                            <InputText id="uf" value={this.state.uf} onChange={(e) => this.setState({ uf: e.target.value })} />
                                            <label htmlFor="uf">UF</label>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-col-12 p-md-5 p-lg-5">
                        <div className="profile-card-right">
                            <div className="profile-image">
                                <img src="https://i.pravatar.cc/200" alt="profile" className="profile-avatar p-shadow-10"/>
                            </div>
                            <div className="p-d-flex p-mt-4 p-text-center">
                                <div className="p-col-6">
                                    <Badge value="3" size="xlarge" severity="info"></Badge>
                                    <p>Listas criadas</p>
                                </div>
                                <div className="p-col-6">
                                    <Badge value="25" size="xlarge" severity="info"></Badge>
                                    <p>Produtos Adicionados</p>
                                </div>
                            </div>
                            <div>
                                <Divider/>
                                <Card title="Criar nova Lista" subTitle={lista_card} className="p-mb-2"></Card>     
                                <Card title="Buscar Produto" subTitle={produto_card} className="p-mb-2"></Card>     
                            </div>
                        </div>
                    </div>
                    
                </div>
                
            </React.Fragment>
        )
    }
}

export default Home
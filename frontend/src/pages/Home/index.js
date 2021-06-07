import React from 'react';
import './home.css';
import { api } from "../../services/api";
import MenuTopBar from './../../components/MenuTopBar/index';
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';


class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: '',
            username: '',
            email: '',
            password: '',
            token: '',
            name: '',
            lastname: '',
            adress: '',
            district: '',
            city: '',
            uf: '',
            messageError: '',
        }
 
        this.uf = [
            { name: 'Rondônia', code: 'RO' },
            { name: 'Acre', code: 'AC' },
            { name: 'Amazonas', code: 'AM' },
            { name: 'Roraima', code: 'RR' },
            { name: 'Pará', code: 'PA' },
            { name: 'Amapá', code: 'AP' },
            { name: 'Tocantins', code: 'TO' },
            { name: 'Maranhão', code: 'MA' },
            { name: 'Piauí', code: 'PI' },
            { name: 'Ceará', code: 'CE' },
            { name: 'Rio Grande do Norte', code: 'RN' },
            { name: 'Paraíba', code: 'PB' },
            { name: 'Pernambuco', code: 'PE' },
            { name: 'Alagoas', code: 'AL' },
            { name: 'Sergipe', code: 'SE' },
            { name: 'Bahia', code: 'BA' },
            { name: 'Minas Gerais', code: 'MG' },
            { name: 'Espírito Santo', code: 'ES' },
            { name: 'Rio de Janeiro', code: 'RJ' },
            { name: 'São Paulo', code: 'SP' },
            { name: 'Paraná', code: 'PR' },
            { name: 'Santa Catarina', code: 'SC' },
            { name: 'Rio Grande do Sul (*)', code: 'RS' },
            { name: 'Mato Grosso do Sul', code: 'MS' },
            { name: 'Mato Grosso', code: 'MT' },
            { name: 'Goiás', code: 'GO' },
            { name: 'Distrito Federal', code: 'DF' },
        ]

        this.onLogin = this.onLogin.bind(this);
        this.showMessage = this.showMessage.bind(this);
        this.showMessagError = this.showMessageError.bind(this);
        this.onUfChange = this.onUfChange.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onBasicUpload = this.onBasicUpload.bind(this);
        this.updateImage = this.updateImage.bind(this);
    }

    onUfChange(e) {
        this.setState({uf: e.value});
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
                        id: data.data.id,
                        username: data.data.username,
                        email: data.data.email,
                        name: data.data.name,
                        lastname: data.data.lastname,
                        adress: data.data.adress,
                        district: data.data.district,
                        city: data.data.city,
                        uf: data.data.uf,
                    });
                })
            })
        } catch (err){
            console.log("erro: ", err);
        };
    };
    
    onUpdate = async e => {
        let { id, username, email, name, lastname, adress, district, city, uf } = this.state;
        const {code} = uf;
        uf = code;
        try {
            await api.put(`/user/${id}`, { username, email, name, lastname, adress, district, city, uf });
            this.showMessage();
        } catch (err){
            this.setState(
                {messageError: err},
                () => this.showMessageError
            )
        }
    }

    showMessage() {
        this.toast.show({severity:'success', summary: 'Perfil Atualizado', detail: "Dados atualizados com sucesso!" , life: 3000});
    }

    showMessageError() {
        this.toast.show({severity:'error', summary: 'Erro ao atualizar os dados', detail: this.messageError , life: 3000});
    }
    onBasicUpload() {
        this.toast.show({severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode'});
        this.updateImage();
    }

    updateImage = async e =>{
        let { id } = this.state;
        console.log(id)
        const image  = 'perfil-min.png';
        try {
            await api.put("/user/${id}/images/", {image});

        } catch (err) {
            console.log(err)
        }

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
                    <div className="p-p-3 p-m-3 p-text-center">
                        <h1 className="p-mb-5">Bem Vindo {this.state.username}</h1>
                        <p>Essa é sua home do app ListaFácil, agora você pode começar a criar</p>
                        <p>suas <b>listas</b>, procurar <b>produtos</b> e atualizar seu <b>perfil</b>!</p>
                    </div>
                </section>
                <div className="p-grid">

                    <div className="p-col-12 p-md-5 p-lg-5 profile-container">
                        <div className="profile-card-right">
                            <div className="profile-image">
                                <img src="https://i.pravatar.cc/200" alt="profile" className="profile-avatar p-shadow-10"/>
                                <FileUpload mode="basic" name="demo[]" url="https://primefaces.org/primereact/showcase/upload.php" accept="image/*" maxFileSize={1000000} onUpload={this.onBasicUpload} />
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

                    <div className="p-col-12 p-md-7 p-lg-7 profile-container">
                        <div className="profile-card-left">
                            <div className="profile-title">
                                <div className="p-p-2 p-m-2 p-d-grid p-jc-between">
                                    <h2>Minha Conta</h2>
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
                                            <InputText id="nome" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
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
                                            <InputText id="adress" value={this.state.adress} onChange={(e) => this.setState({ adress: e.target.value })} />
                                            <label htmlFor="adress">Endereço</label>
                                        </span>
                                    </div>
                                </div>
                                <div className="p-fluid p-formgrid p-grid">
                                    <div className="p-field p-col">
                                        <span className="p-float-label">
                                            <InputText id="district" value={this.state.district} onChange={(e) => this.setState({ district: e.target.value })} />
                                            <label htmlFor="district">Bairro</label>
                                        </span>
                                    </div>
                                    <div className="p-field p-col">
                                        <span className="p-float-label">
                                            <InputText id="city" value={this.state.city} onChange={(e) => this.setState({ city: e.target.value })} />
                                            <label htmlFor="city">Cidade</label>
                                        </span>
                                    </div>
                                    <div className="p-field p-col">
                                        <span className="p-float-label">
                                            <Dropdown id="uf" value={this.state.uf} options={this.uf} onChange={this.onUfChange} optionLabel="code" editable/>
                                            <label htmlFor="uf">UF</label>
                                        </span>
                                    </div>
                                </div>
                                <Divider/>
                                <Button label="Salvar Alterações" className="p-button-sm" onClick={this.onUpdate} />
                            </div>
                        </div>
                    </div>
                    
                    
                    
                </div>
                
            </React.Fragment>
        )
    }
}

export default Home
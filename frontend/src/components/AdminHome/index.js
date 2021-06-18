import React from 'react';
import './adminhome.css';
import logo from '../../images/ListaFácil_removebg.png';
import { api } from '../../services/api';
import { logout } from '../../services/auth';
import AdminUsers from '../../components/AdminUsers';
import AdminLists from '../../components/AdminLists';
import AdminProducts from '../../components/AdminProducts';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Menubar } from 'primereact/menubar';
import { PanelMenu } from 'primereact/panelmenu';
import { Toast } from 'primereact/toast';

class AdminHome extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            username: '',
            is_staff: 0,
            users: [],
            lists: [],
            products: [],
            dashboard: true,
            adminUsers: false,
            adminLists: false,
            adminProducts: false,
        }
        this.items = [
            { 
                label:'Dashboard',
                icon:'pi pi-fw pi-chart-bar',
                command: () => this.showDashboard()
            },
            {
                label:'Usuarios',
                icon:'pi pi-fw pi-user',
                command: () => this.showAdminUsers()
            },
            {
                label:'Listas',
                icon:'pi pi-fw pi-file',
                command: () => this.showAdminLists()
            },
            {
                label:'Produtos',
                icon:'pi pi-fw pi-pencil',
                command: () => this.showAdminProducts()
            }
        ];

        this.onLoad = this.onLoad.bind(this);
        this.onLogout = this.onLogout.bind(this);
        this.showConfirm = this.showConfirm.bind(this);
        this.dashboard = this.dashboard.bind(this);
        this.showDashboard = this.showDashboard.bind(this);
        this.adminUsers = this.adminUsers.bind(this);
        this.showAdminUsers = this.showAdminUsers.bind(this);
        this.adminLists = this.adminLists.bind(this);
        this.showAdminLists = this.showAdminLists.bind(this);
        this.adminProducts = this.adminProducts.bind(this);
        this.showAdminProducts = this.showAdminProducts.bind(this);
    }

    componentDidMount(){
        this.onLoad();
        
    }

    onLoad = async e => {
        try {
            api.get("/session").then((request) => {
                this.setState({id: request.data})
                api.get(`/user/${this.state.id}`).then((data) => {
                    this.setState({
                        id: data.data.id,
                        username: data.data.username,
                        is_staff: data.data.is_staff,
                    });
                })
            });
            api.get("/user").then((data) => {
                this.setState({
                    users: data.data
                })
            });
            api.get("/lists/all").then((data) => {
                this.setState({
                    lists: data.data
                })
            });
            api.get("/product").then((data) => {
                this.setState({
                    products: data.data
                })
            })
        } catch (err){
            console.log("erro: ", err);
        };
    };

    showConfirm = () => {
        this.toastBC.show({ severity: 'warn', sticky: true, content: (
            <div className="p-flex p-flex-column" style={{flex: '1'}}>
                <div className="p-text-center">
                    <i className="pi pi-exclamation-triangle" style={{fontSize: '3rem'}}></i>
                    <h4>Você deseja Deslogar?</h4>
                    <p>Confirme</p>
                </div>
                <div className="p-grid p-fluid">
                    <div className="p-col-6">
                        <Button onClick={this.onLogout} type="button" label="Sim" className="p-button-success"  />
                    </div>
                    <div className="p-col-6">
                        <Button onClick={this.clear} type="button" label="Não" className="p-button-secondary" />
                    </div>
                </div>
            </div>
        ) });
    }

    onLogout(){
        logout();
        window.location.reload();
    }

    clear = () => {
        this.toastBC.clear();
    }

    showAdminUsers(){
        this.setState({
            dashboard: false,
            adminUsers: true,
            adminLists: false,
            adminProducts: false,
        })
    }

    adminUsers(){
        return(
            <AdminUsers></AdminUsers>
        )
    }

    adminLists(){
        return(
            <AdminLists></AdminLists>
        )
    }

    adminProducts(){
        return(
            <AdminProducts></AdminProducts>
        )
    }    

    showAdminProducts(){
        this.setState({ 
            dashboard: false,
            adminUsers: false,
            adminLists: false,
            adminProducts: true,
        })
    }

    showAdminLists(){
        this.setState({ 
            dashboard: false,
            adminUsers: false,
            adminLists: true,
            adminProducts: false,
        })
    }

    showDashboard(){
        this.setState({
            dashboard: true,
            adminUsers: false,
            adminLists: false,
            adminProducts: false,
        })
    }

    dashboard(){

        const card1Header = (<i className="pi pi-users p-mt-3 primary" style={{'fontSize': '4em'}}></i>)
        const card2Header = (<i className="pi pi-list p-mt-3" style={{'fontSize': '4em'}}></i>)
        const card3Header = (<i className="pi pi-shopping-cart p-mt-3" style={{'fontSize': '4em'}}></i>)
        
        let { users, lists, products } = this.state;

        return(
            <React.Fragment>
                <div className="p-p-3">
                    <div className="p-mt-2 p-mb-2">
                        <h2 className="p-d-inline">Dashboard</h2><p className="p-ml-4 p-d-inline">Bem vindo ao painel administrativo</p>
                    </div>
                    <div className="p-mt-6">
                        <div className="p-grid">
                            <div className="p-col-4">
                                <Card className="p-text-center" style={{color:'var(--blue-300)'}} title={users.length} subTitle="Usuários ativos" header={card1Header}>
                                    <p className="p-m-0"></p>
                                </Card>
                            </div>
                            <div className="p-col-4">
                                <Card className="p-text-center" style={{color:'var(--green-300)'}} title={lists.length} subTitle="Listas criadas" header={card2Header}>
                                    <p className="p-m-0"></p>
                                </Card>
                            </div>
                            <div className="p-col-4">
                                <Card className="p-text-center" style={{color:'var(--teal-300)'}} title={products.length} subTitle="Produtos adicionados" header={card3Header}>
                                    <p className="p-m-0"></p>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    render() {

        const end = (
            <div className="p-grid">
                <p>Olá, {this.state.username}</p>
                <Button label="Logout" icon="pi pi-fw pi-power-off" className="p-button-text p-ml-3" onClick={this.showConfirm} style={{ color: '#fff' }}/>
            </div>
        )

        return (
            <React.Fragment>
                <Toast ref={(el) => this.toastBC = el} position="bottom-center" />
                <Menubar className="admin-top-bar" end={end}/>
                <div className="p-p-2">
                    <div className="p-grid p-align-stretch">
                        <div className="p-col-3 left-panel p-p-3">
                            <div className="box box-stretched">
                                <div className="p-text-center p-pb-4">
                                    <img alt="logo" src={logo} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} height="50"></img>
                                </div>
                                <Divider></Divider>
                                <PanelMenu className="p-py-3" model={this.items}/>
                                <Divider></Divider>
                                <div className="footer p-my-6 p-py-6">
                                    <p className="footer-text">CRIADO POR RICARDO</p>
                                    <p className="footer-text">TAVERNA & YGOR STENGRAT</p>
                                    <Button className="p-button-primary p-button-text">
                                        <i className="pi pi-github p-px-3"></i>
                                        <span className="p-px-3"> Código Fonte</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="p-col-9 p-p-3">
                            <div className="box box-stretched">
                                {this.state.dashboard ? this.dashboard() : ""}
                                {this.state.adminUsers ? this.adminUsers() : ""}
                                {this.state.adminLists ? this.adminLists() : ""}
                                {this.state.adminProducts ? this.adminProducts() : ""}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default AdminHome;
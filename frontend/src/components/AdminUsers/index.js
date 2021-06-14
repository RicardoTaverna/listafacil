import React, { Component } from 'react';
import { api } from '../../services/api';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import './adminUsers.css';

export class AdminUsers extends Component {

    emptyUser = {
        id: null,
        username: '',
        email: '',
        is_staff: '',
        name: '',
        lastname: 0
    };

    constructor(props) {
        super(props);

        this.state = {
            users: null,
            userDialog: false,
            deleteUserDialog: false,
            deleteusersDialog: false,
            user: this.emptyUser,
            selectedUsers: null,
            submitted: false,
            globalFilter: null
        };
        this.onLoad = this.onLoad.bind(this);
        this.leftToolbarTemplate = this.leftToolbarTemplate.bind(this);
        this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this);
        this.actionBodyTemplate = this.actionBodyTemplate.bind(this);

        this.openNew = this.openNew.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.confirmDeleteUser = this.confirmDeleteUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.exportCSV = this.exportCSV.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        this.deleteSelectedUsers = this.deleteSelectedUsers.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.hideDeleteUserDialog = this.hideDeleteUserDialog.bind(this);
        this.hideDeleteUsersDialog = this.hideDeleteUsersDialog.bind(this);
    }

    componentDidMount() {
        this.onLoad();
    }

    onLoad = async e => {
        try {
            api.get("/user").then((data) => {
                this.setState({
                    users: data.data
                })
            });

        } catch (err){
            console.log("erro: ", err);
        };
    }

    openNew() {
        this.setState({
            user: this.emptyUser,
            submitted: false,
            userDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            userDialog: false
        });
    }

    hideDeleteUserDialog() {
        this.setState({ deleteUserDialog: false });
    }

    hideDeleteUsersDialog() {
        this.setState({ deleteusersDialog: false });
    }

    saveUser = async e => {
        let state = { submitted: true };

        if (this.state.user.username.trim()) {
            let users = [...this.state.users];
            let user = {...this.state.user};
            if (this.state.user.id) {
                const index = this.findIndexById(this.state.user.id);
                users[index] = user;

                try {
                    api.put(`/user/${this.state.user.id}`, user).then((data) => {
                        console.log(data)
                    });
                } catch (err){
                    console.log("erro: ", err);
                };

                this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Usuário atualizado', life: 3000 });
            }
            else {
                try {
                    api.post('/user', user).then((data) => {
                        console.log(data)
                    });
                } catch (err){
                    console.log("erro: ", err);
                };
                this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Usuário criado', life: 3000 });
            }

            state = {
                ...state,
                users,
                userDialog: false,
                product: this.emptyUser
            };
        }

        this.setState(state);
    }

    editUser(user) {
        this.setState({
            user: { ...user },
            userDialog: true
        });
    }

    confirmDeleteUser(user) {
        this.setState({
            user,
            deleteUserDialog: true
        });
    }

    deleteUser() {
        let users = this.state.users.filter(val => val.id !== this.state.user.id);
        this.setState({
            users,
            deleteUserDialog: false,
            product: this.emptyUser
        });
        this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    }

    findIndexById(id) {
        let index = -1;
        for (let i = 0; i < this.state.users.length; i++) {
            if (this.state.users[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    exportCSV() {
        this.dt.exportCSV();
    }

    confirmDeleteSelected() {
        this.setState({ deleteusersDialog: true });
    }

    deleteSelectedUsers() {
        let users = this.state.users.filter(val => !this.state.selectedUsers.includes(val));
        this.setState({
            users,
            deleteusersDialog: false,
            selectedUsers: null
        });
        this.toast.show({ severity: 'success', summary: 'Successful', detail: 'users Deleted', life: 3000 });
    }

    onCategoryChange(e) {
        let user = {...this.state.user};
        user['is_staff'] = e.value;
        this.setState({ user });
    }

    onInputChange(e, name) {
        const val = (e.target && e.target.value) || '';
        let user = {...this.state.user};
        user[`${name}`] = val;

        this.setState({ user });
    }

    leftToolbarTemplate() {
        return (
            <React.Fragment>
                <Button label="Novo" icon="pi pi-plus" className="p-button-success p-mr-2" style={{ backgroundColor:'#49c7ab'}} onClick={this.openNew} />
                <Button label="Deletar" icon="pi pi-trash" className="p-button-danger" onClick={this.confirmDeleteSelected} disabled={!this.state.selectedUsers || !this.state.selectedUsers.length} />
            </React.Fragment>
        )
    }

    rightToolbarTemplate() {
        return (
            <React.Fragment>
                <Button label="Exportar" icon="pi pi-upload" className="p-button-help" onClick={this.exportCSV} />
            </React.Fragment>
        )
    }

    actionBodyTemplate(rowData) {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-primary p-mr-2" onClick={() => this.editUser(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => this.confirmDeleteUser(rowData)} />
            </React.Fragment>
        );
    }

    render() {
        const header = (
            <div className="table-header">
                <h3 className="p-m-0">Gerenciar Usuários</h3>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Procurar..." />
                </span>
            </div>
        );
        const userDialogFooter = (
            <React.Fragment>
                <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Salvar" icon="pi pi-check" className="p-button-text" onClick={this.saveUser} />
            </React.Fragment>
        );
        const deleteUserDialogFooter = (
            <React.Fragment>
                <Button label="Não" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteUserDialog} />
                <Button label="Sim" icon="pi pi-check" className="p-button-text" onClick={this.deleteUser} />
            </React.Fragment>
        );
        const deleteUsersDialogFooter = (
            <React.Fragment>
                <Button label="Não" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteUsersDialog} />
                <Button label="Sim" icon="pi pi-check" className="p-button-text" onClick={this.deleteSelectedUsers} />
            </React.Fragment>
        );

        return (
            <div className="datatable-crud-demo">
                <Toast ref={(el) => this.toast = el} />

                <div className="card">
                    <Toolbar className="p-mb-4" left={this.leftToolbarTemplate} right={this.rightToolbarTemplate}></Toolbar>

                    <DataTable ref={(el) => this.dt = el} value={this.state.users} selection={this.state.selectedUsers} onSelectionChange={(e) => this.setState({ selectedUsers: e.value })}
                        dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
                        globalFilter={this.state.globalFilter}
                        header={header}>

                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column field="id" header="Id" sortable headerStyle={{ width: '5rem' }}></Column>
                        <Column field="username" header="Username" sortable></Column>
                        <Column field="email" header="Email" sortable headerStyle={{ width: '12rem' }}></Column>
                        <Column field="is_staff" header="Perfil" className="p-text-center" sortable></Column>
                        <Column field="name" header="Nome" sortable></Column>
                        <Column field="lastname" header="Sobrenome" sortable></Column>
                        <Column body={this.actionBodyTemplate}></Column>
                    </DataTable>
                </div>

                <Dialog visible={this.state.userDialog} style={{ width: '450px' }} header="Product Details" modal className="p-fluid" footer={userDialogFooter} onHide={this.hideDialog}>
                    <div className="p-field">
                        <label htmlFor="username">Username</label>
                        <InputText id="username" value={this.state.user.username} onChange={(e) => this.onInputChange(e, 'username')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.user.username })} />
                        {this.state.submitted && !this.state.user.username && <small className="p-error">Username é obrigatório.</small>}
                    </div>
                    <div className="p-field">
                        <label htmlFor="email">Email</label>
                        <InputText id="email" value={this.state.user.email} onChange={(e) => this.onInputChange(e, 'email')} required />
                    </div>
                    <div className="p-field">
                        <label htmlFor="password">Senha</label>
                        <InputText type="password" id="password" value={this.state.user.password} onChange={(e) => this.onInputChange(e, 'password')} required />
                    </div>

                    <div className="p-field">
                        <label className="p-mb-3">Permissão</label>
                        <div className="p-formgrid p-grid">
                            <div className="p-field-radiobutton p-col-6">
                                <RadioButton inputId="category1" name="category" value="True" onChange={this.onCategoryChange} checked={this.state.user.is_staff === 1} />
                                <label htmlFor="category1">Adiministrador</label>
                            </div>
                            <div className="p-field-radiobutton p-col-6">
                                <RadioButton inputId="category2" name="category" value="False" onChange={this.onCategoryChange} checked={this.state.user.category === 0} />
                                <label htmlFor="category2">Usuário</label>
                            </div>
                        </div>
                    </div>

                    <div className="p-formgrid p-grid">
                        <div className="p-field p-col">
                            <label htmlFor="name">Nome</label>
                            <InputText id="name" value={this.state.user.name} onChange={(e) => this.onInputChange(e, 'name')}/>
                        </div>
                        <div className="p-field p-col">
                            <label htmlFor="lastname">Sobrenome</label>
                            <InputText id="lastname" value={this.state.user.lastname} onChange={(e) => this.onInputChange(e, 'lastname')}/>
                        </div>
                    </div>
                </Dialog>

                <Dialog visible={this.state.deleteUserDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteUserDialogFooter} onHide={this.hideDeleteUserDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                        {this.state.user && <span>Certeza que deseja deletar o usuário <b>{this.state.user.username}</b>?</span>}
                    </div>
                </Dialog>

                <Dialog visible={this.state.deleteusersDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteUsersDialogFooter} onHide={this.hideDeleteUsersDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                        {this.state.user && <span>Certeza que deseja deletar o usuário selecionado?</span>}
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default AdminUsers;
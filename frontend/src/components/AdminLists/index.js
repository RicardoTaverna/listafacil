import React, { Component } from 'react';
import { api } from '../../services/api';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import './adminLists.css';

export class AdminLists extends Component {

    emptylist = {
        id: null,
        user_id: null,
        listname: '',
        descricao: '',
        finished: 0,
        priority: ''
    };

    constructor(props) {
        super(props);

        this.state = {
            lists: null,
            listDialog: false,
            deleteListDialog: false,
            deleteListsDialog: false,
            user: this.emptylist,
            list: this.emptyList,
            selectedLists: null,
            submitted: false,
            globalFilter: null
        };
        this.onLoad = this.onLoad.bind(this);
        this.leftToolbarTemplate = this.leftToolbarTemplate.bind(this);
        this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this);
        this.actionBodyTemplate = this.actionBodyTemplate.bind(this);

        this.openNew = this.openNew.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.saveList = this.saveList.bind(this);
        this.editList = this.editList.bind(this);
        this.confirmDeleteList = this.confirmDeleteList.bind(this);
        this.deleteList = this.deleteList.bind(this);
        this.exportCSV = this.exportCSV.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        this.deleteSelectedLists = this.deleteSelectedLists.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.hideDeleteListDialog = this.hideDeleteListDialog.bind(this);
        this.hideDeleteListsDialog = this.hideDeleteListsDialog.bind(this);
    }

    componentDidMount() {
        this.onLoad();
    }

    onLoad = async e => {
        try {
            api.get("/lists/all").then((data) => {
                this.setState({
                    lists: data.data
                })
            });

        } catch (err){
            console.log("erro: ", err);
        };
    }

    openNew() {
        this.setState({
            list: this.emptylist,
            submitted: false,
            listDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            listDialog: false
        });
    }

    hideDeleteListDialog() {
        this.setState({ deleteListDialog: false });
    }

    hideDeleteListsDialog() {
        this.setState({ deleteListsDialog: false });
    }

    saveList = async e => {
        let state = { submitted: true };

        if (this.state.list.listname.trim()) {
            let lists = [...this.state.lists];
            let list = {...this.state.list};
            if (this.state.list.id) {
                const index = this.findIndexById(this.state.list.id);
                lists[index] = list;

                try {
                    api.put(`/list/${this.state.list.id}`, list).then((data) => {
                        console.log(data)
                    });
                } catch (err){
                    console.log("erro: ", err);
                };

                this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Usuário atualizado', life: 3000 });
            }
            else {
                try {
                    api.post('/list', list).then((data) => {
                        console.log(data)
                    });
                } catch (err){
                    console.log("erro: ", err);
                };
                this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Usuário criado', life: 3000 });
            }

            state = {
                ...state,
                lists,
                listDialog: false,
                list: this.emptylist
            };
        }

        this.setState(state);
    }

    editList(list) {
        this.setState({
            list: { ...list },
            listDialog: true
        });
    }

    confirmDeleteList(list) {
        this.setState({
            list,
            deleteListDialog: true
        });
    }

    deleteList() {
        let lists = this.state.lists.filter(val => val.id !== this.state.list.id);
        api.delete(`/list/${this.state.list.id}`)
        this.setState({
            lists,
            deleteListDialog: false,
            list: this.emptylist
        });
        this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Lista deletada', life: 3000 });
    }

    findIndexById(id) {
        let index = -1;
        for (let i = 0; i < this.state.lists.length; i++) {
            if (this.state.lists[i].id === id) {
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
        this.setState({ deleteListsDialog: true });
    }

    deleteSelectedLists() {
        let lists = this.state.lists.filter(val => !this.state.selectedLists.includes(val));
        this.setState({
            lists,
            deleteListsDialog: false,
            selectedLists: null
        });
        this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Listas deletadas', life: 3000 });
    }

    onCategoryChange(e) {
        let list = {...this.state.list};
        list['finished'] = e.value;
        this.setState({ list });
    }

    onInputChange(e, name) {
        const val = (e.target && e.target.value) || '';
        let list = {...this.state.list};
        list[`${name}`] = val;

        this.setState({ list });
    }

    leftToolbarTemplate() {
        return (
            <React.Fragment>
                <Button label="Novo" icon="pi pi-plus" className="p-button-success p-mr-2" style={{ backgroundColor:'#49c7ab'}} onClick={this.openNew} />
                <Button label="Deletar" icon="pi pi-trash" className="p-button-danger" onClick={this.confirmDeleteSelected} disabled={!this.state.selectedLists || !this.state.selectedLists.length} />
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
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-primary p-mr-2" onClick={() => this.editList(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => this.confirmDeleteList(rowData)} />
            </React.Fragment>
        );
    }

    render() {
        const header = (
            <div className="table-header">
                <h3 className="p-m-0">Gerenciar Listas</h3>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Procurar..." />
                </span>
            </div>
        );
        const listDialogFooter = (
            <React.Fragment>
                <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Salvar" icon="pi pi-check" className="p-button-text" onClick={this.saveList} />
            </React.Fragment>
        );
        const deleteListDialogFooter = (
            <React.Fragment>
                <Button label="Não" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteListDialog} />
                <Button label="Sim" icon="pi pi-check" className="p-button-text" onClick={this.deleteList} />
            </React.Fragment>
        );
        const deleteListsDialogFooter = (
            <React.Fragment>
                <Button label="Não" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteListsDialog} />
                <Button label="Sim" icon="pi pi-check" className="p-button-text" onClick={this.deleteSelectedLists} />
            </React.Fragment>
        );

        return (
            <div className="datatable-crud-demo">
                <Toast ref={(el) => this.toast = el} />

                <div className="card">
                    <Toolbar className="p-mb-4" left={this.leftToolbarTemplate} right={this.rightToolbarTemplate}></Toolbar>

                    <DataTable ref={(el) => this.dt = el} value={this.state.lists} selection={this.state.selectedLists} onSelectionChange={(e) => this.setState({ selectedLists: e.value })}
                        dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
                        globalFilter={this.state.globalFilter}
                        header={header}>

                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column field="id" header="Id" sortable headerStyle={{ width: '5rem' }}></Column>
                        <Column field="user_id" header="Usuário" sortable></Column>
                        <Column field="listname" header="Listname" sortable></Column>
                        <Column field="descricao" header="Descrição" sortable></Column>
                        <Column field="finished" header="Finalizada" className="p-text-center" sortable></Column>
                        <Column field="priority" header="Prioridade" sortable></Column>
                        <Column body={this.actionBodyTemplate}></Column>
                    </DataTable>
                </div>

                <Dialog visible={this.state.listDialog} style={{ width: '450px' }} header="Adicionar Lista" modal className="p-fluid" footer={listDialogFooter} onHide={this.hideDialog}>
                    <div className="p-field">
                        <label htmlFor="listname">listname</label>
                        <InputText id="listname" value={this.state.user.listname} onChange={(e) => this.onInputChange(e, 'listname')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.user.listname })} />
                        {this.state.submitted && !this.state.user.listname && <small className="p-error">listname é obrigatório.</small>}
                    </div>
                    <div className="p-field">
                        <label htmlFor="descricao">Descrição</label>
                        <InputTextarea id="descricao" value={this.state.user.descricao} onChange={(e) => this.onInputChange(e, 'descricao')} required />
                    </div>
                </Dialog>

                <Dialog visible={this.state.deleteListDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteListDialogFooter} onHide={this.hideDeleteListDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                        {this.state.user && <span>Certeza que deseja deletar o usuário <b>{this.state.user.listname}</b>?</span>}
                    </div>
                </Dialog>

                <Dialog visible={this.state.deleteListsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteListsDialogFooter} onHide={this.hideDeleteListsDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                        {this.state.user && <span>Certeza que deseja deletar o usuário selecionado?</span>}
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default AdminLists;
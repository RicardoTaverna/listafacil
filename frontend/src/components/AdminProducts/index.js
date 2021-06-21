import React, { Component } from 'react';
import { api } from '../../services/api';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import './adminProducts.css';

export class AdminProducts extends Component {

    emptyproduct = {
        id: null,
        listname: '',
        descricao: '',
        finished: 0,
        priority: ''
    };

    constructor(props) {
        super(props);

        this.state = {
            lists: null,
            products: null,
            listDialog: false,
            deleteProductDialog: false,
            deleteProductsDialog: false,
            list: this.emptyproduct,
            product: this.emptyproduct,
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
        this.saveProduct = this.saveProduct.bind(this);
        this.editProduct = this.editProduct.bind(this);
        this.confirmDeleteProduct = this.confirmDeleteProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.exportCSV = this.exportCSV.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        this.deleteSelectedLists = this.deleteSelectedLists.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.hideDeleteProductDialog = this.hideDeleteProductDialog.bind(this);
        this.hideDeleteProductsDialog = this.hideDeleteProductsDialog.bind(this);
    }

    componentDidMount() {
        this.onLoad();
    }

    onLoad = async e => {
        try {
            api.get("/product").then((data) => {
                this.setState({
                    products: data.data
                })
            });

        } catch (err){
            console.log("erro: ", err);
        };
    }

    openNew() {
        this.setState({
            list: this.emptyproduct,
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

    hideDeleteProductDialog() {
        this.setState({ deleteProductDialog: false });
    }

    hideDeleteProductsDialog() {
        this.setState({ deleteProductsDialog: false });
    }

    saveProduct = async e => {
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
                list: this.emptyproduct
            };
        }

        this.setState(state);
    }

    editProduct(list) {
        this.setState({
            list: { ...list },
            listDialog: true
        });
    }

    confirmDeleteProduct(list) {
        this.setState({
            list,
            deleteProductDialog: true
        });
    }

    deleteProduct() {
        let lists = this.state.lists.filter(val => val.id !== this.state.list.id);
        api.delete(`/list/${this.state.list.id}`)
        this.setState({
            lists,
            deleteProductDialog: false,
            list: this.emptyproduct
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
        this.setState({ deleteProductsDialog: true });
    }

    deleteSelectedLists() {
        let lists = this.state.lists.filter(val => !this.state.selectedLists.includes(val));
        this.setState({
            lists,
            deleteProductsDialog: false,
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
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-primary p-mr-2" onClick={() => this.editProduct(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => this.confirmDeleteProduct(rowData)} />
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
                <Button label="Salvar" icon="pi pi-check" className="p-button-text" onClick={this.saveProduct} />
            </React.Fragment>
        );
        const deleteProductDialogFooter = (
            <React.Fragment>
                <Button label="Não" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteProductDialog} />
                <Button label="Sim" icon="pi pi-check" className="p-button-text" onClick={this.deleteProduct} />
            </React.Fragment>
        );
        const deleteProductsDialogFooter = (
            <React.Fragment>
                <Button label="Não" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteProductsDialog} />
                <Button label="Sim" icon="pi pi-check" className="p-button-text" onClick={this.deleteSelectedLists} />
            </React.Fragment>
        );

        return (
            <div className="datatable-crud-demo">
                <Toast ref={(el) => this.toast = el} />

                <div className="card">
                    <Toolbar className="p-mb-4" left={this.leftToolbarTemplate} right={this.rightToolbarTemplate}></Toolbar>

                    <DataTable ref={(el) => this.dt = el} value={this.state.products} selection={this.state.selectedLists} onSelectionChange={(e) => this.setState({ selectedLists: e.value })}
                        dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
                        globalFilter={this.state.globalFilter}
                        header={header}>

                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column field="id" header="Id" sortable headerStyle={{ width: '5rem' }}></Column>
                        <Column field="name" header="Descrição" sortable></Column>
                        <Column field="value" header="Valor" sortable></Column>
                        <Column field="stablishment" header="Estabelecimento" sortable></Column>
                        <Column body={this.actionBodyTemplate}></Column>
                    </DataTable>
                </div>

                <Dialog visible={this.state.listDialog} style={{ width: '450px' }} header="Adicionar Lista" modal className="p-fluid" footer={listDialogFooter} onHide={this.hideDialog}>
                    <div className="p-field">
                        <label htmlFor="listname">listname</label>
                        <InputText id="listname" value={this.state.list.listname} onChange={(e) => this.onInputChange(e, 'listname')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.list.listname })} />
                        {this.state.submitted && !this.state.list.listname && <small className="p-error">listname é obrigatório.</small>}
                    </div>
                    <div className="p-field">
                        <label htmlFor="descricao">Descrição</label>
                        <InputTextarea id="descricao" value={this.state.list.descricao} onChange={(e) => this.onInputChange(e, 'descricao')} required />
                    </div>
                </Dialog>

                <Dialog visible={this.state.deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={this.hideDeleteProductDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                        {this.state.list && <span>Certeza que deseja deletar o usuário <b>{this.state.list.listname}</b>?</span>}
                    </div>
                </Dialog>

                <Dialog visible={this.state.deleteProductsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={this.hideDeleteProductsDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                        {this.state.list && <span>Certeza que deseja deletar o usuário selecionado?</span>}
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default AdminProducts;
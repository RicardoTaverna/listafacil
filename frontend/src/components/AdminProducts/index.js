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
import { InputNumber } from 'primereact/inputnumber';
import './adminProducts.css';

export class AdminProducts extends Component {

    emptyproduct = {
        id: null,
        name: '',
        value: null,
        stablishment: ''
    };

    constructor(props) {
        super(props);

        this.state = {
            lists: null,
            products: null,
            productDialog: false,
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
        this.deleteSelectedProducts = this.deleteSelectedProducts.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.hideDeleteProductDialog = this.hideDeleteProductDialog.bind(this);
        this.hideDeleteProductsDialog = this.hideDeleteProductsDialog.bind(this);
        this.priceBodyTemplate = this.priceBodyTemplate.bind(this);
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
            productDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            productDialog: false
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
        console.log('tentando...')
        if (this.state.product.name.trim()) {
            let products = [...this.state.products];
            let product = {...this.state.product};
            if (this.state.product.id) {
                const index = this.findIndexById(this.state.product.id);
                products[index] = product;

                try {
                    api.put(`/product/${this.state.product.id}`, product).then((data) => {
                        console.log(data)
                    });
                } catch (err){
                    console.log("erro: ", err);
                };

                this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Produto atualizado', life: 3000 });
            }
            else {
                try {
                    console.log('body', product);
                    api.post('/product', product).then((data) => {
                        console.log(data)
                    });
                } catch (err){
                    console.log("erro: ", err);
                };
                this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Produto criado', life: 3000 });
            }

            state = {
                ...state,
                products,
                productDialog: false,
                product: this.emptyproduct
            };
        }

        this.setState(state);
    }

    editProduct(product) {
        this.setState({
            product: { ...product },
            productDialog: true
        });
    }

    confirmDeleteProduct(product) {
        this.setState({
            product,
            deleteProductDialog: true
        });
    }

    deleteProduct() {
        let products = this.state.products.filter(val => val.id !== this.state.product.id);
        console.log('id: ', this.state.product.id)
        api.delete(`/product/${this.state.product.id}`)
        this.setState({
            products,
            deleteProductDialog: false,
            product: this.emptyproduct
        });
        this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Produto deletado', life: 3000 });
    }

    findIndexById(id) {
        let index = -1;
        for (let i = 0; i < this.state.products.length; i++) {
            if (this.state.products[i].id === id) {
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

    deleteSelectedProducts() {
        let products = this.state.products.filter(val => !this.state.selectedproducts.includes(val));
        this.setState({
            products,
            deleteProductsDialog: false,
            selectedproducts: null
        });
        this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Listas deletadas', life: 3000 });
    }

    onInputChange(e, name) {
        const val = (e.target && e.target.value) || '';
        let product = {...this.state.product};
        product[`${name}`] = val;

        this.setState({ product });
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

    formatCurrency(value) {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    priceBodyTemplate(rowData) {
        return this.formatCurrency(rowData.value);
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
        const productDialogFooter = (
            <React.Fragment>
                <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Salvar" icon="pi pi-check" className="p-button-text" onClick={this.saveProduct} />
            </React.Fragment>
        );
        const deleteProductDialogFooter = (
            <React.Fragment>
                <Button label="N??o" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteProductDialog} />
                <Button label="Sim" icon="pi pi-check" className="p-button-text" onClick={this.deleteProduct} />
            </React.Fragment>
        );
        const deleteProductsDialogFooter = (
            <React.Fragment>
                <Button label="N??o" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteProductsDialog} />
                <Button label="Sim" icon="pi pi-check" className="p-button-text" onClick={this.deleteSelectedProducts} />
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
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                        globalFilter={this.state.globalFilter}
                        header={header}>

                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column field="id" header="Id" sortable headerStyle={{ width: '5rem' }}></Column>
                        <Column field="name" header="Descri????o" sortable></Column>
                        <Column field="value" header="Valor" body={this.priceBodyTemplate} sortable></Column>
                        <Column field="stablishment" header="Estabelecimento" sortable></Column>
                        <Column body={this.actionBodyTemplate}></Column>
                    </DataTable>
                </div>

                <Dialog visible={this.state.productDialog} style={{ width: '450px' }} header="Adicionar Produto" modal className="p-fluid" footer={productDialogFooter} onHide={this.hideDialog}>
                    <div className="p-field">
                        <label htmlFor="name">Nome</label>
                        <InputText id="name" value={this.state.product.name} onChange={(e) => this.onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.product.name })} />
                        {this.state.submitted && !this.state.product.name && <small className="p-error">name ?? obrigat??rio.</small>}
                    </div>
                    <div className="p-field">
                        <label htmlFor="value">Valor</label>
                        <InputNumber id="value" value={this.state.product.value} onValueChange={(e) => this.onInputChange(e, 'value')} required mode="currency" currency="BRL" locale="pt-BR" minFractionDigits={2} />
                    </div>
                    <div className="p-field">
                        <label htmlFor="stablishment">Estabelecimento</label>
                        <InputTextarea id="stablishment" value={this.state.product.stablishment} onChange={(e) => this.onInputChange(e, 'stablishment')} required />
                    </div>
                </Dialog>

                <Dialog visible={this.state.deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={this.hideDeleteProductDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                        {this.state.list && <span>Certeza que deseja deletar o usu??rio <b>{this.state.list.listname}</b>?</span>}
                    </div>
                </Dialog>

                <Dialog visible={this.state.deleteProductsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={this.hideDeleteProductsDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                        {this.state.list && <span>Certeza que deseja deletar o usu??rio selecionado?</span>}
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default AdminProducts;
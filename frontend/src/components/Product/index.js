import React from 'react';
import './product.css';
import { api } from "../../services/api";
import { Button } from "primereact/button";
import { Divider } from 'primereact/divider';
import { OverlayPanel } from 'primereact/overlaypanel';

class Product extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            listId: props.listId,
            id: props.id,
            name: props.description,
            discount: props.discount,
            price_table: props.price_table,
            value: props.price,
            updated: props.updated,
            establishment: props.establishment,
            stablishment: props.establishment.nm_emp,
            productsId: props.listProducts,
            sidebar: props.sidebar || false,
            products:[]
        };
        this.onAddProduct = this.onAddProduct.bind(this);
        this.onChageProductList = this.onChageProductList.bind(this);
    }

    onAddProduct = async e => {
        const { name, value, stablishment } = this.state;
        let ids = [];
        let i;
        try{
            console.log(ids)
            console.log( this.state.productsId )

            for(i = 0; i < this.state.productsId.length; i++) {
                ids.push(this.state.productsId[i].id)
            }
            
            await api.post('/product', { name, value, stablishment }).then((response) => {
                ids.push(response.data.data.id)
            })
            
            this.setState({ products: ids})
            
            const { products } = this.state;
            
            console.log('Enviando body: ', {products} )
            
            await api.put(`/list/${this.state.listId}`, { products } )
            console.log('produto adicionado')

        } catch (err) {
            console.log('error: ', err)
        }
    }

    onChageProductList = async e => {
        try {
            api.get(`/list/${this.state.listId}`).then((response) => {
                console.log(response.data[0].products);
            })
        } catch (err) {
            console.log('error: ', err)
        }
    }

    render() {

        const addButton = this.state.sidebar ? <Button icon="pi pi-plus" className="p-button-primary p-ml-2" onClick={this.onAddProduct}/> : " " 

        return (
            <React.Fragment>
    
                <OverlayPanel ref={(el) => this.op = el} showCloseIcon id="overlay_panel" style={{width: '450px'}} className="overlaypanel-demo">
                    <p>Estabelecimento: {this.state.establishment.nm_emp}</p>
                    <p>Endereço: {this.state.establishment.nm_logr}, {this.state.establishment.nr_logr}</p>
                    <p>Bairro: {this.state.establishment.bairro}</p>
                    <p>Cidade: {this.state.establishment.mun}</p>
                </OverlayPanel>
    
                <OverlayPanel ref={(el) => this.op2 = el} showCloseIcon id="overlay_panel" style={{width: '450px'}} className="overlaypanel-demo">
                    <h4>Valores</h4>
                    <p>Valor de desconto: {this.state.discount}</p>
                    <p>Valor de tabela: {this.state.price_table}</p>
                    <p>Valor final: {this.state.value}</p>
                </OverlayPanel>
    
                <div className="product-card-item">
                    <div className="">
                        
                        <h4>{this.state.name}</h4>
                        <h3>R${this.state.value}</h3>
                        
                        <div className="data-text">
                            <p><i className="pi pi-calendar p-mr-2">
                            </i>{this.state.updated}</p>
                        </div>
                        
                    </div>
                    <Divider></Divider>
                    <div className="p-d-flex">
                        <Button className="p-button-outlined p-button-success" icon="pi pi-dollar" label="Valores" onClick={(e) => this.op2.toggle(e)} aria-haspopup aria-controls="overlay_panel"/>
                        <Button className="p-button-outlined p-button-info p-ml-2" icon="pi pi-eye" label="Estabelecimento" onClick={(e) => this.op.toggle(e)} aria-haspopup aria-controls="overlay_panel"/>
                        {addButton}
                    </div>
                    <div className="data-text">
                        <p className="p-text-italic">REF: {this.state.id}</p>
                    </div>
                </div>
            </React.Fragment>
        )
    }
    
}

export default Product;
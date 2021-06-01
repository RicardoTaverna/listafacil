import React from 'react';
import './uniquelist.css';
import { api } from "../../services/api";
import MenuTopBar from '../MenuTopBar/index';
import Product from '../Product/index'
import ListProduct from '../ListProduct/index';
import PrimeReact from 'primereact/api';
import { Button } from "primereact/button";
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from "primereact/inputtext";
import { Ripple } from 'primereact/ripple';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Sidebar } from 'primereact/sidebar';
import { Toast } from 'primereact/toast';


class UniqueList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            id: this.props.match.params.id,
            listname: '',
            descricao: '',
            updateAt: '',
            searchProduct: '',
            listProducts: [],
            establishment: [],
            searchedProducts: [],
            visibleFullScreen: false,
            spinIcon: false,
            selectedEstablishment: null,
        };
        PrimeReact.ripple = true;
        this.onLoad = this.onLoad.bind(this);
        this.onEstablishmentChange = this.onEstablishmentChange.bind(this);
        this.onSearchProduct = this.onSearchProduct.bind(this);
        this.onCleanList = this.onCleanList.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    componentDidMount(){
        this.onLoad();
    }

    componentDidUpdate(){
        this.onLoad();
    }

    componentWillUnmount(){

    }

    onEstablishmentLoad = async e => {
        try {
            await api.get('/api/establishment').then((response) => {
                this.setState({ establishment: response.data.results })
            })
        } catch (err) {
            console.log('error', err);
        }

    }

    onLoad = async e => {
        try {
            await api.get(`/list/${this.state.id}`).then((response) => {
                this.setState({
                    listname: response.data[0].listname,
                    descricao: response.data[0].descricao,
                    updateAt: response.data[0].updated_at,
                    listProducts: response.data[0].products,
                })
            })

        } catch (err) {
            console.log('error', err);
        }

    }

    onSearchProduct = async e => {
        this.setState({ 
            spinIcon: true,
            searchedProducts: []
        })
        try {
            await api.get(`/api/product/${this.state.searchProduct}`).then((response) => {
                this.setState({ searchedProducts: response.data.results })
                this.setState({ spinIcon: false })
            })
        } catch (err) {
            console.log('error', err);
        }
    }

    onDelete = async (id) => {
        try {
            api.delete(`/product/${id}`)
        } catch (err) {
            console.log('error', err);
        }
    }

    onCleanList = async e => {
        let { listProducts } = this.state;
        try {
            let i;
            for(i = 0; i < listProducts.length; i++){
                this.onDelete(listProducts[i].id)
            }
        } catch (err) {
            console.log('error', err);
        }
    }

    onEstablishmentChange(e) {
        this.setState({ selectedEstablishment: e.value });
    }

    render() {
        let { searchedProducts, listProducts } = this.state;
        let valor = 0.0;
        let itensQuanitty = 0;
        
        let concatValor = listProducts.map(product => 
            valor += product.total
        )
        concatValor = listProducts.map(product => 
            itensQuanitty += product.quantity
        )
        const loadIcon = (
            <div className="p-text-center p-mt-4">
                <i className="pi pi-spin pi-spinner" style={{'fontSize': '2em'}}></i>
            </div>
        );
        return(
            <React.Fragment>
                <MenuTopBar></MenuTopBar>
                <Toast ref={(el) => this.toast = el} />
                <Sidebar visible={this.state.visibleFullScreen} onHide={() => this.setState({ visibleFullScreen: false })} style={{ width: '32rem'}}>
                    <div className="">
                        <h2 className="">Estabelecimentos</h2>
                        <Dropdown value={this.state.selectedEstablishment}
                                    options={this.state.establishment}
                                    onChange={this.onEstablishmentChange} 
                                    optionLabel="nm_emp" 
                                    placeholder="Filtro por Estabelecimento" 
                        />
                        <Divider></Divider>
                        <h2>Produtos</h2>
                        <div className="p-inputgroup">
                            <InputText placeholder="Buscar Produtos" value={this.state.searchProduct} onChange={(e) => this.setState({searchProduct: e.target.value})}/>
                            <Button icon="pi pi-search" className="p-button-primary" onClick={this.onSearchProduct}/>
                        </div>
                        <Divider></Divider>
                        <div>
                            <ScrollPanel style={{ width: '100%', height: '400px' }}>
                                <div>
                                    {this.state.spinIcon ? loadIcon : ''}
                                    {searchedProducts.map(
                                        product => <Product
                                            key={product.id}
                                            id={product.id}
                                            listId={this.state.id}
                                            description={product.desc}
                                            discount={product.valor_desconto}
                                            price_table={product.valor_tabela}
                                            price={product.valor}
                                            updated={product.tempo}
                                            establishment={product.estabelecimento}
                                            listProducts={listProducts}
                                            sidebar={true}>
                                            </Product>
                                    )}
                                </div>
                            </ScrollPanel>
                        </div>
                    </div>
                </Sidebar>
                <section className="list-background">

                </section>
                <div className="p-d-flex p-justify-center">
                    <div className="p-col p-md-10 p-lg-9 p-xl-7 list-container">
                        <div className="list-card">
                            <div className="list-card-title">
                                <div className="p-p-3 p-m-3 p-d-flex p-jc-between">
                                    <div>
                                        <h2>{this.state.listname}</h2>
                                        <p>{this.state.descricao}</p>
                                    </div>
                                    <div className="p-grid p-text-right">
                                        <div className="p-col-12">
                                            <Button onClick={this.onCleanList} label="Limpar Lista" icon="pi pi-trash" className="p-button-danger p-button-text"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="button-add-list">
                                <div onClick={() => this.setState({ visibleFullScreen: true })} className="circle p-ripple">
                                    <img className="img-icon" src="https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/2x/btw_ic_speeddial_white_24dp_2x.png" alt="" />
                                    <Ripple/>
                                </div>
                            </div>
                            <div className="p-mt-4">
                                <ScrollPanel style={{ width: '100%', height: '400px' }}>
                                    {listProducts.map(
                                        product => <ListProduct
                                            key={product.id}
                                            product={product}>
                                            </ListProduct>
                                    )}
                                </ScrollPanel>
                                
                                <Divider></Divider>
                                <div className="list-card-title">
                                    <div className="p-p-3 p-m-3 p-d-flex p-jc-between">
                                        <div>
                                            <p>Total de itens: {itensQuanitty}</p>
                                            <h2>R${valor.toFixed(2)}</h2>
                                        </div>
                                        <div className="data-text p-text-italic">
                                            <p>{this.state.updateAt}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default UniqueList;
import React from 'react';
import { api } from "../../services/api";
import MenuTopBar from '../MenuTopBar';
import Product from '../Product';
import PrimeReact from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Ripple } from 'primereact/ripple';
import { ScrollPanel } from 'primereact/scrollpanel';

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            spinIcon: false,
            searchedProducts: []
        }
        PrimeReact.ripple = true;
        this.onSearch = this.onSearch.bind(this);
    }

    onSearch = async () => {
        this.setState({ 
            spinIcon: true,
            searchedProducts: []
         })
        try {
            await api.get(`/api/product/${this.state.search}`).then((response) => {
                this.setState({ searchedProducts: response.data.results })
                this.setState({ spinIcon: false })
            })
        } catch (err) {
            console.log('error', err);
        }
    }

    render() {
        const loadIcon = (
            <div className="p-text-center p-mt-4">
                <i className="pi pi-spin pi-spinner" style={{'fontSize': '2em'}}></i>
            </div>
        );

        const { searchedProducts } = this.state

        return (
            <React.Fragment>
                <MenuTopBar></MenuTopBar>
                <section className="list-background">

                </section>
                <div className="p-d-flex p-justify-center">
                    <div className="p-col p-md-10 p-lg-9 p-xl-7 list-container">
                        <div className="list-card">
                            <div className="list-card-title">
                                <div className="p-p-3 p-m-3">
                                    <h2>Buscar Produto</h2>
                                    <div className="p-fluid">
                                        <div className="p-field">
                                            <span className="p-input-icon-left">
                                                <i className="pi pi-search" />
                                                <InputText value={this.state.search} onChange={(e) => this.setState({search: e.target.value})} placeholder="Digite o nome do produto" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="button-add-list">
                                <div onClick={this.onSearch} className="circle p-ripple">
                                    <img className="img-icon" src="https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/2x/btw_ic_speeddial_white_24dp_2x.png" alt="" />
                                    <Ripple/>
                                </div>
                            </div>
                            <div>
                                <ScrollPanel style={{ height: '500px' }}>
                                    {this.state.spinIcon ? loadIcon : ''}
                                    {searchedProducts.map( product =><Product
                                        key={product.id}
                                        id={product.id}
                                        listId={this.state.id}
                                        description={product.desc}
                                        discount={product.valor_desconto}
                                        price_table={product.valor_tabela}
                                        price={product.valor}
                                        updated={product.tempo}
                                        establishment={product.estabelecimento}
                                        listProducts={searchedProducts}>
                                        </Product>
                                    )}
                                </ScrollPanel>
                            </div>    
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

}

export default Search;
import React from 'react';
import { api } from "../../services/api";
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';

class ProductForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listId: props.listId,
            name: '',
            value: null,
            productsId: props.listProducts,
            products: [],
            stablishment: '',
            toastSeverity: '',
            toastSummary: '',
            toastDetail: ''
        };
        this.onAddProduct = this.onAddProduct.bind(this);
        this.showMessage = this.showMessage.bind(this);
    }

    onAddProduct = async e => {
        const { name, value, stablishment } = this.state;
        let ids = [];
        let i;
        try {
            for(i = 0; i < this.state.productsId.length; i++) {
                ids.push(this.state.productsId[i].id)
            }
            
            await api.post('/product', { name, value, stablishment }).then((response) => {
                ids.push(response.data.data.id)
            })
            
            this.setState({ products: ids})
            
            const { products } = this.state;
            
            await api.put(`/list/${this.state.listId}`, { products } )

            this.setState({
                visibleLeft: false,
                toastSeverity:'success', 
                toastSummary: 'Produto Adicionada', 
                toastDetail: 'Nova produto adicionado com sucesso!'
            })
            this.showMessage();
        } catch (err) {
            console.log('error: ', err)
        }
    }

    showMessage() {
        this.toast.show({severity:this.state.toastSeverity, summary: this.state.toastSummary, detail: this.state.toastDetail , life: 3000});
    }

    render() {
        const button = (
            <Button label="Adicionar" className="p-button-sm" onClick={this.onAddProduct} />
        )

        return(
            <React.Fragment>
                <Toast ref={(el) => this.toast = el} />
                <div className="p-p-2 p-m-2" style={{'z-index': 120}}>
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col">
                            <span className="p-float-label">
                                <InputText id="name" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                                <label htmlFor="name">Nome do Produto</label>
                            </span>
                        </div>
                    </div>
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col">
                            <span className="p-float-label">
                                <InputNumber id="value" value={this.state.value} onValueChange={(e) => this.setState({value: e.target.value})} mode="decimal" locale="pt-BR" minFractionDigits={2}/>
                                <label htmlFor="value">Valor</label>
                            </span>
                        </div>
                    </div>
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col">
                            <span className="p-float-label">
                                <InputText id="stablishment" value={this.state.stablishment} onChange={(e) => this.setState({ stablishment: e.target.value })} />
                                <label htmlFor="stablishment">Nome do Estabelecimento</label>
                            </span>
                        </div>
                    </div>
                    <Divider/>
                    {button}
                </div>
            </React.Fragment>
            
        )
    }
}

export default ProductForm
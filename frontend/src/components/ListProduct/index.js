import React from 'react';
import './listproduct.css';
import { api } from "../../services/api";
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { ToggleButton } from 'primereact/togglebutton';


class ListProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked1: true,
            product: props.product,
            quantity: props.product.quantity,
        }
        this.onDelete = this.onDelete.bind(this);
        this.onAddQuantity = this.onAddQuantity.bind(this);
        this.onSubtractQuantity = this.onSubtractQuantity.bind(this);
    }

    onDelete = async e => {
        const { product } = this.state
        try {
            await api.delete(`/product/${product.id}`)
        } catch (err) {
            console.log('error', err);
        }
    }

    onAddQuantity = async () => {
        const { product } = this.state
        console.log('quantidade do state inicial: ', this.state.quantity)
        this.setState((state) => {
            return {quantity : state.quantity + 1}
        })
        const { quantity } = this.state
        console.log('quantidade depois da soma: ', this.state.quantity)
        try {
           await api.put(`/product/${product.id}`, { quantity }).then((response) => {
               console.log(response)
           })
        } catch (err) {
            console.log('error', err);
        }
    }
    
    onSubtractQuantity = async () => {
        const { product } = this.state
        let quantityItem = this.state.quantity - 1
        this.setState({ quantity: quantityItem})
        const { quantity } = this.state
        console.log('quantidade: ', quantity)
        try {
           await api.put(`/product/${product.id}`, { quantity }).then((response) => {
            console.log(response)
            console.log('quantidade: ', quantity)
        })
        } catch (err) {
            console.log('error', err);
        }
    }

    
    render(){
        const delButton = (<Button icon="pi pi-trash" className="p-button-danger" onClick={this.onDelete} tooltip="Diminuir quantidade" tooltipOptions={{position: 'left'}}/>)
        const downButton = (<Button icon="pi pi-angle-down" className="p-button-primary" onClick={this.onSubtractQuantity} tooltip="Diminuir quantidade" tooltipOptions={{position: 'left'}}/>)
        const quantityBtn = this.state.quantity === 1 ? delButton : downButton;
        
        return (
            <React.Fragment>
                <div className="product-card-item">
                     <div className="p-d-flex p-jc-between">
                        <div>
                            <h4>{this.state.product.name}</h4>
                            <h4>Quantidade: {this.state.quantity} un</h4>
                            <h3>R${this.state.product.total}</h3>
                        </div>
                        <div className="p-text-right">
                            <div className="p-mb-2">
                                <ToggleButton checked={this.state.checked1} onChange={(e) => this.setState({checked1: e.value})} onLabel="" offLabel="" onIcon="pi pi-check" offIcon="pi pi-times" />
                            </div>
                            <div className="p-mb-2">
                                <Button icon="pi pi-angle-up" className="p-button-primary" onClick={this.onAddQuantity} tooltip="Aumentar quantidade" tooltipOptions={{position: 'left'}}/>
                            </div>
                            <div className="p-mb-2">
                                {quantityBtn}
                            </div>
                        </div>
                    </div>
                    <Divider></Divider>    
                    <div>
                        <p className="data-text p-text-italic">{this.state.product.stablishment}</p>
                    </div>
    
    
                </div>
            </React.Fragment>
        )
    }
}

export default ListProduct;
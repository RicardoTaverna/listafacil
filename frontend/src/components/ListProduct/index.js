import React from 'react';
import './listproduct.css';
import { api } from "../../services/api";
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';

const ListProduct = (props) => {

    const id = props.id;
    const description = props.description;
    const price = props.price;
    const establishment = props.establishment;

    const onDelete = async e => {
        try {
            api.delete(`/product/${id}`)
        } catch (err) {
            console.log('error', err);
        }
    }

    return (
        <React.Fragment>
            <div className="product-card-item">
                <div>
                    <h4>{description}</h4>
                    <h3>R${price}</h3>
                </div>
                <Divider></Divider>    
                <div className="p-d-flex p-jc-between">
                    <div>
                        <p className="data-text p-text-italic">{establishment}</p>
                    </div>
                    <div>
                        <Button icon="pi pi-trash" className="p-button-danger p-ml-2" onClick={onDelete}/>
                    </div>
                </div>

            </div>
        </React.Fragment>
    )
}

export default ListProduct;
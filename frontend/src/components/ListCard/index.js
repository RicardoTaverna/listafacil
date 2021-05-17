import React, { useState, useRef } from 'react';
import './listcard.css';
import api from "../../services/api";
import ListForm from '../ListForm/index';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Divider } from 'primereact/divider';
import { Sidebar } from 'primereact/sidebar';
import { Toast } from 'primereact/toast';

const ListCard = (props) => {

    const id = props.id;
    const title = props.title;
    const description = props.description;
    const update = props.update;
    const check = props.finished ? true : false;
    const [checked, setChecked] = useState(check);
    const [visibleLeft, setvisibleLeft] = useState(false);
    const toastBC = useRef(null);
    const toast = useRef(null);

    const onDelete = async e => {
        try {
            api.delete(`/list/${id}`)

        } catch (err) {
            console.log('error', err);
        }
    }

    const onUpdate = async e => {
        setChecked(e.checked);
        let finished = checked ? "0" : "1"
        try {
            api.put(`/list/${id}`, { finished })
        } catch (err) {
            console.log('error', err);
        }
    }

    const showConfirm = () => {
        toastBC.current.show({ severity: 'error', sticky: true, content: (
            <div className="p-flex p-flex-column" style={{flex: '1'}}>
                <div className="p-text-center">
                    <i className="pi pi-exclamation-triangle" style={{fontSize: '3rem'}}></i>
                    <h3>Deseja deletar a lista?</h3>
                    <h4>{title}</h4>
                    <p>Confirme para prosseguir</p>
                </div>
                <div className="p-grid p-fluid">
                    <div className="p-col-12">
                        <Button type="button" label="Sim" className="p-button-primary" onClick={onDelete}/>
                    </div>
                </div>
            </div>
        ) });
    }

    
    return (
        <React.Fragment>
            <Sidebar visible={visibleLeft} baseZIndex={-100} onHide={() => setvisibleLeft(false)}>
                <ListForm listname={title} descricao={description} id={id} edit={true} ></ListForm>
            </Sidebar>

            <div className={checked ? "list-card-item-done" : "list-card-item"}>
                <Toast ref={toastBC} position="bottom-center" />
                <div className="p-d-flex p-jc-between">
                    <div>
                        <h3>{title}</h3>
                        <p>{description}</p>
                    </div>
                    <div className="p-field-checkbox">
                        <Checkbox inputId="binary" checked={checked} onChange={onUpdate} />
                        <label htmlFor="binary">{checked ? 'Finalizada' : 'Finalizar'}</label>
                    </div>
                </div>
                <Divider/>
                <div className="list-card-footer p-d-flex">
                    <div className="p-col-8 p-md-9 p-lg-10">
                        <p className="p-text-italic data-text"><i className="pi pi-calendar p-mr-2"></i>{update}</p>
                    </div>
                    <div className="p-col p-text-right">
                        <Button icon="pi pi-trash" onClick={showConfirm} className="p-button-rounded p-button-danger p-button-outlined p-mr-2"/>
                        <Button icon="pi pi-pencil" onClick={() => setvisibleLeft(true)} className="p-button-rounded p-button-info p-button-outlined"/>
                    </div>

                </div>
            </div>
        </React.Fragment>
    )
}

export default ListCard;

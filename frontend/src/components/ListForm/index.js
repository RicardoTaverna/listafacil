import React from 'react';
import { api } from "../../services/api";
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';

class ListaForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listname: props.listname || '',
            descricao: props.descricao || '',
            id: props.id || '',
            edit: props.edit || false,
            toastSeverity: '',
            toastSummary: '',
            toastDetail: ''
        };
        this.onAddList = this.onAddList.bind(this);
        this.showMessage = this.showMessage.bind(this);
        this.onUpdateList = this.onUpdateList.bind(this);
    }

    onAddList = async e => {
        const { listname, descricao } = this.state;
        try {
            await api.post('/list', { listname, descricao});
            this.setState({
                visibleLeft: false,
                toastSeverity:'success', 
                toastSummary: 'Lista Adicionada', 
                toastDetail: 'Nova lista adicionada com sucesso!'
            })
            this.showMessage();
        } catch (err) {
            console.log('error: ', err)
        }
    }

    onUpdateList = async e => {
        const { listname, descricao, id } = this.state;
        try {
            await api.put(`/list/${id}`, { listname, descricao});
            this.setState({
                visibleLeft: false,
                toastSeverity:'success', 
                toastSummary: 'Lista Altera', 
                toastDetail: 'Lista alterada com sucesso'
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
        const button = this.state.edit ? (<Button label="Alterar" className="p-button-sm" onClick={this.onUpdateList} />) : (
            <Button label="Adicionar" className="p-button-sm" onClick={this.onAddList} />
        )

        return(
            <React.Fragment>
                <Toast ref={(el) => this.toast = el} />
                <div className="p-p-2 p-m-2" style={{'z-index': 120}}>
                    <h3>Informações da Lista</h3>
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col">
                            <span className="p-float-label">
                                <InputText id="listname" value={this.state.listname} onChange={(e) => this.setState({ listname: e.target.value })} />
                                <label htmlFor="listname">Nome da lista</label>
                            </span>
                        </div>
                    </div>
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col">
                            <span className="p-float-label">
                                <InputText id="descricao" value={this.state.descricao} onChange={(e) => this.setState({ descricao: e.target.value })} />
                                <label htmlFor="descricao">Descrição</label>
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

export default ListaForm
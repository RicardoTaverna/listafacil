import React from 'react';
import './lista.css';
import { api } from "../../services/api";
import MenuTopBar from '../MenuTopBar/index';
import ListCard from '../ListCard/index';
import ListForm from '../ListForm/index';
import PrimeReact from 'primereact/api';
import { Ripple } from 'primereact/ripple';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Sidebar } from 'primereact/sidebar';
import { Toast } from 'primereact/toast';

class List extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            userid: '',
            lists: [],
            visibleLeft: false,
        }
        PrimeReact.ripple = true;
        this.onLoad = this.onLoad.bind(this);
    }

    componentDidMount() {
        this.onLoad();
    }

    componentDidUpdate(){
        this.onLoad();
    }

    onLoad = async e => {
        try {
            api.get('/list').then((response) => {
                this.setState(
                    {lists: response.data}
                )
            })
        } catch (err) {
            console.log('error', err);
        }
    }

    handleChangeVisibleLeft = e => this.setState({visibleLeft: e.target.value})

    render () {
        
        let { lists } = this.state;

        return (
            <React.Fragment>
                <MenuTopBar></MenuTopBar>
                <Toast ref={(el) => this.toast = el} />
                <Sidebar visible={this.state.visibleLeft} onHide={() => this.setState({ visibleLeft: false })}>
                    <ListForm visibleLeft={this.state.visibleLeft} onChangeValue={this.handleChangeVisibleLeft}></ListForm>
                </Sidebar>
                <section className="list-background">

                </section>
                <div className="p-d-flex p-justify-center">
                    <div className="p-col p-md-10 p-lg-9 p-xl-7 list-container">
                        <div className="list-card">
                            <div className="list-card-title">
                                <div className="p-p-2 p-m-2 p-d-flex p-jc-between">
                                    <h2>Minhas Listas</h2>
                                </div>
                            </div>
                            <div className="button-add-list">
                                <div onClick={() => this.setState({ visibleLeft: true })} className="circle p-ripple">
                                    <img className="img-icon" src="https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/2x/btw_ic_speeddial_white_24dp_2x.png" alt="" />
                                    <Ripple/>
                                </div>
                            </div>
                            
                            <div>
                                <ScrollPanel style={{ height: '500px' }}>
                                    {lists.map(
                                        list => <ListCard 
                                            key={list.id}
                                            id={list.id} 
                                            title={list.listname}
                                            description={list.descricao}
                                            update={list.updated_at}
                                            finished={list.finished}>    
                                            </ListCard>
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

export default List

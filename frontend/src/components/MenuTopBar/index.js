import React, { useRef } from 'react';
import logo from '../../images/ListaFácil_removebg.png';
import { Menubar } from 'primereact/menubar';
import { useHistory } from "react-router-dom";
import { Button } from "primereact/button";
import { logout } from '../../services/auth';
import { Toast } from 'primereact/toast';


const MenuTopBar = () => {
    let history = useHistory();
    const toastBC = useRef(null);
    
    const items = [
        {
            label: 'Home',
            icon: 'pi pi-fw pi-home',
            url: '/',
        },
        {
            label: 'Perfil',
            icon: 'pi pi-fw pi-user',
            url: '/app',
        },
        {
            label: 'Listas',
            icon: 'pi pi-fw pi-list',
            url: '/lista',
        },
        {
            label: 'Buscar Produto',
            icon: 'pi pi-fw pi-search',
            url: '/buscar-produto',
        },
        {
            label: 'Sair',
            icon: 'pi pi-fw pi-power-off',
            command: () => showConfirm()
        }
    ];

    const showConfirm = () => {
        toastBC.current.show({ severity: 'warn', sticky: true, content: (
            <div className="p-flex p-flex-column" style={{flex: '1'}}>
                <div className="p-text-center">
                    <i className="pi pi-exclamation-triangle" style={{fontSize: '3rem'}}></i>
                    <h4>Você deseja Deslogar?</h4>
                    <p>Confirme</p>
                </div>
                <div className="p-grid p-fluid">
                    <div className="p-col-6">
                        <Button onClick={onLogout} type="button" label="Sim" className="p-button-success"  />
                    </div>
                    <div className="p-col-6">
                        <Button onClick={clear} type="button" label="Não" className="p-button-secondary" />
                    </div>
                </div>
            </div>
        ) });
    }

    const onLogout = () => {
        logout();
        history.push("/login");
    }

    const clear = () => {
        toastBC.current.clear();
    }

    const start = <img alt="logo" src={logo} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} height="40" className="p-mr-2"></img>;

    return (
        <div>
            <Toast ref={toastBC} position="bottom-center" />
            <div className="card">
                <Menubar className="menubar" model={items} start={start}  />
            </div>
        </div>
    );
}

export default MenuTopBar;
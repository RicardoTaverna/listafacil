import React, { useRef } from 'react';
import logo from '../../images/ListaFácil_removebg.png';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { useHistory } from "react-router-dom";
import { Button } from "primereact/button";
import { logout } from '../../services/auth';
import { Toast } from 'primereact/toast';







const MenuTopBar = () => {
    let history = useHistory();
    const toastBC = useRef(null);
    
    const items = [
        {
            label: 'File',
            icon: 'pi pi-fw pi-file',
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-fw pi-plus',
                    items: [
                        {
                            label: 'Bookmark',
                            icon: 'pi pi-fw pi-bookmark'
                        },
                        {
                            label: 'Video',
                            icon: 'pi pi-fw pi-video'
                        },

                    ]
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-fw pi-trash'
                },
                {
                    separator: true
                },
                {
                    label: 'Export',
                    icon: 'pi pi-fw pi-external-link'
                }
            ]
        },
        {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
                {
                    label: 'Left',
                    icon: 'pi pi-fw pi-align-left'
                },
                {
                    label: 'Right',
                    icon: 'pi pi-fw pi-align-right'
                },
                {
                    label: 'Center',
                    icon: 'pi pi-fw pi-align-center'
                },
                {
                    label: 'Justify',
                    icon: 'pi pi-fw pi-align-justify'
                },

            ]
        },
        {
            label: 'Users',
            icon: 'pi pi-fw pi-user',
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-fw pi-user-plus',

                },
                {
                    label: 'Delete',
                    icon: 'pi pi-fw pi-user-minus',

                },
                {
                    label: 'Search',
                    icon: 'pi pi-fw pi-users',
                    items: [
                        {
                            label: 'Filter',
                            icon: 'pi pi-fw pi-filter',
                            items: [
                                {
                                    label: 'Print',
                                    icon: 'pi pi-fw pi-print'
                                }
                            ]
                        },
                        {
                            icon: 'pi pi-fw pi-bars',
                            label: 'List'
                        }
                    ]
                }
            ]
        },
        {
            label: 'Events',
            icon: 'pi pi-fw pi-calendar',
            items: [
                {
                    label: 'Edit',
                    icon: 'pi pi-fw pi-pencil',
                    items: [
                        {
                            label: 'Save',
                            icon: 'pi pi-fw pi-calendar-plus'
                        },
                        {
                            label: 'Delete',
                            icon: 'pi pi-fw pi-calendar-minus'
                        }
                    ]
                },
                {
                    label: 'Archieve',
                    icon: 'pi pi-fw pi-calendar-times',
                    items: [
                        {
                            label: 'Remove',
                            icon: 'pi pi-fw pi-calendar-minus'
                        }
                    ]
                }
            ]
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
                    <p>Comfirme</p>
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
        try {
            console.log('passei aqui')
            history.push("/login");
            logout();
        } catch (err) {
            this.setState(
                {messageError: "Houve um problema com o login, verifique suas credenciais. T.T"},
                () => this.showError()
            );
        } 
    }

    const clear = () => {
        toastBC.current.clear();
    }





    const start = <img alt="logo" src={logo} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} height="40" className="p-mr-2"></img>;
    const end = <InputText placeholder="Search" type="text" />;

    return (
        <div>
            <Toast ref={toastBC} position="bottom-center" />
            <div className="card">
                <Menubar className="menubar" model={items} start={start}  end={end}/>
            </div>
        </div>
    );
}

export default MenuTopBar;
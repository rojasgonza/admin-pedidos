import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to={"/pedidos"}>Pedidos</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link className="nav-item nav-link" to={"/insumos"}>Insumos</Link>
                    <Link className="nav-item nav-link" to={"/empleados"}>Empleados</Link>
                    <Link className="nav-item nav-link" to={"/locales"}>Locales</Link>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
                            Pedidos
                        </a>
                        <div className="dropdown-menu">
                            <Link className="dropdown-item" to={"/nuevo-pedido"} >NuevoPedido</Link>
                            <Link className="dropdown-item" to={"/pedidos"}>Pedidos</Link>
                        </div>
                    </li>

                </div>
            </div>
        </nav>
    )
}

export default Header;
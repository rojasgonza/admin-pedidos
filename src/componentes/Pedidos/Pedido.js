import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import ReactHtmlTableToExcel from 'react-html-table-to-excel';


function Pedido() {
    const { id } = useParams();
    const [pedidos, guardarPedidos] = useState([]);
    const [empleado, guardarEmpleado] = useState([]);
    const [local, guardarLocal] = useState([]);
    const [lista, guardarLista] = useState([]);

    const consultarAPI = async () => {
        const pedidosConsulta = await clienteAxios.get(`/pedidos/${id}`);
        //colocar datos en el state
        guardarPedidos(pedidosConsulta.data);
        guardarEmpleado(pedidosConsulta.data.empleado);
        guardarLocal(pedidosConsulta.data.local);
        guardarLista(pedidosConsulta.data.lista)
    }
    useEffect(() => {
        consultarAPI();
    }, []);
    return (

        <Fragment>
            <div className='mt-5'>
               
                    <ReactHtmlTableToExcel
                    id="botonExport"
                    table="tablaPedido"
                    filename='pedido'
                    className="btn btn-success"
                    sheet='pagina1'
                    buttonText='Excel'
                    />
      
                <h2>Pedido para: {local.nombre} - {pedidos.fecha}</h2>
                <div className=' mt-5'>
                    <table className='table table-bordered' id='tablaPedido'>

                        <thead>
                            <tr>
                                <th colSpan={2}>Local: {local.nombre}</th>
                                <th colSpan={2}>Fecha: {pedidos.fecha}</th>

                            </tr>
                            <tr>
                                <th colSpan={4}>Empleado: {empleado.nombre} {empleado.apellido}</th>
                            </tr>
                            <tr>
                                <th colSpan={4}>Aclaraciones: {pedidos.aclaraciones}</th>
                            </tr>
                            <tr>
                                <th>cod</th>
                                <th>nombre</th>
                                <th>cantidad</th>
                                <th>unidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                lista.map((item, index) =>
                                    <tr key={index}>
                                        <th>{item.insumos.codigoInsumo}</th>
                                        <td>{item.insumos.nombre}</td>
                                        <td>{item.cantidad}</td>
                                        <td>{item.medida.nombre}</td>
                                    </tr>)
                            }
                        </tbody>
                    </table>
                </div>
                {/* {lista.map((item,index)=>
                <li>{item.insumos.codigoInsumo} - {item.insumos.nombre} - {item.cantidad} - {item.medida.nombre}</li>)} */}
            </div>
        </Fragment>
    )
}
export default Pedido;
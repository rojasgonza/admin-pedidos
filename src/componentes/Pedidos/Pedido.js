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
            <div className='col-sm-12 mt-2'>

                <ReactHtmlTableToExcel
                    id="botonExport"
                    table="tablaPedido"
                    filename={`${local.nombre} ${pedidos.fecha}`}
                    className="btn btn-success"
                    sheet='pagina1'
                    buttonText='Excel'
                />
                    <input type="button" className="btn btn-success m-2"  value="Imprimir" onClick={() => { window.print('#tablaPedido') }} />

                <h2>Pedido para: {local.nombre} - {pedidos.fecha}</h2>
                <div className='mt-2'>

                    <table className='table table-bordered' id='tablaPedido'>

                        <thead>
                            <tr>
                                <th colSpan={2}>Local: {local.nombre}</th>
                                <th colSpan={3}>Fecha: {pedidos.fecha}</th>

                            </tr>
                            <tr>
                                <th colSpan={5}>Empleado: {empleado.nombre} {empleado.apellido}</th>
                            </tr>
                            <tr>
                                <th colSpan={5}>Aclaraciones: {pedidos.aclaraciones}</th>
                            </tr>
                            <tr>
                                <th>Codigo sistema</th>
                                <th>Nombre</th>
                                <th>Cantidad</th>
                                <th>Unidad</th>
                                <th>Nota</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                lista.map((item, index) =>
                                    <tr key={index}>
                                        <th className='mt-1 mb-1 pt-1 pb-1'>{item.insumos.codigoInsumo}</th>
                                        <td className='mt-1 mb-1 pt-1 pb-1'>{item.insumos.nombre}</td>
                                        <td className='mt-1 mb-1 pt-1 pb-1'>{item.cantidad}</td>
                                        <td className='mt-1 mb-1 pt-1 pb-1'>{item.medida.nombre}</td>
                                        <td className='mt-1 mb-1 pt-1 pb-1'></td>

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
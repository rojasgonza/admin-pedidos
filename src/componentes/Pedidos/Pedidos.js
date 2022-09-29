import React, { useState, useEffect, Fragment } from 'react'
import clienteAxios from '../../config/axios';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
function Pedidos() {

    const [pedidos, guardarPedidos] = useState([]);

    //2-funcion para mostrar fetch
    const consultarApi = async () => {

        const pedidosConsulta = await clienteAxios.get('/pedidos');

        guardarPedidos(pedidosConsulta.data)

    }
    useEffect(() => {
        consultarApi()
    }, [pedidos]);
    const columns = [
        {
            name: 'Dia',
            selector: row => row.fecha,
            sortable: true
        },
        {
            name: 'Local',
            selector: row => row.local.nombre,
            sortable: true
        },
        {
            name: 'Empleado',
            selector: row => row.empleado.nombre
        },
        {
            name: 'Borrar',
            cell: (row) => <button className='btn btn-danger' onClick={() => eliminarPedido(row._id)} >Borrar</button>
        },
        {
            name: 'Ver',
            cell: (row) => <Link to={`/pedidos/${row._id}`} type="button" className="btn btn-primary">Ver</Link>
        }
    ]
    const eliminarPedido = _id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                clienteAxios.delete(`/pedidos/${_id}`)
                .then(res =>{
                    Swal.fire(
                        'Deleted!',
                       res.data.mensaje,
                        'success'
                      )
                })
            }
          })
    };
    return (
        <Fragment>

            <h1>Pedidos</h1>
            <DataTable columns={columns}
                data={pedidos}
                pagination
                fixedHeader
                pedidos={pedidos}
                highlightOnHover
                fixedHeaderScrollHeight='450px'

            />
        </Fragment>

    )
}
export default Pedidos;
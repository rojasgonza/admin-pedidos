import React, { Fragment, useEffect, useState } from 'react';
import clienteAxios from '../../config/axios';
import { Link, useNavigate } from 'react-router-dom';
import DataTable, { createTheme } from 'react-data-table-component';
import Swal from 'sweetalert2';
function Empleados() {
  const navigate = useNavigate();

  //1-configurar hooks
  const [empleados, guardarEmpleados] = useState([]);
  //2-funcion para mostrar fetch
  const consultarApi = async () => {

    const empleadosConsulta = await clienteAxios.get('/empleados');

    guardarEmpleados(empleadosConsulta.data)

  }
  useEffect(() => {
    consultarApi()
  }, [empleados]);

  //3-configuar columns
  const columns = [
    {
      name: 'Nombre',
      selector: row => row.nombre,
      sortable: true
    },
    {
      name: 'Apellido',
      selector: row => row.apellido,
      sortable: true
    },
    {
      name: 'Cargo',
      selector: row => row.cargo
    },
    {
        name: 'Email',
        selector: row => row.email
      },
    {
      name:'Borrar',
      cell: (row) => <button className='btn btn-danger' onClick={()=>eliminarEmpleado(row._id)} >Borrar</button>
    },
    {
      name:'Editar',
      cell: (row) => <Link to={`/empleados/editar/${row._id}`} type="button" className="btn btn-primary">Editar</Link>
    }
  ]
  //4- renderizar

  //5- borrar elemento
  const eliminarEmpleado = _id => {
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
            clienteAxios.delete(`/empleados/${_id}`)
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
      <h1>Empleados</h1>
        <DataTable columns={columns}
        data={empleados}
        pagination
        fixedHeader
        empleados={empleados}
        actions={
          <Link className='btn btn-success' to="/nuevo-empleado">Nuevo</Link>
        }
        highlightOnHover
        fixedHeaderScrollHeight='450px'
     
        />
    </Fragment>
  )
}

export default Empleados;
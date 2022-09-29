import React, { Fragment, useEffect, useState } from 'react';
import clienteAxios from '../../config/axios';
import { Link, useNavigate } from 'react-router-dom';
import DataTable, { createTheme } from 'react-data-table-component';
import Swal from 'sweetalert2';
function Locales() {
  const navigate = useNavigate();

  //1-configurar hooks
  const [locales, guardarLocales] = useState([]);
  //2-funcion para mostrar fetch
  const consultarApi = async () => {

    const localesConsulta = await clienteAxios.get('/locales');

    guardarLocales(localesConsulta.data)

  }
  useEffect(() => {
    consultarApi()
  }, [locales]);

  //3-configuar columns
  const columns = [
    {
      name: 'Nombre',
      selector: row => row.nombre,
      sortable: true
    },
    {
      name: 'Direccion',
      selector: row => row.direccion,
      sortable: true
    },
    {
      name: 'Telefono',
      selector: row => row.telefono
    },
    {
      name:'Borrar',
      cell: (row) => <button className='btn btn-danger' onClick={()=>eliminarLocal(row._id)} >Borrar</button>
    },
    {
      name:'Editar',
      cell: (row) => <Link to={`/locales/editar/${row._id}`} type="button" className="btn btn-primary">Editar</Link>
    }
  ]
  //4- renderizar

  //5- borrar elemento
  const eliminarLocal = _id => {
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
            clienteAxios.delete(`/locales/${_id}`)
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
      <h1>Locales</h1>
        <DataTable columns={columns}
        data={locales}
        pagination
        fixedHeader
        locales={locales}
        actions={
          <Link className='btn btn-success' to="/nuevo-local">Nuevo</Link>
        }
        highlightOnHover
        fixedHeaderScrollHeight='450px'
     
        />
    </Fragment>
  )
}

export default Locales;
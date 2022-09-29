import React, { Fragment, useEffect, useState } from 'react';
import clienteAxios from '../../config/axios';
import { Link, useNavigate } from 'react-router-dom';
import DataTable, { createTheme } from 'react-data-table-component';
import Swal from 'sweetalert2';
function Insumos() {
  const navigate = useNavigate();

  //1-configurar hooks
  const [insumos, guardarInsumos] = useState([]);
  //2-funcion para mostrar fetch
  const consultarApi = async () => {

    const insumosConsulta = await clienteAxios.get('/insumos');

    guardarInsumos(insumosConsulta.data)

  }
  useEffect(() => {
    consultarApi()
  }, [insumos]);

  //3-configuar columns
  const columns = [
    {
      name: 'ID',
      selector: row => row.codigoInsumo,
      sortable: true
    },
    {
      name: 'Nombre',
      selector: row => row.nombre,
      sortable: true
    },
    {
      name:'Borrar',
      cell: (row) => <button className='btn btn-danger' onClick={()=>eliminarInsumo(row._id)} >Borrar</button>
    },
    {
      name:'Editar',
      cell: (row) => <Link to={`/insumos/editar/${row._id}`} type="button" className="btn btn-primary">Editar</Link>
    }
  ]
  //4- renderizar

  //5- borrar elemento
  const eliminarInsumo = _id => {
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
            clienteAxios.delete(`/insumos/${_id}`)
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
      <h1>Insumos</h1>
        <DataTable columns={columns}
        data={insumos}
        pagination
        fixedHeader
        insumos={insumos}
        actions={
          <Link className='btn btn-success' to="/nuevo-insumo">Nuevo</Link>
        }
        highlightOnHover
        fixedHeaderScrollHeight='450px'
     
        />
    </Fragment>
  )
}

export default Insumos;
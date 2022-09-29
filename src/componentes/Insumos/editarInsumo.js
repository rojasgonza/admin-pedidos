import React, { Fragment, useState, useEffect } from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import {useNavigate, useParams } from 'react-router-dom';
function EditarInsumo() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [insumo, datosInsumos] = useState({
        codigoInsumo: '',
        nombre: ''
    });
    const consultarAPI = async () => {
        const insumosConsulta = await clienteAxios.get(`/insumos/${id}`);

        //colocar datos en el state

        datosInsumos(insumosConsulta.data);
    }
    useEffect(() => {
        consultarAPI()
    }, []);

    const actualizarState = e => {
        datosInsumos({
            ...insumo,
            [e.target.name]: e.target.value
        })
    }

    //agregar insumo
    const actualizarInsumo = e => {
        e.preventDefault();
        /// enviar peticion 
        clienteAxios.put(`/insumos/${insumo._id}`, insumo)
            .then(res => {
                if (res.data.code === 11000) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Hubo un error',
                        text: 'Error en la carga de insumo'
                    })
                } else {
                    Swal.fire(
                        'Bien hecho!',
                        res.data.mensaje,
                        'success'
                    )

                }
                navigate('/insumos')
            })


    }

    return (
        <Fragment>
            <div className='col-md-6'>
                <h2>Editar Insumo</h2>

                <form onSubmit={actualizarInsumo}>
                    <label className="form-label" >Codigo</label>
                    <input className="form-control" value={insumo.codigoInsumo} name="codigoInsumo" onChange={actualizarState} />
                    <label className="form-label" >Nombre</label>
                    <input className="form-control" value={insumo.nombre} name="nombre" onChange={actualizarState} />

                    <button type="submit" className="btn btn-success mt-2" name="submit" id="submit" >Enviar form</button>
                </form>
            </div>
        </Fragment>
    )
}
export default EditarInsumo;
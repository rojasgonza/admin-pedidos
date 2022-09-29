import React, { useState, useEffect, Fragment, useRef } from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select'

function NuevoPedido() {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [insumos, guardarInsumos] = useState([]);
    const [empleados, guardarEmpleados] = useState([]);
    const [locales, guardarLocales] = useState([]);
    const [medida, guardarMedidas] = useState([]);
    const consultarApi = async () => {
        const localesConsulta = await clienteAxios.get('/locales');
        const empleadosConsulta = await clienteAxios.get('/empleados');
        const insumosConsulta = await clienteAxios.get('/insumos');
        const medidasConsulta = await clienteAxios.get('/medidas');
        guardarMedidas(medidasConsulta.data);
        guardarEmpleados(empleadosConsulta.data);
        guardarLocales(localesConsulta.data);
        guardarInsumos(insumosConsulta.data);
    }
    const inputRef = useRef(null);

    const agregarItem = e => {
        e.preventDefault();
        var valor = selectedOption;
        var valorNombre = selectedOptionName;
        var medidaSelectedMayor = document.getElementById('medida');
        var cantidad = document.getElementById('cantidad').value;
        var valorMedida = medidaSelectedMayor.options[medidaSelectedMayor.selectedIndex].value;
        var valorMedidaNombre = medidaSelectedMayor.options[medidaSelectedMayor.selectedIndex].text;
        const insumoFinal = {
            "insumos": valor,
            "nombre": valorNombre,
            "medida": valorMedida,
            "nombreMed": valorMedidaNombre,
            "cantidad": cantidad
        }
        setCart([...cart, insumoFinal]);
        inputRef.current.value = "";

    }

    useEffect(() => {
        consultarApi()
    }, []);

    const realizarPedido = async e => {
        e.preventDefault();
        var fecha = document.getElementById('fecha').value;
        var empleado = document.getElementById('empleado');
        var empleadoValor = empleado.options[empleado.selectedIndex].value;
        var local = document.getElementById('local')
        var localValor = local.options[local.selectedIndex].value;
        var aclaraciones = document.getElementById('aclaraciones').value;
        const pedidoEnviar = {
            "fecha": fecha,
            "empleado": empleadoValor,
            "local": localValor,
            "aclaraciones": aclaraciones,
            "lista": cart
        }
        if (!cart.length && fecha === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'QUE CARAJOS QUERES CARGAR?',
            })
        } else if (!cart.length) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'INGRESAR INSUMOS EN EL PEDIDO',
            })
        } else if (fecha === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'INGRESAR FECHA',
            })
        }
        else {
            Swal.fire({
                title: 'Se cargo todo lo necesario?',
                text: "Revisar pedido antes de enviar!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Cargar pedido!'
            }).then((result) => {
                if (result.isConfirmed) {
                    clienteAxios.post('/pedidos', pedidoEnviar)
                        .then(res => {
                            Swal.fire(
                                'success',
                                res.data.mensaje,
                                'success'
                            )
                        })
                    navigate('/pedidos')

                }
            })
        }
    }


    const DeleteItems = (indexItem) => {
        setCart((cart) =>
            cart.filter((todo, index) => index !== indexItem));
    };


    let options = insumos.map(elemento => {
        return { value: `${elemento._id}`, label: `${elemento.nombre}` };
    });

    const [selectedOption, setSelectedOption] = useState("none");
    const [selectedOptionName, setSelectedOptionName] = useState("none");


    const handleTypeSelect = e => {
        setSelectedOption(e.value);
        setSelectedOptionName(e.label)
    };


    return (
        <Fragment>
            <div className='col-md-12 col-sm-12 d-md-flex'>
                <div className='col-md-6 col-sm-12'>
                    <h1>Nuevo pedido</h1>
                    <form>
                        <label className='form-label'>Fecha</label>
                        <input type="date" id="fecha" placeholder="dd-mm-yyyy" min="2022-01-01" max="2030-12-31" name='fecha' className='form-control' />

                        <label className='form-label'>Local</label>
                        <select id='local' name='local' className='form-control' placeholder='seleccionar uno'>
                            {locales.map((local, index) =>
                                <option value={local._id} key={index}>{local.nombre}</option>)};
                        </select>

                        <label className='form-label'>Empleado</label>
                        <select id='empleado' name="empleado" className='form-control'>
                            {empleados.map((empleado, index) =>
                                <option value={empleado._id} key={index}>{empleado.nombre}</option>)};
                        </select>

                        <label className='form-label'>Aclaraciones</label>
                        <textarea autoComplete='off' id='aclaraciones' name='aclaraciones' className='form-control' placeholder='Aclaraciones sobre el pedido' />


                        <div className='d-flex col-md-12 justify-content-around mt-3 m-0 p-0'>
                            <div className='col-6 p-0 m-0'>
                                <label>Insumos</label>
                                <div>
                                    <Select
                                        options={options}
                                        onChange={handleTypeSelect}
                                        value={options.filter(function (option) {
                                            return option.value === selectedOption;
                                        })}
                                        label={options.filter(function (option) {
                                            return option.label === selectedOptionName;
                                        })} />
                                </div>
                            </div>
                            <div className='col p-0 m-0'>
                                <label>Medida</label>
                                <select className='form-control' id='medida'>
                                    {medida.map((medida, index) =>
                                        <option key={index + 1} value={medida._id}>{medida.nombre}</option>
                                    )}</select>
                            </div>
                            <div className='col p-0 m-0'>
                                <label className=''>Cantidad</label>
                                <input type="number" ref={inputRef} className='form-control' name='cantidad' id='cantidad' autoComplete='off' />
                            </div>
                        </div>
                        <button className='btn btn-info mt-2' onClick={agregarItem}>Agregar</button>
                    </form>
                </div>
                <div className='col-md-6 col-sm-12 mt-5'>
                    <h2>Lista</h2>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>Cod</th>
                                <th>Nombre</th>
                                <th>Cantidad</th>
                                <th>Medida</th>
                                <th>Accion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(!cart.length) ? 'INGRESAR PRODUCTOS' : ''}
                            {
                                cart.map((item, index) =>
                                    <tr key={index}>
                                        <th className='mt-0 mb-0 pt-0 pb-0'>{index}</th>
                                        <td className='mt-0 mb-0 pt-0 pb-0'>{item.nombre}</td>
                                        <td className='mt-0 mb-0 pt-0 pb-0'>{item.cantidad}</td>
                                       <td className='mt-0 mb-0 pt-0 pb-0'>{item.nombreMed}</td>
                                        <td className='mt-0 mb-0 pt-0 pb-0'>
                                            <button
                                                className='btn btn-danger mt-0 mb-0 pt-0 pb-0'
                                                onClick={() => DeleteItems(index)}
                                            >Borrar</button>
                                        </td>
                                    </tr>)
                            }
                        </tbody>

                    </table>
                    <form onSubmit={realizarPedido} >
                        <button className='btn btn-info mt-2' type='submit'>Enviar</button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}
export default NuevoPedido; 
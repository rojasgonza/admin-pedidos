import React, { useState, useEffect, Fragment } from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
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

    const agregarItem = e => {
        e.preventDefault();
        var valorInusmo = document.getElementById('insumo');
        var valor = valorInusmo.options[valorInusmo.selectedIndex].value;
        var valorNombre = valorInusmo.options[valorInusmo.selectedIndex].text;
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
        const resultado = await clienteAxios.post('/pedidos', pedidoEnviar);
        if (resultado.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Enviado el pedido',
                text: 'Se envio correctamente'
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'error al enviar el pedido',
                text: 'NO SE GUARDO'
            })
        }
        navigate('/')
    }

    const DeleteItems = (indexItem) => {
        setCart((cart) =>
            cart.filter((todo, index) => index !== indexItem));
    };
    
    return (
        <Fragment>
            <div className='col-md-12 col-sm-12'>
                <h1>Nuevo pedido</h1>
                <form>
                    <label className='form-label'>Fecha</label>
                    <input type="date" id="fecha" name='fecha' className='form-control' required/>

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


                    <div className='d-flex m-0 col-md-12 justify-content-around mt-3'>
                        <div className='col-md-6'>
                        <label className='form-label'>Insumos</label>
                        <select className='form-control insumo' id='insumo'>
                            {insumos.map((insumo, index) =>
                                <option value={insumo._id} key={index}>{insumo.nombre}</option>)}
                        </select>
                        </div>
                        <div className='col-md-4'>
                        <label className='form-label'>Medida</label>
                        <select className='form-control' id='medida'>
                            {medida.map((medida, index) =>
                                <option key={index + 1} value={medida._id}>{medida.nombre}</option>
                            )}</select>
                        </div>
                        <div>    
                        <label className='form-label'>Cantidad</label>
                        <input type="number" className='form-control' name='cantidad' id='cantidad' autoComplete='off' />
                        </div>
                    </div>
                    <button className='btn btn-info mt-2' onClick={agregarItem}>Agregar</button>
                </form>
            </div>
            <div className=' mt-5'>
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>cod</th>
                            <th>nombre</th>
                            <th>cantidad</th>
                            <th>medida</th>
                            <th>actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((item, index) =>
                                <tr key={index}>
                                    <th>{index}</th>
                                    <td>{item.nombre}</td>
                                    <td>{item.cantidad}</td>
                                    <td>{item.nombreMed}</td>
                                    <td>
                                        <button
                                            className='btn btn-danger'
                                            onClick={() => DeleteItems(index)}
                                        >Borrar</button>
                                    </td>
                                </tr>)
                        }
                    </tbody>

                </table>
                <form onSubmit={realizarPedido}>
                    <button className='btn btn-info mt-2' type='submit'>enviar</button>
                </form>
            </div>
        </Fragment>
    )
}
export default NuevoPedido; 
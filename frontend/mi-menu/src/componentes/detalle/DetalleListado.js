import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import axios from 'axios';


export function DetalleListado() {
  const { id } = useParams()
  const [listap, setListap] = useState([])
  const [productos, setProductos] = useState([])
  const [adicion, setAdicion] = useState({
    mesa: 0,
    porcentaje_venta: 0,
    nro_mozo: 0,
    fecha: "YYYY-mm-dd",
    numero: 0,
    cerrada: false
  })
  var total = 0;

  const history = useHistory()

  useEffect(() => {
    getLista()
  }, [])

  function getLista() {
    axios.get("http://localhost:5000/productos/")
    .then((response) => {
      setProductos(response.data.filter(producto => producto.codigo != null))
      axios.get("http://localhost:5000/detalle/")
      .then((response) => setListap(response.data.filter(d => d.adicion_numero != null && d.adicion_numero == id)))
      .catch((error) => alert(error))
      // axios.get(`http://localhost:5000/adiciones/${id}`)
      // .then(response => setAdicion(response.data))
      // .catch((error) => alert(error))
      })
    .catch((error) => alert(error))
    if(id){
      axios.get(`http://localhost:5000/adiciones/${id}`)
      .then(response => setAdicion(response.data))
      .catch((error) => alert(error))
      console.log(id)
    }
  }

  function subTotal (cantidad, costo, porcentaje_ganancia) {
    let xtotal;
    xtotal = cantidad * (costo + (costo*((porcentaje_ganancia + adicion.porcentaje_venta)/100)));
    total += xtotal;
    return xtotal;
  }

  function borrar(id) {
    axios.delete(`http://localhost:5000/detalle/${id}`)
      .then((response) => {
        console.log(id)
        getLista()
      })
      .catch(error => alert(error))
  }


  return (
    <>
      <div className="row justify-content-between">
        <h2 className="col-2">Detalle</h2>
        {!adicion.cerrada && <Link className="btn btn-primary col-1 w-auto pl-5" to={`/producto/${id}`}>+</Link>}
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Cantidad</th>
            <th>Producto</th>
            <th>Precio Unitario</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {listap.length > 0 && (
            listap.map(item => (
              <tr key={item.id}>
                <td>{item.cantidad}</td>
                <td>{productos.find(cod => cod.codigo == item.producto_codigo).nombre}</td>
                <td>{productos.find(cod => cod.codigo == item.producto_codigo).precio_unitario}</td> 
                <td>
                    ${subTotal(
                        item.cantidad, 
                        productos.find(cod => cod.codigo == item.producto_codigo).costo, 
                        productos.find(cod => cod.codigo == item.producto_codigo).porcentaje_ganancia)
                    }
                </td>
                <td>
                  {!adicion.cerrada && <button type="button" className="btn btn-danger" onClick={() => borrar(item.id)}>-</button>}
                </td>
              </tr>))
          )}
          { listap.length > 0 && <>
            <tr>
              <td>Total: </td>
              <td></td>
              <td></td>
              <td>${total}</td>
            </tr>
          </>}
          {listap.length === 0 && (
            <tr>
              <td colSpan="3">
                <h2>No hay datos</h2>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  )
}

import React, { useContext, useEffect, useState } from 'react';
import {AuthContext} from '../../auth/AuthContext';
import { obtenerTodos } from '../../services/public/DelitoService';
import { crear } from '../../services/private/CasoService';
import Swal from 'sweetalert2';
import { messages } from '../../utils/messages';
import '../../index.css';
import MapEdit from '../maps/MapEdit';

export default function Reportar() {

 const [loading, setLoading] = useState(false);

 const {user: {user}} = useContext(AuthContext);

 const [delitos, setDelitos] = useState([]);

 const [errors, setErrors] = useState({
    mapa:'',
    descripcion: '',
    delito: ''
  });

  const [caso, setCaso] = useState({
    latitud: 0,
    longitud: 0,
    altitud: 0,
    visible: true,
    descripcion: '',
    urlMap: '',
    rmiUrl: '',
    usuario_id: user.id_usuario,
    delito_id: 0
  });

  useEffect(() => {
    async function cargarDelitos() {
        const response = await obtenerTodos();
        const body = await response.data;
        setDelitos(body);   
    }
    cargarDelitos();
  }, []);

  const _onClickMap = (e, mapSt) => {

    const location = {lat: e.lat, lng: e.lng};

    caso.latitud = location.lat;
    caso.longitud = location.lng;
    caso.rmiUrl = mapSt.rmiUrl
    caso.urlMap = mapSt.mapUrl

    setCaso({...caso});

      setTimeout(() => {
        console.log(caso)
      }, 1000)
  }  


  const handleValidation = () => {
    let errors = {};
    let isValid = true;
    if(!caso.descripcion){
        isValid = false;
        errors["descripcion"] = "Descripción requerida";
    }else{
        errors["descripcion"] = "";
    }
    //mapa
    if(!caso.urlMap){
        isValid = false;
        errors["mapa"] = "Ubique un punto en el mapa";
    }else{
        errors["mapa"] = "";
    }
   // delito
   if(!caso.delito_id){
        isValid = false;
        errors["delito"] = "Seleccione delito";
    }else{
        errors["delito"] = "";
    }
   setErrors({...errors});
   return isValid;
}
  const sendRegister = e => {
    e.preventDefault();
    if(handleValidation()){
        setLoading(true);
        crear(caso)
        .then(r => {
            console.log(r);
            setCaso({
                latitud: 0,
                longitud: 0,
                altitud: 0,
                descripcion: '',
                urlMap: '',
                rmiUrl: '',
                delito_id: 0
            });
            setLoading(false);
            return Swal.fire('OK', messages.REG_EXITOSO, 'success');
        })
        .catch(e => {
            setLoading(false);
            console.log(e);
            return Swal.fire('Error', messages.ERROR_REGISTRO_CASO, 'error');
        });   
    } 
  };

  const handleChange = e => {
    setCaso({
        ...caso,
        [e.target.name]: e.target.value
    });
  };

  const handleChangeDelito = e => {
    setCaso({
        ...caso,
        delito_id: e.target.value,
    });
  };

  return (
    <div className="container">
      <div className="col-md-12 col-lg-12 mb-6">
        <h1 className="d-none">1</h1>
        <h2 className="d-none">2</h2>
        <h3 className="d-none">3</h3>
        <h4 className="mb-3">Reportar caso</h4>
        <form 
         className="needs-validation" 
         onSubmit={sendRegister}
        >
        <div className="row clear">
          <div className="col-12">
              <div className="invalid-feedback d-block">
                  {errors.mapa}
              </div>
            <div style={{ height: '100vh', width: '100%'}}>
              <MapEdit onClickMap={_onClickMap}/>
            </div>
            <div className="invalid-feedback d-block">
              {errors.mapa}
            </div>
          </div>
        </div>
        <div className="row my-4">
            <div className="col-sm-6 col-lg-6">
                <label htmlFor="delito" className="form-label">Delito<span className="text-muted">*</span></label>
                <select 
                    className="form-control" 
                    id="delito_id" 
                    required=""
                    name="delito_id"
                    onChange={handleChangeDelito}
                >
                    <option value=""> -- Selecciona delito -- </option>
                    {delitos.map((d) => <option key={d.id+1} value={d.id}>{d.nombre}</option>)}
                </select>
                <div className="invalid-feedback d-block">
                {errors.delito}
                </div>
            </div>
            <div className="col-sm-6">
            <label htmlFor="nombre" className="form-label">Descripción<span className="text-muted">*</span></label>
            <input 
                type="text" 
                className="form-control" 
                id="descripcion"
                placeholder="Descripción breve" 
                required=""
                name="descripcion"
                value={caso.descripcion}
                onChange={handleChange}
                />
                <div className="invalid-feedback d-block">
                {errors.descripcion}
                </div>
            </div>
            <hr className="my-1"/>

            <button 
                disabled={loading ? 1: 0}
                className="w-50 btn btn-primary btn-lg button-standard"
                type="submit"
            >
            {loading && (
              <span 
               className="spinner-border spinner-border-sm" 
               role="status" 
               aria-hidden="true"
              >
              </span>
            )}
            Enviar
            </button>
        </div>
        </form>

        </div>
      </div>
  );

}
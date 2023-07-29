import React, { useState } from 'react';
import { register } from '../../services/UserService';
import {messages} from '../../utils/messages';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

export default function Register() {

    const today = (o) => {
        var now = new Date();
        var d = String(now.getDate()).padStart(2, '0');
        var m = String(now.getMonth() + 1).padStart(2, '0');
        var y = now.getFullYear() - o;
        now = y+'-'+m+'-'+d;
        return now;
    }

    const [controls ] = useState({
        maxDate: today(0),
        minDate: today(110)
    });

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        nombre: '',
        apellido: '',
        username: '',
        password: '',
        fechaNacimiento:'',
        roles: [{
            id: 2
        }],
        enabled: true,
        redSocial: false,
        image: 'https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg',
    });

    const [errors, setErrors] = useState({
        nombre: '',
        apellido: '',
        username: '',
        password: '',
        fechaNacimiento:'',
    });

    const [terms, setTerms] = useState(false);
    
    const changeTerms = () => {
        setTerms(!terms);
    };

    const handleValidation = () => {
        let errors = {};
        let isValid = true;
        if(!user.nombre){
            isValid = false;
            errors["nombre"] = "Nombre requerido";
        }else{
            errors["nombre"] = "";
        }
        //apellido
        if(!user.apellido){
            isValid = false;
            errors["apellido"] = "Apellido requerido";
        }else{
            errors["apellido"] = "";
        }
        //Email
        if(!user.username){
            isValid = false;
            errors["username"] = "Email requerido";
        }else
        if(typeof user.username !== "undefined" && user.username!==''){
           let lastAtPos = user.username.lastIndexOf('@');
           let lastDotPos = user.username.lastIndexOf('.');

           if (!(lastAtPos < lastDotPos && lastAtPos > 0 
            && user.username.indexOf('@@') === -1 
            && lastDotPos > 2 
            && (user.username.length - lastDotPos) > 2)) {
              isValid = false;
              errors["username"] = "Email no válido";
            }
       }else{
            errors["username"] = "";
       }  
       // password
       if(!user.password){
            isValid = false;
            errors["password"] = "Contraseña requerida";
        }else{
            errors["password"] = "";
        }
        //fecha Nac.
        if(!user.fechaNacimiento){
            isValid = false;
            errors["fechaNacimiento"] = "Fecha requerida";
        }else{
            errors["fechaNacimiento"] = "";
        }
       setErrors({...errors});
       return isValid;
   }

   const sendRegister = e => {
        e.preventDefault();
        setLoading(true);
        if(handleValidation()){
            register(user)
            .then(r => {
                let user = {
                    nombre: '',
                    apellido: '',
                    username: '',
                    password: '',
                    fechaNacimiento:'',
                    roles: [{
                        id: 2
                    }],
                    enabled: true,
                    redSocial: false,
                    image: 'https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg',
                }
                setUser({...user});
                setTerms(false);
                e.target[5].checked = false;
                setLoading(false);
                return Swal.fire('OK', messages.REG_EXITOSO, 'success');
            })
            .catch(e => {
                const {data} = e.response;
                console.log(data);
                setLoading(false);
                if(data.message)
                    return Swal.fire('Error', data.message, 'error');
                return Swal.fire('Error', messages.ERROR_REGISTRO, 'error');
            });   
        } 
    };

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div className="container">
            <div className="col-md-7 col-lg-8 my-3">
                <h1 className="d-none">1</h1>
                <h2 className="d-none">2</h2>
                <h3 className="d-none">3</h3>
                <h4 className="mb-3">Regístrate</h4>
                <form 
                className="needs-validation" 
                onSubmit={sendRegister}
                autocomplete="off"
                >
                    <div className="row g-3">
                        <div className="col-sm-6">
                        <label htmlFor="nombre" className="form-label">Nombre<span className="text-muted">*</span></label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="nombre"
                            placeholder="Juanito" 
                            required=""
                            name="nombre"
                            value={user.nombre}
                            onChange={handleChange}
                        />
                        <div className="invalid-feedback d-block">
                            {errors.nombre}
                        </div>
                        </div>

                        <div className="col-sm-6">
                        <label htmlFor="apellido" className="form-label">Apellido<span className="text-muted">*</span></label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="apellido" 
                            placeholder="Doe" 
                            required=""
                            name="apellido"
                            value={user.apellido}
                            onChange={handleChange}
                        />
                        <div className="invalid-feedback d-block">
                            {errors.apellido}
                        </div>
                        </div>

                        <div className="col-12">
                        <label htmlFor="username" className="form-label">Email <span className="text-muted">*</span></label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="username" 
                            placeholder="you@example.com"
                            name="username"
                            value={user.username}
                            onChange={handleChange}
                            autoComplete="off"
                        />
                        <div className="invalid-feedback d-block">
                            {errors.username}
                        </div>
                        </div>

                        <div className="col-12">
                        <label htmlFor="password" className="form-label">Contraseña<span className="text-muted">*</span></label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="password" 
                            placeholder="" 
                            required=""
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            autocomplete="off"
                        />
                        <div className="invalid-feedback d-block">
                            {errors.password}
                        </div>
                        </div>

                        <div className="col-12">
                        <label htmlFor="fechaNacimiento" className="form-label">Fecha de Nacimiento <span className="text-muted">*</span></label>
                        <input 
                            max={controls.maxDate}
                            min={controls.minDate}
                            type="date" 
                            className="form-control" 
                            id="fechaNacimiento" 
                            name="fechaNacimiento"
                            value={user.fechaNacimiento}
                            onChange={handleChange}
                        />
                        <div className="invalid-feedback d-block">
                            {errors.fechaNacimiento}
                        </div>
                        </div>
                    </div>

                    <hr className="my-4"/>

                    <div className="form-check">
                        <input 
                            type="checkbox" 
                            className="form-check-input" 
                            id="save-info"
                            onChange={changeTerms}
                        />
                        <label className="form-check-label" htmlFor="save-info">Aceptar <a href="https://iudigital.edu.co"> términos y condiciones </a></label>
                    </div>

                    <hr className="my-4"/>                    
                    <button
                        disabled={loading ? 1: 0 || !terms}
                        type="submit"
                        className="btn btn-primary w-50 btn-lg button-standard"
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
                </form>
                <Link to="/login">
                    <p>¿Ya estás registrado?</p>
                </Link>
            </div>
        </div>
    )
}

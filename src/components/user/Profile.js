import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { getUserById, edit, uploadImage } from '../../services/private/UserProfileService';
import {messages} from '../../utils/messages';
import './Profile.css';
import PropTypes from 'prop-types';

const urlImg = process.env.REACT_APP_URL_IMG;
const defaultImg = urlImg+'/default.png';
const initialUser = {
    nombre: '',
    apellido: '',
    fechaNacimiento:'',
    image: '',
    imageSrc: ''
}
export default function Profile() {
    const [off] = useState('off')
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(initialUser);
    const [errors, setErrors] = useState({
        nombre: '',
        apellido: '',
        password: '',
        fechaNacimiento:'',
    });

    const [loadingImg, setLoadingImg] = useState(true);

    useEffect(() => {
        const img = new Image();
        img.src = user.imageSrc;
        img.onload = () => {
            setLoadingImg(false);
        };
    }, [user.imageSrc]);
    
    useEffect(() => {
        let isMounted = true;  
        const getUser = () => {
            getUserById().then(r => {
                if(r.roles)delete(r.roles)
                let user = r;
                if(!r.image){
                    user["imageSrc"] = defaultImg;
                }
                else if(r.image.startsWith("http")){
                    user["imageSrc"] = r.image;
                }else{
                    user["imageSrc"] = urlImg+'/'+r.image;
                }
                if (isMounted){
                    setUser({...user});
                } 
        })
        .catch(e => {
            console.log(e)
        })
        
    }

    getUser();
        return () => { isMounted = false };
    }, []);

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
            edit(user)
            .then(r => {
                setUser({...user});
                e.target[5].checked = false;
                setLoading(false);
                return Swal.fire('OK', messages.CHANGE_EXITOSO, 'success');
            })
            .catch(e => {
                const {data} = e.response;
                setLoading(false);
                if(data.message)
                    return Swal.fire('Error', data.message, 'error');
                return Swal.fire('Error', messages.ERROR_MODIFICAR, 'error');
            });   
        } 
    };

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const handleFile = e => {
        e.preventDefault();
        setLoading(true);
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        user.image = file;
        user.imageSrc = url;
        setUser({...user});
        uploadImage(file)
        .then(r => {
            setLoading(false);
        })
        .catch(e => {
            setLoading(false);
            console.log(e);
        })
    }

    return (
        <div className="container">
            <div className="col-md-7 col-lg-8 my-3">
                <label id="labelimage">
                    <img src={user.imageSrc} alt="Imagen de perfil" className="avatar"/>
                    {(loading || loadingImg) && (
                    <div className="spinner-grow spinner-grow-lg" role="status">
                        <span className="sr-only"></span>
                    </div>
                    )}
                    <div id="camera">
                        <i className="fas fa-camera"></i>
                    </div>
                    
                    <input type="file" accept="image/*" id="fileimage" onChange={handleFile}/>
                </label>
                
            <form 
                className="needs-validation" 
                onSubmit={sendRegister}
                autoComplete={off}
                >
                    <div className="row g-3">
                        <div className="col-sm-6">
                        <label htmlFor="nombre" className="form-label">Nombre<span className="text-muted">*</span></label>
                        <input 
                            autoComplete="off"
                            type="text" 
                            className="form-control" 
                            id="nombre"
                            placeholder="Juanito" 
                            required="1"
                            name="nombre"
                            value={user.nombre || ''}
                            onChange={handleChange}
                        />
                        <div className="invalid-feedback d-block">
                            {errors.nombre}
                        </div>
                        </div>

                        <div className="col-sm-6">
                        <label htmlFor="apellido" className="form-label">Apellido<span className="text-muted">*</span></label>
                        <input 
                            autoComplete="off"
                            type="text" 
                            className="form-control" 
                            id="apellido" 
                            placeholder="Doe" 
                            required=""
                            name="apellido"
                            value={user.apellido || ''}
                            onChange={handleChange}
                        />
                        <div className="invalid-feedback d-block">
                            {errors.apellido}
                        </div>
                        </div>

                        <div className="col-12">
                        <label htmlFor="username" className="form-label">Email <span className="text-muted">*</span></label>
                        <input 
                            autoComplete="off"
                            type="email" 
                            className="form-control" 
                            id="username" 
                            placeholder="you@example.com"
                            name="username"
                            value={user.username  || ''}
                            disabled="1"
                        />
                        <div className="invalid-feedback d-block">
                            {errors.username}
                        </div>
                        </div>

                        <div className="col-12">
                        <label htmlFor="password" className="form-label">Contraseña<span className="text-muted">*</span></label>
                        <input 
                            autoComplete="new-password"
                            type="password" 
                            className="form-control" 
                            id="password" 
                            placeholder="" 
                            required=""
                            name="password"
                            value={user.password  || ''}
                            onChange={handleChange}
                        />
                        <div className="invalid-feedback d-block">
                            {errors.password}
                        </div>
                        </div>

                        <div className="col-12">
                        <label htmlFor="fechaNacimiento" className="form-label">Fecha de Nacimiento <span className="text-muted">*</span></label>
                        <input 
                            autoComplete="off"
                            type="date" 
                            className="form-control" 
                            id="fechaNacimiento" 
                            name="fechaNacimiento"
                            value={user.fechaNacimiento || ''}
                            onChange={handleChange}
                        />
                        <div className="invalid-feedback d-block">
                            {errors.fechaNacimiento}
                        </div>
                        </div>
                    </div>
                    <hr className="my-4"/>                    
                    <button
                        disabled={loading ? 1 : 0}
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
            </div>
        </div>
    )
}
Profile.propTypes = {
    loading: PropTypes.bool,
}
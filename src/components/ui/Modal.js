import React from 'react'

export default function Modal({title}) {
    return (
        <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalToggleLabel">{title}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="name" aria-describedby="name"/>
                    <div id="name" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Descripción</label>
                    <input type="text" className="form-control" id="description"/>
                </div>
                
            </form>
            </div>
            <div className="modal-footer">
                <button className="btn btn-primary">Enviar</button>
            </div>
            </div>
        </div>
        </div>
    )
}

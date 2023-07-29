import React from 'react'

export default function NotFound() {
  return (
    <div className="container">
        <h1 className='d-none'>None</h1>
        <h2>404 No Found!</h2>
        <figure className="figure">
        <img width="50%" src="https://memecrunch.com/meme/33SOY/i-found-it/image.jpg?w=640&c=1" className="figure-img img-fluid rounded d-block" alt=""/>
        <figcaption className="figure-caption mx-auto">No se encuentra recurso!</figcaption>
        </figure>
    </div>
  )
}

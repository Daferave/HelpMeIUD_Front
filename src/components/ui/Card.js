import React, { useEffect, useState } from 'react'

export default function Card(props) {
    
    const {title, texto, subtitle, src } = props;

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            setLoading(false);
        };
      }, [src]);
    return (
    <div className="card">
        <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{texto}</p>
            <p className="card-text">
                <small className="text-muted">
                    {subtitle}
                </small>
            </p>
        </div>
        {loading
          ?
          <div class="spinner-border m-5" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          :
          <img 
            {...{ src: '', ...props }}
            alt=""
            className="image"
          />
        }

    </div>
    )
}

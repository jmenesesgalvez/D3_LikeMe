import React from 'react';

function Form({ titulo, setTitulo, imgSrc, setImgSRC, descripcion, setDescripcion, agregarPost }) {
  const handleSubmit = (event) => {
    event.preventDefault(); 
    agregarPost();
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="mb-2">
        <h6>Agregar post</h6>
        <label>Título</label>
        <input
          value={titulo}
          onChange={(event) => setTitulo(event.target.value)}
          className="form-control"
          required
        />
      </div>
      <div className="mb-2">
        <label>URL de la imagen</label>
        <input
          value={imgSrc}
          onChange={(event) => setImgSRC(event.target.value)}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label>Descripción</label> <br />
        <textarea
          value={descripcion}
          onChange={(event) => setDescripcion(event.target.value)}
          className="form-control"
          rows="3"
          required
        ></textarea>
      </div>
      <div className="d-flex">
        <button type="submit" className="btn btn-light m-auto">
          Agregar
        </button>
      </div>
    </form>
  );
}

export default Form;


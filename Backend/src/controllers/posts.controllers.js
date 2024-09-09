const { pool } = require('../db/config');

const asyncHandler = require('express-async-handler');

const darLike = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const consulta = "UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *";
    const values = [id];
    
    try {
        const { rowCount, rows } = await pool.query(consulta, values);
        if (rowCount === 0) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }
        console.log("Like agregado");
        return res.status(200).json(rows[0]);
    } catch (error) {
        console.error("Error al agregar like:", error);
        res.status(500).json({ message: 'Error interno al agregar like' });
    }
});

const agregarPosts = asyncHandler(async (req, res) => {
    const { titulo = 'No Tt', img = '/img-default.jpg', descripcion = 'No Desc' } = req.body;

    try {
        const consulta = "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *";
        const values = [titulo, img, descripcion, 0];
        const { rows } = await pool.query(consulta, values);
        
        res.status(201).json({ message: 'Post agregado', post: rows[0] });
    } catch (error) {
        console.error("Error al agregar post:", error);
        res.status(500).json({ message: 'Error interno al agregar post' });
    }
});

const obtenerPosts = asyncHandler(async (req, res) => {
    try {
        const SQLrequest = "SELECT * FROM posts ORDER BY id DESC";
        const { rows: posts } = await pool.query(SQLrequest);
        
        res.status(200).json(posts);
    } catch (error) {
        console.error("Error al obtener los posts:", error);
        res.status(500).json({ message: 'Error interno al obtener los posts' });
    }
});

const borrarPost = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const consulta = "DELETE FROM posts WHERE id = $1 RETURNING *";
    const values = [id];

    try {
        const { rowCount } = await pool.query(consulta, values);
        if (rowCount === 0) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }
        console.log("Post eliminado");
        res.status(200).json({ message: 'Post eliminado' });
    } catch (error) {
        console.error("Error al eliminar post:", error);
        res.status(500).json({ message: 'Error interno al eliminar post' });
    }
});

module.exports = {
    obtenerPosts,
    darLike,
    agregarPosts,
    borrarPost
};

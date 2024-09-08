const { pool } = require('../db/config');

const darLike = async (id) => {
    const consulta = "UPDATE posts SET likes = likes + 1 WHERE id = $1";
    const values = [id];
    try {
        const result = await pool.query(consulta, values);
        console.log("Like add");
        return result;
    } catch (error) {
        console.error("Error al cargar el like:", error);
        throw error;
    }
};

const agregarPosts = async (req, res) => {
    const { titulo, img, descripcion } = req.body;
    const imgDefault = '/img-default.jpg';
    const titDefault = 'No Tt';  
    const desDefault = 'No Desc'; 

    const imagen = img || imgDefault; 
    const tituloFinal = titulo || titDefault;
    const descripcionFinal = descripcion || desDefault;
  
    try {
        const consulta = "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4)";
        const values = [tituloFinal, imagen, descripcionFinal, 0];
        await pool.query(consulta, values);
        res.status(201).send("Post agregado");
    } catch (error) {
        console.error("Error al agregar:", error);
        res.status(500).send("Error al agregar");
    }
};

const obtenerPosts = async (req, res) => {
    try {
        const SQLrequest = "SELECT * FROM posts ORDER BY id DESC"; 
        const { rows: posts } = await pool.query(SQLrequest);
        res.json(posts);
        console.log(posts);
    } catch (error) {
        console.error("Error al obtener los posts:", error);
        throw error;
    }
};

const borrarPost = async (id) => {
    const consulta = "DELETE FROM posts WHERE id = $1";
    const values = [id];
    try {
        const result = await pool.query(consulta, values);
        console.log("Post eliminado");
        return result;
    } catch (error) {
        console.error("Error al eliminar el post:", error);
        throw error;
    }
};

module.exports = {
    obtenerPosts, 
    darLike, 
    agregarPosts, 
    borrarPost
};

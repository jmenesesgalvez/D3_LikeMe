const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { obtenerPosts, darLike, agregarPosts, borrarPost } = require('../controllers/posts.controllers');

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

router.get('/posts', asyncHandler(obtenerPosts));

router.post('/posts', asyncHandler(agregarPosts));

router.patch('/posts/like/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        await darLike(id);
        res.status(200).json({ message: "Like agregado al post" });
    } catch (error) {
        console.error("Error al dar like al post:", error);
        res.status(500).json({ message: "Error al dar like al post" });
    }
}));

router.delete('/posts/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        await borrarPost(id);
        res.status(200).json({ message: "Post eliminado exitosamente" });
    } catch (error) {
        console.error("Error al eliminar el post:", error);
        res.status(500).json({ message: "Error al eliminar el post" });
    }
}));

module.exports = router;


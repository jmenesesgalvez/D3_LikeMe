const { obtenerPosts, darLike, agregarPosts, borrarPost } = require('../controllers/posts.controllers');
const router = require('express').Router();

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

router.get('/posts', obtenerPosts);
router.post('/posts', agregarPosts);

router.patch('/posts/like/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await darLike(id);
        res.status(200).send("Like agregado al post"); 
    } catch (error) {
        console.error("Error al dar like al post:", error);
        res.status(500).send("Error al dar like al post");
    }
});


router.delete('/posts/:id', async (req, res) => {
    const { id } = req.params; 
    try {
        await borrarPost(id); 
        res.status(200).send("Post eliminado exitosamente"); 
    } catch (error) {
        console.error("Error al eliminar el post:", error);
        res.status(500).send("Error al eliminar el post");
    }
});

module.exports = router;

import axios from "axios";
import { useEffect, useState } from "react";
import Form from "./components/Form";
import Post from "./components/Post";

const urlBaseServer = import.meta.env.VITE_URL_BASE_SERVER;

function App() {
  const [titulo, setTitulo] = useState("");
  const [imgSrc, setImgSRC] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const getPosts = async () => {
    try {
      const { data: posts } = await axios.get(urlBaseServer + "/posts");
      setPosts([...posts]);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const agregarPost = async () => {
    if (!titulo || !imgSrc || !descripcion) {
      setMessage("Todos los campos son obligatorios.");
      setMessageType("error");
      return;
    }
    const post = { titulo, img: imgSrc, descripcion };
    try {
      await axios.post(urlBaseServer + "/posts", post);
      setMessage("Su post ha sido cargado correctamente");
      setMessageType("success");
      getPosts();

      setTitulo("");
      setImgSRC("");
      setDescripcion("");
    } catch (error) {
      setMessage("Su post no pudo ser agregado");
      setMessageType("error");
      console.error("Error adding post:", error);
    }
  };

  const like = async (id) => {
    try {
      await axios.patch(urlBaseServer + `/posts/like/${id}`);
      getPosts();
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const eliminarPost = async (id) => {
    try {
      await axios.delete(urlBaseServer + `/posts/${id}`);
      getPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="App">
      <h2 className="py-5 text-center">&#128248; Like Me &#128248;</h2>
      {message && (
        <div className={`alert ${messageType === "success" ? "alert-success" : "alert-danger"}`}>
          {message}
        </div>
      )}
      <div className="row m-auto px-5">
        <div className="col-12 col-sm-4">
          <Form
            titulo={titulo}
            setTitulo={setTitulo}
            imgSrc={imgSrc}
            setImgSRC={setImgSRC}
            descripcion={descripcion}
            setDescripcion={setDescripcion}
            agregarPost={agregarPost}
          />
        </div>
        <div className="col-12 col-sm-8 px-5 row posts align-items-start">
          {posts.map((post, i) => (
            <Post
              key={i}
              post={post}
              like={like}
              eliminarPost={eliminarPost}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;


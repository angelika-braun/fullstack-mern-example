import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const { getToken } = useContext(AuthContext);

  function onSubmit(e) {
    e.preventDefault();
    const jwt = getToken();

    fetch("https://fullstack-mern-example.onrender.com/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        // Daten, die im Anfrage-Body gesendet werden
        title: title,
        description: description,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Posting failed");
        }
        setTitle("");
        setDescription("");
        setMessage("Post wurde erstellt");
      })
      .catch(() => setMessage("Bitte kontrolliere deine Daten"));
  }

  return (
    <section className="form-wrapper">
      <h4>Neuer Post</h4>
      <p className="form-info">{message}</p>
      <form onSubmit={onSubmit}>
        <div className="input-section">
          <label htmlFor="title">Titel</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="input-section">
          <label htmlFor="description">Inhalt</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button className="button-primary">Post</button>
      </form>
    </section>
  );
};

export default CreatePost;

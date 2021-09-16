import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

const Article = (props) => {
const [article, setArticle] = useState(null);
const { id } = useParams();
const history = useHistory();

    useEffect(() => {
        axios
        .get("http://localhost:8000/api/articles/" + id)
        .then((res) => {
            console.log(res.data);
            setArticle(res.data);
        })
        .catch((err) => {
            console.log(err.response);
        });
    }, [id]);

    // Response hasn't come back yet
    if (article === null) {
        return "Loading..."; // this could be a loading spinner or gif.
    }

    // Refactor delete into this variable
    const handleDelete = () => {
        axios
            .delete("http://localhost:8000/api/articles/" + id)
            .then((res) => {
            history.push("/articles");
            })
            .catch((err) => {
            console.log(err.response);
            });
        };

        // Response hasn't come back yet
        if (article === null) {
        return "Loading..."; // this could be a loading spinner or gif.
        }

    return (
        <div
        style={{
            borderRadius: 5,
            boxShadow:
            "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            width: "60%",
            margin: "0 auto",
            marginBottom: 20,
        }}
        >
        <div style={{ padding: 15 }}>
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <small>
            Categories: <b>{article.primaryCategory}</b>,{" "}
            {article.secondaryCategory}
            </small>
        </div>

        <div>
            <button
            onClick={(e) => {
                handleDelete();
            }}
            >
            Delete
            </button>
        </div>

        <img
            style={{
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            display: "block",
            marginTop: 10,
            }}
            width="100%"
            src={article.imgUrl}
            alt={article.title}
        />
        </div>
    );
    };

export default Article;
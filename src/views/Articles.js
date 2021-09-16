import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

const Articles = (props) => {
const [articles, setArticles] = useState([]);

useEffect(() => {
axios
    .get("http://localhost:8000/api/articles")
    .then((res) => {
    console.log(res.data);
    setArticles(res.data);
    })
    .catch((err) => {
    console.log(err.response);
    });
}, []);

const handleDelete = (delId) => {
    axios
        .delete("http://localhost:8000/api/articles/" + delId)
        .then((res) => {
            const filteredArticles = articles.filter((article) => {
                return article._id !== delId;
        });
        setArticles(filteredArticles);
        })
        .catch((err) => {
        console.log(err.response);
        });
    };

    const handleLikeClick = (articleBeingLiked) => {
        const editedArticle = { likeCount: articleBeingLiked.likeCount + 1 };
    
            axios
            .put(
                "http://localhost:8000/api/articles/" + articleBeingLiked._id,
                editedArticle
            )
            .then((res) => {
                const updatedArticle = res.data;
        
                const updatedArticles = articles.map((article) => {
                if (article._id === updatedArticle._id) {
                    // replace only the updated article.
                    return updatedArticle;
                }
                return article;
                });
        
                setArticles(updatedArticles);
                console.log("liked");
            })
            .catch((err) => {
                console.log(err.response);
            });
        };

return (
<div>
    <h2>All Articles</h2>
    {articles.map((article) => {
    return (
        <div
        style={{
            borderRadius: 5,
            boxShadow:
            "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            width: "40%",
            margin: "0 auto",
            marginBottom: 20,
        }}
        key={article._id}
        >
        <div style={{ padding: 15 }}>
            <Link to={`/articles/${article._id}`}>
            <h2>{article.title}</h2>
            </Link>
            <p>{article.description}</p>
            <p
            onClick={(e) => {
                handleLikeClick(article);
            }}
            style={{ cursor: "pointer" }}
            >
            👍 {article.likeCount}
            </p>
            <small>
            Categories: <b>{article.primaryCategory}</b>,{" "}
            {article.secondaryCategory}
            </small>
        </div>

        <div>
            <Link to={`/articles/${article._id}/edit`}>Edit</Link>{" "}
            <button
            onClick={(e) => {
                handleDelete(article._id);
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
    })}
</div>
);
};

export default Articles;
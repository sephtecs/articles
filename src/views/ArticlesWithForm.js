import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Articles = (props) => {
const [articles, setArticles] = useState([]);

// Form state
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [primaryCategory, setPrimaryCategory] = useState("");
const [secondaryCategory, setSecondaryCategory] = useState("");
const [imgUrl, setImgUrl] = useState("");

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

    const handleNewArticleSubmit = (e) => {
        e.preventDefault();

        const newArticle = {
        title: title,
        description: description,
        primaryCategory: primaryCategory,
        secondaryCategory: secondaryCategory,
        imgUrl: imgUrl,
        };

        axios
        .post("http://localhost:8000/api/articles", newArticle)
        .then((res) => {
            console.log(res.data);
            // Since we are staying on this page, we need to tell it to reload to
            // show the new article, to do that we need to set state.
            setArticles([...articles, res.data]);
            setTitle("");
            setDescription("");
            setPrimaryCategory("");
            setSecondaryCategory("");
            setImgUrl("");
        })
        .catch((err) => {
            console.log(err.response.data);
        });
    };

    return (
        <div>
        <h2>Create Article</h2>
        <form
            onSubmit={(e) => {
            handleNewArticleSubmit(e);
            }}
        >
            <div>
            <label>Title: </label>
            <input
                onChange={(e) => {
                setTitle(e.target.value);
                }}
                type="text"
                value={title}
            />
            </div>

            <div>
            <label>Description: </label>
            <textarea
                onChange={(e) => {
                setDescription(e.target.value);
                }}
                type="text"
                value={description}
            />
            </div>

            <div>
            <label>Primary Category: </label>
            <input
                onChange={(e) => {
                setPrimaryCategory(e.target.value);
                }}
                type="text"
                value={primaryCategory}
            />
            </div>

            <div>
            <label>Secondary Category: </label>
            <input
                onChange={(e) => {
                setSecondaryCategory(e.target.value);
                }}
                type="text"
                value={secondaryCategory}
            />
            </div>

            <div>
            <label>Image Url: </label>
            <input
                onChange={(e) => {
                setImgUrl(e.target.value);
                }}
                type="text"
                value={imgUrl}
            />
            </div>

            <button>Create</button>
        </form>

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
                <small>
                    Categories: <b>{article.primaryCategory}</b>,{" "}
                    {article.secondaryCategory}
                </small>
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
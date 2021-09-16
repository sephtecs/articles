import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const NewArticle = (props) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [primaryCategory, setPrimaryCategory] = useState("");
    const [secondaryCategory, setSecondaryCategory] = useState("");
    const [imgUrl, setImgUrl] = useState("");

    const history = useHistory();

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
            // Route user to the new article's page.
            history.push(`/articles/${res.data._id}`);
        })
        .catch((err) => {
            console.log(err.response.data);
        });
    };

    return (
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
            />
        </div>

        <div>
            <label>Description: </label>
            <textarea
            onChange={(e) => {
                setDescription(e.target.value);
            }}
            type="text"
            />
        </div>

        <div>
            <label>Primary Category: </label>
            <input
            onChange={(e) => {
                setPrimaryCategory(e.target.value);
            }}
            type="text"
            />
        </div>

        <div>
            <label>Secondary Category: </label>
            <input
            onChange={(e) => {
                setSecondaryCategory(e.target.value);
            }}
            type="text"
            />
        </div>

        <div>
            <label>Image Url: </label>
            <input
            onChange={(e) => {
                setImgUrl(e.target.value);
            }}
            type="text"
            />
        </div>

        <button>Create</button>
        </form>
    );
    };

export default NewArticle;
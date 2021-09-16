/* 
State is separated here, go to travel-planner edit to see state as an obj.
*/
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const EditArticle = (props) => {
const { id } = useParams();

const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [primaryCategory, setPrimaryCategory] = useState("");
const [secondaryCategory, setSecondaryCategory] = useState("");
const [imgUrl, setImgUrl] = useState("");

// Adding validation errors to NewArticle would be done the same way.
const [errors, setErrors] = useState(null);

const history = useHistory();

useEffect(() => {
axios
    .get("http://localhost:8000/api/articles/" + id)
    .then((res) => {
    console.log(res.data);
    // Set to state so we can pre-fill the input boxes
    setTitle(res.data.title);
    setDescription(res.data.description);
    setPrimaryCategory(res.data.primaryCategory);
    setSecondaryCategory(res.data.secondaryCategory);
    setImgUrl(res.data.imgUrl);
    })
    .catch((err) => {
    console.log(err.response);
    });
}, [id]);

const handleEditArticleSubmit = (e) => {
e.preventDefault();

const editedArticle = {
    title: title,
    description: description,
    primaryCategory: primaryCategory,
    secondaryCategory: secondaryCategory,
    imgUrl: imgUrl,
};

axios
    .put("http://localhost:8000/api/articles/" + id, editedArticle)
    .then((res) => {
    console.log(res.data);
    // Route user to the edited article's page.
    history.push(`/articles/${res.data._id}`);
    })
    .catch((err) => {
    // THIS CATCH only triggers because our controller uses
    // res.status(400).json(err);
    setErrors(err.response.data.errors);
    });
};

return (
<div>
    <h2>Edit Article: {title}</h2>
    <form
    onSubmit={(e) => {
        handleEditArticleSubmit(e);
    }}
    >
    <div>
        <label>Title: </label>
        {errors?.title && (
        <span style={{ color: "red" }}> {errors?.title?.message}</span>
        )}
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
        {errors?.primaryCategory && (
        <span style={{ color: "red" }}>
            {" "}
            {errors?.primaryCategory?.message}
        </span>
        )}
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
        {errors?.secondaryCategory && (
        <span style={{ color: "red" }}>
            {" "}
            {errors?.secondaryCategory?.message}
        </span>
        )}
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
        {errors?.imgUrl && (
        <span style={{ color: "red" }}> {errors?.imgUrl?.message}</span>
        )}
        <input
        onChange={(e) => {
            setImgUrl(e.target.value);
        }}
        type="text"
        value={imgUrl}
        />
    </div>

    <button>Update</button>
    </form>
</div>
);
};

export default EditArticle;
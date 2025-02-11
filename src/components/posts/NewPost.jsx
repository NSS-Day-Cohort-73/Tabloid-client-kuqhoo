import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Form } from "reactstrap";
import { createPost } from "../../managers/postManager";


export const NewPost = ({ loggedInUser }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState(0);
    const [userId, setUserId] = useState(0);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = {
            userId: userId,
            title: title,
            content: content,
            categoryId: categoryId
        }
        createPost(newPost).then(() => {
            navigate("/")
        })
    }

    useEffect(() => {
        
    }, [])

    return (<>
        <h2>Create A New Post</h2>
        <Form
    
    </>)

}
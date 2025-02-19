import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { createPost } from "../../managers/postManager";
import { getCategories } from "../../managers/categoryManager";


export const NewPost = ({ loggedInUser }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState(0);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = {
            userProfileId: loggedInUser.id,
            title: title,
            content: content,
            categoryId: categoryId
        }
        createPost(newPost).then(() => {
            navigate("/")
        })
    }

    useEffect(() => {
        getCategories().then(setCategories);
    }, []);

    return (<>
        <h2>Create A New Post</h2>
        <Form>
            <FormGroup>
                <Label>Title</Label>
                <Input
                    type="text"
                    value={title}
                    onChange={(e) => {setTitle(e.target.value)}}
                />
            </FormGroup>
            <FormGroup>
                <Label>Category</Label>
                <Input
                    type="select"
                    value={categoryId}
                    onChange={(e) => setCategoryId(parseInt(e.target.value))}
                >
                    <option value={0}>-- Choose a Category --</option>
                    {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.name}
                        </option>
                    ))}
                </Input>
            </FormGroup>
            <FormGroup>
                <Label>Body</Label>
                <Input
                    type="text"
                    value={content}
                    onChange={(e) => {setContent(e.target.value)}}
                />
            </FormGroup>
            <Button onClick={handleSubmit} color="primary">
                Submit
            </Button>
        </Form>
    </>)
}
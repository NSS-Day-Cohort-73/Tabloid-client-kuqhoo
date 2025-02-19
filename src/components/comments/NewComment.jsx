import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Form, Button, FormGroup, Input, Label } from "reactstrap";
import { postNewComment } from "../../managers/commentManager";


export default function NewComment({ loggedInUser }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [body, setBody] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const newComment = {
            userId: parseInt(loggedInUser.id),
            postId: parseInt(id),
            content: body
        };
        postNewComment(newComment).then(() => {
            navigate(`/posts/${id}/comments`);
        })
    }

    return (<>
        <h2>Post a New Comment</h2>
        <Form>
            <FormGroup>
                <Label>Body</Label>
                <Input
                    type="text"
                    value={body}
                    onChange={(e) => {setBody(e.target.value)}}
                />
            </FormGroup>
            <Button
                onClick={handleSubmit}
                color="primary"
            >
                Submit
            </Button>
        </Form>
    </>)
}
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Form, Button, FormGroup, Input, Label } from "reactstrap";
import { postNewComment } from "../../managers/commentManager";


export default function NewComment({ loggedInUser }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [body, setBody] = useState("");
    const [userId, setUserId] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newComment = {
            userProfileId: userId,
            postId: parseInt(id),
            content: body
        };
        postNewComment(newComment).then(() => {
            navigate(`/posts/${id}/comments`);
        })
    }

    useEffect(() => {
        setUserId(parseInt(loggedInUser.id))
    }, [id])

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
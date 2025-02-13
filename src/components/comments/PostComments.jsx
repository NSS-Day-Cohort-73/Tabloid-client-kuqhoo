import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { getCommentsByPostId } from "../../managers/commentManager";
import { Alert, Button, Card, CardBody, CardTitle, Col, Container } from "reactstrap";
import { getPost } from "../../managers/postManager";


export default function PostComments({ loggedInUser }) {
    const { id } = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

  useEffect(() => {
    getPost(id).then((data) => {
        setPost(data);
        setError(null);
    }).catch((error) => {
        setError(error.message)
    });
    getCommentsByPostId(id).then((data) => {
        setComments(data);
        setError(null);
    }).catch((error) => {
        setError(error.message);
    });
  }, [id]);

    return (<>
        <Container>
            <h2>{post.title}</h2>
            {error && <Alert color="danger">{error}</Alert>}
            <Button onClick={() => {navigate(`/posts/${id}`)}}>
                Back to Post
            </Button>
            <Col>
                {comments.map((comment) => (
                    <Row key={comment.id}>
                        <Card>
                            <CardBody>
                                <CardTitle tag="h5">
                                    {comment.author.userName}
                                </CardTitle>
                                <div>
                                    {comment.content}
                                </div>
                                <div>
                                    Posted: {new Date(comment.CreatedAt).toLocaleDateString()}
                                </div>
                            </CardBody>
                        </Card>
                    </Row>
                ))}
            </Col>            
        </Container>
    </>)
}
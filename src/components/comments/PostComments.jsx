import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { getCommentsByPostId } from "../../managers/commentManager";
import { Alert, Button, Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap";
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
                {comments[0]
                    ? (comments.map((comment) => (
                        <Row key={comment.id}>
                            <Card>
                                <CardBody>
                                    <CardTitle tag="h5">
                                        {comment.content}
                                    </CardTitle>
                                    <div>
                                        Posted by {comment.author.userName} on {new Date(comment.createdAt).toLocaleDateString()}
                                    </div>
                                </CardBody>
                            </Card>
                        </Row>
                    ))) : (
                        <Card>
                            <CardBody>
                                <div>There's nothing here yet!</div>
                            </CardBody>
                        </Card>
                    )
                }
            </Col>
            <Button onClick={() => {navigate(`/posts/${id}/comments/new`)}}>
                Post a Comment!
            </Button>          
        </Container>
    </>)
}
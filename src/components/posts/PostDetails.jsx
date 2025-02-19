import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getPost } from "../../managers/postManager";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";

export default function PostDetails() {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getPost(id)
      .then(setPost)
      .catch((err) => setError(err.message));
  }, [id]);

  const handleViewCommentsClick = () => {
    navigate(`/posts/${id}/comments`);
  };

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h2">{post.title}</CardTitle>
        {post.headerImage && (
          <img src={post.headerImage} alt="Post header" className="img-fluid" />
        )}
        <CardText className="text-muted">
          By{" "}
          <Link to={`/userprofiles/${post.author.id}`}>
            {post.author.userName}
          </Link>{" "}
          on {new Date(post.createdAt).toLocaleDateString()}
        </CardText>
        <CardText>{post.content}</CardText>
        <Button onClick={handleViewCommentsClick}>View Comments</Button>
      </CardBody>
    </Card>
  );
}

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../../managers/postManager";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

export default function PostDetails() {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getPost(id)
      .then(setPost)
      .catch((err) => setError(err.message));
  }, [id]);

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
          By {post.author.userName} on{" "}
          {new Date(post.createdAt).toLocaleDateString()}
        </CardText>
        <CardText>{post.content}</CardText>
      </CardBody>
    </Card>
  );
}

import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { deletePostById, getPost } from "../../managers/postManager";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import { subscribeToAuthor } from "../../managers/subscriptionManager";

export default function PostDetails({ loggedInUser }) {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [userId, setUserId] = useState(0);

  const handleDeletePost = () => {
    if (window.confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
      deletePostById(post.id)
        .then(() => {
          navigate("/posts");
        })
        .catch((err) => setError(err.message));
    }
  };

  useEffect(() => {
    if (loggedInUser?.id) {
        console.log('setting userId to: ', loggedInUser.id)
        setUserId(parseInt(loggedInUser.id))
    }
  }, [loggedInUser?.id])

  useEffect(() => {
    getPost(id)
      .then((fetchedPost) => {
        console.log('Fetched post author id:', fetchedPost.author?.id);
        setPost(fetchedPost);
      })
      .catch((err) => setError(err.message));
  }, [id]);

  const handleViewCommentsClick = () => {
    navigate(`/posts/${id}/comments`);
  };

  const handleSubscribe = () => {
    subscribeToAuthor(post.author.id)
      .then(() => {
        window.alert("Subscribed successfully!");
      })
      .catch((err) => setError(err.message));
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
        <div className="d-flex gap-2">
            <Button onClick={handleViewCommentsClick}>View Comments</Button>
            <Button color="success" onClick={handleSubscribe}>
                Subscribe to {post.author.firstName}
            </Button>
            {loggedInUser && userId === post.author?.id ? (
                <Button onClick={handleDeletePost}>
                    Delete Post
                </Button>
            ) : null}
        </div>
      </CardBody>
    </Card>
  );
}

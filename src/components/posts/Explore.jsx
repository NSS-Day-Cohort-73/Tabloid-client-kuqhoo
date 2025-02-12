import { useEffect, useState } from "react";
import { getAllPosts } from "../../managers/postManager";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Container,
  Row,
  Col,
  Alert,
} from "reactstrap";

export default function Explore({ loggedInUser }) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllPosts()
      .then((posts) => {
        setPosts(posts);
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  return (
    <Container>
      <h2>All Posts</h2>
      {error && <Alert color="danger">{error}</Alert>}
      <Row>
        {posts.map((post) => (
          <Col md={4} key={post.id} className="mb-4">
            <Card>
              <CardBody>
                <CardTitle tag="h5">
                  <Link to={`/posts/${post.id}`}>{post.title}</Link>
                </CardTitle>
                <CardSubtitle className="mb-2 text-muted">
                  By: {post.author.firstName} {post.author.lastName}
                </CardSubtitle>
                <div>Category: {post.categoryName}</div>
                <div>
                  Posted: {new Date(post.createdAt).toLocaleDateString()}
                </div>
                {loggedInUser?.roles?.includes("Admin") && (
                  <div className="mt-2">
                    {/* Admin-only buttons will go here */}
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

import { useEffect, useState } from "react";
import { getMyPosts } from "../../managers/postManager";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

// Add the same styling as Explore
const cardImageStyle = {
  height: "200px",
  objectFit: "cover",
  width: "100%",
};

const cardStyle = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
};

const cardBodyStyle = {
  flex: "1 1 auto",
};

export default function MyPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getMyPosts().then(setPosts);
  }, []);

  return (
    <Container>
      <h2>My Posts</h2>
      <Row>
        {posts.map((post) => (
          <Col md={4} key={post.id} className="mb-4">
            <Card style={cardStyle}>
              {post.headerImage && (
                <img
                  src={post.headerImage}
                  alt=""
                  style={cardImageStyle}
                  className="card-img-top"
                />
              )}
              <CardBody style={cardBodyStyle}>
                <CardTitle tag="h5">
                  <Link to={`/posts/${post.id}`}>{post.title}</Link>
                </CardTitle>
                <div>Category: {post.categoryName}</div>
                <div>
                  Posted: {new Date(post.createdAt).toLocaleDateString()}
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

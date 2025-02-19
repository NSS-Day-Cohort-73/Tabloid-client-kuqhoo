import { useEffect, useState } from "react";
import { getAllPosts, searchPosts } from "../../managers/postManager";
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
  Input,
  FormGroup,
  Label,
} from "reactstrap";
import { getCategories } from "../../managers/categoryManager";

// Add these styles at the top of the file
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

export default function Explore({ loggedInUser }) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

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

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    searchPosts(searchTerm, selectedCategory).then(setPosts);
  }, [searchTerm, selectedCategory]);

  return (
    <Container>
      <h2>All Posts</h2>
      {error && <Alert color="danger">{error}</Alert>}
      <Row>
        {/* Search and Filter Section */}
        <Col md={6}>
          <FormGroup>
            <Label for="search">Search</Label>
            <Input
              id="search"
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="category">Category</Label>
            <Input
              id="category"
              type="select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </Input>
          </FormGroup>
        </Col>
      </Row>
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

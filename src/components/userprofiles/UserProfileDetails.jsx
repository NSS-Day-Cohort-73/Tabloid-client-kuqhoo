import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProfile } from "../../managers/userProfileManager";
import { getPostsByUser } from "../../managers/postManager";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Container,
  Table,
  Row,
  Col,
} from "reactstrap";
import {
  checkSubscription,
  unsubscribeFromAuthor,
  subscribeToAuthor,
} from "../../managers/subscriptionManager";
import { Link } from "react-router-dom";

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

export default function UserProfileDetails() {
  const [userProfile, setUserProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const { id } = useParams();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProfile(id).then(setUserProfile);
    getPostsByUser(id).then(setPosts);
    checkSubscription(id).then(setIsSubscribed);
  }, [id]);

  const handleSubscriptionClick = () => {
    if (isSubscribed) {
      unsubscribeFromAuthor(id)
        .then(() => setIsSubscribed(false))
        .catch((err) => setError(err.message));
    } else {
      subscribeToAuthor(id)
        .then(() => setIsSubscribed(true))
        .catch((err) => setError(err.message));
    }
  };

  if (!userProfile) {
    return (
      <Container className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Card className="shadow-sm">
        <CardBody>
          {/* Profile Image and Name */}
          <div className="text-center mb-4">
            <img
              src={userProfile.imageLocation || "/default-avatar.png"}
              alt={userProfile.fullName}
              className="rounded-circle mb-3"
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                border: "1px solid #dee2e6",
              }}
            />
            <h2>{userProfile.fullName}</h2>
            <p>Total Posts: {posts.length}</p>
            <Button
              color="success"
              onClick={handleSubscriptionClick}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {isSubscribed
                ? isHovering
                  ? "Unsubscribe"
                  : "Subscribed"
                : "Subscribe"}
            </Button>
          </div>

          {/* Profile Details */}
          <Table borderless>
            <tbody>
              <tr>
                <th scope="row" style={{ width: "30%" }}>
                  Display Name
                </th>
                <td>{userProfile.userName}</td>
              </tr>
              <tr>
                <th scope="row">Email</th>
                <td>{userProfile.email}</td>
              </tr>
              <tr>
                <th scope="row">Creation Date</th>
                <td>
                  {new Date(userProfile.createDateTime).toLocaleDateString(
                    "en-US",
                    {
                      month: "2-digit",
                      day: "2-digit",
                      year: "numeric",
                    }
                  )}
                </td>
              </tr>
              <tr>
                <th scope="row">User Profile Type</th>
                <td>{userProfile.userType}</td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>

      <h3>Posts by {userProfile.fullName}</h3>
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

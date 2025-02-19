import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMySubscriptions } from "../../managers/subscriptionManager";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

// Add image styles
const profileImageStyle = {
  width: "100px",
  height: "100px",
  objectFit: "cover",
  borderRadius: "50%",
  marginBottom: "1rem",
};

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMySubscriptions()
      .then(setSubscriptions)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <Container>
      <h2>My Subscriptions</h2>
      <Row>
        {subscriptions.map((sub) => (
          <Col md={4} key={sub.id} className="mb-4">
            <Card>
              <CardBody className="text-center">
                <img
                  src={sub.author.imageLocation || "/default-avatar.png"}
                  alt={`${sub.author.firstName} ${sub.author.lastName}`}
                  style={profileImageStyle}
                />
                <CardTitle tag="h5">
                  <Link to={`/userprofiles/${sub.author.id}`}>
                    {sub.author.firstName} {sub.author.lastName}
                  </Link>
                </CardTitle>
                <div>
                  Subscribed since:{" "}
                  {new Date(sub.subscribedAt).toLocaleDateString()}
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

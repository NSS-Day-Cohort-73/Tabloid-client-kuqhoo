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
} from "reactstrap";

export default function UserProfileDetails() {
  const [userProfile, setUserProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getProfile(id).then(setUserProfile);
    getPostsByUser(id).then(setPosts);
  }, [id]);

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
            <Button color="primary">Subscribe</Button>
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
      {posts.map((post) => (
        <Card key={post.id} className="mb-3">
          <CardBody>
            <CardTitle tag="h5">{post.title}</CardTitle>
            <div>Category: {post.categoryName}</div>
            <div>Posted: {new Date(post.createdAt).toLocaleDateString()}</div>
          </CardBody>
        </Card>
      ))}
    </Container>
  );
}

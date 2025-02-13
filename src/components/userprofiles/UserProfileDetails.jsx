import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProfile } from "../../managers/userProfileManager";
import { 
  Card, 
  CardBody,
  Container,
  Table
} from "reactstrap";

export default function UserProfileDetails({ loggedInUser }) {
  const [userProfile, setUserProfile] = useState();
  const { id } = useParams();

  useEffect(() => {
    getProfile(id).then((data) => setUserProfile(data));
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
                border: "1px solid #dee2e6"
              }}
            />
            <h2>{userProfile.fullName}</h2>
          </div>

          {/* Profile Details */}
          <Table borderless>
            <tbody>
              <tr>
                <th scope="row" style={{ width: "30%" }}>Display Name</th>
                <td>{userProfile.userName}</td>
              </tr>
              <tr>
                <th scope="row">Email</th>
                <td>{userProfile.email}</td>
              </tr>
              <tr>
                <th scope="row">Creation Date</th>
                <td>{new Date(userProfile.createDateTime).toLocaleDateString('en-US', {
                  month: '2-digit',
                  day: '2-digit',
                  year: 'numeric'
                })}</td>
              </tr>
              <tr>
                <th scope="row">User Profile Type</th>
                <td>{userProfile.userType}</td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Container>
  );
}
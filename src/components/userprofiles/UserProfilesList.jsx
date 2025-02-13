import { useEffect, useState } from "react";
import { getProfiles } from "../../managers/userProfileManager";
import { Link } from "react-router-dom";
import { 
  Container, 
  Card, 
  CardBody,
  CardTitle,
  Table,
  Badge
} from "reactstrap";

export default function UserProfileList({loggedInUser}) {
  const [userProfiles, setUserProfiles] = useState([]);

  useEffect(() => {
    getProfiles().then(profiles => {
      // Sort profiles by userName (display name) alphabetically
      const sortedProfiles = profiles.sort((a, b) => 
        a.userName.localeCompare(b.userName)
      );
      setUserProfiles(sortedProfiles);
    });
  }, []);

  return (
    <Container className="mt-4">
      <Card className="shadow-sm">
        <CardBody>
          <CardTitle tag="h2" className="mb-4">User Profiles</CardTitle>
          <Table hover>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Display Name</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userProfiles.map((profile) => (
                <tr key={profile.id}>
                  <td>{profile.fullName}</td>
                  <td>{profile.userName}</td>
                  <td>
                    <Badge 
                      color={profile.roles?.includes("Admin") ? "primary" : "secondary"}
                      pill
                    >
                      {profile.roles?.includes("Admin") ? "Admin" : "User"}
                    </Badge>
                  </td>
                  <td>
                    <Link 
                      to={`/userprofiles/${profile.id}`}
                      className="btn btn-link text-primary"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Container>
  );
}

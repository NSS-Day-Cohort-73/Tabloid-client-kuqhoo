import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteTag, getTags } from "../../managers/tagManager";
import {
  Container,
  Card,
  CardBody,
  CardTitle,
  Button,
  Alert,
} from "reactstrap";

export default function TagDelete({ loggedInUser }) {
  const [tag, setTag] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getTags().then(tags => {
      const foundTag = tags.find(t => t.id === parseInt(id));
      if (foundTag) {
        setTag(foundTag);
      } else {
        navigate("/tags");
      }
    });
  }, [id, navigate]);

  const handleDelete = async () => {
    try {
      await deleteTag(id);
      navigate("/tags");
    } catch (error) {
      setError("An error occurred while deleting the tag. Please try again.");
    }
  };

  if (!tag) {
    return (
      <Container className="mt-4">
        <Card className="shadow-sm">
          <CardBody>
            <div>Loading...</div>
          </CardBody>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Card className="shadow-sm">
        <CardBody className="text-center">
          <CardTitle tag="h2" className="mb-4">
            Delete Tag
          </CardTitle>
          {error && (
            <Alert color="danger" className="mb-4">
              {error}
            </Alert>
          )}
          <p className="mb-4">
            Are you sure you want to delete the tag "{tag.name}"?
          </p>
          <div>
            <Button
              color="danger"
              onClick={handleDelete}
              className="me-2"
            >
              Delete
            </Button>
            <Button
              color="secondary"
              onClick={() => navigate("/tags")}
            >
              Cancel
            </Button>
          </div>
        </CardBody>
      </Card>
    </Container>
  );
}
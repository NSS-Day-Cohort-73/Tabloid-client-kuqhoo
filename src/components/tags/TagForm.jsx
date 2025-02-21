import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTag, updateTag, getTags } from "../../managers/tagManager";
import {
  Container,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";

export default function TagForm({ loggedInUser }) {
  const [tag, setTag] = useState({ name: "" });
  const [errors, setErrors] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getTags().then(tags => {
        const foundTag = tags.find(t => t.id === parseInt(id));
        if (foundTag) {
          setTag(foundTag);
        } else {
          navigate("/tags");
        }
      });
    }
  }, [id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    const submitTag = async () => {
      try {
        if (id) {
          await updateTag({ ...tag, id: parseInt(id) });
        } else {
          await createTag(tag);
        }
        navigate("/tags");
      } catch (error) {
        setErrors(["An error occurred while saving the tag. Please try again."]);
      }
    };

    submitTag();
  };

  return (
    <Container className="mt-4">
      <Card className="shadow-sm">
        <CardBody>
          <CardTitle tag="h2" className="mb-4">
            {id ? "Edit Tag" : "Create Tag"}
          </CardTitle>
          {errors.map((error, index) => (
            <div key={index} className="alert alert-danger">
              {error}
            </div>
          ))}
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name">Tag Name</Label>
              <Input
                id="name"
                type="text"
                value={tag.name}
                onChange={(e) => setTag({ ...tag, name: e.target.value })}
                required
                maxLength={50}
              />
            </FormGroup>
            <div className="mt-4">
              <Button color="primary" type="submit" className="me-2">
                Save
              </Button>
              <Button
                type="button"
                color="secondary"
                onClick={() => navigate("/tags")}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
}
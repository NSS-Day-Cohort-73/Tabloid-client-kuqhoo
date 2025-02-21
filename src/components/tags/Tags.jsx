

import React, { useState, useEffect } from "react";
import { getTags } from "../../managers/tagManager";
import { Link } from "react-router-dom";
import { 
  Container, 
  Card, 
  CardBody,
  CardTitle,
  Table,
} from "reactstrap";

export default function Tags({ loggedInUser }) {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getTags().then(setTags);
  }, []);

  return (
    <Container className="mt-4">
      <Card className="shadow-sm">
        <CardBody>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <CardTitle tag="h2">Tag Management</CardTitle>
            <Link to="/tags/create" className="btn btn-primary">
              Create Tag
            </Link>
          </div>
          <Table hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tags.map((tag) => (
                <tr key={tag.id}>
                  <td>{tag.name}</td>
                  <td>
                    <Link 
                      to={`/tags/edit/${tag.id}`}
                      className="btn btn-link text-primary me-2"
                    >
                      Edit
                    </Link>
                    <Link 
                      to={`/tags/delete/${tag.id}`}
                      className="btn btn-link text-danger"
                    >
                      Delete
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
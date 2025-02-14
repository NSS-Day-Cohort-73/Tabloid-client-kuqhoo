import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostsByUser } from "../../managers/postManager";
import { Card, CardBody, CardTitle } from "reactstrap";

export default function PostsByUserProfile() {
  const [posts, setPosts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getPostsByUser(id).then(setPosts);
  }, [id]);

  return (
    <div className="container">
      <h2>Posts by Author</h2>
      {posts.map((post) => (
        <Card key={post.id} className="mb-3">
          <CardBody>
            <CardTitle tag="h5">{post.title}</CardTitle>
            <div>Category: {post.categoryName}</div>
            <div>Posted: {new Date(post.createdAt).toLocaleDateString()}</div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}

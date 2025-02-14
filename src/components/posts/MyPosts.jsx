import { useEffect, useState } from "react";
import { getMyPosts } from "../../managers/postManager";
import { Table } from "reactstrap";

export default function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMyPosts()
      .then(setPosts)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container">
      <h2>My Posts</h2>
      <Table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Status</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>{post.categoryName}</td>
              <td>{post.isApproved ? "Approved" : "Pending"}</td>
              <td>{new Date(post.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

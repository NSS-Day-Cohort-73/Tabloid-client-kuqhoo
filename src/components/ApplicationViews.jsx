import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import UserProfileList from "./userprofiles/UserProfilesList";
import UserProfileDetails from "./userprofiles/UserProfileDetails";
import Tags from "./tags/Tags";
import Explore from "./posts/Explore";
import PostDetails from "./posts/PostDetails";
import PostComments from "./comments/PostComments";
import { NewPost } from "./posts/NewPost";
import SubscribedPosts from "./posts/SubscribedPosts";
import NewComment from "./comments/NewComment";
import EditComment from "./comments/EditComment";
import EditPost from "./posts/EditPost";
import PostsByUserProfile from "./userprofiles/PostsByUserProfile";
import MyPosts from "./posts/MyPosts";

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <p>Welcome to Tabloid!</p>
            </AuthorizedRoute>
          }
        />
        <Route path="/posts">
            <Route
                index
                element={
                    <AuthorizedRoute loggedInUser={loggedInUser}>
                        <Explore />
                    </AuthorizedRoute>
                }
            />

            <Route path=":id" element={<AuthorizedRoute loggedInUser={loggedInUser}><PostDetails/></AuthorizedRoute>} />

            <Route path="edit/:id" element={<AuthorizedRoute loggedInUser={loggedInUser}><EditPost /></AuthorizedRoute>} />

            <Route path="user/:id" element={<AuthorizedRoute loggedInUser={loggedInUser}><PostsByUserProfile/></AuthorizedRoute>} />

            <Route path="my" element={<AuthorizedRoute loggedInUser={loggedInUser}><MyPosts/></AuthorizedRoute>} />

            <Route path=":id/comments">

                <Route index element={<AuthorizedRoute loggedInUser={loggedInUser}><PostComments/></AuthorizedRoute>} />

                <Route path="edit/:id" element={<AuthorizedRoute loggedInUser={loggedInUser}><EditComment/></AuthorizedRoute>} />
                
                <Route path="new" element={<AuthorizedRoute loggedInUser={loggedInUser}><NewComment/></AuthorizedRoute>} />

            </Route>
            
            
            
            <Route path="create" element={<AuthorizedRoute loggedInUser={loggedInUser}><NewPost loggedInUser={loggedInUser}/></AuthorizedRoute>} />
            <Route path="subscribed" element={<AuthorizedRoute loggedInUser={loggedInUser}><SubscribedPosts /></AuthorizedRoute>} />
            
            <Route
                path=":id"
                element={
                    <AuthorizedRoute loggedInUser={loggedInUser}>
                        <PostDetails />
                    </AuthorizedRoute>
                }
            />
        </Route>
        <Route path="/userprofiles">
          <Route
            index
            element={
              <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
                <UserProfileList />
              </AuthorizedRoute>
            }
          />

          <Route
            path=":id"
            element={
              <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
                <UserProfileDetails />
              </AuthorizedRoute>
            }
          />
        </Route>
        <Route 
            path="/tags"
            element={
                <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
                    <Tags />
                </AuthorizedRoute>
            }
        />

        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
      </Route>
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}

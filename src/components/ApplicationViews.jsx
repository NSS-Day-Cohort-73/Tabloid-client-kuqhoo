import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import UserProfileList from "./userprofiles/UserProfilesList";
import UserProfileDetails from "./userprofiles/UserProfileDetails";
import Tags from "./tags/Tags";
import Explore from "./posts/Explore";
import PostDetails from "./posts/PostDetails";
import { Categories } from "./categories/Categories";
import PostComments from "./comments/PostComments";
import { NewPost } from "./posts/NewPost";
import SubscribedPosts from "./posts/SubscribedPosts";
import NewComment from "./comments/NewComment";
import EditComment from "./comments/EditComment";
import EditPost from "./posts/EditPost";
import PostsByUserProfile from "./userprofiles/PostsByUserProfile";
import MyPosts from "./posts/MyPosts";
import Subscriptions from "./subscriptions/Subscriptions";

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
          <Route index element={<Explore />} />
          <Route path=":id" element={<PostDetails />} />
          <Route
            path="create"
            element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <NewPost loggedInUser={loggedInUser} />
              </AuthorizedRoute>
            }
          />
          <Route
            path="edit/:id"
            element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <EditPost />
              </AuthorizedRoute>
            }
          />
          <Route
            path="user/:id"
            element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <PostsByUserProfile />
              </AuthorizedRoute>
            }
          />
          <Route
            path="my"
            element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <MyPosts />
              </AuthorizedRoute>
            }
          />
          <Route path=":id/comments">
            <Route
              index
              element={
                <AuthorizedRoute loggedInUser={loggedInUser}>
                  <PostComments />
                </AuthorizedRoute>
              }
            />

            <Route
              path=":id"
              element={
                <AuthorizedRoute loggedInUser={loggedInUser}>
                  <PostDetails />
                </AuthorizedRoute>
              }
            />

            <Route
              path="edit/:id"
              element={
                <AuthorizedRoute loggedInUser={loggedInUser}>
                  <EditPost />
                </AuthorizedRoute>
              }
            />

            <Route
              path="user/:id"
              element={
                <AuthorizedRoute loggedInUser={loggedInUser}>
                  <PostsByUserProfile />
                </AuthorizedRoute>
              }
            />

            <Route
              path="my"
              element={
                <AuthorizedRoute loggedInUser={loggedInUser}>
                  <MyPosts />
                </AuthorizedRoute>
              }
            />

            <Route path=":id/comments">
              <Route
                index
                element={
                  <AuthorizedRoute loggedInUser={loggedInUser}>
<<<<<<< HEAD
                    <PostComments loggedInUser={loggedInUser}/>
=======
                    <PostComments />
>>>>>>> f7b868d71b9974e0fa08d45e5e6de0e81049869a
                  </AuthorizedRoute>
                }
              />

              <Route
                path="edit/:id"
                element={
                  <AuthorizedRoute loggedInUser={loggedInUser}>
                    <EditComment />
                  </AuthorizedRoute>
                }
              />

              <Route
                path="new"
                element={
                  <AuthorizedRoute loggedInUser={loggedInUser}>
<<<<<<< HEAD
                    <NewComment loggedInUser={loggedInUser}/>
=======
                    <NewComment />
>>>>>>> f7b868d71b9974e0fa08d45e5e6de0e81049869a
                  </AuthorizedRoute>
                }
              />
            </Route>

            <Route
              path="create"
              element={
                <AuthorizedRoute loggedInUser={loggedInUser}>
                  <NewPost loggedInUser={loggedInUser} />
                </AuthorizedRoute>
              }
            />
            <Route
              path="subscribed"
              element={
                <AuthorizedRoute loggedInUser={loggedInUser}>
                  <SubscribedPosts />
                </AuthorizedRoute>
              }
            />

            <Route
              path="edit/:id"
              element={
                <AuthorizedRoute loggedInUser={loggedInUser}>
                  <EditComment />
                </AuthorizedRoute>
              }
            />
            <Route
              path="new"
              element={
                <AuthorizedRoute loggedInUser={loggedInUser}>
                  <NewComment />
                </AuthorizedRoute>
              }
            />
          </Route>
          <Route
            path="subscribed"
            element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <SubscribedPosts />
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
        <Route path="categories">
          <Route
            index
            element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <Categories loggedInUser={loggedInUser} />
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
        <Route
          path="/subscriptions"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <Subscriptions />
            </AuthorizedRoute>
          }
        />
      </Route>
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}
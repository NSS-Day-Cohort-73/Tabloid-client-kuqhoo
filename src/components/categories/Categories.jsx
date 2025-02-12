import { useEffect, useState } from "react";
import { tryGetLoggedInUser } from "../../managers/authManager";
import { deleteCategory, getCategories, postCategory, updateCategory } from "../../managers/categoryManager";
import { Button, Card, Input, ListGroup, ListGroupItem } from "reactstrap";
import "./Categories.css"

export const Categories = ({loggedInUser}) => {
    const [categories, setCategories] = useState([])
    const [name, setName] = useState("")
    const [editingCardId, setEditingCardId] = useState(0)

    useEffect(() => {
        getCategories().then((res) => setCategories(res))
    }, [])

const handleInputChange = (e) => {
    setName(e.target.value)
}

const handleSave = (e) => {
    e.preventDefault();
    const newCategory ={
        name
    }
    postCategory(newCategory).then(() => getCategories()).then((data) => {
      setCategories(data);
      setName("");

    })
  }

  const handleEditClick = (id) => {
    setEditingCardId(id);
  }

  const handleDelete = (id) => {
    deleteCategory(id).then(() => getCategories()).then((data) => setCategories(data));
    
  }

  const cancelEdit = () => {
    setEditingCardId(0);
  }

  const handleEditSave = (e, id) => {
    e.preventDefault();
    const newCategory = {
    id : id,
    name : name
   }
    updateCategory(newCategory).then(()=> getCategories()).then((data) => setCategories(data)).then(() => setEditingCardId(0))
  }
    

    return (<>
    <div className="category-title">
    <h2>Category Management</h2>
    </div>
    <Card className="category-list">
    <ListGroup flush>
    <div className="container">
    {categories.map((c) => (
            <ListGroupItem key={c.id} className="card-list-item">
              {editingCardId === c.id ? (<>
              <Input type="text" className="edit-category-box" placeholder={c.name} onChange={(event) => handleInputChange(event)}/> <Button className="category-edit-cancel" onClick={() => cancelEdit()}>Cancel</Button> <Button onClick={(event) => handleEditSave(event, c.id)} className="category-edit-save">Save</Button>
              </>) : (<><div className="category-name">
                <h5>{c.name}</h5>
              </div>
              {loggedInUser? loggedInUser.roles.includes("Admin") && (
                <div className="buttons-group">
                  <Button className="edit-button" onClick={() => handleEditClick(c.id)}>Edit</Button>
                  <Button className="delete-button" onClick={() => handleDelete(c.id)}>Delete</Button>
                </div>
              ) : ""}</>)
            }
            </ListGroupItem>
          ))}
    </div>
    </ListGroup>
    </Card>
    {loggedInUser ? loggedInUser.roles.includes("Admin") && ( <div className="add-category-container">
    <div className="add-bar"><Input onChange={(event) => handleInputChange(event) }className="add-bar-input"type="text" placeholder="Add New Category"/> <Button className="save-button" onClick={(event) => handleSave(event)}>Save</Button></div>
    </div>): ("")}
   
    </>)
}
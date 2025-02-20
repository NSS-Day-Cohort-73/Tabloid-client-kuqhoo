import { useEffect, useState } from "react"
import { deleteAReactionType, getAllReactionTypes, postNewReactionType, updateAReactionType } from "../../managers/reactionsManager"
import { Button, Card, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, ListGroup, ListGroupItem } from "reactstrap"
import * as SolidIcons from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as RegularIcons from '@fortawesome/free-regular-svg-icons'
import "./ReactionList.css"

export const ReactionList = ({loggedInUser}) => {
    const [reactionTypes, setReactionTypes] = useState([])
    const [editingCardId, setEditingCardId] = useState(0)
    const [type, setType] = useState("")
    const [editType, setEditType] = useState("")



    const [selectedIcon, setSelectedIcon] = useState(null)
    const [selectedIconName, setSelectedIconName] = useState("")

    const [selectedEditIcon, setSelectedEditIcon] = useState(null)
    const [selectedEditIconName, setSelectedEditIconName] = useState("")



    useEffect(() => {
        getAllReactionTypes().then((data) => setReactionTypes(data))
    }, [])


    const handleIconSelection = (event) => {
        const iconName = event.target.value
        setSelectedIconName(iconName);
        const selectedIconObject = RegularIcons[iconName]
        setSelectedIcon(selectedIconObject);
    }

    const handleEditIconSelection = (event) => {
        const iconName = event.target.value
        setSelectedEditIconName(iconName)
        const selectedIconEditObject = RegularIcons[iconName]
        setSelectedEditIcon(selectedIconEditObject)
    }

    const handleTypeChange = (event) => {
        setType(event.target.value)

    }

    const regularIcons = Object.keys(RegularIcons).map((iconName) => ({
        prefix: "far",
        name: iconName
    }));

    const handleSave = () => {
        const newReactionType = {
            faIcon: selectedIconName,
            type
        }
        postNewReactionType(newReactionType).then(() => getAllReactionTypes()).then((data) => {
            setReactionTypes(data);
            setFaIcon("");
            setType("");
            setSelectedIcon(null)
            setSelectedIconName("")
            
        })

    }
    const handleDeletionClick = (id) => {
        deleteAReactionType(id).then(() => getAllReactionTypes()).then((data) => setReactionTypes(data))
    }

    const handleEditClick = (id) => {
        setEditingCardId(id)
    }
    const handleCancelClick = () => {
        setEditingCardId(0);
        setSelectedEditIconName("")
        setSelectedEditIcon(null)



    }

    const handleEditTypeChange = (event) => {
        setEditType(event.target.value)
    }
    const handleEditSave = (id) => {
        const editedReaction = {
            id : id,
            faIcon : "",
            type: ""
        }
        if (selectedEditIconName != null || selectedEditIconName != ""){
            editedReaction.faIcon = selectedEditIconName
        }
        if (editType != null || editType != ""){
            editedReaction.type = editType
        }
        updateAReactionType(editedReaction).then(() => getAllReactionTypes()).then((data) => setReactionTypes(data)).then(() => setEditingCardId(0))
    }

return (<>
    <div className="reactions-title">
        <h2>Reactions Management</h2>
    </div>
    <Card className="reaction-list">
        <ListGroup flush>
            <div className="container">
                {reactionTypes.map((rt) => {
                    const currentIcon = RegularIcons[rt.faIcon];
                   return(
                        <ListGroupItem key={rt.id} className="reaction-list-item">
                            {editingCardId === rt.id ? (
                                
                                <>
                                
                                <div className="edit-icon-preview">
                                {selectedEditIcon && (
                                <FontAwesomeIcon className="edit-icon"icon={selectedEditIcon} />
                                )}
                                </div>
                                <input type="text" className="edit-type-text" onChange={(event) => handleEditTypeChange(event)} />
                                <select className="icon-select" onChange={(event) => {handleEditIconSelection(event)}}> 
                                <option value={0}>Select an Icon</option>
                                {regularIcons.filter((icon) => icon.name !== "far" && icon.name !== "prefix" ).map((icon) => (
                                    <option key={icon.name} value={icon.name}>{icon.name}</option>
                                ))}
                                </select>
                                <Button onClick={() => handleCancelClick()}>Cancel</Button>
                                <Button onClick={() => handleEditSave(rt.id)}>Save</Button></>

                            ): (
                                <>
                        <div className="left-of-card">
                        <div className="reaction-icon">
                            <FontAwesomeIcon className="fontawesome-reaction-icon"icon = {currentIcon} />
                        </div>
                        <div className="reaction-name">
                            <h5>{rt.type}</h5>
                            </div>
                            </div>
                            <div className="right-of-card">
                                {loggedInUser? loggedInUser.roles.includes("Admin") &&(
                                    <div className="reactions-button-group">
                                    <Button className="edit-reactions-button" onClick={() => handleEditClick(rt.id)}>Edit</Button>
                                    <Button onClick={() => handleDeletionClick(rt.id)}className="delete-reactions-button"> Delete</Button>
                                    </div>
                                ): ""}
                            </div>
                            </>
                        )}
                    </ListGroupItem>
                )})}
            </div>
        </ListGroup>
    </Card>
<div className="reaction-add-container">    
<div className="reaction-add-bar"><div className="icon-preview">
    {selectedIcon && (
        <FontAwesomeIcon className="preview-icon-icon"icon={selectedIcon} />
    )}
</div><Input onChange={() => handleTypeChange(event)} className="react-add-bar-input" type="text" placeholder="Insert Reaction Name"/>
<select className="icon-select" onChange={(event) => {handleIconSelection(event)}}> <option value={0}>Select an Icon</option>
    {regularIcons.filter((icon) => icon.name !== "far" && icon.name !== "prefix" ).map((icon) => (
        <option key={icon.name} value={icon.name}>{icon.name}</option>
    ))}
</select>

 <Button onClick={() => handleSave()}>Save</Button></div>
 </div>
</>)
}
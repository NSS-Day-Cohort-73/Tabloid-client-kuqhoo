import { useEffect, useState } from "react"
import { getAllReactionTypes } from "../../managers/reactionsManager"
import { Button, Card, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, ListGroup, ListGroupItem } from "reactstrap"
import * as SolidIcons from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as RegularIcons from '@fortawesome/free-regular-svg-icons'
import "./ReactionList.css"

export const ReactionList = ({loggedInUser}) => {
    const [reactionTypes, setReactionTypes] = useState([])
    const [editingCardId, setEditingCardId] = useState(0)

    const [selectedIcon, setSelectedIcon] = useState(null)



    useEffect(() => {
        getAllReactionTypes().then((data) => setReactionTypes(data))
    }, [])

    const handleIconSelection = (event) => {
        const selectedIconName = event.target.value;
        const selectedIconObject = RegularIcons[selectedIconName]
        setSelectedIcon(selectedIconObject);
        console.log(selectedIcon)
    }

    const regularIcons = Object.keys(RegularIcons).map((iconName) => ({
        prefix: "far",
        name: iconName
    }));
    console.log(regularIcons)

return (<>
    <div className="reactions-title">
        <h2>Reactions Management</h2>
    </div>
    <Card className="reaction-list">
        <ListGroup flush>
            <div className="container">
                {reactionTypes.map((rt) => {
                    const currentIcon = RegularIcons[rt.faIcon];
                   return(<ListGroupItem key={rt.id} className="reaction-list-item">
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
                                    <Button className="edit-reactions-button">Edit</Button>
                                    <Button className="delete-reactions-button"> Delete</Button>
                                    </div>
                                ): ""}
                            </div>
                    </ListGroupItem>
                )})}
            </div>
        </ListGroup>
    </Card>
    
<div className="reaction-add-bar"><Input className="react-add-bar-input" type="text" placeholder="Insert Reaction Name"/>
<select onChange={(event) => {handleIconSelection(event)}}> <option value={0}>Select an Icon</option>
    {regularIcons.filter((icon) => icon.name !== "far" && icon.name !== "prefix" ).map((icon) => (
        <option key={icon.name} value={icon.name}>{icon.name}</option>
    ))}
</select>
<div className="icon-preview">
    {selectedIcon && (
        <FontAwesomeIcon icon={selectedIcon} />
    )}
</div>
 <Button>Save</Button></div>
</>)
}
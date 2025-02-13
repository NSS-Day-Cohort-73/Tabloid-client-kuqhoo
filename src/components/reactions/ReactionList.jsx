import { useEffect, useState } from "react"
import { getAllReactionTypes } from "../../managers/reactionsManager"
import { Card, ListGroup, ListGroupItem } from "reactstrap"

export const ReactionList = ({loggedInUser}) => {
    const [reactionTypes, setReactionTypes] = useState([])
    const [editingCardId, setEditingCardId] = useState(0)

    useEffect(() => {
        getAllReactionTypes().then((data) => setReactionTypes(data))
    }, [])



return (<>
    <div className="reactions-title">
        <h2>Reactions Management</h2>
    </div>
    <Card className="reaction-list">
        <ListGroup flush>
            <div className="container">
                {reactionTypes.map((rt) => (
                    <ListGroupItem key={rt.id} className="reaction-list-item">
                        <>
                        <div className="reaction-icon">
                        </div>
                        <div className="reaction-name">
                            <h5>{rt.type}</h5>
                            </div></>
                    </ListGroupItem>
                ))}
            </div>
        </ListGroup>
    </Card>
</>)
}
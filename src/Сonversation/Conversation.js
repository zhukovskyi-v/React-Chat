import React, {useEffect, useState} from 'react'
import {Avatar} from '@material-ui/core';
import './conversation.css';
import db from "../firebase";
import {Link} from "react-router-dom";
import firebase from "firebase";

const Сonversation = ({id, name, addNewChat, sortSidebar}) => {
    const [mssg, setMssg] = useState([]);

    useEffect(() => {
        if (id) {
            db.collection('rooms')
                .doc(id)
                .collection('message')
                .orderBy('timestamp', "desc")
                .onSnapshot((snapshot) => (
                    setMssg(snapshot.docs.map((doc) => doc.data()))
                ))
        }

    }, [id])


    function createChat() {
        const chatName = prompt('Write name for chat')
        if (chatName) {
            db.collection('rooms').add({
                name: chatName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
        }
    }

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className='conversation'>
                <div className="conversation__avatar">
                    <Avatar src={`https://i.pravatar.cc/150?u=${id}`}/>
                </div>
                <div className="conversation__info">
                    <h2 className="conversation__title">
                        {name.length < 15 ? name : name.substring(0, 15)+ '...'}
                    </h2>
                    <p className="conversation__mssg">
                        {mssg[0]?.message ? (mssg[0]?.message.length < 20 ? mssg[0]?.message :
                            mssg[0]?.message.substring(0, 20) + '...') : ('')
                        }
                    </p>
                </div>
                <span className="conversation__time">
                    {mssg[0]?.timestamp ? new Date(mssg[0]?.timestamp?.toDate()).toUTCString().substr(6, 10) : ''}
            </span>
            </div>
        </Link>
    ) : (
        <div className='conversation conversation__newChat' onClick={createChat}>
            <h2 className="conversation__title">
                Add new chat
            </h2>
        </div>
    )
}
export default Сonversation;
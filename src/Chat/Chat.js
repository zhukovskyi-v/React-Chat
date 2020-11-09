import React, {useEffect, useRef, useState} from 'react'
import './chat.css';
import {Avatar,} from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import {useParams} from "react-router-dom";
import db from '../firebase';
import {useStateValue} from "../StateProvider";
import firebase from "firebase";

const Chat = () => {
    const [input, setInput] = useState('')
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState('');
    const [mssg, setMssg] = useState([]);
    const [{user}, dispatch] = useStateValue();

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot =>
                setRoomName(snapshot.data().name)
            )
            db.collection("rooms").doc(roomId).collection("message")
                .orderBy("timestamp", "asc")
                .onSnapshot((snapshot) =>
                    setMssg(snapshot.docs.map((doc) => doc.data()))
                );
        }
    }, [roomId]);

    const dummy = useRef()
    const sendMessage = async (e) => {
        await e.preventDefault();
        await db.collection('rooms').doc(roomId)
            .collection('message').add({
                message: input,
                name: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
        await db.collection("rooms").doc(roomId).update({
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        await setInput('')
        await dummy.current.scrollIntoView({behavior: 'smooth'})
        await setTimeout(takeAnswer, 10000)
    }
    const takeAnswer = async () => {
        await fetch('https://api.chucknorris.io/jokes/random')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                db.collection('rooms').doc(roomId)
                    .collection('message').add({
                    message: data.value,
                    name: roomId,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                })
                db.collection("rooms").doc(roomId).update({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });

            });
    }

    return (
        <div className='chat' >
            <div className="chat__header">
                <Avatar src={`https://i.pravatar.cc/150?u=${roomId}`}/>
                <h3 className="chat__header-title">
                    {roomName}
                </h3>
            </div>
            <div className="chat__body">
                {mssg.map((message) => (
                    <div className={`chat__mssg ${message.name === user.displayName && "chat__mssg-receiver"}`}
                         ref={dummy}>
                        {message.name !== user.displayName ? <Avatar src={`https://i.pravatar.cc/150?u=${roomId}`}/> :
                            <Avatar src={user.photoURL}/>}
                        <div className='chat__mssg-body'>
                            <p className="chat__mssg-text">
                                {message.message}
                            </p>
                            <p className="chat__mssg-time">
                                {new Date(message.timestamp?.toDate()).toUTCString().substr(6, 16)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="chat__footer">

                <form className='sbm__form'>
                    <input className='sbm__form-input' value={input} onChange={e => {
                        setInput(e.target.value)
                    }} type='text' placeholder='Type your message'/>
                    <button className='sbm__form-btn' type='submit' onClick={sendMessage}>
                        <SendIcon/>
                    </button>
                </form>

            </div>
        </div>
    );
}
export default Chat;
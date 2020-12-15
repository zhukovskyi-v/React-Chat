import React, {useEffect, useState} from 'react'
import './sidebar.css';
import {Avatar,} from "@material-ui/core";
import Сonversation from "../Сonversation/Conversation";
import db from "../firebase";
import {useStateValue} from "../StateProvider";


const Sidebar = () => {
    const [rooms, setRooms] = useState([]);
    const [{user}, dispatch] = useStateValue();
    const [term, setTerm] = useState('');
    const [searchRoom, setSearchRoom] = useState([]);
    useEffect(() => {
        const unsubsctibe = db.collection("rooms")
            .orderBy('timestamp', "desc")
            .onSnapshot((snapshot) =>
                setRooms(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                )
            );

        return () => {
            unsubsctibe();
        };
    }, []);

    const searchInput = async (e) => {
        await setTerm(e.target.value.toLowerCase())
        await setSearchRoom(rooms.filter(el => {
            if (el.data.name.toLowerCase().indexOf(term) > -1) {
                return el
            }
        }))
    }
    return (
        <section className='sidebar'>
            <div className="sidebar__header">
                <Avatar src={user.photoURL}/>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__search-container">
                    <input placeholder='Search ' type='text' onInput={searchInput}/>
                </div>
            </div>
            <div className="sidebar__chats">
                <div className="sidebar__chats-wrap">
                    <Сonversation title='author' addNewChat/>
                    {term.length === 0 ? rooms.map(room => (
                        <Сonversation key={room.id} id={room.id} name={room.data.name} data={room.data}/>
                    )) : searchRoom.map(room => (
                        <Сonversation key={room.id} id={room.id} name={room.data.name} data={room.data}/>
                    ))}
                </div>
            </div>
        </section>
    )
}
export default Sidebar;

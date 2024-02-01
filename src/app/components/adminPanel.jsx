"use client";
import { useEffect, useState, fragment, useRef, } from 'react'
import OnlinePlayers from "./onlinePlayers";
import axios from "axios";
import moment from "moment";
import KickPlayer from './kickPlayer';
import BanPlayer from './banPlayer';
import { comma } from 'postcss/lib/list';
import Notif from './notif';

const AdminPanel = ({ host, port, password }) => {

    // const [host, setHost] = useState("");
    // const [port, setPort] = useState("");
    // const [password, setPassword] = useState("");

    const [command, setCommand] = useState("");
    const [players, setPlayers] = useState([]);
    const [serverResponse, setServerResponse] = useState([]);
    const [lastFetch, setLastFetch] = useState("-");
    const [broadcastMessage, SetBroadcastMessage] = useState("");

    const [kickPlayerOpen, setKickPlayerOpen] = useState(false)
    const [banPlayerOpen, setBanPlayerOpen] = useState(false)
    const [showNotif, setshowNotif] = useState(false);
    const [notifMessage, setNotifMessage] = useState(false);

    const [isCommandsDisabled, setIsCommandsDisabled] = useState(false);
    const [commandLoading, setCommandLoading] = useState(false);

    useEffect(() => {
        handleSendCommand("showplayers");

        let timer1 = setInterval(() => {
            handleSendCommand("showplayers");
        }, 10000);

        return () => {
            clearInterval(timer1);
        };
    }, [])

    useEffect(() => {
        if (showNotif) {
            setTimeout(() => {
                setshowNotif(false)
            }, 3000);
        }
    }, [showNotif])


    const splitArrayIntoObjects = (arr) => {
        let result = [];

        for (let i = 0; i < arr.length; i += 3) {
            let group = arr.slice(i, i + 3);

            if (group.length === 3) {
                let obj = {
                    name: group[0].replace(/[\n]/g, '').replace(/[\x00]/g, '').replace(/^\s+|\s+$/gm, ''),
                    uid: group[1].replace(/[\n]/g, '').replace(/[\x00]/g, '').replace(/^\s+|\s+$/gm, ''),
                    steamid: group[2].replace(/[\n]/g, '').replace(/[\x00]/g, '').replace(/^\s+|\s+$/gm, '')
                };

                if (obj.name.length > 0) {
                    result.push(obj);
                }

            }
        }

        result.shift();

        return result;
    }

    const handleKickPlayer = (uid) => {
        handleSendCommand("kickplayer " + uid);
    }

    const handleBandPlayer = (uid) => {
        // handleSendCommand("banplayer " + uid);
    }

    const handleSave = () => {
        handleSendCommand("save");
    }

    const handleButtonDisabledTimeout = () => {

        setCommandLoading(false); //for broadcast

        setTimeout(() => {
            setIsCommandsDisabled(false)
        }, 5000);
    }

    const handleBroadcast = () => {
        if (broadcastMessage.lenght === 0) {
            alert("Broadcast message cannot be blank");
        } else {
            handleSendCommand("Broadcast " + broadcastMessage.replace(/[ ]/g, '_'));
        }
    }



    const handleSendCommand = (xcommand = "showplayers") => {

        var bodyFormData = new FormData();
        bodyFormData.append('host', host);
        bodyFormData.append('port', port);
        bodyFormData.append('password', password);
        bodyFormData.append('command', xcommand);

        if (xcommand != "showplayers") {
            setIsCommandsDisabled(true);
            setCommandLoading(true)
        }

        axios({
            method: "post",
            url: `${process.env.NEXT_PUBLIC_API_PORT}/commands.php`,
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                //handle success

                if (xcommand == "showplayers") {
                    var x = response.data.replace(/[\n\x00]/g, ',').split(",");
                    setPlayers(splitArrayIntoObjects(x));
                    setServerResponse(["successfully fetched list of players", ...serverResponse])
                    setLastFetch(moment().format("MM-DD-yyyy hh:mm:ss"));
                } else {
                    var x = response.data.replace(/[\x00]/g, '').replace(/^\s+|\s+$/gm, '')
                    setServerResponse([x, ...serverResponse]);

                    if (xcommand == "save") {
                        setshowNotif(true);
                        setNotifMessage("Save Complete");
                    }

                    if (xcommand.indexOf("Broadcast") > -1) {
                        setshowNotif(true);
                        setNotifMessage("Broadcasted: " + broadcastMessage);
                        SetBroadcastMessage("");
                    }
                }

                if (xcommand != "showplayers") {
                    handleButtonDisabledTimeout();
                }


            })
            .catch(function (response) {
                //handle error
                console.log("err", response);
            });
    }

    return (
        <div className="w-7/12 px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto shrink-0">

            <Notif
                notifMessage={notifMessage}
                showNotif={showNotif}
                setShowNotif={setshowNotif}
            />

            <form className="space-y-8 divide-y divide-gray-200 border rounded-xl py-5 px-5">
                <div className="space-y-8 divide-y divide-gray-200">
                    <div>
                        <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Palworld Rcon Commands</h3>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-6">

                                <button
                                    disabled={isCommandsDisabled}
                                    onClick={handleSave}
                                    type="button"
                                    class={`${isCommandsDisabled ? 'cursor-not-allowed bg-gray-400 hover:bg-gray-500' : 'bg-gray-800 hover:bg-gray-900'} w-60 text-white focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700`}
                                >
                                    Save
                                </button>

                                <button
                                    disabled={isCommandsDisabled}
                                    data-hs-overlay="#hs-basic-modal"
                                    onClick={() => setKickPlayerOpen(true)}
                                    type="button"
                                    class={`${isCommandsDisabled ? 'cursor-not-allowed bg-gray-400 hover:bg-gray-500' : 'bg-gray-800 hover:bg-gray-900'} w-60 text-white focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700`}
                                >
                                    Kick Payer
                                </button>
                                <button
                                    disabled={isCommandsDisabled}
                                    data-hs-overlay="#hs-ban-modal"
                                    onClick={() => setBanPlayerOpen(true)}
                                    type="button"
                                    class={`${isCommandsDisabled ? 'cursor-not-allowed bg-gray-400 hover:bg-gray-500' : 'bg-gray-800 hover:bg-gray-900'} w-60 text-white focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700`}
                                >
                                    Ban Player
                                </button>
                            </div>

                            <KickPlayer
                                handleKickPlayer={handleKickPlayer}
                                open={kickPlayerOpen}
                                setOpen={setKickPlayerOpen}
                            />

                            <BanPlayer
                                handleBandPlayer={handleBandPlayer}
                                open={banPlayerOpen}
                                setOpen={setBanPlayerOpen}
                            />

                            <div className="sm:col-span-6">
                                <label for="hs-about-hire-us-1" className="block mb-2 text-sm text-slate-700 font-medium dark:text-slate-700">Broadcast Message</label>
                                <textarea
                                    disabled={commandLoading ? true : false}
                                    value={broadcastMessage}
                                    maxLength={50}
                                    onChange={(e) => SetBroadcastMessage(e.target.value)}
                                    id="hs-about-hire-us-1"
                                    name="hs-about-hire-us-1"
                                    rows="4"
                                    className={`${commandLoading ? "cursor-not-allowed disabled" : ""} py-3 px-4 block w-full border-1 border-solid border-2 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none`}></textarea>
                                <p className='py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200'>
                                    {"There is currently a Game Server bug that prevents sending broadcasts with spaces."}
                                    <br />
                                    {"This Command replace spaces with underscores: Hello from admin to Hello_from_admin"}
                                </p>
                                <div className="mt-6 grid">
                                    <button
                                        onClick={handleBroadcast}
                                        type="button"
                                        className={`${commandLoading ? "cursor-not-allowed disabled" : ""} text-white w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600`}>Broadcast</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form >


            <div className="mt-20">
                <div className='flex flex-row justify-between'>
                    <h2 className="text-lg font-bold md:text-2xl md:leading-tight text-gray-700">Online Players</h2>
                    <p className='text-center px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200'>Last Refreshed: {lastFetch}</p>
                </div>
                <OnlinePlayers players={players} />
            </div>

        </div >
    );
}

export default AdminPanel;
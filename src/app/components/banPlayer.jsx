"use client";

import { Dialog, Transition } from '@headlessui/react'
import { useEffect, useState, Fragment, useRef, } from 'react'

const KickPlayer = ({ handleBandPlayer, open, setOpen }) => {

    const [kickuid, setKickUID] = useState("");

    const kickPlayer = () => {
        if (kickuid.length === 0) {
            alert("Please provide UID or Steam ID of the user you want to kick")
        } else {
            handleBandPlayer(kickuid)
            setKickUID("")
            setOpen(false)
        }
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setOpen}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                        Ban Player
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="mt-1 text-gray-800 dark:text-gray-400">
                                            {"Kicks a specific player off the server, a handy tool for dealing with disruptive or rule-breaking players."}
                                        </p>
                                        <p className="mt-5">
                                            <i className='text-red-600 font-bold'>Note:</i>{" At this time it is not possible to unban a player using in game commands. "}
                                            <br />
                                            {"In order to do this you will need to log into your FTP client and head to the following location: /Pal/Saved/SaveGames/banlist.txt"}
                                            <br />
                                            {"Delete the steam-id from this list and it will unban the player once saved and uploaded. This method takes 2 minutes to take effect."}
                                        </p>
                                        <p>
                                            <input
                                                type="text"
                                                name="kick-uid"
                                                id="kick-uid"
                                                placeholder='UID of player'
                                                className="mt-5 py-3 px-4 block w-full border-1 border-solid border-2 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                                                onChange={(e) => setKickUID(e.target.value)}
                                                autoComplete='false'
                                            />
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"

                                    onClick={kickPlayer}
                                >
                                    Ban Player
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                                    onClick={() => setOpen(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

export default KickPlayer;

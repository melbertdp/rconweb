const OnlinePlayers = ({ players }) => {

    return (
        <div className="flex flex-col border rounded-xl py-5 px-5 mt-2">
            <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="overflow-hidden">
                        {
                            players.length > 0 ?
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Name</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">UID</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">SteamID</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {
                                            players.map((player) => {
                                                return (
                                                    <tr key={player.uid}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{player.name}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{player.uid}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-800 dark:text-gray-200">
                                                            <a target="blank" href={"https://steamid.net/?q=" + player.steamid}>{player.steamid}</a>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                :
                                <div className="text-center px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                    No Online Players
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OnlinePlayers;
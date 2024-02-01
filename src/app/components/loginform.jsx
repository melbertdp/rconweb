const LoginForm = ({ handleSubmit, setPort, setHost, setPassword }) => {
    return (
        <main className="w-full max-w-md mx-auto p-6">
            <div className="mt-0 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <div className="p-4 sm:p-7">
                    <div className="text-center">
                        <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Palworld Admin Tool</h1>
                    </div>

                    <div className="mt-5">
                        {/* <!-- Form --> */}
                        <form>
                            <div className="grid gap-y-4">
                                {/* <!-- Form Group --> */}
                                <div>
                                    <label for="email" className="block text-sm mb-2 dark:text-white">Server Host IP</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="host"
                                            name="host"
                                            className="py-3 px-4 block w-full border-1 border-solid border-2 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                                            required
                                            onChange={(e) => setHost(e.target.value)}
                                        />
                                    </div>
                                </div>
                                {/* <!-- End Form Group --> */}

                                {/* <!-- Form Group --> */}
                                <div>
                                    <label
                                        for="password"
                                        className="block text-sm mb-2 dark:text-white"
                                    >
                                        Server Host Port
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="port"
                                            name="port"
                                            className="border-1 border-solid border-2 border-gray-200 py-3 px-4 block w-full rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                                            required
                                            onChange={(e) => setPort(e.target.value)}
                                        />
                                        <div className="hidden absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                                            <svg className="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <p className="hidden text-xs text-red-600 mt-2" id="password-error">8+ characters required</p>
                                </div>
                                {/* <!-- End Form Group --> */}

                                {/* <!-- Form Group --> */}
                                <div>
                                    <label
                                        for="password"
                                        className="block text-sm mb-2 dark:text-white"
                                    >
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            className="py-3 px-4 block w-full border-1 border-solid border-2 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                                            required
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <div className="hidden absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                                            <svg className="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <p className="hidden text-xs text-red-600 mt-2" id="confirm-password-error">Password does not match the password</p>
                                </div>
                                {/* <!-- End Form Group --> */}

                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                    Connect
                                </button>
                            </div>
                        </form>
                        {/* <!-- End Form --> */}

                        <div className="mt-5 px-6 py-4 text-sm font-medium text-gray-800 dark:text-gray-200">
                            {"This tool will display the players on your Palworld server, as long as you have RCON enabled and a Server Admin Password."}
                            <br />
                            <br />
                            {"This app doesn't have any storage backend, so it only works while your browser is on this page and connected."}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default LoginForm;
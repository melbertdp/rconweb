

const ErrorToast = ({ onClose }) => {




    return (
        <div class="max-w-xs mt-5 absolute ml-5 right-10 bg-red-500 text-sm text-white rounded-xl shadow-lg text-right" role="alert">
            <div class="flex p-4">
                Unable to connect to server

                <div class="ms-auto">
                    <button
                        onClick={() => onClose()}
                        type="button"
                        class="inline-flex flex-shrink-0 justify-center items-center h-5 w-5 rounded-lg text-white hover:text-white opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100"
                    >
                        <span class="sr-only">Close</span>
                        <svg class="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ErrorToast;
import {Movie} from "@/lib/api/types";
import React, {useEffect, useState} from "react";
import Modal from "react-modal";

interface Props extends Pick<Movie, 'torrents'> {
    modalIsOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TorrentModal = ({torrents, modalIsOpen, setIsOpen}: Props) => {
    const [appElement, setAppElement] = useState<HTMLElement | undefined>();
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: 'transparent',
            border: 'none'
        },
    };
    const closeModal = () => {
        setIsOpen(false)
    }

    const openTorrent = (url: string) => {
        window.open(url, '_blank')
        closeModal();
    }

    useEffect(() => {
        const el = document.getElementById("modals");
        if (el)
            setAppElement(el);
        console.log(el);
    }, [])
    return (
        <>
            {appElement && <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                appElement={appElement}
                ariaHideApp={false}
                contentLabel="Show video"
            >
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div
                            className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Выберите качество
                            </h3>
                            <button type="button"
                                    onClick={closeModal}
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    data-modal-hide="default-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                     fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-4 md:p-5 space-y-4">
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                {torrents?.map(torrent => (
                                    <button data-modal-hide="default-modal" type="button"
                                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full mb-2"
                                            onClick={() => {
                                                openTorrent(torrent.url)
                                            }}>
                                        {torrent.quality} - {torrent.video_codec}
                                    </button>
                                ))}

                            </p>
                        </div>

                    </div>
                </div>
            </Modal>
            }
        </>
    );

}
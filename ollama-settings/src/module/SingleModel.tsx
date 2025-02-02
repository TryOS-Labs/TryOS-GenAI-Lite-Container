/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Modal from "react-modal";
import { TDownloadStatus, TSearchedModel } from "../types";
import { X } from "lucide-react";
import axios from "axios";

type Props = {
    selectedModel: TSearchedModel;
    setDownloadStatus: Dispatch<SetStateAction<TDownloadStatus>>;
};

function SingleModel({ selectedModel, setDownloadStatus }: Props) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedParameter, setSelectedParameter] = useState("");
    const [modelSize, setModelSize] = useState<string>("");
    const [sizeLoading, setSizeLoading] = useState(false);

    // Open modal with selected model data
    const openModal = () => {
        setModalIsOpen(true);
    };

    // Close modal
    const closeModal = () => {
        setModalIsOpen(false);
    };

    useEffect(() => {
        const fetchModelSize = async (search: string) => {
            setSizeLoading(true);
            try {
                // Fetch HTML content
                const searchQuery = `${selectedModel.title}:${search}`;
                const { data } = await axios.get(
                    `http://localhost:3001/getsize?query=${searchQuery}`
                );

                console.log(data);
                // setSearchModels(data);
                setModelSize(data);
                setSizeLoading(false);
            } catch {
                console.error("Error scraping website:");
                setSizeLoading(false);
            }
        };
        if (selectedParameter !== "") {
            console.log(selectedParameter);
            fetchModelSize(selectedParameter);
        }
    }, [selectedParameter, selectedModel]);

    useEffect(() => {
        window.addEventListener("beforeunload", alertUser);
        return () => {
            window.removeEventListener("beforeunload", alertUser);
        };
    }, []);
    const alertUser = (e: any) => {
        e.preventDefault();
        e.returnValue = "Are you sure you want to close?";
    };

    const handleModelDownload = async () => {
        try {
            closeModal();
            setDownloadStatus({
                status: true,
                progress: 0,
                modelName: selectedModel.title,
                message: "Downloading model : ",
            });
            const model = selectedParameter
                ? `${selectedModel.title}:${selectedParameter}`
                : selectedModel.title;

            const response = await fetch("http://localhost:11434/api/pull", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ model, stream: true }),
            });
            const reader = response?.body?.getReader();

            while (true) {
                const { value, done } = await reader!.read();
                if (done) break;
                const decoder = new TextDecoder("utf-8");
                const decodedString = decoder.decode(value);

                // console.log(decodedString);
                console.log("Received", decodedString);
                const parsedData = JSON.parse(
                    decodedString.trim().split("\n")[0]
                );
                console.log("Received", parsedData);
                if (parsedData?.total && parsedData?.completed) {
                    const progress =
                        (parsedData.completed / parsedData.total) * 100;
                    setDownloadStatus(
                        (prev: TDownloadStatus): TDownloadStatus => ({
                            ...prev,
                            progress,
                        })
                    );
                }
            }

            console.log("Response fully received");

            setDownloadStatus({
                status: true,
                progress: 100,
                modelName: selectedModel.title,
                message: "Model downloaded successfully",
            });

            // console.log(response.data);
        } catch (error: any) {
            //
            console.log("Failed to download model", error.message);
            setDownloadStatus(
                (prev: TDownloadStatus): TDownloadStatus => ({
                    ...prev,
                    status: false,
                    message: "Failed to download model",
                })
            );
        }
    };
    return (
        <div>
            <h3 onClick={openModal} className="text-lg cursor-pointer">
                {selectedModel.title}
            </h3>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Model Details"
                className="modal-content text-white border-2 border-[#1F2937] relative"
                overlayClassName="modal-overlay"
            >
                <div className="p-5">
                    <h2 className="text-2xl font-bold">
                        {selectedModel.title}
                    </h2>
                    <p className="mt-2">{selectedModel.description}</p>
                    {selectedModel.modelSizes.length > 0 && (
                        <>
                            <h3 className="mt-4 font-semibold text-sm">
                                Parameters:
                            </h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                                <select
                                    className="w-full bg-[#1F2937]  text-sm py-2 px-4 rounded-md"
                                    value={selectedParameter}
                                    onChange={(e) => {
                                        setSelectedParameter(e.target.value);
                                    }}
                                >
                                    <option value="">Select a parameter</option>
                                    {selectedModel.modelSizes.map(
                                        (size, index) => (
                                            <option key={index} value={size}>
                                                {size}
                                            </option>
                                        )
                                    )}
                                </select>

                                {modelSize && !sizeLoading && (
                                    <p className="text-sm">
                                        Model size : {modelSize}
                                    </p>
                                )}
                                {sizeLoading && (
                                    <p className="text-sm">
                                        Fetching model size...
                                    </p>
                                )}
                            </div>
                        </>
                    )}
                    <button
                        onClick={closeModal}
                        className="mt-4 absolute top-0 right-4 text-white  rounded-md "
                    >
                        <X className="w-4 h-4" />
                    </button>

                    <button
                        onClick={handleModelDownload}
                        disabled={
                            (!modelSize || sizeLoading) &&
                            selectedModel.modelSizes.length > 0
                        }
                        className={`text-sm bg-blue-800 ${
                            (!modelSize || sizeLoading) &&
                            selectedModel.modelSizes.length > 0
                                ? "bg-opacity-50 text-gray-400"
                                : ""
                        } px-3 py-2 rounded-md my-2`}
                    >
                        Download Model
                    </button>
                </div>
            </Modal>
        </div>
    );
}

export default SingleModel;

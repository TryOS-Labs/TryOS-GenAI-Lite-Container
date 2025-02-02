import { useEffect, useState } from "react";
import { axiosReq } from "./lib/axios";
import InstalledModel from "./module/InstalledModel";
import SearchModel from "./module/SearchModel";
import DownloadProgress from "./module/DownloadProgress";
import { TDownloadStatus } from "./types";

function App() {
    const [ollamaVersion, setOllamaVersion] = useState<string>("");
    const [downloadStatus, setDownloadStatus] = useState<TDownloadStatus>({
        status: false,
        progress: 0,
        modelName: "",
    });
    useEffect(() => {
        const fetchOllamaVersion = async () => {
            const response = await axiosReq.get("/version");
            console.log(response.data);
            setOllamaVersion(response.data.version);
        };

        fetchOllamaVersion();
    }, []);
    return (
        <div className="bg-[#111827] h-full min-h-screen w-full">
            <div className="w-full max-w-[1100px] mx-auto px-2 md:px-4 lg:px-0">
                <div className="py-4 flex justify-between w-full">
                    <h2 className="text-white text-md md:text-lg font-semibold">
                        TryOS-GenAI-Lite-Container
                    </h2>
                    <p className="text-white flex items-center gap-2">
                        <span
                            className={
                                ollamaVersion
                                    ? "blink_active"
                                    : "blink_inactive"
                            }
                        ></span>
                        <span>
                            Ollama {ollamaVersion && `v${ollamaVersion}`}
                        </span>
                    </p>
                </div>

                {(downloadStatus.status || downloadStatus?.modelName) && (
                    <DownloadProgress downloadStatus={downloadStatus} />
                )}
                <InstalledModel ollamaVersion={ollamaVersion} />
                <SearchModel setDownloadStatus={setDownloadStatus} />
            </div>
        </div>
    );
}

export default App;

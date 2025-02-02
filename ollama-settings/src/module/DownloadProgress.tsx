import { TDownloadStatus } from "../types";

type Props = {
    downloadStatus: TDownloadStatus;
};

const DownloadProgress = ({ downloadStatus }: Props) => {
    return (
        <div className="p-4 bg-[#1F2937] my-4 rounded-md">
            <h3 className="text-md mb-3 flex gap-4 text-white items-center">
                <span>{downloadStatus.message}</span>
                <span className="italic text-blue-400">
                    {downloadStatus?.modelName}
                </span>
                <span className="text-sm">
                    {downloadStatus?.progress > 0 &&
                        `${Math.floor(downloadStatus?.progress)}%`}
                </span>
            </h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${downloadStatus?.progress}%` }}
                ></div>
            </div>
        </div>
    );
};

export default DownloadProgress;

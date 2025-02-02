import { Dispatch, SetStateAction } from "react";
import { TDownloadStatus, TSearchedModel } from "../types";
import SingleModel from "./SingleModel";

type Props = {
    searchModels: TSearchedModel[];
    setDownloadStatus: Dispatch<SetStateAction<TDownloadStatus>>;
};

function SearchResult({ searchModels, setDownloadStatus }: Props) {
    return (
        <div>
            {searchModels.map((model, index) => (
                <div key={index} className="bg-[#1F2937] rounded-md p-4 mb-4">
                    {/* <h3 className="text-lg">{model.title}</h3> */}
                    <SingleModel
                        selectedModel={model}
                        setDownloadStatus={setDownloadStatus}
                    />
                    <p className="text-sm py-4">{model.description}</p>
                    <div className="flex gap-2 text-xs">
                        {model.modelSizes.map((size, index) => (
                            <span
                                key={index}
                                className="bg-[#2D3B4A] text-white rounded-md px-3 py-1"
                            >
                                {size}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SearchResult;

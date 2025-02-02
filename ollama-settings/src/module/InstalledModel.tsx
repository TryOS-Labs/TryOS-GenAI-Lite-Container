/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { TModel } from "../types";
import { axiosReq } from "../lib/axios";
import _ from "lodash";

type Props = {
    ollamaVersion: string;
};

const InstalledModel = ({ ollamaVersion }: Props) => {
    const [installedModels, setInstalledModels] = useState<TModel[]>([]);
    useEffect(() => {
        const fetchModels = async () => {
            const response = await axiosReq.get("/tags");
            console.log(response.data);

            const models = response.data.models.map((model: any) => ({
                name: _.capitalize(model?.name.split(":")[0]),
                parameter: model?.details?.parameter_size,
            }));

            setInstalledModels(models);
        };

        fetchModels();
    }, []);
    return (
        <div className="text-white border-b-2 border-[#1F2937]">
            <h3 className="text-lg">Installed Models</h3>
            <div className="py-2">
                {installedModels && ollamaVersion ? (
                    installedModels.map((model, index) => (
                        <p
                            key={index}
                            className="px-4 py-2 mb-2 text-sm bg-[#1F2937] rounded-md flex gap-4"
                        >
                            <span>{model.name}</span>
                            <span>{model.parameter}</span>
                        </p>
                    ))
                ) : ollamaVersion ? (
                    <h3 className="px-4 py-2 mb-2 text-sm bg-[#1F2937] rounded-md flex justify-center">
                        No model found.
                    </h3>
                ) : (
                    <h3 className="px-4 py-2 mb-2 text-sm bg-[#1F2937] rounded-md flex justify-center text-red-500 font-semibold text-lg">
                        Check your ollama connection
                    </h3>
                )}
            </div>
        </div>
    );
};

export default InstalledModel;

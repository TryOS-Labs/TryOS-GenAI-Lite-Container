export type TModel = {
    name: string;
    parameter: string;
};

export type TSearchedModel = {
    title: string;
    description: string;
    modelSizes: string[];
};

export type TDownloadStatus = {
    status: boolean;
    progress: number;
    modelName: string;
    message?: string;
};

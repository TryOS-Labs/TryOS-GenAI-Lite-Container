/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { Search } from "lucide-react";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { TDownloadStatus, TSearchedModel } from "../types";
import SearchResult from "./SearchResult";

type Props = {
    setDownloadStatus: Dispatch<SetStateAction<TDownloadStatus>>;
};

function SearchModel({ setDownloadStatus }: Props) {
    const [search, setSearch] = useState("");
    const [searchModels, setSearchModels] = useState<TSearchedModel[]>([]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // Fetch HTML content
            const { data } = await axios.get(
                `http://localhost:3001/search?query=${search}`
            );

            console.log(data);
            setSearchModels(data);
        } catch {
            console.error("Error scraping website:");
        }
    };
    return (
        <div className="text-white py-4">
            <h3 className="text-lg">Add New Models</h3>
            <form
                onSubmit={handleSubmit}
                className="my-2 bg-[#151b25] border border-[#1F2937] rounded-md flex items-center"
            >
                <input
                    type="text"
                    name=""
                    id=""
                    className="bg-transparent  w-full rounded-md p-2  text-sm me-4 outline-none "
                    placeholder="Enter model name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button type="submit">
                    <Search className="w-5 h-5 me-2 cursor-pointer" />
                </button>
            </form>

            <SearchResult
                searchModels={searchModels}
                setDownloadStatus={setDownloadStatus}
            />
        </div>
    );
}

export default SearchModel;

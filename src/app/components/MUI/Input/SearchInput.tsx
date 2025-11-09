import {useState } from 'react';

import Image from "next/image";
import styleBtn from "../styleMaterials.module.css"
import searchIcon from "../../../../../public/icons/loupe.png";

interface SearchInputProps {
    onSearch: (value: string) => void; // Hàm callback
}

export default function SearchInput({ onSearch }: SearchInputProps) {
    const [inputValue, setInputValue] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // tránh load lai jtrang 
        onSearch(inputValue.trim()); 
    };

    return (
        <form onSubmit={handleSubmit} className="input-group my-3">
            <input 
                type="text" 
                className="form-control" 
                placeholder="Nhập từ khóa tìm kiếm..." 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button className="btn btn-dark" type="submit" id="">
                <Image
                    src={searchIcon}
                    alt="Thêm mới"
                    className={`${styleBtn.iconLoupe}`}
                />
            </button>
        </form>
    );
}

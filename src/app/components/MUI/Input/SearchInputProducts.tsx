import Image from "next/image";
import styleBtn from "../styleMaterials.module.css"
import searchIcon from "../../../../../public/icons/loupe.png";

interface SearchInputProductsProps {
    keyword: string;
    setKeyword: (value: string) => void;
    handleSearchByKeyword: (keyword: string) => void;
}

export default function SearchInputProducts({keyword, setKeyword, handleSearchByKeyword}: SearchInputProductsProps) {
    
    return (
        <div className="input-group my-3">
            <input 
                type="text" 
                className="form-control" 
                placeholder="Nhập từ khóa tìm kiếm..." 
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                
                />
            <button className="btn btn-dark" type="submit" id=""
                onClick={() => handleSearchByKeyword(keyword)}
            >
                <Image
                    src={searchIcon}
                    alt="Thêm mới"
                    className={`${styleBtn.iconLoupe}`}
                />
            </button>
        </div>
    );
}
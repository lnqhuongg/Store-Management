import Image from "next/image";
import styleBtn from "../styleMaterials.module.css"
import searchIcon from "../../../../../public/icons/loupe.png";


export default function SearchInput() {
    return (
        <div className="input-group my-3">
            <input type="text" className="form-control" placeholder="Nhập từ khóa tìm kiếm..." />
            <button className="btn btn-dark" type="button" id="button-addon2">
                <Image
                    src={searchIcon}
                    alt="Thêm mới"
                    className={`${styleBtn.iconLoupe}`}
                />
            </button>
        </div>
    );
}
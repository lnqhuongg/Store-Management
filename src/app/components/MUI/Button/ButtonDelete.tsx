import Image from "next/image";
import styleBtn from "../styleMaterials.module.css"
import deleteIcon from "../../../../../public/icons/bin.png";


export default function ButtonDelete() {
    return (
        <button className="btn btn-sm btn-danger">
            <Image
                src={deleteIcon}
                alt="Xóa"
                className={`${styleBtn.iconEdit}`}
            />
        </button>
    );
}
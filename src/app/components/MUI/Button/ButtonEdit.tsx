import Image from "next/image";
import styleBtn from "../styleMaterials.module.css"
import editIcon from "../../../../../public/icons/edit.png";


export default function ButtonEdit() {
    return (
        <button className="btn btn-sm btn-warning me-2">
            <Image
                src={editIcon}
                alt="Chỉnh sửa"
                className={`${styleBtn.iconEdit}`}
            />
        </button>
    );
}
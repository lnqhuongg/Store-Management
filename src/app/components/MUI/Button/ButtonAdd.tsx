import Image from "next/image";
import styleBtn from "../styleMaterials.module.css"
import addIcon from "../../../../../public/icons/add.png";


export default function ButtonAdd() {
    return (
        <button className="d-flex align-items-center btn btn-secondary">
            Thêm mới
            <Image
                src={addIcon}
                alt="Thêm mới"
                className={`${styleBtn.iconAdd}`}
            />
        </button>
    );
}
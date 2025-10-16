import Image from "next/image";
import styleBtn from "../styleMaterials.module.css"
import addIcon from "../../../../../public/icons/add.png";

// update 16/10/2025
interface AddButtonProps {
  onClick: () => void;
}

export default function ButtonAdd( { onClick }: AddButtonProps ) {
    return (
        <button type="button" 
                className="d-flex align-items-center btn btn-secondary"
                onClick={onClick}
        >
            Thêm mới
            <Image
                src={addIcon}
                alt="Thêm mới"
                className={`${styleBtn.iconAdd}`}
            />
        </button>
    );
}
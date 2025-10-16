import Image from "next/image";
import styleBtn from "../styleMaterials.module.css"
import deleteIcon from "../../../../../public/icons/bin.png";

// update 16/10/2025
interface DeleteButtonProps {
  onClick: () => void;
}

export default function ButtonDelete( { onClick }: DeleteButtonProps ) {
    return (
        <button type="button"
                className="btn btn-sm btn-danger"
                onClick={onClick}
        >
            <Image
                src={deleteIcon}
                alt="Xóa"
                className={`${styleBtn.iconEdit}`}
            />
        </button>
    );
}
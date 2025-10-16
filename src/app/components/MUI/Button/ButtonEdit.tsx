import Image from "next/image";
import styleBtn from "../styleMaterials.module.css"
import editIcon from "../../../../../public/icons/edit.png";

// update 16/10/2025
interface EditButtonProps {
  onClick: () => void;
}

export default function ButtonEdit( { onClick }: EditButtonProps ) {
    return (
        <button type="button"
                className="btn btn-sm btn-warning me-2"
                onClick={onClick}
        >
            <Image
                src={editIcon}
                alt="Chỉnh sửa"
                className={`${styleBtn.iconEdit}`}
            />
        </button>
    );
}
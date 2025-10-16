import Image from "next/image";
import styleBtn from "../styleMaterials.module.css"
import detailIcon from "../../../../../public/icons/eye.png";

interface DetailButtonProps {
  onClick: () => void;
}

export default function ButtonDetail( { onClick }: DetailButtonProps ) {
    return (
        <button type="button"
                className="btn btn-sm btn-warning me-2"
                onClick={onClick}
        >
            <Image
                src={detailIcon}
                alt="Chỉnh sửa"
                className={`${styleBtn.iconEdit}`}
            />
        </button>
    );
}
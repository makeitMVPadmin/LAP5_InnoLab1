import EditIcon from "../../assets/images/edit.svg"
import { STYLES } from "../../constants/styles"
import { Button } from "../ui/button";

const EditButton = ({ handleClick, isEditing, isEditMode }) => (
    <Button
        onClick={handleClick}
        variant="ghost"
        size="icon"
        className={`${STYLES.secondaryButton} w-28 flex gap-2 ${isEditMode ? "" : "hidden"}`}
    >
        <img src={EditIcon} alt="Edit submission" aria-hidden="true" />
        <span>Edit</span>
    </Button>
);

export default EditButton
import ImportIcon from "../../assets/images/importIcon.svg"
import CloseIcon from "../../assets/images/Close.svg"

const ImportCard = ({ fileName, handleDelete }) => {
    return (
        <article className="bg-MVP-light-gray w-36 h-32 mt-8 px-4 flex flex-col gap-4 justify-center items-center relative">
            <button className="w-11 h-11 absolute -right-4 top-0" type="button" onClick={handleDelete}>
                <img className="w-2 h-2" src={CloseIcon} alt="delete icon" />
            </button>
            <img src={ImportIcon} alt="import icon" className="h-10 basis-2" />
            <span className="font-poppins break-all	max-w-24 line-clamp-2 basis-6">{fileName}</span>
        </article>
    )
}

export default ImportCard
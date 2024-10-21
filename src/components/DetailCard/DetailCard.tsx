const DetailCard = ({ text }) => {
    return (
        <div className="inline-flex justify-center items-center rounded-full bg-MVP-yellow px-4 h-8 max-w-fit">
            <span className="font-gilroy font-bold">{text}</span>
        </div>
    )
}

export default DetailCard
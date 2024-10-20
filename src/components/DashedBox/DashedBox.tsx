import ImportIcon from "../../assets/images/importIcon.svg"

const DashedBox = () => {
    return (
        <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="95%" height="95%" fill="transparent"
                    stroke="black" stroke-width="4px" stroke-dasharray="2 2 2 2"
                    rx="20" ry="20" stroke-linejoin="round" vector-effect="non-scaling-stroke" />
            </svg>
            <div className="absolute top-10 font-bold flex flex-col gap-5 justify-center pl-8">
                <img className="h-9" src={ImportIcon} alt="drag and drop area" />
                <p>drag and drop file or <span className="underline underline-offset-2 text-MVP-dark-blue">choose file</span></p>
            </div>
        </div>
    );
};


export default DashedBox
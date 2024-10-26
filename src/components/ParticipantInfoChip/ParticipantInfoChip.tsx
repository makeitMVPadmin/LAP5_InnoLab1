const ParticipantInfoChip = ({ integer, fullName, role }) => {
    return (
        <div className="flex items-center gap-[0.5rem] py-[0.4rem] pl-[0.6rem] pr-[1rem] font-gilroy rounded-[2rem] border border-black bg-MVP-white">
            <img
                className="h-[2.2rem] w-[2.2rem] rounded-full"
                src={`https://i.pravatar.cc/300?img=${integer + 10}`}
                alt={`Profile image of ${fullName}`}
                loading="lazy"
            />
            <div className="flex flex-col justify-between">
                <h3 className="text-MVP-black text-[1.3rem] font-extrabold">{fullName}</h3>
                <p className="relative text-MVP-gray text-[0.8rem] bottom-[0.3rem] font-poppins">{role}</p>
            </div>
        </div>
    );
};

export default ParticipantInfoChip;

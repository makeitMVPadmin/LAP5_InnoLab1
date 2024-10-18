const ParticipantInfoChip = ({ integer, fullName, role }) => {
    return (
        <div className="flex py-[6.4px] pl-[9.6px] pr-[16px] font-gilroy rounded-[32px] border border-black bg-white gap-[0.4rem] items-center">
            <img className="h-[35.2px] w-[35.2px] rounded-full" src={`https://i.pravatar.cc/300?img=${integer + 10}`} alt={`${fullName}-chip-image`} />
            <div className="min-w-[4rem]">
                <h2 className="text-[#000] text-[20px] font-extrabold leading-[115.645%] ligature-off font-poppins">{fullName}</h2>
                <p className="text-[#444] text-[11.2px] font-medium leading-[115.645%] ligature-off font-poppins">{role}</p>
            </div>
        </div>
    );
};

export default ParticipantInfoChip;

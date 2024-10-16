const ParticipantInfoChip = ({integer, fullName, role}) => {

    return (
        <div className="flex py-[8px] px-[12px] font-gilroy rounded-[40px] border border-black bg-white gap-[0.5rem] items-center">
            <img className="h-[44px] w-[44px] rounded-full " src={`https://i.pravatar.cc/300?img=${integer+10}`} alt={`${fullName}-chip-image`} />
            <div className="min-w-[5rem]">
                <h2 className="text-[#000] text-[25px] font-extrabold leading-[115.645%] ligature-off font-poppins">{fullName}</h2>
                <p className="text-[#444] text-[14px] font-medium leading-[115.645%] ligature-off font-poppins">{role}</p>
            </div>
        </div>
    );
};

export default ParticipantInfoChip;
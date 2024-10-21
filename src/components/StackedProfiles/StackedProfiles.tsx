const StackedProfiles = () => {
    const numberOfProfiles = ["sam", "jam", "ham", "tam", "yes"];

    return (
        <div className="relative flex">
            {numberOfProfiles.map((profile, i) => (
                <img
                    key={profile}  // Adding key prop for React
                    className={`h-[2.2rem] w-[2.2rem] rounded-full border-white border-2 absolute transition-transform duration-300 transform`}
                    src={`https://i.pravatar.cc/300?img=${i + 10}`}
                    alt={`${profile}'s profile`}
                    style={{ left: `${i * 25}px`, zIndex: numberOfProfiles.length - 1 + i }}
                />
            ))}
        </div>
    );
};

export default StackedProfiles;

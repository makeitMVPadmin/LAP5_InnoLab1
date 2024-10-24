import { useState, useRef, useEffect } from 'react';
import CommuntiArrowStyled from '../CommunitiArrowStyled/CommuntiArrowStyled';
import { Button } from "../ui/button";

type Tab = {
  id: string;
  label: string;
  content: string;
};

type HorizontalTabMenuProps = {
  tabs: Tab[];
  initialActiveTab?: number;
};

const HorizontalTabMenu = ({ 
  tabs, 
  initialActiveTab = 0 
}: HorizontalTabMenuProps) => {
  const [activeTab, setActiveTab] = useState(initialActiveTab);
  const [startIndex, setStartIndex] = useState(0);
  const visibleTabs = 3;
  const tabsRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const handlePrevClick = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (startIndex + visibleTabs < tabs.length) {
      setStartIndex(startIndex + 1);
    }
  };

  return (
    <div className="w-full mb-[1.9rem] px-[2rem]" role="tabpanel" aria-labelledby="tabbed-navigation">
        <div className="relative flex w-full mx-auto my-[2.5rem]">
            <CommuntiArrowStyled 
                direction='left'
                className="py-[1.6rem] px-[1.2rem]"
                onClick={handlePrevClick}
                aria-label="Show previous tabs"
                disabled={startIndex === 0}
            />
            <div
                ref={tabsRef}
                className="flex overflow-hidden h-[5.2rem]"
                role="tablist"
            >
                {tabs.map((tab, index) => (
                    <Button
                        key={tab.id}
                        variant="ghost"
                        role="tab"
                        aria-selected={index === activeTab}
                        className={`flex-shrink-0 ${
                            index === activeTab ? 'bg-MVP-soft-blue text-secondary-foreground border-b-[0.5rem] border-b-MVP-dark-blue' : 'border-b-[0.4rem] border-b-MVP-black'
                        } ${index < startIndex || index >= startIndex + visibleTabs ? 'invisible' : ''}
                        h-full w-[calc(33%_-_0.85rem)] mx-[0.5rem] rounded-tl-[0.5rem] rounded-tr-[0.5rem] rounded-bl-[0] rounded-br-[0]`}
                        onClick={() => handleTabClick(index)}
                        style={{
                          transform: `translateX(${startIndex !== 0 ? `calc(-${startIndex * 100}% - 1rem)` : '0'})`,
                          transition: 'transform 0.3s ease-in-out',
                        }}
                        id={`tab-${index}`}
                        aria-controls={`panel-${index}`}
                    >
                        <p className={`text-MVP-black font-gilroy text-[1.3rem] font-extrabold normal-case leading-[115.645%] whitespace-normal ${index === activeTab && 'text-MVP-dark-blue'}`}>
                            {tab.label}
                        </p>
                    </Button>
                ))}
            </div>
            <CommuntiArrowStyled 
                direction='right'
                className="py-[1.6rem] px-[1.2rem]"
                onClick={handleNextClick}
                aria-label="Show more tabs"
                disabled={startIndex === tabs.length - visibleTabs}
            />
        </div>
        <p 
            className='text-[#000] w-full font-poppins text-[1.2rem] font-normal leading-[115.645%]' 
            id={`panel-${activeTab}`} 
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
        >
            {tabs[activeTab].content}
        </p>
    </div>
  );
};

export default HorizontalTabMenu;

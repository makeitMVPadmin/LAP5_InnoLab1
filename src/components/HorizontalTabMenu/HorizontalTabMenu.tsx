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

  useEffect(() => {
    const handleResize = () => {
      if (tabsRef.current) {
        const containerWidth = tabsRef.current.offsetWidth;
        const tabWidth = (containerWidth / visibleTabs) - (containerWidth * (1/100));
        Array.from(tabsRef.current.children).forEach((tabElement) => {
          (tabElement as HTMLElement).style.width = `${tabWidth}px`;
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full mx-auto space-y-6 my-[1.9rem]" role="tabpanel" aria-labelledby="tabbed-navigation">
        <div className="relative flex w-full my-[2.5rem]">
            <CommuntiArrowStyled 
                direction='left'
                className="p-[1.6rem]"
                onClick={handlePrevClick}
                aria-label="Show previous tabs"
                disabled={startIndex === 0}
            />
            <div
                ref={tabsRef}
                className="flex overflow-hidden mx-[1%] h-[5.2rem] gap-[1%]"
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
                        h-full rounded-tl-[0.5rem] rounded-tr-[0.5rem] rounded-bl-[0] rounded-br-[0]`}
                        onClick={() => handleTabClick(index)}
                        style={{
                            transform: `translateX(-${startIndex * 100}%)`,
                            transition: 'transform 0.3s ease-in-out',
                        }}
                        id={`tab-${index}`}
                        aria-controls={`panel-${index}`}
                    >
                        <p className={`text-MVP-black font-gilroy text-[1.3rem] font-extrabold normal-case leading-[115.645%] ${index === activeTab && 'text-MVP-dark-blue'}`}>
                            {tab.label}
                        </p>
                    </Button>
                ))}
            </div>
            <CommuntiArrowStyled 
                direction='right'
                className="p-[1.6rem]"
                onClick={handleNextClick}
                aria-label="Show more tabs"
                disabled={startIndex === tabs.length - visibleTabs}
            />
        </div>
        <p 
            className='text-[#000] mx-auto w-[95%] font-poppins text-[1.2rem] font-normal leading-[115.645%]' 
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

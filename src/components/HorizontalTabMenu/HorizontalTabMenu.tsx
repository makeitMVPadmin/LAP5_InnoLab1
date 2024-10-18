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

  console.log(startIndex);

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
  }, [tabs.length]);

  return (
    <div className="w-full mx-auto space-y-6 my-[30px]">
      <div className="relative flex w-full my-[40px]">
            <CommuntiArrowStyled direction='left'
                className="py-[32px] px-[28px]"
                onClick={handlePrevClick}
                aria-label="Show previous tabs"
                disabled={startIndex == 0}
                />
        <div
          ref={tabsRef}
          className="flex overflow-hidden mx-[1%] h-[83px] gap-[1%]" 
        >
          {tabs.map((tab, index) => (
            <Button
              key={tab.id}
              variant="ghost"
              className={`flex-shrink-0 ${
                index === activeTab ? 'bg-[#BFE5FF] text-secondary-foreground border-b-[8px] border-b-[#0954B0]' : 'border-b-[6px] border-b-black'
              } ${index < startIndex || index >= startIndex + visibleTabs ? 'invisible' : ''}
              h-full rounded-tl-[8px] rounded-tr-[8px] rounded-bl-[0px] rounded-br-[0px] `}
              onClick={() => handleTabClick(index)}
              style={{
                transform: `translateX(-${startIndex * 100}%)`,
                transition: 'transform 0.3s ease-in-out',
              }}
            >
              <p className={`${index === activeTab && 'text-[#0954B0]'} text-black font-gilroy text-[26px] font-extrabold normal-case leading-[115.645%]`}>{tab.label}</p>
            </Button>
          ))}
          
        </div>
        <CommuntiArrowStyled direction='right'
                className="py-[32px] px-[28px]"
                onClick={handleNextClick}
                aria-label="Show more tabs"
                disabled={startIndex == 1}
            />
      </div>
        <p className='self-stretch text-[#000] mx-auto w-[95%] font-poppins text-[22px] font-normal leading-[115.645%]'>{tabs[activeTab].content}</p>
      <div className="sr-only" aria-live="polite">
        Current tab: {tabs[activeTab].label}, {activeTab + 1} of {tabs.length}
      </div>
    </div>
  );
};

export default HorizontalTabMenu;

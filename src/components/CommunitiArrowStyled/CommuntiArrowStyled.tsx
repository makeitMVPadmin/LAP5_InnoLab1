import { ReactComponent as LeftArrow } from '../../assets/images/simpleleftarrow.svg';
import { ReactComponent as RightArrow } from '../../assets/images/simplerightarrow.svg';
import { FC } from 'react';

type ArrowProps = {
    direction: string;
    className?: string;
    onClick?: () => void;
    'aria-label'?: string;
    disabled?: boolean;
}

const CommuntiArrowStyled: FC<ArrowProps> = ({
    direction,
    className,
    onClick,
    'aria-label': ariaLabel,
    disabled
}) => {
  return (
    <button
        className={`
            flex justify-center items-center 
            rounded-[0.6rem] 
            border-[0.2rem] border-black 
            bg-white 
            shadow-[-0.2rem 0.3rem 0.3rem 0 rgba(0, 0, 0, 0.25)]
            ${className} 
            ${disabled ? 'border-[#D9D9D9] cursor-not-allowed opacity-50' : 'border-r-[0.3rem] border-b-[0.4rem]'}
        `}
        aria-label={ariaLabel}
        onClick={disabled ? null : onClick}
        disabled={disabled}
        role="button"
    >
        {direction === 'right' ? 
            <RightArrow className={disabled ? 'fill-[#D9D9D9]' : 'fill-black'} /> : 
            <LeftArrow className={disabled ? 'fill-[#D9D9D9]' : 'fill-black'}/>}
    </button>
  )
}

export default CommuntiArrowStyled;

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
    <button className={`
        flex justify-center items-center 
        rounded-[9.178px] 
        border-r-[4.589px] border-b-[5.736px] border-l-[3.442px] border-t-[3.442px] border-black 
        bg-white 
        shadow-[ -3.442px 4.589px 4.589px 0px rgba(0, 0, 0, 0.25)]
    ${className} ${disabled && 'border-[#D9D9D9]'}`}
        aria-label={ariaLabel}
        onClick={onClick}
        disabled={disabled}
    >
        {direction === 'right' ? <RightArrow className={disabled ? 'fill-[#D9D9D9]' : 'fill-black'} /> : <LeftArrow className={disabled ? 'fill-[#D9D9D9]' : 'fill-black'}/>}
    </button>
  )
}

export default CommuntiArrowStyled
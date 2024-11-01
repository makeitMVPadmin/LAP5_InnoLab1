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
            rounded-[0.6rem] border-t-[3px] border-b-[5px] border-l-[3px] border-r-[5px] border-MVP-black
            ${className} 
            ${disabled && 'border-MVP-light-gray cursor-not-allowed opacity-50'}
        `}
        aria-label={ariaLabel}
        onClick={disabled ? null : onClick}
        disabled={disabled}
        role="button"
    >
        {direction === 'right' ? 
            <RightArrow className={disabled ? 'fill-MVP-light-gray' : 'fill-black'} /> : 
            <LeftArrow className={disabled ? 'fill-MVP-light-gray' : 'fill-black'}/>}
    </button>
  )
}

export default CommuntiArrowStyled;

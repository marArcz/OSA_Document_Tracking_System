import React from 'react'

const ElegantNav = ({ list, activeKey, handleSelect,variant='primary',className,disableClick=false }) => {
    return (
        <>
            <ul className={`elegant-nav nav gap-10 ${className}`}>
                {
                    list && list.map((item, index) => (
                        <li key={index} onClick={() => disableClick?{}:handleSelect(index)} className={` ${disableClick?'':'cursor-pointer'} px-2 pb-2 list-item ${activeKey == index ? `border-b-[2px] border-${variant}` : 'text-secondary'}`} key={index}>
                            {item}
                        </li>
                    ))
                }
            </ul>
        </>
    )
}

export default ElegantNav
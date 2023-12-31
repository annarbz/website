import React from 'react'
import cn from 'classnames'

type Props = {
    children?: any | any[],
    className?: string
}

const Wrapper = (props: Props) => {
    return (
        <div className={cn('container', ' mx-auto', 'sm:px-6', 'md:px-4', 'lg:px-8', 'px-4', props.className)}>{props.children}</div>
    )
}

export default Wrapper
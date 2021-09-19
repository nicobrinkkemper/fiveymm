import React, { PropsWithChildren } from 'react'
import { Link, LinkProps } from 'react-router-dom'
import marioCake1x from './assets/illustration_mario1x.png'
import marioCake2x from './assets/illustration_mario2x.png'
import marioCake3x from './assets/illustration_mario3x.png'

const illustrations = {
    "mario_cake": (<picture className="Illustration-picture">
        <source srcSet={`${marioCake1x}, ${marioCake2x} 2x, ${marioCake3x} 3x`} />
        <img src={marioCake1x} className="Illustration-img" alt="Mario wants CAKE!" />
    </picture>)
}

type allowedIllustration = keyof typeof illustrations
export type CardProps = PropsWithChildren<{
    illustration?: allowedIllustration;
    disabled?: boolean;
    to?: LinkProps<any>['to'];
}>

const createIllustration = (illustration: allowedIllustration) => {
    return () => (<span className={["Illustration", illustration].join(' ')}>
        {illustrations[illustration]}
    </span>)
}


function hasIllustration(key?: allowedIllustration): key is allowedIllustration{
    return Boolean(typeof key === 'string' && typeof illustrations[key] === 'object') 
}

const WrapLink = ({children,to,disabled}: CardProps)=>{
    if(typeof to === 'undefined' || disabled) return <>{children}</>
    else return <Link to={to} className="Clickable">{children}</Link>
}

const Card = ({ children, illustration, disabled = false, to }: CardProps) => {
    const classes = ['Card', illustration]
    if (hasIllustration(illustration)) classes.push('hasIllustration')
    if (disabled) classes.push('disabled')
    const isClickable = typeof to === 'string' 
    if (isClickable) classes.push('isClickable')
    const Illustration = (hasIllustration(illustration)) ? createIllustration(illustration) : ()=>null
    return (
        <div className={classes.join(' ')}>
            <WrapLink to={to} disabled={disabled}>
                <Illustration />
                {children}
            </WrapLink>
        </div>
    )
}


export default Card
export {Card}
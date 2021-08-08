import React, { PropsWithChildren } from 'react'
import logoWithCardFallback from './assets/logo_with_card.png';
import logoWithoutCardFallback from './assets/logo_without_card.png';
import { Link } from 'react-router-dom';
const svgs = {
    "logo_with_card": (<picture className="Svg-picture">
        <img src={logoWithCardFallback} className="Svg-img" alt="logo" />
    </picture>),
    "logo_without_card": (<picture className="Svg-picture">
        <img src={logoWithoutCardFallback} className="Svg-img" alt="logo" />
    </picture>),
}

export type LogoProps = PropsWithChildren<{
    svg?: keyof typeof svgs;
    small?: boolean;
}>

const createSvg = (svg: keyof typeof svgs) => {
    return () => (<span className={["Svg", svg].join(' ')}>
        {svgs[svg]}
    </span>)
}


const Logo = ({ svg = "logo_with_card", small = false }: LogoProps) => {
    const classList = ['Logo']
    const Svg = createSvg(svg)
    if(small) classList.push('small')
    return (
        <div className={classList.join(" ")}>
            <Link to="/">
                <Svg />
            </Link>
        </div>
    )
}
export {Logo}
export default Logo
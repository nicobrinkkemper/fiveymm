
import React from 'react';

import './About.css';
import { useLocation, useHistory, Router } from 'react-router-dom';
import { importMDX } from 'mdx.macro';
import AccordionLayout, { accordionComponents } from 'AccordionLayout';
const CloseSvg = () => (
    <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#F6F7F8" />
    </svg>
)
const AboutContent = importMDX.sync('./data/About.mdx')

const About = () => {
    const location = useLocation()
    const history = useHistory()
    if (location.hash !== '#!/about') return null
    return (
        <div className="About-outer">
            <div className="About">
                <div className="About-inner">
                    <div className="About-header">
                        <button className="closeBtn" onClick={()=>history.push(location.pathname)}>
                            <CloseSvg />
                        </button>
                    </div>
                    <div className="About-body">
                        <div className="modalBackground">
                            <AccordionLayout>
                                <AboutContent components={accordionComponents} />
                            </AccordionLayout>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;

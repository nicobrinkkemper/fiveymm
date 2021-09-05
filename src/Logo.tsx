import React, { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import logo1x from "./assets/logo_with_card1x.png";
import logo2x from "./assets/logo_with_card2x.png";
import logo3x from "./assets/logo_with_card3x.png";
import simpleLogo1x from "./assets/logo_without_card1x.png";
import simpleLogo2x from "./assets/logo_without_card2x.png";
import simpleLogo3x from "./assets/logo_without_card3x.png";
const logos = {
  logo_with_card: (
    <picture className="Picture">
      <source srcSet={`${logo2x} 2x, ${logo3x} 3x`} />
      <img src={logo1x} className="Picture-img" alt="logo" width="100%" />
    </picture>
  ),
  logo_without_card: (
    <picture className="Picture">
      <source
        srcSet={`${simpleLogo2x} 2x, ${simpleLogo3x} 3x`}
      />
      <img src={simpleLogo1x} className="Picture-img" alt="logo" width="100%" />
    </picture>
  )
};

export type LogoProps = PropsWithChildren<{
  logo?: keyof typeof logos;
  small?: boolean;
}>;

const createPicture = (logo: keyof typeof logos) => {
  return () => (
    <span className={["Picture", logo].join(" ")}>{logos[logo]}</span>
  );
};

const Logo = ({ logo = "logo_with_card", small = false }: LogoProps) => {
  const classList = ["Logo"];
  const Picture = createPicture(logo);
  if (small) classList.push("small");
  return (
    <div className={classList.join(" ")}>
      <Link to="/">
        <Picture />
      </Link>
    </div>
  );
};
export { Logo };
export default Logo;

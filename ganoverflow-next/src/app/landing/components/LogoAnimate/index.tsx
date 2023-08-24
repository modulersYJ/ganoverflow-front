import LogoText from "./LogoText";
import "./logoAnimate.css";

const LogoAnimate = () => {
  return (
    <div className="main-logo-container">
      <div className="logo-animate">
        <svg
          className="logo-symbol-container foreground"
          viewBox="0 0 240 151"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="path-item1"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.6482 112.201H0V150.332H114.932V112.201H100.292V136.476H14.6482V112.201Z"
            fill="#AEAEAE"
          />
          <rect
            className="rect-item2"
            x="24.2002"
            y="113.796"
            width="68.2005"
            height="11.0001"
            fill="#42C83C"
          />
          <rect
            className="rect-item3"
            x="27.3838"
            y="89.5674"
            width="68.1037"
            height="10.1244"
            transform="rotate(10.1716 27.3838 89.5674)"
            fill="#42C83C"
          />
          <rect
            className="rect-item4"
            x="33.9756"
            y="66.1128"
            width="68.1037"
            height="10.1244"
            transform="rotate(20.1554 33.9756 66.1128)"
            fill="#42C83C"
          />
          <rect
            className="rect-item5"
            x="45.998"
            y="41.4087"
            width="68.1037"
            height="10.1244"
            transform="rotate(32.5869 45.998 41.4087)"
            fill="#42C83C"
          />
          <rect
            className="rect-item6"
            x="65.9014"
            y="19.7087"
            width="68.1037"
            height="10.1244"
            transform="rotate(46.4193 65.9014 19.7087)"
            fill="#42C83C"
          />
          <rect
            className="rect-item7"
            x="109.566"
            width="68.1037"
            height="10.1244"
            transform="rotate(76.1301 109.566 0)"
            fill="#42C83C"
          />
          <rect
            className="rect-item8"
            x="159.857"
            y="2.91016"
            width="68.1037"
            height="10.1244"
            transform="rotate(104.917 159.857 2.91016)"
            fill="#42C83C"
          />
        </svg>
        {/*  */}
        <svg
          className="logo-symbol-container background"
          viewBox="0 0 240 151"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            className="rect-item9"
            x="201.504"
            y="29.7932"
            width="68.1037"
            height="10.1244"
            transform="rotate(127.747 201.504 29.7932)"
            fill="#42C83C"
          />
          <rect
            className="rect-item10"
            x="234.495"
            y="83.2188"
            width="68.1037"
            height="10.1244"
            transform="rotate(160.985 234.495 83.2188)"
            fill="#42C83C"
          />
          <rect
            className="rect-item11"
            x="171.605"
            y="131.396"
            width="68.2005"
            height="8.80007"
            fill="#42C83C"
          />
        </svg>
        <div className="landing-logo-textmask" />
        <LogoText />
      </div>
    </div>
  );
};

export default LogoAnimate;

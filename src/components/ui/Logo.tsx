import LogoVertical from "../../assets/logo-v-d.png";
import LogoHorizental from "../../assets/logo-h.png";
import Logoicon from "../../assets/icon-site2.png";

interface IProps {
  type: "v" | "h" | "icon";
  width: number;
}

const Logo = ({ type = "v", width }: IProps) => {
  switch (type) {
    case "v":
      return (
        <img
          src={LogoVertical}
          alt="Logo signature"
          width={width}
          className=""
        />
      );
    case "h":
      return (
        <img
          src={LogoHorizental}
          alt="Logo signature"
          width={width}
          className="m-4"
        />
      );
    case "icon":
      return (
        <img src={Logoicon} alt="Logo signature" width={width} className="" />
      );
  }
};

export default Logo;

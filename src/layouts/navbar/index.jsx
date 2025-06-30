import { useNavigate } from "react-router-dom";

import useTime from "../../hooks/useTime";
import Magnetic from "../../hooks/useMagnetic";
import menu from "../../data/navbar.json";

function Navbar() {
  const time = useTime();
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <Magnetic className="logo">kostsplayer</Magnetic>
      <div className="time">{time} (Bandung)</div>
      <div className="menu">
        {menu
          .filter((item) => item.name)
          .map((data) => {
            return (
              <Magnetic
                key={data.id}
                angleX={0.7}
                angleY={0.7}
                className={`menu-link`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(data.path);
                }}
              >
                {data.name},
              </Magnetic>
            );
          })}
      </div>
    </div>
  );
}

export default Navbar;

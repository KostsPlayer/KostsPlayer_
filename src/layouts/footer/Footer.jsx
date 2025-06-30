import Magnetic from "../../hooks/useMagnetic";

function index() {
  return (
    <div className="footer">
      <div className="version">
        <div className="title">Version</div>
        <Magnetic className="text">2025 &copy; Edition</Magnetic>
      </div>
      <div className="socials">
        <div className="title">Socials</div>
        <div className="items">
          <Magnetic className="text">LinkedIn</Magnetic>
          <Magnetic className="text">Medium</Magnetic>
          <Magnetic className="text">Instagram</Magnetic>
        </div>
      </div>
    </div>
  );
}

export default index;

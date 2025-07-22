import BounceDivider from "../bounceDivider";
import RoundedButton from "../roundedButton";

function ContactInfo() {
  return (
    <div className="contact-info">
      <div className="title">
        Let&apos;s Align Our <span>Goals</span>
      </div>

      <div className="divider">
        <BounceDivider />

        <div className="divider-button">
          <RoundedButton
            backgroundColor="#334bd3"
            activeParallax={true}
            axis="x"
            speed={0.27}
          >
            <span>Get it touch</span>
          </RoundedButton>
        </div>
      </div>

      <div className="info">
        <div className="email">
          <RoundedButton angleX={0.2} angleY={0.2}>
            <span>playerskost@gmail.com</span>
          </RoundedButton>
        </div>

        <div className="phone">
          <RoundedButton angleX={0.2} angleY={0.2}>
            <span>+62 822 2541 4643</span>
          </RoundedButton>
        </div>
      </div>
    </div>
  );
}

export default ContactInfo;

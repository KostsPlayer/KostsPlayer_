import Hero from "./hero";
import Brand from "./brand";
import Project from "./project";
import ContactInfo from "../../components/contactInfo/ContactInfo";

function Home() {
  return (
    <div className="home">
      <Hero />
      <Brand />
      <Project />
      <ContactInfo />
    </div>
  );
}

export default Home;

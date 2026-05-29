import HeroSection from "@components/home/hero-section";
import TeamSection from "@components/home/team-section";
import WorkspaceGallery from "../../components/WorkspaceGallery";
import MarqueeClientes from "../../components/MarqueeClientes";
import ContactForm from "../../components/ContactForm";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <TeamSection />
      <WorkspaceGallery />
      <MarqueeClientes />
      <ContactForm />
    </div>
  );
};

export default Home;

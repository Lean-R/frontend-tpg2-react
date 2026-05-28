import HeroSection from "@components/home/hero-section";
import TeamSection from "@components/home/team-section";
import WorkspaceGallery from "../../components/WorkspaceGallery";
import ContactForm from "../../components/ContactForm";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <TeamSection />
      <WorkspaceGallery />
      <ContactForm />
    </div>
  );
};

export default Home;

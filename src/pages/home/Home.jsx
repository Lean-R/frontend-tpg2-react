import HeroSection from "@components/home/hero-section";
import TeamSection from "@components/home/team-section";
import WorkspaceGallery from "../../components/WorkspaceGallery";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <TeamSection />
      <WorkspaceGallery />
    </div>
  );
};

export default Home;

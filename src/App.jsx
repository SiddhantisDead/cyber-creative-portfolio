import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { IdentitySplit } from "./components/IdentitySplit";
import { Projects } from "./components/Projects";
import { SkillsTerminal } from "./components/SkillsTerminal";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="circuit-bg relative selection:bg-primary selection:text-on-primary">
      <Nav />
      <main className="pt-24 pb-24">
        <Hero />
        <IdentitySplit />
        <Projects />
        <SkillsTerminal />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;

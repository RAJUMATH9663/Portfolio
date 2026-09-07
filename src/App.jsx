import Navbar from './components/Navbar';
import FloatingLines from './components/FloatingLines';
import { SmoothCursor } from './components/SmoothCursor';
import Hero from './components/Hero';
import Interactive3D from './components/Interactive3D';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';

function App() {
  return (
    <div className="relative bg-bg text-textMain font-sans min-h-screen overflow-x-hidden">
      <SmoothCursor />

      {/* Navigation */}
      <Navbar />

      {/* Page Sections */}
      <main className="relative z-10">
        <Hero />
        <Interactive3D />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </div>
  );
}

export default App;

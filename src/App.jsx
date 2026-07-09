import Navbar from './components/Navbar';
import FloatingLines from './components/FloatingLines';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';

function App() {
  return (
    <div className="relative bg-bg text-textMain font-sans min-h-screen overflow-x-hidden">
      <CustomCursor />
      {/* Global ambient background */}
      <div className="fixed inset-0 z-0 opacity-40">
        <FloatingLines 
          enabledWaves={["top","middle","bottom"]}
          lineCount={8}
          lineDistance={8}
          bendRadius={8}
          bendStrength={-2}
          interactive
          parallax={true}
          animationSpeed={1}
          gradientStart="#e945f5"
          gradientMid="#6f6f6f"
          gradientEnd="#6a6a6a"
        />
      </div>

      {/* Navigation */}
      <Navbar />

      {/* Page Sections */}
      <main className="relative z-10">
        <Hero />
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

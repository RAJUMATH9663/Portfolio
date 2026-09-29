import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";

export default function Interactive3D() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [hoveredNode, setHoveredNode] = useState(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let animationFrameId;
    let isRunning = true;

    // ── Three.js Scene Setup ──
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);

    // ── Central Geometric Core (Icosahedron Wireframe) ──
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Inner wireframe sphere
    const innerGeo = new THREE.IcosahedronGeometry(3.5, 2);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      roughness: 0.2,
      metalness: 0.8,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    // Outer cyber ring
    const ringGeo = new THREE.TorusGeometry(5.2, 0.04, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x22c55e,
      transparent: true,
      opacity: 0.5,
    });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    const ring2 = new THREE.Mesh(ringGeo, ringMat.clone());
    ring2.material.color.setHex(0x06b6d4);
    ring2.rotation.x = Math.PI / 2.5;
    coreGroup.add(ring1);
    coreGroup.add(ring2);

    // ── Floating Neural Particles / Cloud ──
    const particleCount = 180;
    const posArray = new Float32Array(particleCount * 3);
    const scaleArray = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 4 + Math.random() * 7;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
      posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      posArray[i + 2] = radius * Math.cos(phi);
      scaleArray[i / 3] = Math.random() * 2 + 1;
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.12,
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const particleCloud = new THREE.Points(particlesGeo, particlesMat);
    coreGroup.add(particleCloud);

    // ── Dynamic Dynamic Connection Lines ──
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });

    // ── Lighting ──
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xa855f7, 4, 30);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x22c55e, 3, 30);
    pointLight2.position.set(-10, -8, 8);
    scene.add(pointLight2);

    // ── Mouse & Touch Tracking (Decoupled, High FPS) ──
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotationY = x * 0.8;
      targetRotationX = -y * 0.6;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    // ── Resize Observer ──
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // ── Render Loop ──
    const clock = new THREE.Clock();

    const animate = () => {
      if (!isRunning) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth camera / core rotation with lerp
      currentRotationX += (targetRotationX - currentRotationX) * 0.05;
      currentRotationY += (targetRotationY - currentRotationY) * 0.05;

      coreGroup.rotation.x = currentRotationX + elapsedTime * 0.08;
      coreGroup.rotation.y = currentRotationY + elapsedTime * 0.12;

      ring1.rotation.z = elapsedTime * 0.2;
      ring2.rotation.y = -elapsedTime * 0.15;

      // Subtle breath animation
      const scale = 1 + Math.sin(elapsedTime * 1.5) * 0.03;
      innerMesh.scale.set(scale, scale, scale);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointermove", onPointerMove);
      resizeObserver.disconnect();

      // Clean disposal to prevent WebGL memory leaks
      innerGeo.dispose();
      innerMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section className="relative w-full py-24 bg-[#070b14] overflow-hidden border-y border-white/5">
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent/5 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-cyan/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[580px]">
          
          {/* Left: Interactive 3D Canvas */}
          <div
            ref={containerRef}
            className="lg:col-span-6 h-[400px] sm:h-[480px] lg:h-[540px] relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-md overflow-hidden flex items-center justify-center group shadow-2xl"
          >
            <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

            {/* Floating Live Badge */}
            <div className="absolute top-5 left-5 flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/10 bg-black/40 backdrop-blur-md pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[11px] font-mono tracking-wider text-white/80 uppercase font-semibold">
                Interactive 3D Engine
              </span>
            </div>

            {/* Instruction tooltip */}
            <div className="absolute bottom-5 right-5 flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/10 bg-black/50 backdrop-blur-md pointer-events-none">
              <svg className="w-3.5 h-3.5 text-accentLight" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
              <span className="text-[10px] text-white/60 font-medium">Move mouse to rotate</span>
            </div>
          </div>

          {/* Right: Technical Capabilities Overview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-purple-500/20 bg-purple-500/10 self-start">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              <span className="text-xs font-mono text-purple-300 font-medium uppercase tracking-wider">
                Full-Stack Architecture & AI
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              Engineering Scalable <br />
              <span className="gradient-text">Intelligent Systems.</span>
            </h2>

            <p className="text-textMuted text-base sm:text-lg leading-relaxed">
              Bridging the gap between robust software engineering and production AI systems. From orchestrating multi-agent LLM workflows with LangGraph and Neo4j to architecting high-concurrency Django & Laravel backends.
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-accent/30 transition-all">
                <div className="text-accentLight font-bold text-base mb-1">AI & LLM Orchestration</div>
                <div className="text-xs text-textMuted leading-relaxed">
                  Knowledge Graphs (Neo4j), LangChain, LangGraph multi-agent systems & Ragas evaluation.
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-cyan/30 transition-all">
                <div className="text-cyan font-bold text-base mb-1">Backend & QA Engineering</div>
                <div className="text-xs text-textMuted leading-relaxed">
                  Python/Django, PHP/Laravel, MySQL query optimization, and end-to-end QA validation.
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a href="#projects" className="btn-primary flex items-center gap-2 text-sm">
                <span>View Shipped Projects</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>

              <a href="#contact" className="btn-outline flex items-center gap-2 text-sm">
                <span>Get In Touch</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

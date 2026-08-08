import { useEffect, useRef } from "react";
import * as THREE from "three";

function BackgroundCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- Setup Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.015);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({
      canvas: containerRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // --- Particles Config ---
    const particleCount = 120;
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];

    // Randomize initial positions & velocities
    for (let i = 0; i < particleCount; i++) {
      // Position within a 3D box
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

      // Velocity vectors
      velocities.push({
        x: (Math.random() - 0.5) * 0.05,
        y: (Math.random() - 0.5) * 0.05,
        z: (Math.random() - 0.5) * 0.05,
      });
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    // Particle Texture / Material
    // Create a circular canvas texture programmatically for smooth circular particles
    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 16, 16);
    const texture = new THREE.CanvasTexture(canvas);

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x06b6d4, // Cyan-500
      size: 1.5,
      transparent: true,
      opacity: 0.8,
      map: texture,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(
      particleGeometry,
      particleMaterial
    );
    scene.add(particleSystem);

    // --- Line Constellation Connections ---
    const lineCount = 300;
    const linePositions = new Float32Array(lineCount * 2 * 3);
    const lineColors = new Float32Array(lineCount * 2 * 3);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3)
    );
    lineGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(lineColors, 3)
    );

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const lineSegments = new THREE.LineSegments(
      lineGeometry,
      lineMaterial
    );
    scene.add(lineSegments);

    // --- Mouse & Scroll Interaction ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let scrollY = 0;
    let targetScrollY = 0;

    const handleMouseMove = (event) => {
      // Normalize to -1 to 1
      mouse.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    // --- Animation Loop ---
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth mouse interpolation (LERP)
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Smooth scroll interpolation (LERP)
      scrollY += (targetScrollY - scrollY) * 0.05;

      // Apply mouse rotation / parallax to scene
      scene.rotation.y = mouse.x * 0.1;
      scene.rotation.x = -mouse.y * 0.1;
      // Scroll parallax: drift scene upwards as user scrolls down
      scene.position.y = scrollY * 0.015;

      const posAttr = particleGeometry.attributes.position;
      const currentPos = posAttr.array;

      // Update particle positions
      for (let i = 0; i < particleCount; i++) {
        // Move particle
        currentPos[i * 3] += velocities[i].x;
        currentPos[i * 3 + 1] += velocities[i].y;
        currentPos[i * 3 + 2] += velocities[i].z;

        // Bounce back if they go out of bounds (approximate box of size 100)
        if (Math.abs(currentPos[i * 3]) > 60) velocities[i].x *= -1;
        if (Math.abs(currentPos[i * 3 + 1]) > 60) velocities[i].y *= -1;
        if (Math.abs(currentPos[i * 3 + 2]) > 60) velocities[i].z *= -1;
      }
      posAttr.needsUpdate = true;

      // Find connections to build constellation lines
      let lineIndex = 0;
      const connectionLimit = 6; // Max connections per particle to avoid cluster mess
      const connectionCounts = new Uint8Array(particleCount);

      const linePosAttr = lineGeometry.attributes.position;
      const lineColAttr = lineGeometry.attributes.color;
      const linesArray = linePosAttr.array;
      const colorsArray = lineColAttr.array;

      // Reset lines array
      linesArray.fill(0);

      for (let i = 0; i < particleCount; i++) {
        if (connectionCounts[i] >= connectionLimit) continue;

        const x1 = currentPos[i * 3];
        const y1 = currentPos[i * 3 + 1];
        const z1 = currentPos[i * 3 + 2];

        for (let j = i + 1; j < particleCount; j++) {
          if (
            connectionCounts[i] >= connectionLimit ||
            connectionCounts[j] >= connectionLimit
          )
            continue;

          const x2 = currentPos[j * 3];
          const y2 = currentPos[j * 3 + 1];
          const z2 = currentPos[j * 3 + 2];

          // Compute distance squared (faster than Math.sqrt)
          const dx = x1 - x2;
          const dy = y1 - y2;
          const dz = z1 - z2;
          const distSq = dx * dx + dy * dy + dz * dz;

          // Connect if particles are close (distance < 20, meaning distSq < 400)
          if (distSq < 324) {
            const index = lineIndex * 6;

            // Point 1
            linesArray[index] = x1;
            linesArray[index + 1] = y1;
            linesArray[index + 2] = z1;

            // Point 2
            linesArray[index + 3] = x2;
            linesArray[index + 4] = y2;
            linesArray[index + 5] = z2;

            // Compute line opacity based on distance
            const distance = Math.sqrt(distSq);
            const alpha = 1.0 - distance / 18.0;

            // Cyan (0.02, 0.71, 0.83) to Magenta/Purple (0.6, 0.1, 0.9) gradient based on position
            const r1 = 0.0 + (x1 + 50) / 100 * 0.6;
            const g1 = 0.7 - (y1 + 50) / 100 * 0.6;
            const b1 = 0.8 + (z1 + 50) / 100 * 0.2;

            const r2 = 0.0 + (x2 + 50) / 100 * 0.6;
            const g2 = 0.7 - (y2 + 50) / 100 * 0.6;
            const b2 = 0.8 + (z2 + 50) / 100 * 0.2;

            // Color point 1
            colorsArray[index] = r1 * alpha;
            colorsArray[index + 1] = g1 * alpha;
            colorsArray[index + 2] = b1 * alpha;

            // Color point 2
            colorsArray[index + 3] = r2 * alpha;
            colorsArray[index + 4] = g2 * alpha;
            colorsArray[index + 5] = b2 * alpha;

            lineIndex++;
            connectionCounts[i]++;
            connectionCounts[j]++;

            if (lineIndex >= lineCount) break;
          }
        }
        if (lineIndex >= lineCount) break;
      }

      linePosAttr.needsUpdate = true;
      lineColAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // --- Resize Handler ---
    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // --- Clean Up ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);

      // Dispose Three.js objects
      particleGeometry.dispose();
      particleMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={containerRef}
      className="fixed inset-0 w-full h-full -z-20 pointer-events-none bg-black"
    />
  );
}

export default BackgroundCanvas;

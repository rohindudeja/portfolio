import { useEffect, useRef } from "react";
import * as THREE from "three";

function InteractiveHero3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      1, // Aspect ratio will be updated
      0.1,
      100
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Handle initial sizing
    const resizeCanvas = () => {
      const width = canvasRef.current.parentElement.clientWidth;
      const height = canvasRef.current.parentElement.clientHeight || width; // Fallback to square
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    resizeCanvas();

    // --- Create 3D Mesh (Torus Knot particles) ---
    // Using a torus knot shape for an interesting complex structure
    const geometry = new THREE.TorusKnotGeometry(6, 1.8, 120, 16);
    
    // Save original position array for wave animations
    const originalPositions = geometry.attributes.position.array.slice();
    
    // Create a circular gradient texture for soft glowing points
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.2, "rgba(6, 182, 212, 0.8)"); // Cyan
    gradient.addColorStop(0.6, "rgba(168, 85, 247, 0.2)"); // Purple
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 0.35,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // --- Interactive Drag Rotation ---
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    const targetRotation = { x: 0, y: 0 };

    const handleMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMoveGlobal = (e) => {
      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        targetRotation.y += deltaX * 0.007;
        targetRotation.x += deltaY * 0.007;

        previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const canvasEl = canvasRef.current;
    canvasEl.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMoveGlobal);
    window.addEventListener("mouseup", handleMouseUp);

    // --- Hover Tilt Effect (when mouse is near, it tilts slightly) ---
    const mouseHover = { x: 0, y: 0 };
    const handleMouseMoveHover = (e) => {
      const rect = canvasEl.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Only tilt if mouse is relatively close
      const dist = Math.sqrt(x * x + y * y);
      if (dist < 400) {
        mouseHover.x = (x / rect.width) * 0.3;
        mouseHover.y = (y / rect.height) * 0.3;
      } else {
        mouseHover.x *= 0.95; // decay
        mouseHover.y *= 0.95;
      }
    };
    window.addEventListener("mousemove", handleMouseMoveHover);

    // --- Resize Observer (highly responsive container tracking) ---
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    if (canvasEl.parentElement) {
      resizeObserver.observe(canvasEl.parentElement);
    }

    // --- Animation Loop ---
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();

      // Slow idle rotation + user drag rotation
      particles.rotation.y += 0.003;
      particles.rotation.x += 0.001;

      // Interpolate user rotation & hover tilt
      particles.rotation.y += (targetRotation.y - particles.rotation.y) * 0.1;
      particles.rotation.x += (targetRotation.x - particles.rotation.x) * 0.1;

      // Apply subtle tilt
      scene.rotation.y = mouseHover.x;
      scene.rotation.x = mouseHover.y;

      // Particle morphing wave effect (deforming the torus knot positions slightly)
      const posAttr = geometry.attributes.position;
      const array = posAttr.array;

      for (let i = 0; i < array.length; i += 3) {
        const ox = originalPositions[i];
        const oy = originalPositions[i + 1];
        const oz = originalPositions[i + 2];

        // Ripple offset using sin/cos based on initial position and time
        const wave = Math.sin(ox * 0.5 + time * 1.5) * 0.12;
        const waveY = Math.cos(oy * 0.5 + time * 1.5) * 0.12;
        const waveZ = Math.sin(oz * 0.5 + time * 1.5) * 0.12;

        array[i] = ox + wave;
        array[i + 1] = oy + waveY;
        array[i + 2] = oz + waveZ;
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // --- Clean Up ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      canvasEl.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMoveGlobal);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMoveHover);
      resizeObserver.disconnect();

      // Dispose resources
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing flex items-center justify-center">
      <canvas ref={canvasRef} className="max-w-full max-h-full" />
    </div>
  );
}

export default InteractiveHero3D;

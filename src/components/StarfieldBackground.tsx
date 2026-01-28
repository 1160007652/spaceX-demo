import { useEffect, useRef } from 'react';
import './StarfieldBackground.css';

export const StarfieldBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置画布大小
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 星星数据
    interface Star {
      x: number;
      y: number;
      z: number;
      size: number;
      color: string;
      speed: number;
    }

    // 星球数据
    interface Planet {
      x: number;
      y: number;
      radius: number;
      color: string;
      ringColor?: string;
      speed: number;
      angle: number;
    }

    // UFO 数据
    interface UFO {
      x: number;
      y: number;
      size: number;
      speed: number;
      direction: number;
    }

    // 战舰数据
    interface Spaceship {
      x: number;
      y: number;
      size: number;
      speed: number;
      angle: number;
    }

    const stars: Star[] = [];
    const planets: Planet[] = [];
    const ufos: UFO[] = [];
    const spaceships: Spaceship[] = [];
    
    const starCount = 300;
    const colors = [
      '#ffffff',
      '#aaccff',
      '#ffaacc',
      '#aaffcc',
      '#ffccaa',
      '#ccaaff',
      '#ffffaa',
    ];

    // 初始化星星
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        size: Math.random() * 2 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 0.5 + 0.2,
      });
    }

    // 初始化星球
    const planetColors = [
      { main: '#ff6b6b', ring: '#ff9999' }, // 红色星球
      { main: '#4ecdc4', ring: '#7ee8e0' }, // 青色星球
      { main: '#ffe66d', ring: '#fff4a3' }, // 黄色星球
      { main: '#a8e6cf', ring: '#c8f5e0' }, // 绿色星球
      { main: '#ff8b94', ring: '#ffb3ba' }, // 粉色星球
    ];

    for (let i = 0; i < 3; i++) {
      const colorSet = planetColors[i % planetColors.length];
      planets.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 40 + 30,
        color: colorSet.main,
        ringColor: Math.random() > 0.5 ? colorSet.ring : undefined,
        speed: Math.random() * 0.1 + 0.05,
        angle: Math.random() * Math.PI * 2,
      });
    }

    // 初始化 UFO
    for (let i = 0; i < 2; i++) {
      ufos.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.5,
        size: Math.random() * 20 + 15,
        speed: Math.random() * 1 + 0.5,
        direction: Math.random() > 0.5 ? 1 : -1,
      });
    }

    // 初始化战舰
    for (let i = 0; i < 2; i++) {
      spaceships.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 30 + 20,
        speed: Math.random() * 0.8 + 0.3,
        angle: Math.random() * Math.PI * 2,
      });
    }

    // 绘制星球
    const drawPlanet = (planet: Planet) => {
      ctx.save();
      
      // 星球主体
      const gradient = ctx.createRadialGradient(
        planet.x - planet.radius * 0.3,
        planet.y - planet.radius * 0.3,
        0,
        planet.x,
        planet.y,
        planet.radius
      );
      gradient.addColorStop(0, planet.color);
      gradient.addColorStop(1, '#000000');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(planet.x, planet.y, planet.radius, 0, Math.PI * 2);
      ctx.fill();

      // 星球光晕
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = planet.color;
      ctx.beginPath();
      ctx.arc(planet.x, planet.y, planet.radius * 1.2, 0, Math.PI * 2);
      ctx.fill();

      // 星环（如果有）
      if (planet.ringColor) {
        ctx.globalAlpha = 0.6;
        ctx.strokeStyle = planet.ringColor;
        ctx.lineWidth = planet.radius * 0.15;
        ctx.beginPath();
        ctx.ellipse(
          planet.x,
          planet.y,
          planet.radius * 1.5,
          planet.radius * 0.3,
          planet.angle,
          0,
          Math.PI * 2
        );
        ctx.stroke();
      }

      ctx.restore();
    };

    // 绘制 UFO
    const drawUFO = (ufo: UFO) => {
      ctx.save();
      
      // UFO 主体
      const gradient = ctx.createRadialGradient(ufo.x, ufo.y, 0, ufo.x, ufo.y, ufo.size);
      gradient.addColorStop(0, '#00ff88');
      gradient.addColorStop(0.5, '#00cc66');
      gradient.addColorStop(1, '#008844');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.ellipse(ufo.x, ufo.y, ufo.size, ufo.size * 0.4, 0, 0, Math.PI * 2);
      ctx.fill();

      // UFO 驾驶舱
      ctx.fillStyle = '#44ffaa';
      ctx.globalAlpha = 0.8;
      ctx.beginPath();
      ctx.arc(ufo.x, ufo.y - ufo.size * 0.2, ufo.size * 0.4, 0, Math.PI * 2);
      ctx.fill();

      // UFO 光束
      ctx.globalAlpha = 0.2;
      ctx.fillStyle = '#00ff88';
      ctx.beginPath();
      ctx.moveTo(ufo.x - ufo.size * 0.5, ufo.y + ufo.size * 0.3);
      ctx.lineTo(ufo.x - ufo.size * 1.5, ufo.y + ufo.size * 2);
      ctx.lineTo(ufo.x + ufo.size * 1.5, ufo.y + ufo.size * 2);
      ctx.lineTo(ufo.x + ufo.size * 0.5, ufo.y + ufo.size * 0.3);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    // 绘制战舰
    const drawSpaceship = (ship: Spaceship) => {
      ctx.save();
      ctx.translate(ship.x, ship.y);
      ctx.rotate(ship.angle);

      // 战舰主体
      ctx.fillStyle = '#6699ff';
      ctx.beginPath();
      ctx.moveTo(ship.size, 0);
      ctx.lineTo(-ship.size * 0.5, -ship.size * 0.3);
      ctx.lineTo(-ship.size * 0.5, ship.size * 0.3);
      ctx.closePath();
      ctx.fill();

      // 战舰窗口
      ctx.fillStyle = '#aaccff';
      ctx.beginPath();
      ctx.arc(ship.size * 0.3, 0, ship.size * 0.15, 0, Math.PI * 2);
      ctx.fill();

      // 引擎光
      ctx.globalAlpha = 0.6;
      ctx.fillStyle = '#ff6600';
      ctx.beginPath();
      ctx.arc(-ship.size * 0.5, -ship.size * 0.15, ship.size * 0.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(-ship.size * 0.5, ship.size * 0.15, ship.size * 0.1, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    // 动画循环
    let animationId: number;
    const animate = () => {
      // 半透明背景（拖尾效果）
      ctx.fillStyle = 'rgba(10, 14, 39, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 绘制星星
      stars.forEach((star) => {
        star.z -= star.speed;
        if (star.z <= 0) {
          star.z = 1000;
          star.x = Math.random() * canvas.width;
          star.y = Math.random() * canvas.height;
        }

        const k = 128 / star.z;
        const px = (star.x - canvas.width / 2) * k + canvas.width / 2;
        const py = (star.y - canvas.height / 2) * k + canvas.height / 2;
        const size = star.size * k;
        const opacity = Math.min(1, (1000 - star.z) / 1000);

        if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
          ctx.fillStyle = star.color;
          ctx.globalAlpha = opacity;
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.globalAlpha = 1;

      // 更新和绘制星球
      planets.forEach((planet) => {
        planet.angle += planet.speed * 0.01;
        planet.x += Math.cos(planet.angle) * planet.speed;
        planet.y += Math.sin(planet.angle) * planet.speed * 0.5;

        // 边界检查
        if (planet.x < -planet.radius * 2) planet.x = canvas.width + planet.radius * 2;
        if (planet.x > canvas.width + planet.radius * 2) planet.x = -planet.radius * 2;
        if (planet.y < -planet.radius * 2) planet.y = canvas.height + planet.radius * 2;
        if (planet.y > canvas.height + planet.radius * 2) planet.y = -planet.radius * 2;

        drawPlanet(planet);
      });

      // 更新和绘制 UFO
      ufos.forEach((ufo) => {
        ufo.x += ufo.speed * ufo.direction;
        ufo.y += Math.sin(ufo.x * 0.01) * 0.5;

        if (ufo.x < -ufo.size * 2) {
          ufo.x = canvas.width + ufo.size * 2;
          ufo.y = Math.random() * canvas.height * 0.5;
        }
        if (ufo.x > canvas.width + ufo.size * 2) {
          ufo.x = -ufo.size * 2;
          ufo.y = Math.random() * canvas.height * 0.5;
        }

        drawUFO(ufo);
      });

      // 更新和绘制战舰
      spaceships.forEach((ship) => {
        ship.x += Math.cos(ship.angle) * ship.speed;
        ship.y += Math.sin(ship.angle) * ship.speed;

        if (ship.x < -ship.size * 2) ship.x = canvas.width + ship.size * 2;
        if (ship.x > canvas.width + ship.size * 2) ship.x = -ship.size * 2;
        if (ship.y < -ship.size * 2) ship.y = canvas.height + ship.size * 2;
        if (ship.y > canvas.height + ship.size * 2) ship.y = -ship.size * 2;

        drawSpaceship(ship);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="starfield-background" />;
};

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const ColorfulStars = ({ count = 3000 }: { count?: number }) => {
  const starsRef = useRef<THREE.Points>(null);

  const [positions, colors, sizes] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    // 星空颜色调色板
    const starColors = [
      new THREE.Color('#ffffff'), // 白色
      new THREE.Color('#aaccff'), // 淡蓝色
      new THREE.Color('#ffaacc'), // 粉色
      new THREE.Color('#aaffcc'), // 青色
      new THREE.Color('#ffccaa'), // 橙色
      new THREE.Color('#ccaaff'), // 紫色
      new THREE.Color('#ffffaa'), // 黄色
    ];

    for (let i = 0; i < count; i++) {
      // 随机位置（球形分布）
      const radius = 100 + Math.random() * 400;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // 随机颜色
      const color = starColors[Math.floor(Math.random() * starColors.length)];
      if (color) {
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
      }

      // 随机大小
      sizes[i] = Math.random() * 2 + 0.5;
    }

    return [positions, colors, sizes];
  }, [count]);

  // 星星闪烁动画
  useFrame((state) => {
    if (!starsRef.current) return;
    
    const time = state.clock.elapsedTime;
    starsRef.current.rotation.y = time * 0.02;
    
    // 闪烁效果
    const sizes = starsRef.current.geometry.attributes['size'];
    if (sizes && sizes.array) {
      for (let i = 0; i < count; i++) {
        const originalSize = (sizes.array as Float32Array)[i];
        if (originalSize !== undefined) {
          (sizes.array as Float32Array)[i] = originalSize + Math.sin(time * 2 + i) * 0.3;
        }
      }
      sizes.needsUpdate = true;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
          args={[colors, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={2}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

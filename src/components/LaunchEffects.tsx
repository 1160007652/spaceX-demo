import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../store/useStore';

export const LaunchEffects = () => {
  const { isLaunching } = useStore();
  const particlesRef = useRef<THREE.Points>(null);
  const flameRef = useRef<THREE.Mesh>(null);

  const particleCount = 1000;
  const positions = new Float32Array(particleCount * 3);
  const velocities = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 2;
    positions[i * 3 + 1] = Math.random() * -5;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
    
    velocities[i * 3] = (Math.random() - 0.5) * 0.1;
    velocities[i * 3 + 1] = -Math.random() * 0.2;
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
  }

  useFrame(() => {
    if (!isLaunching || !particlesRef.current) return;

    const positions = particlesRef.current.geometry.attributes['position'];
    if (!positions || !positions.array) return;
    
    const posArray = positions.array as Float32Array;
    
    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      const idx1 = idx + 1;
      const idx2 = idx + 2;
      
      const posX = posArray[idx];
      const posY = posArray[idx1];
      const posZ = posArray[idx2];
      const velX = velocities[idx];
      const velY = velocities[idx1];
      const velZ = velocities[idx2];
      
      if (posX !== undefined && velX !== undefined) {
        posArray[idx] = posX + velX;
      }
      if (posY !== undefined && velY !== undefined) {
        posArray[idx1] = posY + velY;
      }
      if (posZ !== undefined && velZ !== undefined) {
        posArray[idx2] = posZ + velZ;
      }

      if (posArray[idx1] !== undefined && posArray[idx1] < -10) {
        posArray[idx1] = 0;
      }
    }
    positions.needsUpdate = true;

    // 火焰闪烁效果
    if (flameRef.current) {
      const scale = 1 + Math.random() * 0.3;
      flameRef.current.scale.set(scale, scale, scale);
    }
  });

  if (!isLaunching) return null;

  return (
    <group>
      {/* 火焰效果 */}
      <mesh ref={flameRef} position={[0, -0.5, 0]}>
        <coneGeometry args={[1, 3, 32]} />
        <meshBasicMaterial 
          color="#ff6600" 
          transparent 
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 粒子烟雾 */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          color="#ffaa00"
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

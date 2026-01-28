import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Nebula = () => {
  const cloudRef1 = useRef<THREE.Mesh>(null);
  const cloudRef2 = useRef<THREE.Mesh>(null);
  const cloudRef3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (cloudRef1.current) {
      cloudRef1.current.rotation.z = time * 0.05;
      cloudRef1.current.rotation.x = Math.sin(time * 0.1) * 0.2;
    }
    
    if (cloudRef2.current) {
      cloudRef2.current.rotation.z = -time * 0.03;
      cloudRef2.current.rotation.y = Math.cos(time * 0.1) * 0.2;
    }
    
    if (cloudRef3.current) {
      cloudRef3.current.rotation.z = time * 0.04;
      cloudRef3.current.rotation.x = -Math.sin(time * 0.15) * 0.15;
    }
  });

  return (
    <group>
      {/* 紫色星云 */}
      <mesh ref={cloudRef1} position={[-50, 30, -100]}>
        <sphereGeometry args={[40, 32, 32]} />
        <meshBasicMaterial
          color="#8844ff"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 蓝色星云 */}
      <mesh ref={cloudRef2} position={[60, -20, -120]}>
        <sphereGeometry args={[35, 32, 32]} />
        <meshBasicMaterial
          color="#4488ff"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 粉色星云 */}
      <mesh ref={cloudRef3} position={[-40, -30, -90]}>
        <sphereGeometry args={[30, 32, 32]} />
        <meshBasicMaterial
          color="#ff44aa"
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

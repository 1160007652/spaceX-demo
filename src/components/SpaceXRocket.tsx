import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../store/useStore';

export const SpaceXRocket = () => {
  const rocketRef = useRef<THREE.Group>(null);
  const { isLaunching, setLaunched } = useStore();
  const launchStartTime = useRef<number | null>(null);

  useFrame((state) => {
    if (!rocketRef.current || !isLaunching) return;

    if (launchStartTime.current === null) {
      launchStartTime.current = state.clock.elapsedTime;
    }

    const elapsed = state.clock.elapsedTime - launchStartTime.current;
    
    // 发射动画：加速上升
    const speed = Math.pow(elapsed * 0.5, 2);
    rocketRef.current.position.y += speed * 0.1;
    
    // 轻微旋转效果
    rocketRef.current.rotation.z = Math.sin(elapsed * 2) * 0.05;

    // 相机跟随
    state.camera.position.y = rocketRef.current.position.y - 5;
    state.camera.position.z = 10 - elapsed * 0.5;
    state.camera.lookAt(rocketRef.current.position);

    // 发射完成
    if (elapsed > 15) {
      setLaunched(true);
    }
  });

  return (
    <group ref={rocketRef} position={[0, 0, 0]}>
      {/* 火箭主体 */}
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 4, 32]} />
        <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* 火箭头部 */}
      <mesh position={[0, 4.5, 0]}>
        <coneGeometry args={[0.5, 1.5, 32]} />
        <meshStandardMaterial color="#ff0000" metalness={0.6} roughness={0.3} />
      </mesh>
      
      {/* 火箭尾翼 */}
      {[0, 90, 180, 270].map((angle, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((angle * Math.PI) / 180) * 0.7,
            0,
            Math.sin((angle * Math.PI) / 180) * 0.7,
          ]}
          rotation={[0, (angle * Math.PI) / 180, 0]}
        >
          <boxGeometry args={[0.1, 1, 0.8]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
      ))}
      
      {/* SpaceX 标志 */}
      <mesh position={[0, 2.5, 0.51]} rotation={[0, 0, 0]}>
        <planeGeometry args={[1, 0.3]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
    </group>
  );
};

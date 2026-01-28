import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { SpaceXRocket } from './SpaceXRocket';
import { LaunchEffects } from './LaunchEffects';
import { ColorfulStars } from './ColorfulStars';
import { Nebula } from './Nebula';
import { useStore } from '../store/useStore';

export const SpaceScene = () => {
  const { isPaid, isLaunching } = useStore();

  if (!isPaid) return null;

  return (
    <div style={{ width: '100vw', height: '100vh', background: 'radial-gradient(circle, #0a0e27 0%, #000000 100%)' }}>
      <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
        {/* 环境光 */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[0, 10, 0]} intensity={0.8} color="#aaccff" />
        <pointLight position={[-20, 5, -10]} intensity={0.5} color="#ff88cc" />
        <pointLight position={[20, 5, -10]} intensity={0.5} color="#88ccff" />
        
        {/* 绚丽多彩的星空 */}
        <ColorfulStars count={5000} />
        
        {/* 星云效果 */}
        <Nebula />
        
        {/* 火箭和特效 */}
        <SpaceXRocket />
        <LaunchEffects />
        
        {!isLaunching && <OrbitControls enableZoom={false} />}
      </Canvas>
    </div>
  );
};

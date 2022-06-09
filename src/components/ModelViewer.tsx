import { Canvas, extend } from '@react-three/fiber'
import { Sky, Environment, OrbitControls } from '@react-three/drei'
import { SSAOPass } from 'three-stdlib'
import { Suspense } from 'react'

import HDR from '../assets/model/adamsbridge.hdr?url'
import TransfoModel from './TransfoModel'

extend({ SSAOPass })

function ModelViewer() {
  return (
    <Suspense fallback={null}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{
          position: [-70, -300, 90],
          fov: 35,
        }}
      >
        <OrbitControls
          position={[100, 200, 140]}
          makeDefault
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 3}
          enableZoom={true}
          enablePan={true}
          zoomSpeed={1}
          minDistance={100}
          maxDistance={300}
          autoRotate={false}
          autoRotateSpeed={0.4}
        />
        <spotLight
          visible={true}
          intensity={1}
          angle={0.3}
          penumbra={1}
          position={[180, 250, 100]}
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <directionalLight
          intensity={1}
          position={[-10, -10, -10]}
          color="#fdfbd3"
        />
        <Environment files={HDR} />
        <Sky />
        <TransfoModel />
      </Canvas>
    </Suspense>
  )
}

export default ModelViewer

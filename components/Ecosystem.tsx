import React, { Suspense, useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, OrbitControls, PerspectiveCamera, Loader, Float, RoundedBox, Cylinder, Text, Box, Sphere, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// --- CHARACTERS COMPONENT ---
const Humanoid = ({ position, target, speed = 1, color = "#FF6A2F", delay = 0, isStatic = false }: { position: [number, number, number], target?: [number, number, number], speed?: number, color?: string, delay?: number, isStatic?: boolean }) => {
    const group = useRef<THREE.Group>(null);
    const leftLeg = useRef<THREE.Mesh>(null);
    const rightLeg = useRef<THREE.Mesh>(null);
    const leftArm = useRef<THREE.Mesh>(null);
    const rightArm = useRef<THREE.Mesh>(null);

    const startPos = useRef(new THREE.Vector3(...position));
    const targetPos = useRef(target ? new THREE.Vector3(...target) : null);
    const progress = useRef(0);

    useFrame((state, delta) => {
        if (!group.current) return;

        const t = state.clock.getElapsedTime() * speed * 8 + delay;

        // MOVEMENT LOGIC
        if (targetPos.current && !isStatic) {
            progress.current += delta * (speed * 0.15);
            if (progress.current > 1) progress.current = 0; // Loop walk

            // Smooth Slide
            group.current.position.lerpVectors(startPos.current, targetPos.current, progress.current);
            group.current.lookAt(targetPos.current);

            // Very subtle bounce to suggest walking without breaking limbs
            group.current.position.y = position[1] + Math.abs(Math.sin(t * 4)) * 0.05;

        } else {
            // IDLE ANIMATION (Static)
            group.current.position.y = position[1];
        }
    });

    const skinColor = "#ffccaa"; // Simple skin tone placeholder or white
    const shirtColor = color;
    const pantsColor = "#1f2937"; // Dark gray

    return (
        <group ref={group} position={position}>
            {/* Head */}
            <Sphere args={[0.18, 16, 16]} position={[0, 1.55, 0]}>
                <meshStandardMaterial color="white" roughness={0.5} />
            </Sphere>

            {/* Torso */}
            <Box args={[0.35, 0.45, 0.2]} position={[0, 1.15, 0]}>
                <meshStandardMaterial color={shirtColor} />
            </Box>

            {/* Arms (Pivot at shoulder: y=1.35) */}
            <group position={[-0.22, 1.35, 0]}>
                <mesh ref={leftArm} position={[0, -0.25, 0]}>
                    <boxGeometry args={[0.1, 0.5, 0.1]} />
                    <meshStandardMaterial color={shirtColor} />
                </mesh>
            </group>
            <group position={[0.22, 1.35, 0]}>
                <mesh ref={rightArm} position={[0, -0.25, 0]}>
                    <boxGeometry args={[0.1, 0.5, 0.1]} />
                    <meshStandardMaterial color={shirtColor} />
                </mesh>
            </group>

            {/* Legs (Pivot at hip: y=0.9) */}
            <group position={[-0.1, 0.9, 0]}>
                <mesh ref={leftLeg} position={[0, -0.45, 0]}>
                    <boxGeometry args={[0.12, 0.9, 0.12]} />
                    <meshStandardMaterial color={pantsColor} />
                </mesh>
            </group>
            <group position={[0.1, 0.9, 0]}>
                <mesh ref={rightLeg} position={[0, -0.45, 0]}>
                    <boxGeometry args={[0.12, 0.9, 0.12]} />
                    <meshStandardMaterial color={pantsColor} />
                </mesh>
            </group>
        </group>
    );
};

const Characters = React.forwardRef<any, any>((props, ref) => {
    const walkers = useMemo(() => {
        // 1. The Core 3 Individuals (Static on road)
        const core = [
            { pos: [0, 0, 6], color: "#FF6A2F" },
            { pos: [-1.2, 0, 7.5], color: "#333" },
            { pos: [1.2, 0, 7], color: "#FF6A2F" },
        ];

        // 2. Static Representatives in front of Buildings
        const buildingReps = [
            // In front of Uni (Left)
            { pos: [-5, 0, 0.5], color: "#333", lookAt: [0, 0, 8] },
            // In front of Tech (Right)
            { pos: [5, 0, 0.5], color: "#FF6A2F", lookAt: [0, 0, 8] },
            // In front of City (Back)
            { pos: [0, 0, -3.5], color: "#333", lookAt: [0, 0, 8] },
        ];

        return { core, buildingReps };
    }, []);

    return (
        <group ref={ref} name="characters-group">
            {/* Core Group - Static */}
            {walkers.core.map((w, i) => (
                <Humanoid key={`core-${i}`} position={w.pos as any} color={w.color} speed={0.5} delay={i} isStatic={true} />
            ))}

            {/* Building Representatives - Static */}
            {walkers.buildingReps.map((w, i) => (
                <Humanoid
                    key={`rep-${i}`}
                    position={w.pos as any}
                    color={w.color}
                    speed={0.5}
                    delay={i * 2}
                    isStatic={true}
                />
            ))}
        </group>
    );
});
Characters.displayName = 'Characters';

// --- DATA FLOW COMPONENT ---
const QRTileParticle = ({ start, end, speed, delay, color }: any) => {
    const mesh = useRef<THREE.Group>(null);
    const progress = useRef(0);

    useFrame((state, delta) => {
        if (!mesh.current) return;

        progress.current += delta * speed;
        if (progress.current > 1) progress.current = 0;

        const p = progress.current;
        const height = Math.sin(p * Math.PI) * 2;

        mesh.current.position.lerpVectors(start, end, p);
        mesh.current.position.y += height;

        // Spin the tile
        mesh.current.rotation.y += delta * 2;
        mesh.current.rotation.x += delta;
    });

    return (
        <group ref={mesh}>
            {/* The Tile */}
            <mesh>
                <boxGeometry args={[0.2, 0.2, 0.02]} />
                <meshBasicMaterial color="white" />
            </mesh>
            {/* Inner Detail (QR-ish) */}
            <mesh position={[0, 0, 0.02]}>
                <planeGeometry args={[0.12, 0.12]} />
                <meshBasicMaterial color={color} />
            </mesh>
        </group>
    );
};

const DataFlow = React.forwardRef<any, any>((props, ref) => {
    const paths = useMemo(() => [
        { start: new THREE.Vector3(0, 0, 5), end: new THREE.Vector3(-5, 1.5, -2), color: "#FF6A2F" }, // Road -> Uni
        { start: new THREE.Vector3(0, 0, 5), end: new THREE.Vector3(5, 1.5, -2), color: "#FF6A2F" },  // Road -> Tech
        { start: new THREE.Vector3(-5, 1.5, -2), end: new THREE.Vector3(5, 1.5, -2), color: "#333" }, // Uni -> Tech
        { start: new THREE.Vector3(5, 1.5, -2), end: new THREE.Vector3(0, 2, -6), color: "#333" },    // Tech -> City
    ], []);

    return (
        <group ref={ref} name="data-flow-group">
            {paths.map((path, i) => (
                <group key={i}>
                    {[...Array(2)].map((_, j) => (
                        <QRTileParticle
                            key={j}
                            start={path.start}
                            end={path.end}
                            speed={0.3 + Math.random() * 0.3}
                            delay={j * 1.5}
                            color={path.color}
                        />
                    ))}
                </group>
            ))}
        </group>
    );
});
DataFlow.displayName = 'DataFlow';

// --- WORLD COMPONENT ---
const World = React.forwardRef<any, any>((props, ref) => {
    return (
        <group>
            {/* Main Ground Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color="#f3f4f6" roughness={0.8} metalness={0.2} />
            </mesh>

            {/* The Growth Road */}
            <group ref={ref}>
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
                    <planeGeometry args={[8, 60]} />
                    <meshPhysicalMaterial
                        color="#ffffff"
                        roughness={0.2}
                        metalness={0.1}
                        transmission={0.5}
                        thickness={1}
                    />
                </mesh>

                {/* Glowing Edges of Road */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-4.1, 0.02, 0]}>
                    <planeGeometry args={[0.2, 60]} />
                    <meshBasicMaterial color="#FF6A2F" toneMapped={false} />
                </mesh>
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[4.1, 0.02, 0]}>
                    <planeGeometry args={[0.2, 60]} />
                    <meshBasicMaterial color="#FF6A2F" toneMapped={false} />
                </mesh>
            </group>
        </group>
    );
});
World.displayName = 'World';

// --- BUILDINGS COMPONENT ---
const Signage = ({ text, position, width = 1.2 }: { text: string, position: [number, number, number], width?: number }) => (
    <group position={position}>
        {/* Modern Panel */}
        <mesh position={[0, 0, -0.02]}>
            <boxGeometry args={[width, 0.3, 0.05]} />
            <meshStandardMaterial color="#ffffff" />
        </mesh>
        {/* Border/Glow */}
        <mesh position={[0, 0, -0.025]} scale={[1.05, 1.2, 1]}>
            <boxGeometry args={[width, 0.3, 0.04]} />
            <meshBasicMaterial color="#FF6A2F" opacity={0.3} transparent />
        </mesh>
        {/* Text - Moved forward to avoid clipping */}
        <Text
            position={[0, 0, 0.06]}
            fontSize={0.15}
            color="black"
            anchorX="center"
            anchorY="middle"
            fontWeight="bold"
            letterSpacing={0.05}
        >
            {text.toUpperCase()}
        </Text>
    </group>
);

const BuildingBase = ({ children, position }: { children: React.ReactNode, position: [number, number, number] }) => (
    <group position={position}>
        {/* Base Plate */}
        <mesh position={[0, 0.1, 0]} receiveShadow>
            <cylinderGeometry args={[1.5, 1.5, 0.1, 32]} />
            <meshStandardMaterial color="#f3f4f6" />
        </mesh>
        {children}
    </group>
);

const UniversityNode = ({ position, scale = 1.5 }: { position: [number, number, number], scale?: any }) => (
    <group position={position} scale={scale} name="university-node">
        <BuildingBase position={[0, 0, 0]}>
            {/* Pillars */}
            <group position={[0, 0.8, 0]}>
                <Cylinder args={[0.1, 0.1, 1.5]} position={[-0.6, 0, -0.6]}><meshStandardMaterial color="white" /></Cylinder>
                <Cylinder args={[0.1, 0.1, 1.5]} position={[0.6, 0, -0.6]}><meshStandardMaterial color="white" /></Cylinder>
                <Cylinder args={[0.1, 0.1, 1.5]} position={[-0.6, 0, 0.6]}><meshStandardMaterial color="white" /></Cylinder>
                <Cylinder args={[0.1, 0.1, 1.5]} position={[0.6, 0, 0.6]}><meshStandardMaterial color="white" /></Cylinder>

                {/* Roof */}
                <RoundedBox args={[1.8, 0.3, 1.8]} position={[0, 0.9, 0]} radius={0.05}>
                    <meshStandardMaterial color="white" />
                </RoundedBox>
                <Cylinder args={[0.6, 0.8, 0.6, 4]} position={[0, 1.3, 0]} rotation={[0, Math.PI / 4, 0]}>
                    <meshStandardMaterial color="#FF6A2F" />
                </Cylinder>

                {/* Signage on Roof Edge */}
                <Signage text="Institution" position={[0, 0.9, 0.92]} width={1.4} />
            </group>
        </BuildingBase>
    </group>
);

const TechNode = ({ position, scale = 1.5 }: { position: [number, number, number], scale?: any }) => (
    <group position={position} scale={scale} name="tech-node">
        <BuildingBase position={[0, 0, 0]}>
            {/* Hexagonal Tower */}
            <Cylinder args={[0.8, 0.8, 2.5, 6]} position={[0, 1.2, 0]}>
                <meshStandardMaterial color="white" />
            </Cylinder>
            {/* Inner Core */}
            <Cylinder args={[0.9, 0.9, 0.1, 6]} position={[0, 2, 0]}>
                <meshBasicMaterial color="#FF6A2F" />
            </Cylinder>

            {/* Signage on Tower Face */}
            <Signage text="Tech Hub" position={[0, 1.5, 0.75]} width={1.2} />
        </BuildingBase>
    </group>
);

const CityNode = ({ position, scale = 1.5 }: { position: [number, number, number], scale?: any }) => (
    <group position={position} scale={scale} name="city-node">
        <BuildingBase position={[0, 0, 0]}>
            {/* Cluster of Skyscrapers */}
            <RoundedBox args={[0.6, 3, 0.6]} position={[-0.3, 1.5, -0.3]} radius={0.05}>
                <meshStandardMaterial color="white" />
            </RoundedBox>
            <RoundedBox args={[0.6, 1.8, 0.6]} position={[0.5, 0.9, 0.1]} radius={0.05}>
                <meshStandardMaterial color="#e5e7eb" />
            </RoundedBox>
            <RoundedBox args={[0.5, 2.4, 0.5]} position={[-0.1, 1.2, 0.5]} radius={0.05}>
                <meshStandardMaterial color="white" />
            </RoundedBox>

            {/* Signage on Main Building */}
            <Signage text="Smart City" position={[-0.3, 2.5, 0.02]} width={1.3} />
        </BuildingBase>
    </group>
);

const ModernBuildings = React.forwardRef<any, any>((props, ref) => {
    return (
        <group ref={ref}>
            {/* University (Left) */}
            <UniversityNode position={[-5, 0, -2]} />

            {/* Tech Company (Right) */}
            <TechNode position={[5, 0, -2]} />

            {/* Smart City (Center Back) */}
            <CityNode position={[0, 0, -6]} />
        </group>
    );
});
ModernBuildings.displayName = 'ModernBuildings';

// --- MAIN EXPERIENCE COMPONENT ---
const Experience = () => {
    const roadRef = useRef(null);
    const buildingsRef = useRef(null);
    const charactersRef = useRef(null);
    const dataFlowRef = useRef(null);

    const { camera } = useThree();

    useEffect(() => {
        // Set perfect initial angle
        camera.position.set(0, 12, 22);
        camera.lookAt(0, 0, 0);
    }, [camera]);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        // Gentle floating camera movement (breathing)
        camera.position.y = 12 + Math.sin(t * 0.2) * 0.5;
        camera.position.x = Math.sin(t * 0.1) * 2;
        camera.lookAt(0, 0, 0);
    });

    return (
        <>
            <ambientLight intensity={1} />
            <directionalLight position={[10, 20, 10]} intensity={2} castShadow />
            <Environment preset="city" />

            <group position={[0, -2, 0]}>
                <World ref={roadRef} />

                {/* Float the buildings slightly for a magical feel */}
                <Float speed={1} rotationIntensity={0} floatIntensity={0.2} floatingRange={[0, 0.2]}>
                    <ModernBuildings ref={buildingsRef} />
                </Float>

                <Characters ref={charactersRef} />
                <DataFlow ref={dataFlowRef} />
            </group>

            <ContactShadows
                position={[0, -1.9, 0]}
                opacity={0.5}
                scale={40}
                blur={2}
                far={10}
                resolution={256}
                color="#000000"
            />
        </>
    );
};

// --- EXPORTED ECOSYSTEM COMPONENT ---
export const Ecosystem: React.FC = () => {
    return (
        <section className="w-full h-[100vh] relative bg-gray-50 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Canvas
                    shadows
                    camera={{ position: [0, 10, 20], fov: 45 }}
                    gl={{ antialias: true, alpha: true }}
                    dpr={[1, 2]}
                >
                    <Suspense fallback={null}>
                        <Experience />
                    </Suspense>
                </Canvas>
                <Loader />
            </div>
        </section>
    );
};

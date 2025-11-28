import React from 'react';
import { motion } from 'framer-motion';
import { User, Building, GraduationCap, Globe, QrCode } from 'lucide-react';

export const Ecosystem: React.FC = () => {
  return (
    <section className="py-40 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">The Q-Universe Ecosystem</h2>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          A unified readiness layer connecting every stakeholder in the global talent economy.
        </p>
      </div>

      <div className="relative w-full h-[600px] flex items-center justify-center perspective-1000">
        {/* Orbital Rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <div className="w-[300px] h-[300px] border border-gray-100 rounded-full animate-spin-slow" style={{ animationDuration: '30s' }}></div>
           <div className="absolute w-[500px] h-[500px] border border-gray-100 rounded-full animate-spin-slow animation-reverse" style={{ animationDuration: '45s' }}></div>
           <div className="absolute w-[700px] h-[700px] border border-gray-100 rounded-full opacity-50"></div>
        </div>

        {/* Central Hub - Dynamic 3D QR */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0, rotateY: 180 }}
          whileInView={{ scale: 1, opacity: 1, rotateY: 0 }}
          transition={{ duration: 1.2, type: "spring" }}
          className="relative z-20 w-48 h-48"
        >
            <div className="relative w-full h-full group cursor-pointer">
                {/* Glow behind */}
                <div className="absolute inset-0 bg-orange/40 blur-3xl rounded-full animate-pulse-slow"></div>
                
                {/* Main Card */}
                <div className="relative w-full h-full bg-gradient-to-br from-orange to-[#FF8C5F] rounded-3xl flex items-center justify-center shadow-2xl transform transition-transform duration-500 hover:scale-105 hover:rotate-3">
                    
                    {/* Inner Glass Layer */}
                    <div className="absolute inset-2 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 flex items-center justify-center overflow-hidden">
                        
                        {/* Scanning Line Animation */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-white/50 shadow-[0_0_15px_rgba(255,255,255,0.8)] animate-[scan_3s_ease-in-out_infinite]"></div>
                        
                        <QrCode className="w-24 h-24 text-white relative z-10 drop-shadow-md" strokeWidth={1.5} />
                        
                        {/* Tech Corners */}
                        <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-white/40"></div>
                        <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-white/40"></div>
                        <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-white/40"></div>
                        <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-white/40"></div>
                    </div>
                </div>
                
                {/* Floating Label */}
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-white px-5 py-2 rounded-full shadow-lg border border-gray-100 whitespace-nowrap z-30">
                    <span className="text-xs font-bold tracking-widest text-orange uppercase flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                      Unified ID
                    </span>
                </div>
            </div>
        </motion.div>

        {/* Orbiting Nodes */}
        <OrbitNode 
            icon={<User size={32} />} 
            label="Individuals" 
            angle={-45} 
            distance={250} 
            delay={0.2}
            desc="Discovery & Growth"
        />
        <OrbitNode 
            icon={<Building size={32} />} 
            label="Enterprises" 
            angle={45} 
            distance={250} 
            delay={0.4}
            desc="Precision Hiring"
        />
        <OrbitNode 
            icon={<GraduationCap size={32} />} 
            label="Universities" 
            angle={135} 
            distance={250} 
            delay={0.6}
            desc="Agile Curriculum"
        />
        <OrbitNode 
            icon={<Globe size={32} />} 
            label="Smart Cities" 
            angle={225} 
            distance={250} 
            delay={0.8}
            desc="Policy Intelligence"
        />
      </div>
      
      {/* CSS for Scan Animation */}
      <style>{`
        @keyframes scan {
            0% { top: 0%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  );
};

const OrbitNode = ({ icon, label, angle, distance, delay, desc }: any) => {
  // Simple CSS positioning for the static layout, animation handles the reveal
  const x = Math.cos((angle * Math.PI) / 180) * distance;
  const y = Math.sin((angle * Math.PI) / 180) * distance;

  return (
    <motion.div
      initial={{ opacity: 0, x: 0, y: 0 }}
      whileInView={{ opacity: 1, x, y }}
      transition={{ type: "spring", stiffness: 50, delay }}
      className="absolute z-10 flex flex-col items-center group cursor-pointer"
    >
      <div className="w-20 h-20 bg-white border-2 border-gray-100 rounded-full flex items-center justify-center shadow-lg group-hover:border-orange group-hover:scale-110 transition-all duration-300">
        <div className="text-gray-400 group-hover:text-orange transition-colors duration-300">
            {icon}
        </div>
      </div>
      <div className="mt-4 text-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-transparent group-hover:border-orange/20 transition-all">
        <h4 className="font-bold text-lg text-black group-hover:text-orange transition-colors">{label}</h4>
        <p className="text-xs text-gray-500 uppercase tracking-wide">{desc}</p>
      </div>
    </motion.div>
  );
};
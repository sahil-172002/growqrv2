import React from 'react';
import { QrCode, Cpu, ShieldCheck, Brain, BarChart3, Users } from 'lucide-react';
import { Reveal } from './ui/Reveal';

const TechItem = ({ icon: Icon, label }: { icon: any, label: string }) => (
  <div className="flex flex-col items-center gap-4 group cursor-default">
    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:bg-orange group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-orange/30">
      <Icon className="w-8 h-8 md:w-10 md:h-10 text-gray-800 group-hover:text-white transition-colors" />
    </div>
    <span className="text-gray-500 font-medium group-hover:text-orange transition-colors text-sm md:text-base text-center">{label}</span>
  </div>
);

export const TechEngine: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50 border-y border-gray-200">
      <div className="container mx-auto px-6">
        <Reveal direction="up" className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Powered By Intelligence</h2>
          <p className="text-gray-500">The stack behind the revolution.</p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12">
          <Reveal delay={0.1} direction="up"><TechItem icon={QrCode} label="Unified QR" /></Reveal>
          <Reveal delay={0.2} direction="up"><TechItem icon={BarChart3} label="Q-Score Engine" /></Reveal>
          <Reveal delay={0.3} direction="up"><TechItem icon={Brain} label="AI Agents" /></Reveal>
          <Reveal delay={0.4} direction="up"><TechItem icon={ShieldCheck} label="Blockchain" /></Reveal>
          <Reveal delay={0.5} direction="up"><TechItem icon={Cpu} label="Predictive AI" /></Reveal>
          <Reveal delay={0.6} direction="up"><TechItem icon={Users} label="Human Verified" /></Reveal>
        </div>
      </div>
    </section>
  );
};
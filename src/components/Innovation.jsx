import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Globe, Award, Link, MapPin, Zap } from 'lucide-react';

const pillars = [
  { icon: Settings, title: 'Pioneering Technology and Solutions' },
  { icon: Globe, title: 'Sustainable Practices and Environmental Stewardship' },
  { icon: Award, title: 'Safety and Operational Excellence' },
  { icon: Link, title: 'Strategic Partnerships and Collaborations' },
  { icon: Zap, title: 'Thought Leadership & Expertise' },
  { icon: MapPin, title: 'Global Presence & Market Adaptability' },
];

const Innovation = () => {
  return (
    <section id="innovation" className="py-24 bg-primary text-background overflow-hidden relative">
      <div className="absolute inset-0 bg-diagonal-pattern opacity-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-5xl mb-4"
          >
            Innovation & <span className="text-charcoal/90">Expertise</span>
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            className="w-20 h-1 bg-background mx-auto origin-left" 
          />
        </div>

        {/* Desktop Connected Layout */}
        <div className="hidden lg:block relative">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-primary-light transform -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-6 gap-4 relative z-10">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex flex-col items-center group"
                >
                  {/* Top content for even index */}
                  {index % 2 === 0 ? (
                    <div className="h-32 flex items-end pb-6 text-center">
                      <h4 className="font-heading text-xl leading-tight group-hover:text-charcoal/90 transition-colors">{pillar.title}</h4>
                    </div>
                  ) : (
                    <div className="h-32" /> 
                  )}

                  {/* Dot/Icon */}
                  <div className="w-16 h-16 bg-background text-primary rounded-full flex items-center justify-center border-4 border-primary shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <Icon size={24} />
                  </div>

                  {/* Bottom content for odd index */}
                  {index % 2 !== 0 ? (
                    <div className="h-32 flex items-start pt-6 text-center">
                      <h4 className="font-heading text-xl leading-tight group-hover:text-charcoal/90 transition-colors">{pillar.title}</h4>
                    </div>
                  ) : (
                    <div className="h-32" /> 
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center space-x-6 bg-primary-light/30 p-6 rounded-lg"
              >
                <div className="flex-shrink-0 w-14 h-14 bg-background text-primary rounded-full flex items-center justify-center">
                  <Icon size={24} />
                </div>
                <h4 className="font-heading text-2xl leading-tight">{pillar.title}</h4>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Innovation;

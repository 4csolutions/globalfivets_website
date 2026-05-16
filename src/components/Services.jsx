import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Network, Waves, ArrowRight } from 'lucide-react';

const services = [
  {
    title: 'Water Pipeline Installation',
    icon: Droplets,
    points: [
      'HDPE/DI/GRP/MS pipelines',
      'Transmission & distribution networks',
      'Valve chambers',
      'Pressure testing',
      'Disinfection'
    ]
  },
  {
    title: 'Telecommunication Construction',
    icon: Network,
    points: [
      'Fiber optic networks',
      'FTTH connections',
      'Splicing',
      'OTDR testing',
      'ODF termination'
    ]
  },
  {
    title: 'Wastewater Pipeline Installation',
    icon: Waves,
    points: [
      'Gravity sewers',
      'Manholes',
      'Pumping station connections',
      'Trenchless methods',
      'Leak testing'
    ]
  }
];

const Services = () => {
  return (
    <section id="services" className="py-24 relative bg-background">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-fixed opacity-10"
        style={{ backgroundImage: 'url("/images/Services.png")' }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-5xl text-charcoal mb-4"
          >
            What We <span className="text-primary">Do</span>
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            className="w-20 h-1 bg-primary mx-auto origin-left" 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="bg-white group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col"
              >
                <div className="h-2 w-full bg-primary transition-all duration-300 group-hover:h-3" />
                <div className="p-8 flex-grow flex flex-col">
                  <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
                    <Icon size={32} />
                  </div>
                  <h3 className="font-heading text-3xl text-charcoal mb-4 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <ul className="space-y-3 mb-8 flex-grow">
                    {service.points.map((point, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-primary mr-2 mt-1">•</span>
                        <span className="font-body text-charcoal/70">{point}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="#contact" className="inline-flex items-center text-primary font-body font-bold uppercase tracking-wider group-hover:text-primary-light transition-colors mt-auto">
                    Learn More <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;

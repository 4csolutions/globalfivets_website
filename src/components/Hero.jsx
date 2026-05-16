import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/images/Hero.png")' }}
      />
      <div className="absolute inset-0 z-0 bg-charcoal/70 mix-blend-multiply" />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-80" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-heading text-6xl md:text-8xl text-background mb-6 tracking-wide drop-shadow-lg text-balance"
        >
          Engineering the Flow of <span className="text-primary">Tomorrow</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-body text-xl md:text-2xl text-background/90 mb-10 max-w-3xl mx-auto"
        >
          Oman's trusted partner in Water, Wastewater & Telecom Infrastructure.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <a href="#services" className="bg-primary hover:bg-primary-light text-background px-8 py-4 font-body font-bold uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
            Our Services
          </a>
          <a href="#projects" className="border-2 border-background text-background hover:bg-background hover:text-charcoal px-8 py-4 font-body font-bold uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
            View Projects
          </a>
        </motion.div>
      </div>

      {/* Stats Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        className="absolute bottom-0 left-0 w-full bg-charcoal/80 backdrop-blur-md border-t border-primary/30"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-primary/30">
            <div className="pt-4 md:pt-0">
              <h3 className="font-heading text-4xl text-primary mb-1">40+ Years</h3>
              <p className="font-body text-background/80 uppercase tracking-widest text-sm font-semibold">Experience</p>
            </div>
            <div className="pt-4 md:pt-0">
              <h3 className="font-heading text-4xl text-primary mb-1">3 Core</h3>
              <p className="font-body text-background/80 uppercase tracking-widest text-sm font-semibold">Divisions</p>
            </div>
            <div className="pt-4 md:pt-0">
              <h3 className="font-heading text-4xl text-primary mb-1">Oman-Wide</h3>
              <p className="font-body text-background/80 uppercase tracking-widest text-sm font-semibold">Coverage</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

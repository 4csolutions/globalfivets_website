import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lightbulb, HardHat, Leaf, Users } from 'lucide-react';

const values = [
  { icon: Shield, title: 'Integrity', desc: 'Operating with unwavering ethics and transparency.' },
  { icon: Lightbulb, title: 'Innovation', desc: 'Embracing advanced technologies for better solutions.' },
  { icon: HardHat, title: 'Safety', desc: 'Prioritizing the well-being of our workforce.' },
  { icon: Leaf, title: 'Sustainability', desc: 'Building future-ready, eco-friendly infrastructure.' },
  { icon: Users, title: 'Customer Commitment', desc: 'Delivering excellence and long-term value.' },
];

const About = () => {
  return (
    <section id="about" className="py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-5xl text-charcoal mb-6">
              About <span className="text-primary">Global Five</span>
            </h2>
            <div className="w-20 h-1 bg-primary mb-8" />
            <p className="font-body text-lg text-charcoal/80 leading-relaxed mb-6">
              Global Five Trading and Services LLC is a leading Omani conglomerate with diversified expertise across engineering, infrastructure, utility technologies, and communication solutions. 
            </p>
            <p className="font-body text-lg text-charcoal/80 leading-relaxed">
              Backed by a leadership team with more than four decades of industry experience, the company has evolved into a professionally managed and highly diversified organization guided by core values of trust, excellence, and innovation. The company proudly contributes to the objectives of Oman Vision 2040 through sustainable and future-ready projects.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px]"
          >
            <div className="absolute inset-0 bg-primary/10 transform translate-x-4 translate-y-4" />
            <div 
              className="absolute inset-0 bg-cover bg-center shadow-2xl"
              style={{ backgroundImage: 'url("/images/About%20us.png")' }}
            />
            {/* Geometric abstract shapes */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary z-10 opacity-90 flex items-center justify-center">
               <div className="w-24 h-24 border-4 border-background" />
            </div>
          </motion.div>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-primary text-background p-10 shadow-xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full transform translate-x-1/3 -translate-y-1/3 group-hover:scale-110 transition-transform duration-500" />
            <h3 className="font-heading text-4xl mb-4 relative z-10">Our Vision</h3>
            <p className="font-body text-lg leading-relaxed relative z-10 opacity-90">
              To be Oman's leading provider of sustainable pipeline, infrastructure, and telecommunication solutions, enhancing the nation's distribution networks and management systems through innovation, reliability, and engineering excellence.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-primary-light text-background p-10 shadow-xl relative overflow-hidden group"
          >
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full transform -translate-x-1/3 translate-y-1/3 group-hover:scale-110 transition-transform duration-500" />
            <h3 className="font-heading text-4xl mb-4 relative z-10">Our Mission</h3>
            <p className="font-body text-lg leading-relaxed relative z-10 opacity-90">
              To deliver end-to-end engineering and infrastructure solutions across all sectors by combining technical expertise, advanced technologies, and skilled professionals — committed to executing projects safely, efficiently, and sustainably while creating long-term value for clients, partners, and communities.
            </p>
          </motion.div>
        </div>

        {/* Core Values */}
        <div>
          <div className="text-center mb-16">
            <h3 className="font-heading text-4xl text-charcoal mb-4">Core Values</h3>
            <div className="w-16 h-1 bg-primary mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {values.map((val, index) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-6 border-t-4 border-primary shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mb-4 text-primary">
                    <Icon size={32} />
                  </div>
                  <h4 className="font-heading text-2xl text-charcoal mb-2">{val.title}</h4>
                  <p className="font-body text-sm text-charcoal/70">{val.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;

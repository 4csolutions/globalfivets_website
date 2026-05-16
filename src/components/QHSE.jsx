import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const qhseHighlights = [
  'Legal Compliance',
  'International Standards',
  'QHSE Framework',
  'Manager Accountability',
  'Employee Training'
];

const QHSE = () => {
  return (
    <section id="qhse" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-5xl text-charcoal mb-6 leading-tight">
              Health, Safety & Environmental <span className="text-primary">Commitment</span>
            </h2>
            <div className="w-20 h-1 bg-primary mb-8" />
            <p className="font-body text-lg text-charcoal/80 leading-relaxed mb-6">
              At Global Five, the well-being of our workforce and the protection of the environment are paramount. We integrate QHSE considerations into all aspects of our business planning and decision-making processes.
            </p>
            <p className="font-body text-lg text-charcoal/80 leading-relaxed">
              Our comprehensive policies ensure that every project is executed with the highest standards of safety, quality, and sustainability, minimizing risks and delivering reliable results for our clients and communities.
            </p>
          </motion.div>

          {/* Right Column */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {qhseHighlights.map((highlight, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.05 }}
                className={`flex items-center space-x-4 p-6 bg-white border-l-4 border-primary shadow-md ${index === qhseHighlights.length - 1 ? 'sm:col-span-2' : ''}`}
              >
                <CheckCircle2 className="text-primary flex-shrink-0" size={28} />
                <span className="font-heading text-xl text-charcoal tracking-wide">{highlight}</span>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default QHSE;

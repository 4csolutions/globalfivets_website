import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projectsData = [
  { id: 1, name: 'Jabrin–Ibri Transmission & Distribution Line Relocation', client: 'Galfar Engineering', category: 'Water', desc: 'Relocation of critical transmission and distribution pipelines to support regional infrastructure development.' },
  { id: 2, name: 'End User House Connections – Quriyat', client: 'PAEW', category: 'Water', desc: 'Installation of secure water connections for residential end-users in the Quriyat region.' },
  { id: 3, name: 'Sur Al Kamil Network Relocation', client: 'Strabag LLC', category: 'Water', desc: 'Complex relocation of existing water network to accommodate new road construction.' },
  { id: 4, name: 'Waterline Protection Works – Qurm', client: 'Al Tasnim Enterprises LLC', category: 'Water', desc: 'Execution of protection measures for critical waterlines against environmental and construction impacts.' },
  { id: 5, name: 'FOC Network Installation – 108 KM Sohar–Buraimi', client: 'Ministry of Defense', category: 'Telecom', desc: 'Laying of 108 kilometers of fiber optic cable network for secure defense communications.' },
  { id: 6, name: 'FOC Network Relocation – 65 KM Izki–Nizwa', client: 'OHI Telecommunications', category: 'Telecom', desc: 'Relocation and splicing of 65KM FOC network ensuring zero downtime during transition.' },
  { id: 7, name: 'FOC Network Installation – 48 KM Thalib', client: 'Ministry of Defense', category: 'Telecom', desc: 'Installation and testing of 48KM high-speed fiber optic infrastructure.' },
  { id: 8, name: 'FOC & Copper Network Relocation – Sur LNG', client: 'AZ Engineers', category: 'Telecom', desc: 'Relocation of combined fiber optic and copper networks for the Sur LNG facilities.' },
  { id: 9, name: 'Sewage Network Installation – Azaiba', client: 'Arab Contractors LLC', category: 'Wastewater', desc: 'Construction of modern gravity sewers and pumping connections for the Azaiba district.' },
  { id: 10, name: 'Sewage Network Installation – Al Ansab', client: 'Target LLC', category: 'Wastewater', desc: 'Comprehensive sewage pipeline installation to enhance urban sanitation.' },
  { id: 11, name: 'Sewage Network Installation – Al Khoud', client: 'Arab Contractors LLC', category: 'Wastewater', desc: 'Deployment of extensive wastewater infrastructure using advanced trenchless methods.' },
];

const categories = ['All', 'Water', 'Telecom', 'Wastewater'];

const Projects = () => {
  const [filter, setFilter] = useState('All');

  const filteredProjects = projectsData.filter(project => 
    filter === 'All' ? true : project.category === filter
  );

  return (
    <section id="projects" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading text-5xl text-charcoal mb-4"
            >
              Key <span className="text-primary">Projects</span>
            </motion.h2>
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              className="w-20 h-1 bg-primary origin-left mb-6 md:mb-0" 
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 font-body text-sm font-bold uppercase tracking-wider transition-colors duration-300 ${
                  filter === cat 
                    ? 'bg-primary text-background' 
                    : 'bg-white text-charcoal hover:bg-primary/10'
                } border border-charcoal/10`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                className="bg-white border border-charcoal/10 p-6 shadow-sm hover:shadow-xl transition-shadow group relative overflow-hidden flex flex-col"
              >
                {/* Accent corner */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500 rounded-full" />
                
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-white ${
                    project.category === 'Water' ? 'bg-blue-600' :
                    project.category === 'Telecom' ? 'bg-amber-600' :
                    'bg-emerald-600'
                  }`}>
                    {project.category}
                  </span>
                </div>
                
                <h3 className="font-heading text-2xl text-charcoal mb-2 leading-tight group-hover:text-primary transition-colors">
                  {project.name}
                </h3>
                
                <div className="mb-4">
                  <span className="font-body text-xs font-semibold text-charcoal/50 uppercase tracking-wide">Client:</span>
                  <span className="font-body text-sm text-charcoal ml-2 font-medium">{project.client}</span>
                </div>
                
                <p className="font-body text-charcoal/70 text-sm leading-relaxed mt-auto">
                  {project.desc}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

export default Projects;

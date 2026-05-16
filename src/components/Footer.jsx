import React from 'react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-charcoal text-background pt-20 pb-8 border-t-4 border-primary relative overflow-hidden">
      {/* Decorative subtle background logo/text */}
      <div className="absolute -bottom-20 -right-20 text-[20rem] font-heading text-background/5 opacity-50 select-none pointer-events-none leading-none">
        G5
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* Column 1 */}
          <div>
            <h3 className="font-heading text-3xl text-primary mb-4 tracking-wider">GLOBAL FIVE</h3>
            <p className="font-body text-sm text-background/70 mb-4 leading-relaxed">
              Engineering the Flow of Tomorrow. Oman's trusted partner in Water, Wastewater & Telecom Infrastructure.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="font-heading text-2xl mb-4">Quick Links</h4>
            <ul className="space-y-2 font-body text-background/70">
              <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Services</a></li>
              <li><a href="#projects" className="hover:text-primary transition-colors">Key Projects</a></li>
              <li><a href="#qhse" className="hover:text-primary transition-colors">QHSE Policy</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="font-heading text-2xl mb-4">Contact Info</h4>
            <ul className="space-y-3 font-body text-background/70">
              <li>Muscat, Sultanate of Oman</li>
              <li>PO Box XXX, PC XXX</li>
              <li>Phone: +968 XXXX XXXX</li>
              <li>Email: info@globalfivets.com</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-background/20 pt-8 text-center font-body text-sm text-background/50">
          <p>© 2025 Global Five Trading and Services LLC. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

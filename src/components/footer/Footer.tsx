// import React from 'react';
// import { 
//   Leaf, 
//   Mail, 
//   Phone, 
//   MapPin, 
//   Facebook, 
//   Twitter, 
//   Instagram, 
//   Linkedin,
//   Youtube,
//   Store,
//   Users,
//   BookOpen,
//   Shield,
//   FileText,
//   HelpCircle,
//   Heart,
//   Smartphone,
//   Globe,
//   Award,
//   Truck,
//   CreditCard,
//   MessageCircle
// } from 'lucide-react';

// const Footer: React.FC = () => {
//   const currentYear = new Date().getFullYear();

//   const footerSections = [
//     {
//       title: "Platform",
//       links: [
//         { label: "Marketplace", icon: Store, href: "#marketplace" },
//         { label: "Community", icon: Users, href: "#community" },
//         { label: "Knowledge Hub", icon: BookOpen, href: "#knowledge" },
//         { label: "Impact Tracking", icon: Heart, href: "#sustainability" },
//         { label: "Mobile App", icon: Smartphone, href: "#mobile" }
//       ]
//     },
//     {
//       title: "For Farmers",
//       links: [
//         { label: "Sell Products", icon: Store, href: "#sell" },
//         { label: "Farm Analytics", icon: Award, href: "#analytics" },
//         { label: "Shipping Support", icon: Truck, href: "#shipping" },
//         { label: "Payment Solutions", icon: CreditCard, href: "#payments" },
//         { label: "Farmer Resources", icon: BookOpen, href: "#resources" }
//       ]
//     },
//     {
//       title: "For Consumers",
//       links: [
//         { label: "Fresh Produce", icon: Leaf, href: "#produce" },
//         { label: "Local Farms", icon: MapPin, href: "#farms" },
//         { label: "Seasonal Guide", icon: Globe, href: "#seasonal" },
//         { label: "Recipes & Tips", icon: BookOpen, href: "#recipes" },
//         { label: "Delivery Info", icon: Truck, href: "#delivery" }
//       ]
//     },
//     {
//       title: "Support",
//       links: [
//         { label: "Help Center", icon: HelpCircle, href: "#help" },
//         { label: "Contact Us", icon: MessageCircle, href: "#contact" },
//         { label: "Live Chat", icon: MessageCircle, href: "#chat" },
//         { label: "FAQ", icon: FileText, href: "#faq" },
//         { label: "Safety Guidelines", icon: Shield, href: "#safety" }
//       ]
//     }
//   ];

//   const legalLinks = [
//     { label: "Privacy Policy", href: "#privacy" },
//     { label: "Terms of Service", href: "#terms" },
//     { label: "Cookie Policy", href: "#cookies" },
//     { label: "Refund Policy", href: "#refunds" },
//     { label: "Accessibility", href: "#accessibility" }
//   ];

//   const socialLinks = [
//     { icon: Facebook, href: "#facebook", label: "Facebook" },
//     { icon: Twitter, href: "#twitter", label: "Twitter" },
//     { icon: Instagram, href: "#instagram", label: "Instagram" },
//     { icon: Linkedin, href: "#linkedin", label: "LinkedIn" },
//     { icon: Youtube, href: "#youtube", label: "YouTube" }
//   ];

//   return (
//     <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white">
//       {/* Newsletter Subscription Section */}
//       <div className="border-b border-white/10">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           <div className="text-center mb-8">
//             <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
//               Stay Connected with Fresh Updates
//             </h3>
//             <p className="text-slate-300 max-w-2xl mx-auto">
//               Get the latest news about sustainable farming, seasonal produce, and exclusive offers from local farmers.
//             </p>
//           </div>
          
//           <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
//             <div className="flex-1">
//               <input
//                 type="email"
//                 placeholder="Enter your email address"
//                 className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent backdrop-blur-sm"
//               />
//             </div>
//             <button className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap">
//               Subscribe
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Footer Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          
//           {/* Brand Section */}
//           <div className="lg:col-span-2">
//             <div className="flex items-center space-x-3 mb-6">
//               <div className="relative">
//                 <Leaf className="h-10 w-10 text-emerald-400" />
//                 <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"></div>
//               </div>
//               <span className="text-3xl font-display font-bold bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
//                 FarmConnect
//               </span>
//             </div>
            
//             <p className="text-slate-300 mb-6 leading-relaxed">
//               Connecting sustainable farms directly with conscious consumers. Building a healthier, more transparent food system one connection at a time.
//             </p>
            
//             {/* Contact Info */}
//             <div className="space-y-3">
//               <div className="flex items-center space-x-3 text-slate-300">
//                 <Phone className="h-4 w-4 text-emerald-400 flex-shrink-0" />
//                 <span>+1 (555) 123-FARM</span>
//               </div>
//               <div className="flex items-center space-x-3 text-slate-300">
//                 <Mail className="h-4 w-4 text-emerald-400 flex-shrink-0" />
//                 <span>hello@farmconnect.com</span>
//               </div>
//               <div className="flex items-center space-x-3 text-slate-300">
//                 <MapPin className="h-4 w-4 text-emerald-400 flex-shrink-0" />
//                 <span>San Francisco, CA</span>
//               </div>
//             </div>
//           </div>

//           {/* Footer Links Sections */}
//           {footerSections.map((section) => (
//             <div key={section.title} className="lg:col-span-1">
//               <h4 className="text-lg font-semibold mb-4 text-emerald-400">
//                 {section.title}
//               </h4>
//               <ul className="space-y-3">
//                 {section.links.map((link) => {
//                   const Icon = link.icon;
//                   return (
//                     <li key={link.label}>
//                       <a
//                         href={link.href}
//                         className="flex items-center space-x-2 text-slate-300 hover:text-emerald-400 transition-colors duration-200 group"
//                       >
//                         <Icon className="h-4 w-4 group-hover:text-emerald-400 transition-colors duration-200" />
//                         <span className="group-hover:translate-x-1 transition-transform duration-200">
//                           {link.label}
//                         </span>
//                       </a>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </div>
//           ))}
//         </div>

//         {/* Social Media & Awards Section */}
//         <div className="mt-16 pt-8 border-t border-white/10">
//           <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            
//             {/* Social Links */}
//             <div className="flex flex-col items-center lg:items-start">
//               <h4 className="text-lg font-semibold mb-4 text-emerald-400">Follow Us</h4>
//               <div className="flex space-x-4">
//                 {socialLinks.map((social) => {
//                   const Icon = social.icon;
//                   return (
//                     <a
//                       key={social.label}
//                       href={social.href}
//                       className="p-3 bg-white/10 rounded-full hover:bg-emerald-600 transition-all duration-200 hover:scale-110 hover:shadow-lg group"
//                       aria-label={social.label}
//                     >
//                       <Icon className="h-5 w-5 group-hover:text-white" />
//                     </a>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Certifications & Awards */}
//             <div className="flex flex-col items-center lg:items-end">
//               <h4 className="text-lg font-semibold mb-4 text-emerald-400">Certified & Trusted</h4>
//               <div className="flex items-center space-x-6">
//                 <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg">
//                   <Shield className="h-5 w-5 text-emerald-400" />
//                   <span className="text-sm font-medium">SSL Secured</span>
//                 </div>
//                 <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg">
//                   <Award className="h-5 w-5 text-emerald-400" />
//                   <span className="text-sm font-medium">Organic Certified</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Bar */}
//       <div className="bg-slate-900 border-t border-white/10">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//           <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            
//             {/* Copyright */}
//             <div className="text-slate-400 text-center lg:text-left">
//               <p>&copy; {currentYear} FarmConnect. All rights reserved.</p>
//               <p className="text-sm mt-1">Building sustainable food systems since 2024</p>
//             </div>

//             {/* Legal Links */}
//             <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
//               {legalLinks.map((link, index) => (
//                 <React.Fragment key={link.label}>
//                   <a
//                     href={link.href}
//                     className="text-slate-400 hover:text-emerald-400 transition-colors duration-200 text-sm"
//                   >
//                     {link.label}
//                   </a>
//                   {index < legalLinks.length - 1 && (
//                     <span className="text-slate-600 hidden sm:inline">|</span>
//                   )}
//                 </React.Fragment>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from 'react';
import { 
  Leaf, 
  Mail, 
  Phone, 
  Facebook, 
  Twitter, 
  Instagram
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
    { label: "Privacy", href: "#privacy" },
    { label: "Terms", href: "#terms" }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#facebook", label: "Facebook" },
    { icon: Twitter, href: "#twitter", label: "Twitter" },
    { icon: Instagram, href: "#instagram", label: "Instagram" }
  ];

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
              <div className="relative">
                <Leaf className="h-8 w-8 text-emerald-400 animate-bounce" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
              </div>
              <span className="text-2xl font-bold text-emerald-400">
                FarmConnect
              </span>
            </div>
            <p className="text-slate-300 text-sm">
              Connecting farms directly with consumers.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-4 text-emerald-400">
              Quick Links
            </h4>
            <div className="flex flex-wrap justify-center gap-4">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-slate-300 hover:text-emerald-400 transition-colors duration-200 text-sm"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact & Social */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold mb-4 text-emerald-400">
              Connect
            </h4>
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-center md:justify-end space-x-2 text-slate-300 text-sm">
                <Mail className="h-4 w-4 text-emerald-400" />
                <span>hello@farmconnect.com</span>
              </div>
              <div className="flex items-center justify-center md:justify-end space-x-2 text-slate-300 text-sm">
                <Phone className="h-4 w-4 text-emerald-400" />
                <span>+1 (555) 123-FARM</span>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex justify-center md:justify-end space-x-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="p-2 bg-white/10 rounded-full hover:bg-emerald-600 transition-all duration-200"
                    aria-label={social.label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-slate-400 text-sm">
            &copy; {currentYear} FarmConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

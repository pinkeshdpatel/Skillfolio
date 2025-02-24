// Portfolio Configuration
export type PortfolioConfig = {
  hero: {
    name: string;
    title: string;
    description: string;
    image: string;
  };
  skills: {
    name: string;
    proficiency: number; // 0-100
    category: string;
  }[];
  software: {
    name: string;
    icon: string;
    proficiency: number; // 0-100
  }[];
  projects: {
    title: string;
    description: string;
    imageUrl: string;
    category: string;
    link: string;
    fullDescription?: string;
    additionalImages?: string[];
  }[];
  testimonials: {
    name: string;
    role: string;
    company: string;
    image: string;
    content: string;
    rating: number;
  }[];
  clients: {
    name: string;
    icon: string;
  }[];
  contact: {
    email: string;
    socials: {
      platform: string;
      url: string;
    }[];
  };
};

export const defaultConfig: PortfolioConfig = {
  hero: {
    name: "Asad Synt",
    title: "I create webpages that transform your visitors into clients!",
    description: "I am a fervent web design enthusiast. My commitment lies in creating aesthetically stunning and operationally vigorous websites.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80"
  },
  skills: [
    { name: "UI/UX Design", proficiency: 95, category: "Design" },
    { name: "Brand Identity", proficiency: 90, category: "Branding" },
    { name: "Web Design", proficiency: 88, category: "Design" },
    { name: "Typography", proficiency: 85, category: "Design" },
    { name: "Motion Design", proficiency: 80, category: "Animation" },
    { name: "Print Design", proficiency: 75, category: "Design" }
  ],
  software: [
    { 
      name: "Adobe Photoshop", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg", 
      proficiency: 95 
    },
    { 
      name: "Adobe Illustrator", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg", 
      proficiency: 90 
    },
    { 
      name: "Figma", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", 
      proficiency: 88 
    },
    { 
      name: "Adobe XD", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg", 
      proficiency: 85 
    },
    { 
      name: "Adobe InDesign", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/indesign/indesign-plain.svg", 
      proficiency: 80 
    },
    { 
      name: "Adobe After Effects", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-plain.svg", 
      proficiency: 75 
    }
  ],
  projects: [
    {
      title: "Brand Identity - TechVision",
      description: "Complete brand identity design including logo, color palette, and brand guidelines",
      imageUrl: "https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop&q=80",
      category: "Branding",
      link: "#",
      fullDescription: "Created a comprehensive brand identity for TechVision, a leading tech startup. The project included logo design, color palette selection, typography guidelines, and brand usage documentation.",
      additionalImages: [
        "https://images.unsplash.com/photo-1636622433525-127afdf3662d?auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1636622433209-9b8a7b0b4426?auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1636622433195-9e77c55c58f8?auto=format&fit=crop&q=80"
      ]
    },
    // ... (other projects remain the same)
  ],
  testimonials: [
    {
      name: "Alex Thompson",
      role: "Creative Director",
      company: "DesignCraft Studios",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
      content: "Working with Asad was an absolute pleasure. His attention to detail and creative vision transformed our website into something truly exceptional.",
      rating: 5
    },
    // ... (other testimonials remain the same)
  ],
  clients: [
    { name: "Adobe", icon: "Palette" },
    { name: "Microsoft", icon: "Monitor" },
    { name: "Google", icon: "Globe" },
    { name: "Meta", icon: "Layout" },
    { name: "Apple", icon: "Smartphone" },
    { name: "Amazon", icon: "Code" }
  ],
  contact: {
    email: "contact@example.com",
    socials: [
      { platform: "Twitter", url: "https://twitter.com" },
      { platform: "LinkedIn", url: "https://linkedin.com" },
      { platform: "Dribbble", url: "https://dribbble.com" }
    ]
  }
};
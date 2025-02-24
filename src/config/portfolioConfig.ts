// Portfolio Configuration
export type PortfolioConfig = {
  hero: {
    name: string;
    title: string;
    description: string;
    image: string;
  };
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
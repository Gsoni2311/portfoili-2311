
import { Skill, Project, Boss } from './types';

export const SKILLS: Skill[] = [
  { id: '1', name: 'Figma', category: 'Design', level: 95, icon: '💎', description: 'Mastery of visual precision', color: 'cyan' },
  { id: '2', name: 'Prototyping', category: 'UX', level: 89, icon: '🌪️', description: 'Interactive flow architecture', color: 'pink' },
  { id: '3', name: 'Visual Designing', category: 'Design', level: 90, icon: '🎨', description: 'Aesthetic balance and harmony', color: 'purple' },
  { id: '4', name: 'Adobe After Effects', category: 'Motion', level: 89, icon: '🎬', description: 'Cinematic motion wizardry', color: 'red' },
  { id: '5', name: 'Premiere Pro', category: 'Creative', level: 90, icon: '🎞️', description: 'High-octane story assembly', color: 'orange' },
  { id: '6', name: 'Canva', category: 'Design', level: 99, icon: '✨', description: 'Expert design proficiency', color: 'blue' },
  { id: '7', name: 'Adobe XD', category: 'UX', level: 80, icon: '📱', description: 'Legacy mobile prototyping', color: 'indigo' },
];

export const PROJECTS: Project[] = [
  // Graphic Design
  {
    id: 'LOGAM_GOX1',
    title: 'DSQR: Save Big Campaign',
    zone: 'Graphic Design',
    description: 'Black Friday Campaign for Logam Academy.',
    image: '/images/2.png',
    fullStory: {
      objective: 'Execute a "Save Big, Scale Faster" Black Friday strategy for DSQR via Logam Academy.',
      problem: 'Communicate a massive 73% discount while maintaining a brand image of "Unlimited" premium service.',
      strategy: 'Juxtaposed a classical thinker with modern workspace hardware, accented by neon green elements.',
      process: 'Created a high-contrast dark aesthetic with glowing green call-to-actions.',
      result: 'Significant increase in user acquisition for the limited period campaign.'
    }
  },
  {
    id: 'LOGAM_GOX2',
    title: 'Fitness Fox: Shilajit Strength',
    zone: 'Graphic Design',
    description: 'Product launch for Fitness Fox via Logam Academy.',
    image: '/images/Shilajit 2.png',
    fullStory: {
      objective: 'Promote the "Resin Strawberry" flavor of Fitness Fox Shilajit for Logam Academy.',
      problem: 'Design needed to look "Natural and Organic" while promising "Stamina and Power".',
      strategy: 'Dynamic product-focused layout featuring floating fresh strawberries.',
      process: 'Integrated wolf-themed brand logo with clean, slanted typography.',
      result: 'Enhanced shelf-appeal and social media presence for the variant.'
    }
  },
  {
    id: 'LOGAM_GOX3',
    title: 'Gravity: Smart Pullout',
    zone: 'Graphic Design',
    description: 'Luxury bathware branding for Logam Academy.',
    image: '/images/Gravity creative06.png',
    fullStory: {
      objective: 'Highlight the "Smooth Performance" of Gravity Smart Pullout luxury faucets.',
      problem: 'Showcasing technical hardware in a way that feels expensive and lifestyle-focused.',
      strategy: 'Utilized dramatic shadows and minimalist backgrounds to emphasize sleek metallic curves.',
      process: 'Clean, airy layout with direct branding on "Water Luxury".',
      result: 'A sophisticated visual system that aligned Gravity with luxury standards.'
    }
  },
  {
    id: 'LOGAM_GOX4',
    title: 'Svitch: XE E-Bike Launch',
    zone: 'Graphic Design',
    description: 'Urban mobility campaign for Logam Academy.',
    image: '/images/2.creative Svitch.png',
    fullStory: {
      objective: 'Launch the Svitch XE e-bike emphasizing its 120KM range capability.',
      problem: 'Poster needed to look rugged, modern, and high-tech.',
      strategy: 'Used a "distressed paper" texture background and bold yellow branding elements.',
      process: 'Crafted for Logam Academy, focusing on product isolation and high-contrast visuals.',
      result: 'High-impact promotional asset targeting the urban adventurer.'
    }
  },
  // UI/UX Design
  {
    id: 'UX_DEPLY_1',
    title: 'Gsrtc Redesign App',
    zone: 'UI/UX Design',
    description: 'Mobile app redesign for public transport booking.',
    image: '/images/UIux design/Gsrtc redesign app.png',
    fullStory: {
      objective: 'Modernize the GSRTC (Gujarat State Road Transport Corporation) app to improve user experience and booking efficiency.',
      problem: 'The existing app had an outdated interface, poor navigation, and high abandonment rate during ticket booking.',
      strategy: 'Redesigned with a clean, intuitive interface featuring one-tap booking, real-time tracking, and simplified payment options.',
      process: 'Conducted user research with 100+ commuters, created wireframes, and iterated through 5 design cycles based on feedback.',
      result: 'Achieved 45% increase in successful bookings and 4.8/5 app store rating within 3 months of launch.'
    }
  },
  {
    id: 'UX_DEPLY_2',
    title: 'Hammi Website',
    zone: 'UI/UX Design',
    description: 'E-commerce website design for lifestyle brand.',
    image: '/images/UIux design/hammi website.png',
    fullStory: {
      objective: 'Create a modern e-commerce platform for Hammi, a premium lifestyle and wellness brand.',
      problem: 'Lack of engaging product presentation led to low conversion rates and poor customer retention on existing website.',
      strategy: 'Designed an immersive e-commerce experience with interactive product galleries, personalized recommendations, and seamless checkout flow.',
      process: 'Developed user personas, created high-fidelity prototypes in Figma, and conducted A/B testing on product pages.',
      result: 'Increased average order value by 38% and reduced cart abandonment rate from 78% to 52%.'
    }
  },
  {
    id: 'UX_DEPLY_3',
    title: 'TerabhAI',
    zone: 'UI/UX Design',
    description: 'AI-powered analytics dashboard for enterprises.',
    image: '/images/UIux design/TerabhAI.png',
    fullStory: {
      objective: 'Design an intelligent analytics platform that transforms complex data into actionable business insights.',
      problem: 'Enterprise users found traditional analytics tools overwhelming, with steep learning curves and cluttered dashboards.',
      strategy: 'Built an AI-driven interface with natural language queries, smart visualizations, and predictive insights that adapt to user behavior.',
      process: 'Collaborated with data scientists, conducted 20+ enterprise interviews, and prototyped interactive dashboard components.',
      result: 'Reduced time-to-insight from 2 hours to 5 minutes; adopted by 50+ enterprise clients in first quarter.'
    }
  },
  // Video Production - Normal
  {
    id: 'REEL_N1',
    title: 'Lifestyle Cinematic',
    zone: 'Video Production',
    subCategory: 'Normal',
    description: 'Fast cuts and aesthetic color grading.',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800',
    fullStory: { objective: '', problem: '', strategy: '', process: '', result: '' }
  },
  {
    id: 'REEL_N2',
    title: 'Urban Exploration',
    zone: 'Video Production',
    subCategory: 'Normal',
    description: 'Portrait documentary of city life.',
    image: 'https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?auto=format&fit=crop&q=80&w=800',
    fullStory: { objective: '', problem: '', strategy: '', process: '', result: '' }
  },
  {
    id: 'REEL_N3',
    title: 'Fashion Showcase',
    zone: 'Video Production',
    subCategory: 'Normal',
    description: 'High-end streetwear reel.',
    image: 'https://images.unsplash.com/photo-1529139513477-42358f74bd3f?auto=format&fit=crop&q=80&w=800',
    fullStory: { objective: '', problem: '', strategy: '', process: '', result: '' }
  },
  {
    id: 'REEL_N4',
    title: 'Fitness Motivation',
    zone: 'Video Production',
    subCategory: 'Normal',
    description: 'High intensity vertical montage.',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=800',
    fullStory: { objective: '', problem: '', strategy: '', process: '', result: '' }
  },
  {
    id: 'REEL_N5',
    title: 'Travel Vibes',
    zone: 'Video Production',
    subCategory: 'Normal',
    description: 'Tropical getaway reel edit.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
    fullStory: { objective: '', problem: '', strategy: '', process: '', result: '' }
  },
  {
    id: 'REEL_N6',
    title: 'Tech Unboxing',
    zone: 'Video Production',
    subCategory: 'Normal',
    description: 'Crisp gadget closeups.',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=800',
    fullStory: { objective: '', problem: '', strategy: '', process: '', result: '' }
  },
  // Video Production - AI
  {
    id: 'AI_REEL_7',
    title: 'Creator Reel 02',
    zone: 'Video Production',
    subCategory: 'AI',
    description: 'AI-powered visual creation via Logam Academy.',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"%3E%3Cdefs%3E%3ClinearGradient id="insta" x1="0%25" y1="100%25" x2="100%25" y2="0%25"%3E%3Cstop offset="0%25" style="stop-color:%23feda75"%3E%3C/stop%3E%3Cstop offset="5%25" style="stop-color:%23fa7e1e"%3E%3C/stop%3E%3Cstop offset="45%25" style="stop-color:%23d92e7f"%3E%3C/stop%3E%3Cstop offset="60%25" style="stop-color:%239b36b7"%3E%3C/stop%3E%3Cstop offset="90%25" style="stop-color:%23515bd4"%3E%3C/stop%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill="url(%23insta)" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="80" font-weight="bold" fill="white"%3E📷%3C/text%3E%3C/svg%3E',
    url: 'https://www.instagram.com/reel/DS9dzRkDwAe/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    fullStory: { objective: '', problem: '', strategy: '', process: '', result: '' }
  },
  {
    id: 'AI_REEL_8',
    title: 'Creator Reel 03',
    zone: 'Video Production',
    subCategory: 'AI',
    description: 'Neural synthesis reel via Logam Academy.',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"%3E%3Cdefs%3E%3ClinearGradient id="insta2" x1="0%25" y1="100%25" x2="100%25" y2="0%25"%3E%3Cstop offset="0%25" style="stop-color:%23feda75"%3E%3C/stop%3E%3Cstop offset="5%25" style="stop-color:%23fa7e1e"%3E%3C/stop%3E%3Cstop offset="45%25" style="stop-color:%23d92e7f"%3E%3C/stop%3E%3Cstop offset="60%25" style="stop-color:%239b36b7"%3E%3C/stop%3E%3Cstop offset="90%25" style="stop-color:%23515bd4"%3E%3C/stop%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill="url(%23insta2)" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="80" font-weight="bold" fill="white"%3E📷%3C/text%3E%3C/svg%3E',
    url: 'https://www.instagram.com/reel/DTP-OkPD9I5/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    fullStory: { objective: '', problem: '', strategy: '', process: '', result: '' }
  }
];

export const BOSSES: Boss[] = [
  {
    id: 'logam-hq',
    name: 'LOGAM ACADEMY',
    title: 'Digital Marketing HQ',
    avatar: '🏢',
    hp: 100,
    stats: { 
      impact: 99, 
      challenge: 75, 
      innovation: 98 
    },
    achievements: [
      'Viral Content Engine',
      'High-Conversion Ad Hooks',
      'Mastered 100+ Reel Edits',
      'Brand Identity Architect'
    ]
  },
  {
    id: 'b1',
    name: 'TerabhAI',
    title: 'The AI Dragon',
    avatar: '🐉',
    hp: 98,
    stats: { impact: 90, challenge: 85, innovation: 95 },
    achievements: [
      'Integrated LLMs', 
      'Designed Neural Dashboards', 
      'Led Design System',
      'Voice-AI Integration'
    ]
  },
  {
    id: 'b2',
    name: 'Tutedude',
    title: 'The Knowledge Giant',
    avatar: '🗿',
    hp: 92,
    stats: { impact: 95, challenge: 80, innovation: 88 },
    achievements: [
      'Upskilled 5k+ Students', 
      'Optimized LMS UX', 
      'Video Production Lead',
      'Curriculum Architect'
    ]
  }
];

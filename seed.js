/**
 * Database Seeder — Run with: npm run seed
 * Seeds MongoDB Atlas with all portfolio data (projects & blog posts)
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./src/models/Project');
const BlogPost = require('./src/models/BlogPost');

const MONGODB_URI = process.env.MONGODB_URI;

// ─── Seed Data ────────────────────────────────────────────────────────────────

const projects = [
  {
    title: 'ThyroTrack – Thyroid Cancer Risk Prediction System',
    description: 'Full-stack AI-powered web platform for thyroid cancer risk prediction and patient management.',
    longDescription: 'Developed a full-stack AI-powered web platform for thyroid cancer risk prediction and patient management. Integrated ML models (Random Forest) with SHAP explainability and clinical support tools. Key features include: risk prediction, patient record management, progress & trend tracking, SHAP-based explanations for predictions, and automated report generation.',
    image: '/ThyroTrack.png',
    technologies: ['React.js', 'Express.js', 'Flask', 'MySQL', 'Random Forest', 'SHAP'],
    category: 'Full-Stack',
    liveUrl: '',
    githubUrl: '',
    featured: true,
    date: '2025',
    status: 'Completed',
    likes: 100,
    views: 2453,
    order: 1,
  },
  {
    title: 'ModaLane E-Commerce Website',
    description: 'Responsive e-commerce website built with TypeScript, CSS and modern frontend techniques.',
    longDescription: 'Developed a responsive e-commerce site with a modern UI and a clean TypeScript codebase. Key features: responsive navigation, hero CTA, testimonials, benefits and brand story sections, and integrated shopping CTA.',
    image: '/Modalane.png',
    technologies: ['TypeScript', 'HTML', 'CSS', 'JavaScript'],
    category: 'Frontend',
    liveUrl: '',
    githubUrl: '',
    featured: false,
    date: '2025',
    status: 'Completed',
    likes: 24,
    views: 4570,
    order: 2,
  },
  {
    title: 'MegaCityCab Service',
    description: 'Java EE web application for cab booking and admin operations.',
    longDescription: 'Developed a Java EE web application for cab booking and administrative operations. Key features include user registration/login, chatbot, profile management, booking history and an admin dashboard.',
    image: '/placeholder.jpg',
    technologies: ['Java EE', 'JSP/Servlets', 'MySQL'],
    category: 'Full-Stack',
    liveUrl: '',
    githubUrl: '',
    featured: false,
    date: '2025',
    status: 'Completed',
    likes: 0,
    views: 0,
    order: 3,
  },
  {
    title: 'Pharmacy Management System',
    description: 'Web application to manage medicine stock, prescriptions, and sales (group project).',
    longDescription: 'Developed a web application to manage medicine stock, prescriptions and sales. Key features: medicine tracking, billing system, prescription management and basic reports for pharmacy staff.',
    image: '/Pharmacy.jpg',
    technologies: ['HTML', 'CSS', 'PHP', 'JavaScript', 'SQL'],
    category: 'Web',
    liveUrl: '',
    githubUrl: '',
    featured: false,
    date: '2024',
    status: 'Completed',
    likes: 450,
    views: 4908,
    order: 4,
  },
  {
    title: 'Portfolio – React.js Web Developer Showcase',
    description: 'Modern and interactive portfolio built with React.js + Vite to highlight web development skills.',
    longDescription: 'A modern, interactive portfolio showcasing projects and skills. Key features: smooth animations (GSAP / Framer Motion), dynamic project showcase, responsive design, and an EmailJS contact form.',
    image: '/Portfolio.png',
    technologies: ['React.js', 'Vite', 'Framer Motion', 'EmailJS', 'Tailwind CSS'],
    category: 'Frontend',
    liveUrl: '',
    githubUrl: '',
    featured: true,
    date: '2024',
    status: 'Completed',
    likes: 342,
    views: 3456,
    order: 5,
  },
];

const blogPosts = [
  {
    title: 'Building Scalable React Applications with Next.js 14',
    excerpt: 'Explore the latest features in Next.js 14 and learn how to build performant, scalable React applications with the new App Router, Server Components, and more.',
    content: '<p>Next.js 14 brings many exciting features including the App Router, Server Components, and significantly improved performance. In this article, we explore how to leverage these features to build scalable React applications.</p><p>The App Router is a game-changer. Instead of the old pages directory, you now use the app directory with nested layouts, loading states, error boundaries, and more.</p>',
    author: 'Methmal',
    publishDate: '2024-01-15',
    readTime: '8 min read',
    category: 'Next.js',
    tags: ['React', 'Next.js', 'Performance', 'Web Development'],
    featured: true,
    views: 2845,
    likes: 127,
    image: '',
    slug: 'building-scalable-react-applications-nextjs-14',
  },
  {
    title: 'Mastering Database Design: MongoDB vs PostgreSQL',
    excerpt: 'A comprehensive comparison of NoSQL and SQL databases, when to use each, and best practices for data modeling in modern applications.',
    content: '<p>Choosing between MongoDB and PostgreSQL is one of the most common architectural decisions developers face. Both are excellent databases, but they excel in different scenarios.</p><p>MongoDB is a document database, perfect for flexible schemas and rapid prototyping. PostgreSQL is a powerful relational database, ideal for complex queries and strict data integrity.</p>',
    author: 'Methmal',
    publishDate: '2024-01-10',
    readTime: '12 min read',
    category: 'Database',
    tags: ['MongoDB', 'PostgreSQL', 'Database', 'Backend'],
    featured: true,
    views: 3204,
    likes: 189,
    image: '',
    slug: 'mastering-database-design-mongodb-vs-postgresql',
  },
  {
    title: 'API Design Best Practices for RESTful Services',
    excerpt: 'Learn how to design clean, maintainable, and scalable REST APIs with proper error handling, versioning, and documentation.',
    content: '<p>Good API design is crucial for building maintainable software. A well-designed REST API is intuitive, consistent, and easy to use. In this article, we cover the key principles of RESTful API design.</p>',
    author: 'Methmal',
    publishDate: '2024-01-05',
    readTime: '10 min read',
    category: 'Node.js',
    tags: ['API', 'REST', 'Node.js', 'Backend', 'Best Practices'],
    featured: false,
    views: 1876,
    likes: 94,
    image: '',
    slug: 'api-design-best-practices-restful-services',
  },
  {
    title: 'Modern CSS Techniques for Better User Interfaces',
    excerpt: 'Discover advanced CSS techniques including Grid, Flexbox, Custom Properties, and Container Queries for creating responsive, modern web interfaces.',
    content: '<p>CSS has evolved tremendously in recent years. Modern CSS is powerful, expressive, and can handle complex layouts with ease. Let us explore some cutting-edge techniques.</p>',
    author: 'Methmal',
    publishDate: '2023-12-28',
    readTime: '7 min read',
    category: 'UI/UX',
    tags: ['CSS', 'Frontend', 'UI/UX', 'Responsive Design'],
    featured: false,
    views: 2156,
    likes: 156,
    image: '',
    slug: 'modern-css-techniques-better-user-interfaces',
  },
  {
    title: 'From Junior to Senior: My Full-Stack Developer Journey',
    excerpt: 'Personal insights and lessons learned during my journey from a junior developer to a senior full-stack developer, including key milestones and advice.',
    content: '<p>The journey from junior to senior developer is more than just accumulating years of experience. It involves developing a mindset shift, building problem-solving skills, and learning how to work effectively in teams.</p>',
    author: 'Methmal',
    publishDate: '2023-12-20',
    readTime: '15 min read',
    category: 'Career',
    tags: ['Career', 'Personal', 'Growth', 'Advice'],
    featured: false,
    views: 4521,
    likes: 298,
    image: '',
    slug: 'from-junior-to-senior-fullstack-developer-journey',
  },
  {
    title: 'Deploying Full-Stack Applications on AWS',
    excerpt: 'Step-by-step guide to deploying React and Node.js applications on AWS using EC2, RDS, S3, and CloudFront for optimal performance.',
    content: '<p>Deploying a full-stack application to AWS can seem daunting at first, but with the right approach it becomes manageable. In this guide, we will walk through setting up EC2, configuring RDS, and using S3 and CloudFront for static assets.</p>',
    author: 'Methmal',
    publishDate: '2023-12-15',
    readTime: '18 min read',
    category: 'DevOps',
    tags: ['AWS', 'DevOps', 'Deployment', 'Cloud', 'Tutorial'],
    featured: false,
    views: 1643,
    likes: 87,
    image: '',
    slug: 'deploying-fullstack-applications-aws',
  },
];

// ─── Seed Function ────────────────────────────────────────────────────────────

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');

    // Clear existing data
    await Project.deleteMany({});
    await BlogPost.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert seed data
    await Project.insertMany(projects);
    console.log(`✅ Seeded ${projects.length} projects`);

    await BlogPost.insertMany(blogPosts);
    console.log(`✅ Seeded ${blogPosts.length} blog posts`);

    console.log('🎉 Database seeded successfully!');
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB Atlas');
    process.exit(0);
  }
};

seedDatabase();

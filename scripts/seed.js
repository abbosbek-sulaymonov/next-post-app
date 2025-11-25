// Load environment variables
require('dotenv').config({ path: '.env.local' });

const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;

// Check if MongoDB URI is provided
if (!uri) {
  console.error('❌ MONGODB_URI is not defined in .env.local');
  console.log('\nPlease create a .env.local file with:');
  console.log('MONGODB_URI=your_mongodb_connection_string\n');
  process.exit(1);
}

// Sample data
const categories = [
  { name: 'Technology', slug: 'technology' },
  { name: 'Design', slug: 'design' },
  { name: 'Programming', slug: 'programming' },
  { name: 'Web Development', slug: 'web-development' },
  { name: 'AI & Machine Learning', slug: 'ai-machine-learning' },
  { name: 'Mobile Development', slug: 'mobile-development' },
  { name: 'DevOps', slug: 'devops' },
  { name: 'Cybersecurity', slug: 'cybersecurity' },
];

const authors = [
  {
    name: 'John Doe',
    bio: 'Full-stack developer with 10+ years of experience in building scalable web applications. Passionate about clean code and modern JavaScript frameworks.',
    photo: { url: 'https://randomuser.me/api/portraits/men/1.jpg' },
  },
  {
    name: 'Jane Smith',
    bio: 'UI/UX Designer and Frontend Developer. Specializing in creating beautiful, user-friendly interfaces with React and TailwindCSS.',
    photo: { url: 'https://randomuser.me/api/portraits/women/2.jpg' },
  },
  {
    name: 'Mike Johnson',
    bio: 'Backend Engineer specializing in Node.js, MongoDB, and cloud infrastructure. Love optimizing database queries and building APIs.',
    photo: { url: 'https://randomuser.me/api/portraits/men/3.jpg' },
  },
  {
    name: 'Sarah Williams',
    bio: 'DevOps engineer and cloud architect. Expert in AWS, Docker, and Kubernetes. Building reliable and scalable infrastructure.',
    photo: { url: 'https://randomuser.me/api/portraits/women/4.jpg' },
  },
  {
    name: 'David Brown',
    bio: 'Cybersecurity specialist and ethical hacker. Helping companies secure their applications and infrastructure.',
    photo: { url: 'https://randomuser.me/api/portraits/men/5.jpg' },
  },
];

// Function to generate posts
function generatePosts(insertedAuthors, insertedCategories) {
  return [
    {
      title: 'Getting Started with Next.js 13',
      slug: 'getting-started-with-nextjs-13',
      shortPost:
        'Learn the fundamentals of Next.js 13 and discover the new app directory, server components, and improved data fetching patterns. This comprehensive guide will help you build modern web applications.',
      createdAt: new Date('2024-01-15').toISOString(),
      image: { url: 'https://picsum.photos/seed/nextjs13/800/600' },
      author: {
        id: insertedAuthors[0]._id.toString(),
        name: insertedAuthors[0].name,
        bio: insertedAuthors[0].bio,
        photo: insertedAuthors[0].photo,
      },
      categories: [
        {
          id: insertedCategories[0]._id.toString(),
          name: insertedCategories[0].name,
          slug: insertedCategories[0].slug,
        },
        {
          id: insertedCategories[3]._id.toString(),
          name: insertedCategories[3].name,
          slug: insertedCategories[3].slug,
        },
      ],
    },
    {
      title: 'Modern UI Design Principles for 2024',
      slug: 'modern-ui-design-principles-2024',
      shortPost:
        'Explore the latest UI design trends and principles that are shaping the web in 2024. From minimalism to bold typography, learn how to create stunning user interfaces.',
      createdAt: new Date('2024-02-10').toISOString(),
      image: { url: 'https://picsum.photos/seed/uidesign/800/600' },
      author: {
        id: insertedAuthors[1]._id.toString(),
        name: insertedAuthors[1].name,
        bio: insertedAuthors[1].bio,
        photo: insertedAuthors[1].photo,
      },
      categories: [
        {
          id: insertedCategories[1]._id.toString(),
          name: insertedCategories[1].name,
          slug: insertedCategories[1].slug,
        },
      ],
    },
    {
      title: 'Understanding MongoDB Aggregations',
      slug: 'understanding-mongodb-aggregations',
      shortPost:
        'Deep dive into MongoDB aggregation pipeline and operations. Learn how to perform complex queries, transformations, and data analysis with real-world examples.',
      createdAt: new Date('2024-02-20').toISOString(),
      image: { url: 'https://picsum.photos/seed/mongodb/800/600' },
      author: {
        id: insertedAuthors[2]._id.toString(),
        name: insertedAuthors[2].name,
        bio: insertedAuthors[2].bio,
        photo: insertedAuthors[2].photo,
      },
      categories: [
        {
          id: insertedCategories[2]._id.toString(),
          name: insertedCategories[2].name,
          slug: insertedCategories[2].slug,
        },
        {
          id: insertedCategories[0]._id.toString(),
          name: insertedCategories[0].name,
          slug: insertedCategories[0].slug,
        },
      ],
    },
    {
      title: 'Building RESTful APIs with Node.js and Express',
      slug: 'building-restful-apis-nodejs-express',
      shortPost:
        'A comprehensive guide to creating RESTful APIs using Node.js and Express. Learn about routing, middleware, error handling, authentication, and best practices.',
      createdAt: new Date('2024-03-05').toISOString(),
      image: { url: 'https://picsum.photos/seed/nodejs/800/600' },
      author: {
        id: insertedAuthors[2]._id.toString(),
        name: insertedAuthors[2].name,
        bio: insertedAuthors[2].bio,
        photo: insertedAuthors[2].photo,
      },
      categories: [
        {
          id: insertedCategories[2]._id.toString(),
          name: insertedCategories[2].name,
          slug: insertedCategories[2].slug,
        },
        {
          id: insertedCategories[3]._id.toString(),
          name: insertedCategories[3].name,
          slug: insertedCategories[3].slug,
        },
      ],
    },
    {
      title: 'Introduction to Machine Learning with Python',
      slug: 'introduction-machine-learning-python',
      shortPost:
        'Learn the fundamentals of machine learning and AI using Python. Explore popular libraries like scikit-learn, TensorFlow, and practical applications.',
      createdAt: new Date('2024-03-15').toISOString(),
      image: { url: 'https://picsum.photos/seed/ml/800/600' },
      author: {
        id: insertedAuthors[0]._id.toString(),
        name: insertedAuthors[0].name,
        bio: insertedAuthors[0].bio,
        photo: insertedAuthors[0].photo,
      },
      categories: [
        {
          id: insertedCategories[4]._id.toString(),
          name: insertedCategories[4].name,
          slug: insertedCategories[4].slug,
        },
        {
          id: insertedCategories[0]._id.toString(),
          name: insertedCategories[0].name,
          slug: insertedCategories[0].slug,
        },
      ],
    },
    {
      title: 'React Hooks Deep Dive: useState, useEffect, and More',
      slug: 'react-hooks-deep-dive',
      shortPost:
        'Master React Hooks with practical examples and best practices. Learn when and how to use useState, useEffect, useContext, and custom hooks effectively.',
      createdAt: new Date('2024-03-25').toISOString(),
      image: { url: 'https://picsum.photos/seed/react/800/600' },
      author: {
        id: insertedAuthors[1]._id.toString(),
        name: insertedAuthors[1].name,
        bio: insertedAuthors[1].bio,
        photo: insertedAuthors[1].photo,
      },
      categories: [
        {
          id: insertedCategories[2]._id.toString(),
          name: insertedCategories[2].name,
          slug: insertedCategories[2].slug,
        },
        {
          id: insertedCategories[3]._id.toString(),
          name: insertedCategories[3].name,
          slug: insertedCategories[3].slug,
        },
      ],
    },
    {
      title: 'Docker and Kubernetes for Beginners',
      slug: 'docker-kubernetes-beginners',
      shortPost:
        'Get started with containerization and orchestration. Learn Docker fundamentals, create containers, and deploy applications with Kubernetes.',
      createdAt: new Date('2024-04-01').toISOString(),
      image: { url: 'https://picsum.photos/seed/docker/800/600' },
      author: {
        id: insertedAuthors[3]._id.toString(),
        name: insertedAuthors[3].name,
        bio: insertedAuthors[3].bio,
        photo: insertedAuthors[3].photo,
      },
      categories: [
        {
          id: insertedCategories[6]._id.toString(),
          name: insertedCategories[6].name,
          slug: insertedCategories[6].slug,
        },
        {
          id: insertedCategories[0]._id.toString(),
          name: insertedCategories[0].name,
          slug: insertedCategories[0].slug,
        },
      ],
    },
    {
      title: 'Web Application Security Best Practices',
      slug: 'web-application-security-best-practices',
      shortPost:
        'Essential security practices every developer should know. Learn about OWASP Top 10, authentication, authorization, XSS, CSRF, and how to protect your applications.',
      createdAt: new Date('2024-04-10').toISOString(),
      image: { url: 'https://picsum.photos/seed/security/800/600' },
      author: {
        id: insertedAuthors[4]._id.toString(),
        name: insertedAuthors[4].name,
        bio: insertedAuthors[4].bio,
        photo: insertedAuthors[4].photo,
      },
      categories: [
        {
          id: insertedCategories[7]._id.toString(),
          name: insertedCategories[7].name,
          slug: insertedCategories[7].slug,
        },
        {
          id: insertedCategories[3]._id.toString(),
          name: insertedCategories[3].name,
          slug: insertedCategories[3].slug,
        },
      ],
    },
    {
      title: 'Building Cross-Platform Mobile Apps with React Native',
      slug: 'react-native-cross-platform-apps',
      shortPost:
        'Create native mobile applications for iOS and Android using React Native. Learn the fundamentals, navigation, state management, and deployment.',
      createdAt: new Date('2024-04-20').toISOString(),
      image: { url: 'https://picsum.photos/seed/reactnative/800/600' },
      author: {
        id: insertedAuthors[1]._id.toString(),
        name: insertedAuthors[1].name,
        bio: insertedAuthors[1].bio,
        photo: insertedAuthors[1].photo,
      },
      categories: [
        {
          id: insertedCategories[5]._id.toString(),
          name: insertedCategories[5].name,
          slug: insertedCategories[5].slug,
        },
        {
          id: insertedCategories[2]._id.toString(),
          name: insertedCategories[2].name,
          slug: insertedCategories[2].slug,
        },
      ],
    },
    {
      title: 'GraphQL vs REST: Choosing the Right API Architecture',
      slug: 'graphql-vs-rest-api-architecture',
      shortPost:
        'Compare GraphQL and REST APIs to understand when to use each. Explore advantages, disadvantages, and real-world use cases for both approaches.',
      createdAt: new Date('2024-05-01').toISOString(),
      image: { url: 'https://picsum.photos/seed/graphql/800/600' },
      author: {
        id: insertedAuthors[2]._id.toString(),
        name: insertedAuthors[2].name,
        bio: insertedAuthors[2].bio,
        photo: insertedAuthors[2].photo,
      },
      categories: [
        {
          id: insertedCategories[3]._id.toString(),
          name: insertedCategories[3].name,
          slug: insertedCategories[3].slug,
        },
        {
          id: insertedCategories[2]._id.toString(),
          name: insertedCategories[2].name,
          slug: insertedCategories[2].slug,
        },
      ],
    },
    {
      title: 'TypeScript Best Practices for Large Applications',
      slug: 'typescript-best-practices-large-applications',
      shortPost:
        'Master TypeScript in enterprise applications. Learn about advanced types, generics, decorators, and how to structure large TypeScript projects.',
      createdAt: new Date('2024-05-10').toISOString(),
      image: { url: 'https://picsum.photos/seed/typescript/800/600' },
      author: {
        id: insertedAuthors[0]._id.toString(),
        name: insertedAuthors[0].name,
        bio: insertedAuthors[0].bio,
        photo: insertedAuthors[0].photo,
      },
      categories: [
        {
          id: insertedCategories[2]._id.toString(),
          name: insertedCategories[2].name,
          slug: insertedCategories[2].slug,
        },
        {
          id: insertedCategories[3]._id.toString(),
          name: insertedCategories[3].name,
          slug: insertedCategories[3].slug,
        },
      ],
    },
    {
      title: 'CI/CD Pipeline Setup with GitHub Actions',
      slug: 'ci-cd-pipeline-github-actions',
      shortPost:
        'Automate your deployment process with GitHub Actions. Learn how to set up continuous integration and continuous deployment for your projects.',
      createdAt: new Date('2024-05-20').toISOString(),
      image: { url: 'https://picsum.photos/seed/cicd/800/600' },
      author: {
        id: insertedAuthors[3]._id.toString(),
        name: insertedAuthors[3].name,
        bio: insertedAuthors[3].bio,
        photo: insertedAuthors[3].photo,
      },
      categories: [
        {
          id: insertedCategories[6]._id.toString(),
          name: insertedCategories[6].name,
          slug: insertedCategories[6].slug,
        },
        {
          id: insertedCategories[3]._id.toString(),
          name: insertedCategories[3].name,
          slug: insertedCategories[3].slug,
        },
      ],
    },
  ];
}

async function seed() {
  const client = new MongoClient(uri);

  try {
    console.log('🔄 Connecting to MongoDB...');
    await client.connect();
    console.log('✅ Connected to MongoDB\n');

    const db = client.db('blog');

    // Step 1: Clear existing data
    console.log('🗑️  Clearing existing data...');
    await db.collection('posts').deleteMany({});
    await db.collection('categories').deleteMany({});
    await db.collection('authors').deleteMany({});
    console.log('✅ Cleared existing data\n');

    // Step 2: Insert categories
    console.log('📁 Creating categories...');
    const categoriesResult = await db.collection('categories').insertMany(categories);
    console.log(`✅ Created ${categoriesResult.insertedCount} categories\n`);

    // Step 3: Insert authors
    console.log('👥 Creating authors...');
    const authorsResult = await db.collection('authors').insertMany(authors);
    console.log(`✅ Created ${authorsResult.insertedCount} authors\n`);

    // Step 4: Get inserted documents
    const insertedAuthors = await db.collection('authors').find({}).toArray();
    const insertedCategories = await db.collection('categories').find({}).toArray();

    // Step 5: Generate and insert posts
    console.log('📝 Creating posts...');
    const posts = generatePosts(insertedAuthors, insertedCategories);
    const postsResult = await db.collection('posts').insertMany(posts);
    console.log(`✅ Created ${postsResult.insertedCount} posts\n`);

    // Step 6: Create indexes for better performance
    console.log('🔍 Creating database indexes...');
    try {
      await db.collection('posts').createIndex({ slug: 1 }, { unique: true });
      await db.collection('posts').createIndex({ createdAt: -1 });
      await db.collection('posts').createIndex({ 'categories.slug': 1 });
      await db.collection('categories').createIndex({ slug: 1 }, { unique: true });
      await db.collection('authors').createIndex({ name: 1 });
      console.log('✅ Created all indexes\n');
    } catch (indexError) {
      console.log('⚠️  Some indexes already exist, skipping...\n');
    }

    // Step 7: Display summary
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✨ Database seeded successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n📊 Summary:');
    console.log(`   • Categories: ${categoriesResult.insertedCount}`);
    console.log(`   • Authors: ${authorsResult.insertedCount}`);
    console.log(`   • Posts: ${postsResult.insertedCount}`);
    console.log('\n🔗 Categories:');
    insertedCategories.forEach((cat) => {
      console.log(`   • ${cat.name} (${cat.slug})`);
    });
    console.log('\n👥 Authors:');
    insertedAuthors.forEach((author) => {
      console.log(`   • ${author.name}`);
    });
    console.log('\n📝 Sample Posts:');
    posts.slice(0, 5).forEach((post) => {
      console.log(`   • ${post.title}`);
    });
    console.log(`   ... and ${posts.length - 5} more`);
    console.log('\n🚀 You can now start your application:');
    console.log('   npm run dev\n');
  } catch (error) {
    console.error('\n❌ Error seeding database:');
    console.error(error.message);
    console.error('\nStack trace:');
    console.error(error.stack);
    process.exit(1);
  } finally {
    await client.close();
    console.log('🔌 Connection closed');
  }
}

// Run the seed function
seed();

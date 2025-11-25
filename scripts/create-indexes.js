// Load environment variables
require('dotenv').config({ path: '.env.local' });

const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;

async function createIndexes() {
  if (!uri) {
    console.error('❌ MONGODB_URI is not defined in .env.local');
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    console.log('Connecting to MongoDB Atlas...');
    await client.connect();
    console.log('✓ Connected to MongoDB');

    const db = client.db('blog');

    // Posts indexes
    console.log('Creating posts indexes...');
    await db.collection('posts').createIndex({ slug: 1 }, { unique: true });
    await db.collection('posts').createIndex({ createdAt: -1 });
    await db.collection('posts').createIndex({ 'categories.slug': 1 });
    console.log('✓ Posts indexes created');

    // Categories indexes
    console.log('Creating categories indexes...');
    await db.collection('categories').createIndex({ slug: 1 }, { unique: true });
    console.log('✓ Categories indexes created');

    // Authors indexes
    console.log('Creating authors indexes...');
    await db.collection('authors').createIndex({ name: 1 });
    console.log('✓ Authors indexes created');

    console.log('\n✅ All indexes created successfully!');
  } catch (error) {
    console.error('❌ Error creating indexes:', error.message);
    process.exit(1);
  } finally {
    await client.close();
    console.log('Connection closed');
  }
}

createIndexes();

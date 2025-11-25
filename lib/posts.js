import clientPromise from './mongodb';

export async function getAllPosts() {
  try {
    const client = await clientPromise;
    const db = client.db('blog');
    const posts = await db.collection('posts').find({}).sort({ createdAt: -1 }).toArray();

    return posts.map((post) => {
      const { _id, ...postWithoutId } = post;
      return {
        node: { ...postWithoutId, id: _id.toString() },
      };
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug) {
  try {
    const client = await clientPromise;
    const db = client.db('blog');
    const post = await db.collection('posts').findOne({ slug });

    if (!post) return null;

    const { _id, ...postWithoutId } = post;
    return { ...postWithoutId, id: _id.toString() };
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function getAllCategories() {
  try {
    const client = await clientPromise;
    const db = client.db('blog');
    const categories = await db.collection('categories').find({}).toArray();

    return categories.map((cat) => {
      const { _id, ...catWithoutId } = cat;
      return { ...catWithoutId, id: _id.toString() };
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function getRecentPosts() {
  try {
    const client = await clientPromise;
    const db = client.db('blog');
    const posts = await db.collection('posts').find({}).sort({ createdAt: -1 }).limit(3).toArray();

    return posts.map((post) => {
      const { _id, ...postWithoutId } = post;
      return { ...postWithoutId, id: _id.toString() };
    });
  } catch (error) {
    console.error('Error fetching recent posts:', error);
    return [];
  }
}

export async function getSimilarPosts(categories, slug) {
  try {
    const client = await clientPromise;
    const db = client.db('blog');

    const posts = await db
      .collection('posts')
      .find({
        slug: { $ne: slug },
        'categories.slug': { $in: categories },
      })
      .limit(3)
      .toArray();

    return posts.map((post) => {
      const { _id, ...postWithoutId } = post;
      return { ...postWithoutId, id: _id.toString() };
    });
  } catch (error) {
    console.error('Error fetching similar posts:', error);
    return [];
  }
}

export async function getPostsByCategory(categorySlug) {
  try {
    const client = await clientPromise;
    const db = client.db('blog');

    const posts = await db
      .collection('posts')
      .find({
        'categories.slug': categorySlug,
      })
      .sort({ createdAt: -1 })
      .toArray();

    return posts.map((post) => {
      const { _id, ...postWithoutId } = post;
      return { ...postWithoutId, id: _id.toString() };
    });
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    return [];
  }
}

export async function getPopularCategories(limit = 3) {
  try {
    const client = await clientPromise;
    const db = client.db('blog');

    // Get all posts with their categories
    const posts = await db.collection('posts').find({}).toArray();

    // Count posts per category
    const categoryCount = {};

    posts.forEach((post) => {
      post.categories.forEach((category) => {
        if (categoryCount[category.slug]) {
          categoryCount[category.slug].count++;
        } else {
          categoryCount[category.slug] = {
            name: category.name,
            slug: category.slug,
            count: 1,
          };
        }
      });
    });

    // Convert to array and sort by count
    const sortedCategories = Object.values(categoryCount)
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);

    return sortedCategories.map(({ name, slug }) => ({ name, slug }));
  } catch (error) {
    console.error('Error fetching popular categories:', error);
    return [];
  }
}

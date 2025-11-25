import { getPopularCategories } from '../../lib/posts';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const limit = parseInt(req.query.limit) || 3;
    const categories = await getPopularCategories(limit);

    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching popular categories:', error);
    res.status(500).json({ message: 'Error fetching categories' });
  }
}

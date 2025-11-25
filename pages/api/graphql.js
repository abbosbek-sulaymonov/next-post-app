import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';
import clientPromise from '../../lib/mongodb';

const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
    bio: String
    photo: Photo
  }

  type Photo {
    url: String!
  }

  type Category {
    id: ID!
    name: String!
    slug: String!
  }

  type Post {
    id: ID!
    title: String!
    slug: String!
    shortPost: String
    createdAt: String!
    image: Photo
    author: Author!
    categories: [Category!]!
  }

  type PostEdge {
    node: Post!
  }

  type PostsConnection {
    edges: [PostEdge!]!
  }

  input PostWhereInput {
    slug_not: String
    categories_some: CategoryWhereInput
  }

  input CategoryWhereInput {
    slug_in: [String!]
  }

  type Query {
    postsConnection: PostsConnection!
    posts(orderBy: String, last: Int, where: PostWhereInput): [Post!]!
    post(slug: String!): Post
    categories: [Category!]!
  }

  type Mutation {
    createPost(title: String!, slug: String!, shortPost: String): Post!
  }
`;

const resolvers = {
  Query: {
    postsConnection: async () => {
      const client = await clientPromise;
      const db = client.db('blog');
      const posts = await db.collection('posts').find({}).sort({ createdAt: -1 }).toArray();
      return {
        edges: posts.map((post) => ({
          node: {
            ...post,
            id: post._id.toString(),
          },
        })),
      };
    },
    posts: async (_, { orderBy, last, where }) => {
      const client = await clientPromise;
      const db = client.db('blog');

      // Build query filter
      let filter = {};

      if (where) {
        if (where.slug_not) {
          filter.slug = { $ne: where.slug_not };
        }

        if (where.categories_some?.slug_in) {
          filter['categories.slug'] = { $in: where.categories_some.slug_in };
        }
      }

      // Build sort
      let sort = {};
      if (orderBy) {
        if (orderBy === 'createdAt_DESC') {
          sort.createdAt = -1;
        } else if (orderBy === 'createdAt_ASC') {
          sort.createdAt = 1;
        }
      }

      let posts = await db.collection('posts').find(filter).sort(sort).toArray();

      if (last) {
        posts = posts.slice(-last);
      }

      return posts.map((post) => ({
        ...post,
        id: post._id.toString(),
      }));
    },
    post: async (_, { slug }) => {
      const client = await clientPromise;
      const db = client.db('blog');
      const post = await db.collection('posts').findOne({ slug });
      if (!post) return null;
      return { ...post, id: post._id.toString() };
    },
    categories: async () => {
      const client = await clientPromise;
      const db = client.db('blog');
      const categories = await db.collection('categories').find({}).toArray();
      return categories.map((cat) => ({ ...cat, id: cat._id.toString() }));
    },
  },
  Mutation: {
    createPost: async (_, { title, slug, shortPost }) => {
      const client = await clientPromise;
      const db = client.db('blog');

      const result = await db.collection('posts').insertOne({
        title,
        slug,
        shortPost: shortPost || '',
        createdAt: new Date().toISOString(),
        image: { url: '/images/default.jpg' },
        author: {
          id: '1',
          name: 'Default Author',
          bio: 'Author bio',
          photo: { url: '/images/author.jpg' },
        },
        categories: [],
      });

      const newPost = await db.collection('posts').findOne({ _id: result.insertedId });

      return { ...newPost, id: newPost._id.toString() };
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

export default startServerAndCreateNextHandler(server);

import request, { gql } from 'graphql-request';

const graphQL = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT || 'http://localhost:3000/api/graphql';

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              id
              name
              bio
              photo {
                url
              }
            }
            createdAt
            shortPost
            slug
            title
            image {
              url
            }
            categories {
              id
              name
              slug
            }
          }
        }
      }
    }
  `;

  try {
    console.log('Fetching posts from:', graphQL);
    const result = await request(graphQL, query);
    console.log('Posts fetched:', result.postsConnection.edges.length);
    return result.postsConnection.edges;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(slug: $slug) {
        author {
          id
          name
          bio
          photo {
            url
          }
        }
        createdAt
        shortPost
        slug
        title
        image {
          url
        }
        categories {
          id
          name
          slug
        }
      }
    }
  `;

  try {
    console.log('Fetching post details for slug:', slug, 'from:', graphQL);
    const result = await request(graphQL, query, { slug });
    console.log('Post details fetched:', result.post);
    return result.post;
  } catch (error) {
    console.error('Error fetching post details:', error);
    return null;
  }
};

export const getRecentPosts = async () => {
  const query = gql`
    query GetRecentPosts {
      posts(orderBy: "createdAt_DESC", last: 3) {
        title
        image {
          url
        }
        createdAt
        slug
      }
    }
  `;

  try {
    const result = await request(graphQL, query);
    return result.posts;
  } catch (error) {
    console.error('Error fetching recent posts:', error);
    return [];
  }
};

export const getSimilarPosts = async (categories, slug) => {
  const query = gql`
    query GetSimilarPosts($slug: String!, $categories: [String!]) {
      posts(where: { slug_not: $slug, categories_some: { slug_in: $categories } }, last: 3) {
        title
        image {
          url
        }
        createdAt
        slug
      }
    }
  `;

  try {
    const result = await request(graphQL, query, { categories, slug });
    return result.posts;
  } catch (error) {
    console.error('Error fetching similar posts:', error);
    return [];
  }
};

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `;

  try {
    const result = await request(graphQL, query);
    return result.categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

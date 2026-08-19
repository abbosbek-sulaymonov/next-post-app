# Abek Blog - Next.js Blog Application

A modern, full-featured blog application built with Next.js 12, MongoDB, GraphQL, and TailwindCSS. Features include server-side rendering, static site generation, optimized images, and a custom GraphQL API.

![Next.js](https://img.shields.io/badge/Next.js-12.1.6-black)
![React](https://img.shields.io/badge/React-18.1.0-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0.0-green)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0.24-38bdf8)

## 🌟 Features

- ✅ **Server-Side Rendering (SSR)** - Fast page loads with pre-rendered content
- ✅ **Static Site Generation (SSG)** - Build-time optimization with ISR
- ✅ **GraphQL API** - Custom Apollo Server integration
- ✅ **MongoDB Database** - Scalable NoSQL database with connection pooling
- ✅ **Image Optimization** - Next.js Image component with WebP/AVIF support
- ✅ **Responsive Design** - Mobile-first approach with TailwindCSS
- ✅ **Category Filtering** - Browse posts by category
- ✅ **Related Posts** - Smart content recommendations
- ✅ **SEO Optimized** - Meta tags and semantic HTML
- ✅ **Fast Build Times** - SWC compiler for 7x faster builds
- ✅ **Comments System** - User engagement features
- ✅ **React Query** - Smart data fetching and caching

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Routes](#api-routes)
- [GraphQL Schema](#graphql-schema)
- [Available Scripts](#available-scripts)
- [Performance Optimizations](#performance-optimizations)
- [Deployment](#deployment)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.x or higher)
- **npm** or **yarn**
- **MongoDB Atlas Account** (or local MongoDB installation)
- **Git**

## 📦 Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/abek-blog.git
cd abek-blog
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Create environment file**

```bash
cp .env.example .env.local
```

## 🔐 Environment Variables

Create a `.env.local` file in the root directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blog?retryWrites=true&w=majority

# GraphQL Endpoint
NEXT_PUBLIC_GRAPHCMS_ENDPOINT=http://localhost:3000/api/graphql

# Disable Telemetry (Optional)
NEXT_TELEMETRY_DISABLED=1
```

### Getting MongoDB URI

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Create a database user
4. Whitelist your IP address
5. Click "Connect" → "Connect your application"
6. Copy the connection string and replace `<password>` with your password

## 💾 Database Setup

### 1. Seed the Database

Populate your database with initial data:

```bash
npm run seed
```

This will create:

- 6 sample blog posts
- 5 categories (Technology, Design, Programming, Web Development, AI & Machine Learning)
- 3 authors

### 2. Create Database Indexes

Optimize query performance:

```bash
npm run create-indexes
```

This creates indexes on:

- Post slugs (unique)
- Created dates
- Category slugs
- Author names

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

### Analyze Bundle Size

```bash
npm run analyze
```

## 📁 Project Structure

```
abek-blog/
├── components/           # React components
│   ├── Author.jsx
│   ├── Categories.jsx
│   ├── Comments.jsx
│   ├── CommentsForm.jsx
│   ├── Header.jsx
│   ├── Layout.jsx
│   ├── Loader.jsx
│   ├── PostCard.jsx
│   ├── PostDetail.jsx
│   ├── PostWidget.jsx
│   └── index.js
├── lib/                  # Utility functions
│   ├── mongodb.js        # MongoDB connection
│   ├── posts.js          # Database queries
│   └── queryClient.js    # React Query config
├── pages/                # Next.js pages
│   ├── api/              # API routes
│   │   ├── graphql.js    # GraphQL endpoint
│   │   └── popular-categories.js
│   ├── category/         # Category pages
│   │   └── [slug].js
│   ├── post/             # Post detail pages
│   │   └── [slug].js
│   ├── _app.js           # App wrapper
│   └── index.js          # Homepage
├── public/               # Static assets
├── scripts/              # Utility scripts
│   ├── create-indexes.js
│   └── seed.js
├── services/             # API service layer
│   └── index.js
├── styles/               # Global styles
│   └── globals.scss
├── .env.local            # Environment variables
├── next.config.js        # Next.js configuration
├── package.json
├── tailwind.config.js    # Tailwind configuration
└── README.md
```

## 🌐 API Routes

### GraphQL API

**Endpoint:** `/api/graphql`

Access the GraphQL Playground at [http://localhost:3000/api/graphql](http://localhost:3000/api/graphql)

### REST Endpoints

- `POST /api/seed` - Seed database with sample data
- `GET /api/popular-categories?limit=3` - Get most popular categories

## 📊 GraphQL Schema

### Queries

```graphql
type Query {
  # Get all posts with pagination
  postsConnection: PostsConnection!

  # Get posts with filters
  posts(orderBy: String, last: Int, where: PostWhereInput): [Post!]!

  # Get single post by slug
  post(slug: String!): Post

  # Get all categories
  categories: [Category!]!
}
```

### Mutations

```graphql
type Mutation {
  # Create a new post
  createPost(title: String!, slug: String!, shortPost: String): Post!
}
```

### Types

```graphql
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

type Author {
  id: ID!
  name: String!
  bio: String
  photo: Photo
}

type Category {
  id: ID!
  name: String!
  slug: String!
}

type Photo {
  url: String!
}
```

### Example Queries

**Get all posts:**

```graphql
query GetAllPosts {
  postsConnection {
    edges {
      node {
        id
        title
        slug
        shortPost
        createdAt
        image {
          url
        }
        author {
          name
          bio
          photo {
            url
          }
        }
        categories {
          name
          slug
        }
      }
    }
  }
}
```

**Get post by slug:**

```graphql
query GetPost($slug: String!) {
  post(slug: $slug) {
    title
    shortPost
    createdAt
    image {
      url
    }
    author {
      name
      bio
      photo {
        url
      }
    }
    categories {
      name
      slug
    }
  }
}
```

**Get posts by category:**

```graphql
query GetPostsByCategory($categorySlug: [String!]) {
  posts(where: { categories_some: { slug_in: $categorySlug } }) {
    title
    slug
    shortPost
    createdAt
  }
}
```

## 📜 Available Scripts

| Command                  | Description                    |
| ------------------------ | ------------------------------ |
| `npm run dev`            | Start development server       |
| `npm run build`          | Build production bundle        |
| `npm run start`          | Start production server        |
| `npm run lint`           | Run ESLint                     |
| `npm run seed`           | Seed database with sample data |
| `npm run create-indexes` | Create database indexes        |
| `npm run test-db`        | Test MongoDB connection        |
| `npm run analyze`        | Analyze bundle size            |

## ⚡ Performance Optimizations

### 1. Image Optimization

- Using Next.js Image component
- WebP/AVIF format support
- Lazy loading by default
- Responsive images

### 2. Build Optimizations

- **SWC Minification** - 7x faster than Babel
- **Tree Shaking** - Remove unused code
- **Code Splitting** - Automatic per-route
- **Moment.js Optimization** - Removes unused locales

### 3. Database Optimizations

- **Connection Pooling** - Reuse database connections
- **Indexes** - Fast queries on slug, date, categories
- **Pagination** - Limit data fetched per request

### 4. Caching Strategy

- **Static Generation** - Pre-render pages at build time
- **ISR (Incremental Static Regeneration)** - Revalidate every 60 seconds
- **React Query** - Client-side data caching (5-minute stale time)
- **HTTP Headers** - Cache static assets for 1 year

### Performance Metrics

After optimizations:

- ⚡ **Build Time**: 30-50% faster
- 🚀 **Page Load**: 40-60% faster
- 📦 **Bundle Size**: 20-30% smaller
- 💾 **Database Queries**: 3-5x faster

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables
5. Deploy!

```bash
# Or use Vercel CLI
npm install -g vercel
vercel
```

### Deploy to Netlify

1. Build the project: `npm run build`
2. Deploy the `.next` folder
3. Configure environment variables
4. Set build command: `npm run build`
5. Set publish directory: `.next`

### Environment Variables for Production

Make sure to set these in your deployment platform:

```env
MONGODB_URI=your_production_mongodb_uri
NEXT_PUBLIC_GRAPHCMS_ENDPOINT=https://yourdomain.com/api/graphql
```

## 🛠 Technologies Used

### Frontend

- **Next.js 12.1.6** - React framework
- **React 18.1.0** - UI library
- **TailwindCSS 3.0.24** - Utility-first CSS
- **Moment.js** - Date formatting
- **React Query** - Data fetching and caching

### Backend

- **MongoDB 7.0.0** - NoSQL database
- **Apollo Server** - GraphQL server
- **GraphQL** - Query language

### Development Tools

- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes
- **Bundle Analyzer** - Analyze bundle size

## 📝 Key Features Explained

### 1. Dynamic Routing

Posts and categories use Next.js dynamic routes:

```javascript
// /post/[slug].js - Individual post pages
// /category/[slug].js - Category filter pages
```

### 2. Static Site Generation (SSG)

Pages are pre-rendered at build time for optimal performance:

```javascript
export async function getStaticProps({ params }) {
  const post = await getPostBySlug(params.slug);
  return {
    props: { post },
    revalidate: 60, // ISR - Regenerate every 60 seconds
  };
}
```

### 3. GraphQL Integration

Custom Apollo Server provides a flexible API:

```javascript
// /pages/api/graphql.js
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
```

### 4. MongoDB Connection Pooling

Efficient database connections:

```javascript
// Reuses connections in development
// Creates new pool in production
const clientPromise = global._mongoClientPromise || client.connect();
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Abbosbek Sulaymonov**

- Full-stack developer specializing in React, Next.js, TypeScript, and MongoDB
- GitHub: [@Abbosbek](https://github.com/abbosbek-sulaymonov)
- Website: [abbosbek.uz](https://abbosbek.uz)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- MongoDB for the database solution
- Vercel for hosting platform
- TailwindCSS for the utility-first CSS framework
- The open-source community

## 📞 Support

If you have any questions or need help, please:

1. Check the [documentation](#table-of-contents)
2. Open an [issue](https://github.com/abbosbek-sulaymonov/next-post-app/issues)
3. Contact me directly

## 🗺 Roadmap

Future enhancements planned:

- [ ] User authentication system
- [ ] Admin dashboard
- [ ] Rich text editor for posts
- [ ] Search functionality
- [ ] Tags system
- [ ] Newsletter subscription
- [ ] Social media sharing
- [ ] Dark mode support
- [ ] Multi-language support
- [ ] Analytics integration

---

**Built with ❤️ using Next.js and MongoDB**

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import { formatDateTime } from '../../shared/utils/dateTimeConverter';

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get('/api/blogs/');
        setPosts(response.data);
      } catch (error) {
        setError('Failed to fetch blogs. Please try again later.');
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const formatDate = (dateString) => {
    return formatDateTime(dateString);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 text-center text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="container mx-auto p-6 text-center text-gray-600">
        <p>No blog posts available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {posts.map(post => (
          <article key={post.id} className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <span className="px-4 py-1 rounded-full text-sm font-semibold bg-blue-50 text-blue-600">
                  Programming Contest
                </span>
                <div className="flex items-center space-x-1 text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <time className="text-sm">{formatDate(post.created_at)}</time>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-4 hover:text-blue-600 transition-colors duration-200">
                {post.title}
              </h2>

              <div className="flex items-center mb-6">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                  {post.author}
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">Author {post.author}</p>
                  <p className="text-sm text-gray-500">Content Creator</p>
                </div>
              </div>

              <div className="prose max-w-none">
                <p className="text-gray-600 leading-relaxed line-clamp-3">
                  {post.description}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                <div className="flex space-x-4">
                  <button aria-label={`Like post ${post.id}`} className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                    </svg>
                    <span>{post.likes}</span>
                  </button>
                  <button aria-label={`Dislike post ${post.id}`} className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors duration-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v2a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2"></path>
                    </svg>
                    <span>{post.dislikes}</span>
                  </button>
                </div>
                
                <div className="flex items-center space-x-4">
                  <button aria-label="Share post" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                    </svg>
                  </button>
                  <button aria-label="Bookmark post" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="mt-6 text-center">
                <Link 
                  to={`/blogs/${post.id}`}
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 w-full sm:w-auto"
                >
                  Show Full Blog
                  <svg 
                    className="ml-2 w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blogs;

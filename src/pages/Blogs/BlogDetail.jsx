import React, { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, MessageCircle, Share2, Bookmark, Clock, Calendar, User } from 'lucide-react';
import { useParams, Link } from 'react-router-dom'; // Import useParams
import api from '../../api';
import { formatDateTime } from '../../shared/utils/dateTimeConverter';
import { ArrowLeft } from 'lucide-react'; // Import the back arrow icon

const BlogDetails = () => {
  // const { id } = useParams(); // Get the blog ID from the URL
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const [post, setPost] = useState(null);
  
  // useEffect(() => {
  //   const fetchBlog = async () => {
  //     try {
  //       const response = await api.get(`/api/blogs/${id}/`); // Fetch single blog by ID
  //       setPost(response.data);
  //     } catch (error) {
  //       setError('Failed to fetch blog. Please try again later.');
  //       console.error('Error fetching blog:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchBlog();
  // }, [id]); // Add 'id' to the dependency array


  const post = {
    id: 1,
    title: "KU IUPC 2024",
    description: "The KU IUPC that was held on the last November of the previous year was a great success for the Team of JUST. The team could secure 2nd position among various top teams from different universities across the country.",
    likes: 0,
    dislikes: 0,
    created_at: "2025-01-05T17:32:54.457126+06:00",
    updated_at: "2025-01-08T10:27:47.661020+06:00",
    author: {
      id: 1,
      name: "Noman",
      role: "Team Lead",
      avatar: "/src/assets/images/intro/image_04.jpg"
    },
    readTime: "5 min read",
    tags: ["Programming", "Competition", "Achievement"],
    content: `Our team's journey to securing the second position at KU IUPC 2024 was nothing short of extraordinary. The competition, which brought together the brightest minds from universities across the country, tested our problem-solving abilities, coding skills, and teamwork to the absolute limit.

    The challenges we faced were diverse and complex, ranging from algorithmic puzzles to real-world programming problems. Our team's dedication to preparation and practice in the months leading up to the competition proved invaluable.

    Key highlights of our performance:
    - Successfully solved 8 out of 10 problems
    - Completed the hardest problem in record time
    - Demonstrated excellent team coordination
    - Received special recognition for our efficient solutions

    This achievement not only brings honor to JUST but also motivates future participants to aim higher and work harder.`
  };

  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Sarah Chen",
      avatar: "/src/assets/images/logo/JUST_CSE_Club_logo_main.jpg",
      content: "Congratulations to the entire team! This is a remarkable achievement.",
      timestamp: "2 hours ago",
      likes: 15
    },
    {
      id: 2,
      author: "Mohammed Rahman",
      avatar: "/src/assets/images/intro/image_03.jpg",
      content: "The dedication and hard work really paid off. Proud of our university!",
      timestamp: "5 hours ago",
      likes: 10
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [likes, setLikes] = useState(post.likes);
  const [dislikes, setDislikes] = useState(post.dislikes);


  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="container mx-auto p-6 text-center text-red-600">
  //       <p>{error}</p>
  //     </div>
  //   );
  // }

  if (!post) {
    return (
      <div className="container mx-auto p-6 text-center text-gray-600">
        <p>Blog post not found.</p>
      </div>
    );
  }

 


  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Hero Image */}
      <div className="w-full h-[400px] relative mb-8 rounded-xl overflow-hidden shadow-lg">
        <img
          src="/src/assets/images/intro/image_01.jpg"
          alt="IUPC Competition"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
          <div className="flex gap-2 mb-4">
            {post.tags.map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">{post.title}</h1>
        </div>
      </div>

      {/* Author and Meta Information */}
      <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
        <div className="flex items-center space-x-4">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h3 className="font-medium text-gray-900">{post.author.name}</h3>
            <p className="text-sm text-gray-500">{post.author.role}</p>
          </div>
        </div>
        <div className="flex items-center space-x-6 text-sm text-gray-500">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            {new Date(post.created_at).toLocaleDateString()}
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            {post.readTime}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="prose max-w-none mb-8">
        <p className="text-lg leading-relaxed text-gray-700 whitespace-pre-line">
          {post.content}
        </p>
      </div>

      {/* Engagement Bar */}
      <div className="flex justify-between items-center border-y border-gray-200 py-4 mb-8">
        <div className="flex space-x-6">
          <button onClick={() => setLikes(likes + 1)} className="flex items-center space-x-2 text-gray-500 hover:text-blue-500">
            <ThumbsUp className="w-5 h-5" />
            <span>{likes}</span>
          </button>
          <button onClick={() => setDislikes(dislikes + 1)} className="flex items-center space-x-2 text-gray-500 hover:text-red-500">
            <ThumbsDown className="w-5 h-5" />
            <span>{dislikes}</span>
          </button>
        </div>
        <div className="flex space-x-4">
          <button className="text-gray-500 hover:text-blue-500">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="text-gray-500 hover:text-blue-500">
            <Bookmark className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-6">Comments</h3>
        
        {/* Comment Form */}
        <div className="mb-8 bg-white rounded-lg shadow-sm p-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full p-4 border border-gray-200 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="3"
          />
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Post Comment
          </button>
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map(comment => (
            <div key={comment.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start space-x-4">
                <img
                  src={comment.avatar}
                  alt={comment.author}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-gray-900">{comment.author}</h4>
                    <span className="text-sm text-gray-500">{comment.timestamp}</span>
                  </div>
                  <p className="text-gray-700 mb-3">{comment.content}</p>
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{comment.likes}</span>
                    </button>
                    <button className="text-gray-500 hover:text-blue-500 text-sm">
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
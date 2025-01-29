import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Search, Calendar, ArrowLeft } from 'lucide-react';
import api from '../../api';
import { formatDateTime } from '../../shared/utils/dateTimeConverter';

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await api.get('/api/notices/');
        setNotices(response.data);
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    };
    fetchNotices();
  }, []);

  if (id) {
    const notice = notices.find(notice => notice.id === parseInt(id));
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Link
          to="/notices"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Notices
        </Link>
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto">
          <h1 className="text-3xl font-semibold text-gray-900 mb-4">{notice?.title}</h1>
          <div className="flex items-center gap-6 text-gray-600 mb-6">
            <span className="flex items-center gap-2">
              <Calendar size={16} />
              Created: {formatDateTime(notice?.created_at)}
            </span>
            <span className="flex items-center gap-2">
              <Calendar size={16} />
              Updated: {formatDateTime(notice?.updated_at)}
            </span>
          </div>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">{notice?.description}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl border shadow-lg mb-8 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search notices..."
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 text-gray-700 border focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 table-auto rounded-lg shadow-lg bg-white">
          <tbody>
            {notices
              .filter(notice =>
                notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                notice.description.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((notice, index) => (
                <tr
                  key={notice.id}
                  className={`hover:bg-gray-50 transition duration-200 ease-in-out ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}  // Zebra striping
                >
                  {/* Mobile View (Show date, title, description) */}
                  <td className="px-6 py-4 text-gray-600 border-b border-gray-300">
                    <div className="text-sm font-semibold text-gray-500">{formatDateTime(notice.created_at)}</div>
                    <div className="text-lg font-bold text-gray-800">{notice.title}</div>
                    <div className="text-gray-600 line-clamp-1">{notice.description}</div>
                    <span className="text-blue-600 hover:text-blue-800 font-semibold block mt-2">
                      <Link to={`/notices/${notice.id}`} className="text-blue-600">
                        Read More
                      </Link>
                    </span>
                  </td>

                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Notices;

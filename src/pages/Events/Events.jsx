import React, { useState } from 'react';

const EventsPage = () => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [activeFilter, setActiveFilter] = useState('all');

    const events = [
        {
            id: 1,
            title: "Hackathon 2025",
            date: "2025-03-15",
            time: "09:00 AM",
            description: "Join us for a 24-hour coding marathon! Build innovative solutions and compete for amazing prizes.",
            fundingGoal: 5000,
            currentFunding: 3750,
            capacity: 200,
            registered: 150,
            location: "Computer Science Building, Room 101",
            category: "hackathon",
            fullDescription: "Our annual hackathon brings together the brightest minds to solve real-world problems through technology. This year's theme is 'AI for Social Good'.",
            tags: ["Coding", "Competition", "AI"],
            imageUrl: "src/assets/images/intro/image_03.jpg"
        },
        {
            id: 2,
            title: "Tech Talk: Future of AI",
            date: "2025-02-28",
            time: "04:00 PM",
            description: "Distinguished lecture on the latest developments in artificial intelligence and its impact on society.",
            fundingGoal: 2000,
            currentFunding: 1800,
            capacity: 150,
            registered: 120,
            location: "Virtual Event",
            category: "workshop",
            fullDescription: "Join us for an enlightening session on the future of AI with Dr. Sarah Johnson, leading AI researcher.",
            tags: ["AI", "Virtual", "Lecture"],
            imageUrl: "src/assets/images/intro/image_04.jpg"
        }
    ];

    const getTimeRemaining = (eventDate) => {
        const total = new Date(eventDate) - new Date();
        const days = Math.floor(total / (1000 * 60 * 60 * 24));
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        return `${days}d ${hours}h`;
    };

    const EventCard = ({ event }) => (
        <div className="bg-white border rounded-lg shadow-lg overflow-hidden">
            <img className="w-full h-64 object-cover" src={event.imageUrl} alt={event.title} />
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <div className="text-sm text-gray-500">⏰ {getTimeRemaining(event.date)}</div>
                </div>
                <div className="mb-2">
                    {event.tags.map((tag, index) => (
                        <span key={index} className="text-xs font-semibold text-blue-500 mr-2">{tag}</span>
                    ))}
                </div>
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <div>📅 {new Date(event.date).toLocaleDateString()}</div>
                    <div>📍 {event.location}</div>
                </div>
                <div className="bg-gray-200 rounded-md mb-4">
                    <div className="flex justify-between p-2 text-sm text-gray-600">
                        <span>Fundraising Progress</span>
                        <span>${event.currentFunding} / ${event.fundingGoal}</span>
                    </div>
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(event.currentFunding / event.fundingGoal) * 100}%` }}></div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">👥 {event.registered}/{event.capacity} registered</span>
                    <button 
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                        onClick={() => setSelectedEvent(event)}
                    >
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );

    const EventDetails = ({ event, onClose }) => (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-lg p-8 w-11/12 md:w-1/2" onClick={e => e.stopPropagation()}>
                <button className="absolute top-2 right-2 text-2xl text-gray-500" onClick={onClose}>×</button>
                <h2 className="text-2xl font-bold mb-4">{event.title}</h2>
                <div className="flex justify-center space-x-2 mb-4">
                    {event.tags.map((tag, index) => (
                        <span key={index} className="text-sm font-semibold text-blue-500">{tag}</span>
                    ))}
                </div>
                <div className="text-sm text-gray-600 mb-4">
                    <div>📅 {new Date(event.date).toLocaleDateString()} at {event.time}</div>
                    <div>📍 {event.location}</div>
                </div>
                <p className="text-gray-700 mb-4">{event.fullDescription}</p>
                <div className="mb-4">
                    <h3 className="font-semibold text-lg">Support this event</h3>
                    <div className="flex justify-between p-2 text-sm text-gray-600 mb-2">
                        <span>Current funding</span>
                        <span>${event.currentFunding} / ${event.fundingGoal}</span>
                    </div>
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(event.currentFunding / event.fundingGoal) * 100}%` }}></div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">👥 {event.registered}/{event.capacity} spots filled</span>

                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition order-1 sm:order-none">
                        Register Now
                      </button>
                      <button
                        className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-300 transition order-2 sm:order-none"
                        onClick={onClose}
                      >
                        Close
                      </button>
                    </div>


                </div>
            </div>
        </div>
    );

    return (
        <div className="p-4">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-2">Upcoming CS Club Events</h1>
                <p className="text-gray-600">Join us for exciting events, workshops, and competitions.</p>
            </div>
            
            <div className="flex flex-wrap justify-center space-x-4 mb-8">
  {['all', 'hackathon', 'workshop', 'seminar'].map(filter => (
    <button
      key={filter}
      className={`px-6 py-2 rounded-full text-sm font-semibold mb-2 ${activeFilter === filter ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'} sm:mb-0`}
      onClick={() => setActiveFilter(filter)}
    >
      {filter}
    </button>
  ))}
</div>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                {events
                    .filter(event => activeFilter === 'all' || event.category === activeFilter)
                    .map(event => (
                        <EventCard key={event.id} event={event} />
                    ))}
            </div>
            
            {selectedEvent && (
                <EventDetails 
                    event={selectedEvent} 
                    onClose={() => setSelectedEvent(null)} 
                />
            )}
        </div>
    );
};

export default EventsPage;

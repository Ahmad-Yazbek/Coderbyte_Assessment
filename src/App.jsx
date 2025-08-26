import { useState, useMemo } from 'react';
import { Search, BookOpen, Calendar, User } from 'lucide-react';

const ARTICLES = [
  {
    id: 1,
    title: "The Future of Artificial Intelligence in Healthcare",
    author: "Dr. Sarah Johnson",
    date: "2024-08-15",
    category: "Technology",
    content: "Artificial intelligence is revolutionizing healthcare by enabling more accurate diagnoses, personalized treatment plans, and efficient drug discovery. Machine learning algorithms can analyze medical images with unprecedented precision, often detecting anomalies that human radiologists might miss. Natural language processing is being used to extract valuable insights from medical records, while predictive analytics help identify patients at risk of developing certain conditions. The integration of AI in healthcare promises to reduce costs, improve patient outcomes, and make medical care more accessible to underserved populations."
  },
  {
    id: 2,
    title: "Sustainable Energy Solutions for the Modern World",
    author: "Michael Chen",
    date: "2024-08-10",
    category: "Environment",
    content: "The transition to renewable energy sources is accelerating worldwide as governments and corporations recognize the urgent need to combat climate change. Solar and wind power technologies have become increasingly cost-effective, making them competitive with traditional fossil fuels. Energy storage solutions, particularly lithium-ion batteries, are improving rapidly, addressing the intermittency challenges of renewable sources. Smart grid technology is enabling more efficient distribution of clean energy, while electric vehicles are driving demand for sustainable transportation alternatives."
  },
  {
    id: 3,
    title: "The Psychology of Remote Work and Productivity",
    author: "Dr. Emily Rodriguez",
    date: "2024-08-05",
    category: "Psychology",
    content: "Remote work has fundamentally changed how we approach productivity and work-life balance. Research shows that while many employees report higher job satisfaction when working from home, maintaining focus and motivation can be challenging without proper strategies. Creating dedicated workspaces, establishing clear boundaries between work and personal time, and leveraging technology for effective communication are crucial for remote work success. The psychological impact of isolation must also be addressed through virtual team building and regular check-ins with colleagues."
  },
  {
    id: 4,
    title: "Breakthrough Discoveries in Quantum Computing",
    author: "Prof. David Kim",
    date: "2024-07-28",
    category: "Science",
    content: "Quantum computing represents a paradigm shift in computational power, promising to solve complex problems that are intractable for classical computers. Recent advances in quantum error correction and qubit stability have brought us closer to practical quantum applications. These systems could revolutionize cryptography, drug discovery, financial modeling, and artificial intelligence. Major tech companies and research institutions are investing heavily in quantum research, with some predicting commercial viability within the next decade."
  },
  {
    id: 5,
    title: "The Evolution of Social Media and Digital Communication",
    author: "Lisa Park",
    date: "2024-07-20",
    category: "Social Media",
    content: "Social media platforms have transformed how we communicate, share information, and build communities. The rise of short-form video content, ephemeral messaging, and live streaming has changed user expectations for digital interaction. Privacy concerns and content moderation challenges continue to shape platform policies, while emerging technologies like augmented reality and virtual reality promise to create more immersive social experiences. The impact of social media on mental health, political discourse, and social movements remains a topic of ongoing research and debate."
  },
  {
    id: 6,
    title: "Modern Cooking Techniques and Culinary Innovation",
    author: "Chef Antoine Dubois",
    date: "2024-07-15",
    category: "Food",
    content: "Contemporary cuisine is embracing both traditional techniques and cutting-edge innovation to create extraordinary dining experiences. Molecular gastronomy continues to push boundaries with spherification, liquid nitrogen, and edible films. Sous vide cooking has made precision temperature control accessible to home cooks, while fermentation and preservation methods are experiencing a renaissance. Plant-based alternatives and sustainable sourcing are driving menu development, as chefs balance creativity with environmental responsibility."
  }
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredArticles = useMemo(() => {
    if (!searchTerm.trim()) return ARTICLES;
    
    return ARTICLES.filter(article => {
      const searchLower = searchTerm.toLowerCase();
      return (
        article.title.toLowerCase().includes(searchLower) ||
        article.author.toLowerCase().includes(searchLower) ||
        article.category.toLowerCase().includes(searchLower) ||
        article.content.toLowerCase().includes(searchLower)
      );
    });
  }, [searchTerm]);

  const highlightText = (text, searchTerm) => {
    if (!searchTerm.trim()) return text;
    
    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => {
      if (part.toLowerCase() === searchTerm.toLowerCase()) {
        return (
          <mark key={index} className="bg-yellow-300 px-1 rounded font-medium">
            {part}
          </mark>
        );
      }
      return part;
    });
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Article Search</h1>
          <p className="text-gray-600">Search through our collection of articles and find what you're looking for</p>
        </div>

        {/* search box */}
        <div className="relative mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles by title, author, category, or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {searchTerm && (
            <div className="absolute right-4 top-4 text-sm text-gray-500">
              {filteredArticles.length} result{filteredArticles.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>

        {/* results */}
        <div className="space-y-6">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No articles found</h3>
              <p className="text-gray-500">Try adjusting your search terms</p>
            </div>
          ) : (
            filteredArticles.map((article) => (
              <div key={article.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {highlightText(article.title, searchTerm)}
                    </h2>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{highlightText(article.author, searchTerm)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(article.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full ml-4">
                    {highlightText(article.category, searchTerm)}
                  </span>
                </div>
                
                <p className="text-gray-700 leading-relaxed">
                  {highlightText(article.content, searchTerm)}
                </p>
              </div>
            ))
          )}
        </div>

        {/* stats */}
        {searchTerm && (
          <div className="mt-8 text-center">
            <div className="inline-block bg-white rounded-lg shadow px-6 py-3">
              <span className="text-gray-600">
                Showing <strong className="text-blue-600">{filteredArticles.length}</strong> of <strong className="text-blue-600">{ARTICLES.length}</strong> articles
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
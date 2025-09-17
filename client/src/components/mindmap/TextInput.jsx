import { useContext } from "react";
import { MindmapContext } from "../../context/MindmapContext";

const TextInputForm = ({ onGenerate, loading }) => {
  const { currentText, setCurrentText, currentTitle, setCurrentTitle } =
    useContext(MindmapContext);

 const handleSubmit = (e) => {
    e.preventDefault();
    if (currentText.trim()) {
      onGenerate(currentText, currentTitle);
    }
  };
  const exampleTexts = [
    {
      title: "Machine Learning Basics",
      text: "Machine learning is a subset of artificial intelligence that focuses on algorithms that can learn from data. It includes supervised learning where models learn from labeled examples, unsupervised learning which finds patterns in unlabeled data, and reinforcement learning where agents learn through interaction with environments.",
    },
    {
      title: "Climate Change Impact",
      text: "Climate change significantly affects global weather patterns, leading to rising sea levels, extreme weather events, and shifts in precipitation. The primary causes include greenhouse gas emissions from fossil fuel burning, deforestation, and industrial processes. Consequences include biodiversity loss, agricultural disruption, and threats to human settlements in coastal areas.",
    },
    {
      title: "Digital Marketing Strategy",
      text: "Effective digital marketing involves multiple channels including social media marketing, search engine optimization, content marketing, and email campaigns. Key metrics include conversion rates, customer acquisition cost, lifetime value, and return on investment. Success requires understanding target audiences, creating compelling content, and continuous optimization based on data analytics.",
    },
  ];
const loadExample = (example) => {
    setCurrentText(example.text);
    setCurrentTitle(example.title);
  };
  return (
    <div className="grid md:grid-cols-2 gap-8 ">
      {/* Input Form */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Create Your Mindmap
          </h2>
          <p className="text-gray-600">
            Paste any text and watch AI transform it into a visual masterpiece
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title (Optional)
            </label>
            <input
              type="text"
              value={currentTitle}
              onChange={(e) => setCurrentTitle(e.target.value)}
              placeholder="Give your mindmap a title..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Text *
            </label>
            <textarea
              value={currentText}
              onChange={(e) => setCurrentText(e.target.value)}
              placeholder="Paste your text here... (minimum 10 characters)"
              rows={10}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              {currentText.length}/10000 characters
            </p>
          </div>

          <button
            type="submit"
            disabled={loading || !currentText.trim() || currentText.length < 10}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Generating...
              </span>
            ) : (
              "🚀 Generate Mindmap with AI"
            )}
          </button>
        </form>
      </div>

      {/* Examples */}
      <div className="space-y-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 ">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            ✨ Try an Example
          </h3>
          <p className="text-gray-600 mb-4 text-sm">
            Click any example below to see how it works
          </p>

          <div className="space-y-3 ">
            {exampleTexts.map((example, index) => (
              <button
                key={index}
                onClick={() => loadExample(example)}
                className="w-full text-left p-4 bg-gradient-to-r from-gray-50 to-blue-50 hover:from-blue-50 hover:to-purple-50 rounded-lg transition-all duration-200 border border-gray-200 hover:border-blue-300 group"
              >
                <h4 className="font-medium text-gray-900 mb-1 group-hover:text-blue-700 text-sm">
                  {example.title}
                </h4>
                <p className="text-xs text-gray-600 line-clamp-2">
                  {example.text.substring(0, 120)}...
                </p>
              </button>
            ))}
          </div>
        </div>
        <div className=" p-6 bg-blue-50 rounded-2xl">
          <h4 className="font-medium text-blue-900 mb-3 flex items-center">
            <span className="mr-2">💡</span> Pro Tips:
          </h4>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>• Longer texts create more detailed mindmaps</li>
            <li>• Use clear, descriptive language</li>
            <li>• Include key concepts and relationships</li>
            <li>• Works great with educational content</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default TextInputForm;

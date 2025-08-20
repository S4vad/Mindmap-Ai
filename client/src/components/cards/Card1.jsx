import React from "react";
import { Brain, Sparkles, ArrowRight } from "lucide-react";

const Card1 = () => {
  return (
    <div className="group relative bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-7 border border-blue-200/50 hover:border-blue-300/70 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 transform hover:-translate-y-2 max-w-xs overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 right-4 w-32 h-32 bg-blue-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-4 left-4 w-24 h-24 bg-indigo-600 rounded-full blur-2xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Icon with glow effect */}
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:shadow-blue-600/50 transition-shadow duration-300">
            <Brain className="w-7 h-7 text-white" />
          </div>
          <div>
            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900  group-hover:text-blue-900 transition-colors">
              Smart Analysis
            </h3>
            {/* Badge */}
            <div className="inline-flex items-center px-2 py-1 bg-blue-600/10 rounded-full border border-blue-600/20 ">
              <Sparkles className="w-2 h-2 text-blue-600 mr-2" />
              <span className="text-xs font-medium text-blue-700">
                AI-Powered
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-xs leading-relaxed mb-2">
          Extract key concepts and insights from any text using advanced natural
          language processing
        </p>



        {/* CTA */}
        <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
          <span className="text-xs mr-2">Learn more</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
    </div>
  );
};

export default Card1;
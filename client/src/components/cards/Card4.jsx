import React from "react";
import { Download, Share2, ArrowRight } from "lucide-react";

const Card4 = () => {
  return (
    <div className="group relative bg-gradient-to-br from-orange-50 to-amber-100 rounded-3xl p-7 border border-orange-200/50 hover:border-orange-300/70 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/20 transform hover:-translate-y-2 max-w-xs overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 right-4 w-32 h-32 bg-orange-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-4 left-4 w-24 h-24 bg-amber-600 rounded-full blur-2xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Icon with Title + Badge */}
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-600/30 group-hover:shadow-orange-600/50 transition-shadow duration-300">
            <Download className="w-7 h-7 text-white" />
          </div>
          <div>
            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-orange-900 transition-colors">
              Export & Share
            </h3>
            {/* Badge */}
            <div className="inline-flex items-center px-2 py-1 bg-orange-600/10 rounded-full border border-orange-600/20">
              <Share2 className="w-2 h-2 text-orange-600 mr-2" />
              <span className="text-xs font-medium text-orange-700">
                Multi-format
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-xs leading-relaxed mb-2">
          Export mind maps in multiple formats and integrate with your favorite
          productivity tools
        </p>

        {/* CTA */}
        <div className="flex items-center text-orange-600 font-medium group-hover:text-orange-700 transition-colors">
          <span className="text-xs mr-2">View options</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-600/5 to-amber-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
    </div>
  );
};

export default Card4;

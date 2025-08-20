


import React from "react";
import { Users, Wifi, ArrowRight } from "lucide-react";

const Card3 = () => {
  return (
    <div className="group relative bg-gradient-to-br from-emerald-50 to-teal-100 rounded-3xl p-7 border border-emerald-200/50 hover:border-emerald-300/70 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/20 transform hover:-translate-y-2 max-w-xs overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 right-4 w-32 h-32 bg-emerald-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-4 left-4 w-24 h-24 bg-teal-600 rounded-full blur-2xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Icon with Title + Badge */}
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-600/30 group-hover:shadow-emerald-600/50 transition-shadow duration-300">
            <Users className="w-7 h-7 text-white" />
          </div>
          <div>
            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-900 transition-colors">
              Team Collaboration
            </h3>
            {/* Badge */}
            <div className="inline-flex items-center px-2 py-1 bg-emerald-600/10 rounded-full border border-emerald-600/20">
              <Wifi className="w-2 h-2 text-emerald-600 mr-2" />
              <span className="text-xs font-medium text-emerald-700">
                Real-time
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-xs leading-relaxed mb-2">
          Work together seamlessly with live editing, comments, and instant
          synchronization across devices
        </p>

        {/* CTA */}
        <div className="flex items-center text-emerald-600 font-medium group-hover:text-emerald-700 transition-colors">
          <span className="text-xs mr-2">Start collaborating</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-teal-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
    </div>
  );
};

export default Card3;


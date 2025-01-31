import React from 'react';
import { Bell } from 'lucide-react';

export function DashboardHeader() {
  return (
    <header className="bg-gray-800/50 border-b border-gray-700 p-4">
      <div className="flex justify-end items-center">
        <button className="p-2 text-gray-400 hover:text-white transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </div>
    </header>
  );
}

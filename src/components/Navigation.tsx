import { useState } from "react";
import { cn } from "@/lib/utils";
import { GraduationCap, Upload, Home } from "lucide-react";

interface NavigationProps {
  activeTab: 'home' | 'quiz-generator';
  onTabChange: (tab: 'home' | 'quiz-generator') => void;
}

export const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  return (
    <nav className="bg-surface-elevated border-b border-border shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-hero p-2 rounded-lg shadow-medium">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              QuizMaster AI
            </h1>
          </div>
          
          <div className="flex space-x-1 bg-surface rounded-lg p-1 shadow-soft">
            <button
              onClick={() => onTabChange('home')}
              className={cn(
                "flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
                activeTab === 'home'
                  ? "bg-gradient-primary text-primary-foreground shadow-soft"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </button>
            <button
              onClick={() => onTabChange('quiz-generator')}
              className={cn(
                "flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
                activeTab === 'quiz-generator'
                  ? "bg-gradient-primary text-primary-foreground shadow-soft"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Upload className="h-4 w-4" />
              <span>Quiz Generator</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
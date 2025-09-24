import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { HomePage } from "@/components/HomePage";
import { QuizGenerator } from "@/components/QuizGenerator";

const Index = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'quiz-generator'>('home');

  const handleStartQuiz = () => {
    setActiveTab('quiz-generator');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      {activeTab === 'home' && (
        <HomePage onStartQuiz={handleStartQuiz} />
      )}
      
      {activeTab === 'quiz-generator' && (
        <QuizGenerator />
      )}
    </div>
  );
};

export default Index;

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  ChevronLeft, 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  Trophy,
  Brain,
  Target,
  Clock
} from "lucide-react";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface Quiz {
  title: string;
  questions: QuizQuestion[];
}

interface QuizDisplayProps {
  quiz: Quiz;
  onBack: () => void;
}

export const QuizDisplay = ({ quiz, onBack }: QuizDisplayProps) => {
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(quiz.questions.length).fill(null));
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    
    setSelectedAnswer(answerIndex);
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) {
      toast({
        title: "Please select an answer",
        description: "Choose one of the options before continuing.",
        variant: "destructive",
      });
      return;
    }

    setShowExplanation(true);
    
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    toast({
      title: isCorrect ? "Correct!" : "Incorrect",
      description: isCorrect ? "Well done!" : "Don't worry, keep learning!",
      variant: isCorrect ? "default" : "destructive",
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(answers[currentQuestionIndex + 1]);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(answers[currentQuestionIndex - 1]);
      setShowExplanation(answers[currentQuestionIndex - 1] !== null);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setAnswers(new Array(quiz.questions.length).fill(null));
    setQuizCompleted(false);
  };

  const calculateScore = () => {
    return answers.reduce((score, answer, index) => {
      return answer === quiz.questions[index].correctAnswer ? score + 1 : score;
    }, 0);
  };

  const getScoreColor = (score: number) => {
    const percentage = (score / quiz.questions.length) * 100;
    if (percentage >= 80) return "text-success";
    if (percentage >= 60) return "text-warning";
    return "text-error";
  };

  if (quizCompleted) {
    const score = calculateScore();
    const percentage = Math.round((score / quiz.questions.length) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-surface via-background to-surface-elevated py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="outline"
            onClick={onBack}
            className="mb-6"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Generator
          </Button>

          <Card className="p-8 shadow-strong bg-card border border-card-border text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-success rounded-full shadow-medium mb-6">
                <Trophy className="h-10 w-10 text-white" />
              </div>
              
              <h2 className="text-3xl font-bold mb-4 text-card-foreground">
                Quiz Completed!
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Great job completing the quiz. Here are your results:
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              <div className="p-6 bg-gradient-to-br from-success/10 to-success/5 rounded-lg border border-success/20">
                <Target className="h-8 w-8 text-success mx-auto mb-2" />
                <div className={`text-3xl font-bold ${getScoreColor(score)}`}>
                  {score}/{quiz.questions.length}
                </div>
                <div className="text-sm text-muted-foreground">Correct Answers</div>
              </div>
              
              <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20">
                <Brain className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className={`text-3xl font-bold ${getScoreColor(score)}`}>
                  {percentage}%
                </div>
                <div className="text-sm text-muted-foreground">Score</div>
              </div>
              
              <div className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg border border-accent/20">
                <Clock className="h-8 w-8 text-accent mx-auto mb-2" />
                <div className="text-3xl font-bold text-card-foreground">
                  {quiz.questions.length}
                </div>
                <div className="text-sm text-muted-foreground">Questions</div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-muted-foreground">
                {percentage >= 80 
                  ? "Excellent work! You've mastered this topic." 
                  : percentage >= 60 
                  ? "Good job! Consider reviewing the explanations to improve further."
                  : "Keep studying! Review the explanations and try again."
                }
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="default" size="lg" onClick={resetQuiz} className="bg-gradient-to-r from-primary to-primary/80">
                  <RotateCcw className="mr-2 h-5 w-5" />
                  Retake Quiz
                </Button>
                <Button variant="outline" size="lg" onClick={onBack}>
                  Generate New Quiz
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-background to-surface-elevated py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            onClick={onBack}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Generator
          </Button>
          
          <div className="text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-bold text-card-foreground">{quiz.title}</h1>
            <span className="text-sm font-medium text-muted-foreground">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>

        {/* Question Card */}
        <Card className="p-8 shadow-quiz bg-card border border-card-border mb-6">
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold text-card-foreground mb-6 leading-relaxed">
              {currentQuestion.question}
            </h2>

            <div className="grid gap-4">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQuestion.correctAnswer;
                const isIncorrect = showExplanation && isSelected && !isCorrect;
                const showCorrectAnswer = showExplanation && isCorrect;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showExplanation}
                    className={`
                      p-4 rounded-lg border-2 text-left transition-all duration-200 
                      ${isSelected && !showExplanation 
                        ? 'border-primary bg-primary/10 shadow-soft' 
                        : 'border-border hover:border-primary/50 hover:bg-primary/5'
                      }
                      ${showCorrectAnswer 
                        ? 'border-success bg-success/10' 
                        : ''
                      }
                      ${isIncorrect 
                        ? 'border-error bg-error/10' 
                        : ''
                      }
                      ${showExplanation 
                        ? 'cursor-default' 
                        : 'cursor-pointer hover:shadow-soft'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-card-foreground">{option}</span>
                      {showExplanation && (
                        <div>
                          {showCorrectAnswer && (
                            <CheckCircle className="h-5 w-5 text-success" />
                          )}
                          {isIncorrect && (
                            <XCircle className="h-5 w-5 text-error" />
                          )}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className="p-6 bg-gradient-to-br from-accent/5 to-primary/5 rounded-lg border border-accent/20 mb-6">
              <h3 className="font-semibold text-card-foreground mb-2 flex items-center">
                <Brain className="h-5 w-5 mr-2 text-accent" />
                Explanation
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>

            <div className="flex space-x-3">
              {!showExplanation ? (
                <Button
                  variant="default"
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className="bg-gradient-to-r from-primary to-primary/80"
                >
                  Submit Answer
                </Button>
              ) : (
                <Button
                  variant="default"
                  onClick={handleNextQuestion}
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white"
                >
                  {currentQuestionIndex < quiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
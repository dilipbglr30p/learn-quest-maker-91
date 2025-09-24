import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, Brain, Loader2 } from "lucide-react";
import { QuizDisplay } from "@/components/QuizDisplay";

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

export const QuizGenerator = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedQuiz, setGeneratedQuiz] = useState<Quiz | null>(null);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setGeneratedQuiz(null);
      toast({
        title: "PDF Uploaded Successfully",
        description: `${selectedFile.name} is ready for quiz generation.`,
      });
    } else {
      toast({
        title: "Invalid File Type",
        description: "Please select a PDF file.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const simulateQuizGeneration = useCallback(async () => {
    if (!file) return;

    setIsGenerating(true);
    setProgress(0);

    // Simulate AI processing with progress updates
    const steps = [
      { message: "Analyzing PDF content...", progress: 20 },
      { message: "Extracting key concepts...", progress: 40 },
      { message: "Generating questions...", progress: 60 },
      { message: "Creating explanations...", progress: 80 },
      { message: "Finalizing quiz...", progress: 100 }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgress(step.progress);
      toast({
        title: "Processing",
        description: step.message,
      });
    }

    // Generate sample quiz based on filename to simulate AI processing
    const sampleQuiz: Quiz = {
      title: `Quiz: ${file.name.replace('.pdf', '')}`,
      questions: [
        {
          id: 1,
          question: "What is the primary purpose of the document's main concept?",
          options: [
            "To provide a comprehensive overview",
            "To establish foundational principles",
            "To present detailed analysis",
            "To summarize key findings"
          ],
          correctAnswer: 1,
          explanation: "The document establishes foundational principles that serve as the basis for understanding the entire topic."
        },
        {
          id: 2,
          question: "Which methodology is most emphasized in the content?",
          options: [
            "Qualitative analysis",
            "Quantitative research",
            "Mixed methods approach",
            "Theoretical framework"
          ],
          correctAnswer: 2,
          explanation: "The content primarily emphasizes a mixed methods approach, combining both qualitative and quantitative elements."
        },
        {
          id: 3,
          question: "What are the key implications discussed in the document?",
          options: [
            "Short-term tactical changes",
            "Long-term strategic planning",
            "Immediate operational adjustments",
            "All of the above"
          ],
          correctAnswer: 3,
          explanation: "The document discusses implications across all time horizons, from immediate operational needs to long-term strategic considerations."
        },
        {
          id: 4,
          question: "How does the document structure its arguments?",
          options: [
            "Chronologically",
            "By importance",
            "Thematically",
            "Randomly"
          ],
          correctAnswer: 2,
          explanation: "The document structures arguments by importance, presenting the most critical points first to establish a strong foundation."
        },
        {
          id: 5,
          question: "What conclusion can be drawn from the main findings?",
          options: [
            "The topic requires further research",
            "Current methods are sufficient",
            "A paradigm shift is needed",
            "Results are inconclusive"
          ],
          correctAnswer: 0,
          explanation: "The main findings indicate that while significant progress has been made, the topic requires further research to fully understand all implications."
        }
      ]
    };

    setGeneratedQuiz(sampleQuiz);
    setIsGenerating(false);
    setProgress(0);

    toast({
      title: "Quiz Generated Successfully!",
      description: `Created ${sampleQuiz.questions.length} questions from your PDF.`,
    });
  }, [file, toast]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const droppedFile = droppedFiles[0];
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile);
        setGeneratedQuiz(null);
        toast({
          title: "PDF Uploaded Successfully",
          description: `${droppedFile.name} is ready for quiz generation.`,
        });
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please select a PDF file.",
          variant: "destructive",
        });
      }
    }
  }, [toast]);

  if (generatedQuiz) {
    return (
      <QuizDisplay 
        quiz={generatedQuiz} 
        onBack={() => setGeneratedQuiz(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-background to-surface-elevated py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Generate Quiz from PDF
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload your PDF document and let our AI create an interactive quiz to test comprehension and enhance learning.
          </p>
        </div>

        <Card className="p-8 shadow-strong bg-card border border-card-border">
          {/* Upload Section */}
          <div
            className="border-2 border-dashed border-accent rounded-lg p-12 text-center transition-all duration-200 hover:border-accent-light hover:bg-accent/5"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-gradient-accent rounded-full shadow-medium">
                <Upload className="h-10 w-10 text-white" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-card-foreground">
                  Upload Your PDF Document
                </h3>
                <p className="text-muted-foreground">
                  Drag and drop your PDF file here, or click to browse
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="relative">
                  <input
                    id="pdf-upload"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <Button 
                    type="button"
                    variant="outline" 
                    size="lg" 
                    className="bg-accent text-accent-foreground shadow-medium hover:bg-accent/80 hover:shadow-strong border-2 border-dashed border-accent/50 hover:border-accent relative"
                  >
                    <FileText className="mr-2 h-5 w-5" />
                    Choose PDF File
                  </Button>
                </div>
              </div>

              {file && (
                <div className="mt-4 p-4 bg-success/10 border border-success/20 rounded-lg">
                  <p className="text-success font-medium">
                    ✓ {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Generation Section */}
          {file && !isGenerating && (
            <div className="mt-8 text-center">
        <Button
          variant="default"
          size="lg"
          onClick={simulateQuizGeneration}
          className="animate-pulse bg-gradient-to-r from-primary to-primary/80"
        >
                <Brain className="mr-2 h-5 w-5" />
                Generate Quiz with AI
              </Button>
            </div>
          )}

          {/* Loading Section */}
          {isGenerating && (
            <div className="mt-8 space-y-4">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-card-foreground">
                  AI is analyzing your document...
                </h3>
                <p className="text-muted-foreground">
                  This may take a few moments depending on document length
                </p>
              </div>
              
              <div className="space-y-2">
                <Progress value={progress} className="w-full" />
                <p className="text-sm text-muted-foreground text-center">
                  {progress}% Complete
                </p>
              </div>
            </div>
          )}
        </Card>

        {/* Instructions */}
        <Card className="mt-8 p-6 bg-surface-elevated shadow-soft border border-border">
          <h3 className="text-lg font-semibold mb-4 text-card-foreground">
            How it works:
          </h3>
          <div className="grid sm:grid-cols-3 gap-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                1
              </div>
              <span>Upload your PDF document</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                2
              </div>
              <span>AI analyzes content and key concepts</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                3
              </div>
              <span>Interactive quiz is generated instantly</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
import { Button } from "@/components/ui/button-enhanced";
import { Card } from "@/components/ui/card";
import { GraduationCap, Upload, Brain, Target, Zap, CheckCircle } from "lucide-react";

interface HomePageProps {
  onStartQuiz: () => void;
}

export const HomePage = ({ onStartQuiz }: HomePageProps) => {
  const features = [
    {
      icon: <Brain className="h-8 w-8 text-accent" />,
      title: "AI-Powered Analysis",
      description: "Advanced AI extracts key concepts and creates targeted questions from your PDF content."
    },
    {
      icon: <Target className="h-8 w-8 text-success" />,
      title: "Adaptive Learning",
      description: "Questions are tailored to enhance understanding and retention of complex topics."
    },
    {
      icon: <Zap className="h-8 w-8 text-warning" />,
      title: "Instant Generation",
      description: "Transform any PDF into an interactive quiz within seconds."
    }
  ];

  const benefits = [
    "Improve retention through active recall",
    "Identify knowledge gaps quickly",
    "Make studying more engaging and fun",
    "Perfect for exam preparation",
    "Professional presentation ready"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-background to-surface-elevated">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="mb-8 animate-bounce-subtle">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-hero rounded-full shadow-strong">
              <GraduationCap className="h-10 w-10 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Transform PDFs into
            <br />
            Interactive Quizzes
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Upload any PDF document and let our AI create engaging quizzes that enhance learning and understanding. Perfect for students, educators, and professionals.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              variant="hero" 
              size="xl" 
              onClick={onStartQuiz}
              className="animate-fade-in"
            >
              <Upload className="mr-2 h-5 w-5" />
              Start Creating Quizzes
            </Button>
            <Button 
              variant="outline" 
              size="xl"
              className="animate-fade-in"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-surface-elevated">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Why Choose QuizMaster AI?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our advanced AI technology makes learning more effective and enjoyable
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 bg-card shadow-medium hover:shadow-strong transition-all duration-300 hover:-translate-y-1 border border-card-border">
                <div className="mb-6 flex justify-center">
                  <div className="p-3 bg-gradient-to-br from-surface to-muted-light rounded-full">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center text-card-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-center leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Educational Benefits
            </h2>
            <p className="text-lg text-muted-foreground">
              Proven methods to enhance learning outcomes
            </p>
          </div>
          
          <Card className="p-8 bg-gradient-to-br from-card to-surface shadow-strong border border-card-border">
            <div className="grid sm:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3 animate-slide-up" 
                     style={{animationDelay: `${index * 0.1}s`}}>
                  <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                  <span className="text-card-foreground font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-hero">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of students and educators who are already using QuizMaster AI to enhance their learning experience.
          </p>
          <Button 
            variant="outline" 
            size="xl" 
            onClick={onStartQuiz}
            className="bg-white text-primary hover:bg-white/90 border-white"
          >
            Get Started Now
          </Button>
        </div>
      </section>
    </div>
  );
};
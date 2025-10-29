import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PostBotLogo } from '@/components/icons';
import { Mail, TrendingUp, Shield, MessageCircle, Clock, Bot } from 'lucide-react';
import { ChatBackgroundPattern } from '@/components/chat/chat-background-pattern';
import { AnimatedElement } from '@/components/animated-element';

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1">
        <section className="relative w-full py-20 md:py-32 lg:py-40 bg-gradient-to-r from-red-500 to-orange-500 text-white overflow-hidden">
          <ChatBackgroundPattern className="absolute inset-0 w-full h-full text-white/10" />
          <div className="container mx-auto px-4 md:px-6 text-center relative">
            <AnimatedElement>
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-white/20 rounded-full p-3">
                  <PostBotLogo className="h-12 w-12 text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
                  PostBot
                </h1>
                <p className="max-w-[700px] text-lg md:text-xl text-gray-200">
                  AI Chat Assistant for India Post
                </p>
                <p className="max-w-[600px] text-gray-300 md:text-lg">
                  Get instant, accurate answers about Speed Post, PPF, NSC, Insurance, and all India Post services — anytime, anywhere.
                </p>
                <Link href="/chat">
                  <Button
                    variant="default"
                    size="lg"
                    className="bg-white text-primary hover:bg-gray-100 mt-4 transition-transform duration-200 hover:scale-105 active:scale-95"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Start Chatting
                  </Button>
                </Link>
              </div>
            </AnimatedElement>
          </div>
        </section>

        <section className="relative w-full py-12 md:py-24 lg:py-32 bg-background overflow-hidden">
          <ChatBackgroundPattern className="absolute inset-0 w-full h-full text-gray-200/50" />
          <div className="container mx-auto px-4 md:px-6 relative">
            <AnimatedElement>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    How PostBot Helps You
                  </h2>
                </div>
              </div>
            </AnimatedElement>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-12 mt-12">
              <AnimatedElement delay={100}>
                <Card className="text-center h-full transition-transform duration-200 hover:scale-105 bg-white/80 backdrop-blur-sm">
                  <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                          <Mail className="w-8 h-8 text-primary" />
                      </div>
                    <h3 className="text-xl font-bold">Speed Post Info</h3>
                    <p className="text-muted-foreground">
                      Track shipments, delivery times, charges, and express services
                    </p>
                  </CardContent>
                </Card>
              </AnimatedElement>
              <AnimatedElement delay={200}>
                <Card className="text-center h-full transition-transform duration-200 hover:scale-105 bg-white/80 backdrop-blur-sm">
                  <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                          <TrendingUp className="w-8 h-8 text-primary" />
                      </div>
                    <h3 className="text-xl font-bold">Savings & Investments</h3>
                    <p className="text-muted-foreground">
                      PPF, NSC, savings accounts, interest rates, and tax benefits
                    </p>
                  </CardContent>
                </Card>
              </AnimatedElement>
              <AnimatedElement delay={300}>
                <Card className="text-center h-full transition-transform duration-200 hover:scale-105 bg-white/80 backdrop-blur-sm">
                  <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                          <Shield className="w-8 h-8 text-primary" />
                      </div>
                    <h3 className="text-xl font-bold">Insurance Services</h3>
                    <p className="text-muted-foreground">
                      PLI, RPLI plans, premiums, benefits, and coverage details
                    </p>
                  </CardContent>
                </Card>
              </AnimatedElement>
              <AnimatedElement delay={400}>
                <Card className="text-center h-full transition-transform duration-200 hover:scale-105 bg-white/80 backdrop-blur-sm">
                  <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                          <Clock className="w-8 h-8 text-primary" />
                      </div>
                    <h3 className="text-xl font-bold">24/7 Availability</h3>
                    <p className="text-muted-foreground">
                      Get answers instantly, day or night, without waiting
                    </p>
                  </CardContent>
                </Card>
              </AnimatedElement>
              <AnimatedElement delay={500}>
                <Card className="text-center h-full transition-transform duration-200 hover:scale-105 bg-white/80 backdrop-blur-sm">
                  <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                          <Bot className="w-8 h-8 text-primary" />
                      </div>
                    <h3 className="text-xl font-bold">AI-Powered</h3>
                    <p className="text-muted-foreground">
                      Smart semantic search finds the most relevant answers
                    </p>
                  </CardContent>
                </Card>
              </AnimatedElement>
              <AnimatedElement delay={600}>
                <Card className="text-center h-full transition-transform duration-200 hover:scale-105 bg-white/80 backdrop-blur-sm">
                  <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                          <MessageCircle className="w-8 h-8 text-primary" />
                      </div>
                    <h3 className="text-xl font-bold">Easy to Use</h3>
                    <p className="text-muted-foreground">
                      Simple chat interface, just ask your question naturally
                    </p>
                  </CardContent>
                </Card>
              </AnimatedElement>
            </div>
          </div>
        </section>

        <section className="relative w-full py-12 md:py-24 lg:py-32 bg-gray-50 overflow-hidden">
          <ChatBackgroundPattern className="absolute inset-0 w-full h-full text-gray-200/50" />
          <div className="container mx-auto px-4 md:px-6 text-center relative">
            <AnimatedElement>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Ready to Get Started?
              </h2>
              <p className="max-w-[600px] mx-auto mt-4 text-muted-foreground md:text-xl/relaxed">
                Experience the future of India Post customer service. Fast, accurate, and always available.
              </p>
              <Link href="/chat">
                <Button
                  size="lg"
                  className="mt-6 transition-transform duration-200 hover:scale-105 active:scale-95"
                >
                  Try PostBot Now
                </Button>
              </Link>
            </AnimatedElement>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 PostBot. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

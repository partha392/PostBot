import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PostBotLogo } from '@/components/icons';
import { Mail, TrendingUp, Shield, MessageCircle } from 'lucide-react';

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-20 md:py-32 lg:py-40 bg-gradient-to-r from-red-500 to-orange-500 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
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
              <Link href="/chat" legacyBehavior passHref>
                <Button
                  variant="default"
                  size="lg"
                  className="bg-white text-primary hover:bg-gray-100 mt-4"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Start Chatting
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  How PostBot Helps You
                </h2>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-12 mt-12">
              <Card className="text-center">
                <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
                    <div className="bg-red-100 p-3 rounded-full">
                        <Mail className="w-8 h-8 text-red-600" />
                    </div>
                  <h3 className="text-xl font-bold">Scheme Information</h3>
                  <p className="text-muted-foreground">
                    Get detailed information about all postal savings and insurance schemes.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
                    <div className="bg-red-100 p-3 rounded-full">
                        <TrendingUp className="w-8 h-8 text-red-600" />
                    </div>
                  <h3 className="text-xl font-bold">Interest Rates</h3>
                  <p className="text-muted-foreground">
                    Ask for the latest interest rates for SCSS, MIS, NSC, and more.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
                    <div className="bg-red-100 p-3 rounded-full">
                        <Shield className="w-8 h-8 text-red-600" />
                    </div>
                  <h3 className="text-xl font-bold">Service Details</h3>
                  <p className="text-muted-foreground">
                    Find out about Speed Post, parcel services, and other postal facilities.
                  </p>
                </CardContent>
              </Card>
            </div>
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

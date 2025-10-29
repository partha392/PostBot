import { PostBotLogo } from '@/components/icons';

const AppHeader = () => {
  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto flex items-center gap-3 px-4 py-3">
        <PostBotLogo className="h-8 w-8" />
        <h1 className="text-xl font-bold font-headline tracking-tight">
          PostBot AI Assistant
        </h1>
      </div>
    </header>
  );
};

export default AppHeader;

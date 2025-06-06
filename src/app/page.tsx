import ChristmasTimer from './components/ChristmasTimer';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-red-50 dark:from-green-950 dark:to-red-950">
      <ChristmasTimer />
    </div>
  );
}

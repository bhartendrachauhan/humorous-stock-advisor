import Image from 'next/image';

export default function Header() {
  return (
    <header>
      <Image 
        src="/logo-dave-text.png" 
        alt="Dodgy Dave's Stock Predictions" 
        width={340} 
        height={60} 
        priority
      />
    </header>
  );
}
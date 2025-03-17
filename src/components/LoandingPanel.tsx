import Image from 'next/image';

type LoadingPanelProps = {
  message: string;
};

export default function LoadingPanel({ message }: LoadingPanelProps) {
  return (
    <section className="loading-panel" style={{ display: 'flex' }}>
      <div style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
      }}>
      <Image 
        src="/loader.svg" 
        alt="loading" 
        width={100} 
        height={100} 
      />
      </div>
      <div id="api-message">{message}</div>
    </section>
  );
}
type OutputPanelProps = {
  output: string;
  onReset: () => void;
};

export default function OutputPanel({ output, onReset }: OutputPanelProps) {
  return (
    <section className="output-panel" style={{ display: "flex" }}>
      <h2>Your Report 😜</h2>
      <p>{output}</p>
      <button className="reset-app-btn" onClick={onReset}>
        Start Over
      </button>
    </section>
  );
}

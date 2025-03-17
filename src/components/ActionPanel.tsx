import { useState } from 'react';
import Image from 'next/image';

type ActionPanelProps = {
  tickersArr: string[];
  addTicker: (ticker: string) => boolean;
  fetchStockData: () => void;
};

export default function ActionPanel({ tickersArr, addTicker, fetchStockData }: ActionPanelProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [labelMessage, setLabelMessage] = useState<string>(
    'Add up to 3 stock tickers below to get a super accurate stock predictions report👇'
  );
  const [labelError, setLabelError] = useState<boolean>(false);

  const handleAddTicker = () => {
    const success = addTicker(inputValue);
    if (success) {
      setInputValue('');
      setLabelError(false);
      setLabelMessage('Add up to 3 stock tickers below to get a super accurate stock predictions report👇');
    } else {
      setLabelError(true);
      setLabelMessage('You must add at least one ticker. A ticker is a 3 letter or more code for a stock. E.g TSLA for Tesla.');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTicker();
    }
  };

  return (
    <section className="action-panel">
      <label htmlFor="ticker-input" style={{ color: labelError ? 'red' : 'black' }}>
        {labelMessage}
      </label>
      <div className="form-input-control">
        <input 
          type="text" 
          id="ticker-input" 
          placeholder="MSFT" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="add-ticker-btn" onClick={handleAddTicker}>
          <Image 
            src="/add.svg" 
            className="add-ticker-svg" 
            alt="add" 
            width={14} 
            height={14} 
          />
        </button>
      </div>
      <p className="ticker-choice-display">
        {tickersArr.length > 0 ? 
          tickersArr.map((ticker, index) => (
            <span key={index} className="ticker">{ticker}</span>
          )) : 
          'Your tickers will appear here...'
        }
      </p>
      <button 
        className="generate-report-btn" 
        disabled={tickersArr.length === 0} 
        onClick={fetchStockData}
      >
        Generate Report
      </button>
      <p className="tag-line">Always correct 15% of the time!</p>
    </section>
  );
}
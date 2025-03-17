'use client'

import { useState } from 'react';
import Header from '../components/Header';
import ActionPanel from '../components/ActionPanel';
import LoadingPanel from '../components/LoandingPanel';
import OutputPanel from '../components/OutputPanel';
import Footer from '../components/Footer';
import { getDateRange } from '@/utils/dates';
import { fetchPrediction } from '@/lib/openai';
import { fetchStocks } from '@/lib/polygon';

export default function Home() {
  const [tickersArr, setTickersArr] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiMessage, setApiMessage] = useState<string>('Querying Stocks API...');
  const [reportOutput, setReportOutput] = useState<string>('');
  const [showOutput, setShowOutput] = useState<boolean>(false);

  const addTicker = (ticker: string): boolean => {
    if (ticker.length > 2) {
      setTickersArr([...tickersArr, ticker.toUpperCase()]);
      return true;
    }
    return false;
  };

  const fetchStockData = async (): Promise<void> => {
    setIsLoading(true);

    try {
      const dates = getDateRange(7);
      const stockData = await fetchStocks(tickersArr,dates)

      fetchReport(stockData.join(''));
    } catch (err) {
      setApiMessage('There was an error fetching stock data.');
      console.error('error: ', err);
      setTimeout(() => setIsLoading(false), 2000);
    }
  };

  const resetApp = () => {
    setTickersArr([]);
    setReportOutput('');
    setShowOutput(false);
    setApiMessage('Querying Stocks API...');
  };

  const fetchReport = async (data: string): Promise<void> => {
    try {
      const response = await fetchPrediction(data);

      setReportOutput(response?.choices?.[0]?.message?.content || '');
      setIsLoading(false);
      setShowOutput(true);
    } catch (err) {
      setApiMessage('There was an error generating the report.');
      console.error('error: ', err);
      setTimeout(() => setIsLoading(false), 2000);
    }
  };

  return (
    <>
      <Header />
      <main>
        {!isLoading && !showOutput && (
          <ActionPanel 
            tickersArr={tickersArr} 
            addTicker={addTicker} 
            fetchStockData={fetchStockData} 
          />
        )}
        {isLoading && <LoadingPanel message={apiMessage} />}
        {showOutput && <OutputPanel output={reportOutput} onReset={resetApp}/>}
      </main>
      <Footer />
    </>
  );
}
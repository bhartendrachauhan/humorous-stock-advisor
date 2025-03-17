'use server'

interface DateObj {
  startDate: string;
  endDate: string;
}

export const fetchStocks = async (tickersArr: Array<string>, dates: DateObj)=>{
    const response = await Promise.all(tickersArr.map(async (ticker: string) => {
        const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${dates.startDate}/${dates.endDate}?apiKey=${process.env.POLYGON_API_KEY}`;
        const response = await fetch(url);
        const data = await response.text();
        const status = response.status;

        if (status === 200) {
          return data;
        } else {
          throw new Error('API response error');
        }
      }));
    return response;
}
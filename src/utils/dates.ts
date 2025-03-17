export function getDateRange(n: number): { startDate: string; endDate: string } {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - n);
  
    return {
      startDate: startDate.toISOString().split('T')[0],
      endDate: today.toISOString().split('T')[0]
    };
  }
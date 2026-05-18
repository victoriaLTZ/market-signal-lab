export type MarketDataRow = {
  date: string;

  open?: number | null;
  high?: number | null;
  low?: number | null;
  close: number;
  volume?: number | null;

  RJ?: number | null;
  RSI?: number | null;
  MA20?: number | null;
  MA50?: number | null;
  spread?: number | null;

  trend?: string | null;
  decision?: string | null;

  lookout_buy?: boolean | null;
  lookout_sell?: boolean | null;

  buy_signal?: boolean | null;
  sell_signal?: boolean | null;
};
# Market Signal Lab

Interactive financial market analysis application combining technical indicators, signal generation and interactive visualizations.

Market Signal Lab is a personal portfolio project developed to explore financial market behaviour through **lagging indicators**, while preparing future developments towards **machine learning based leading signals**.

---

## Live Demo

Frontend (Vercel):  
https://market-signal-lab.vercel.app

Backend API (Render):  
https://market-signal-lab.onrender.com

GitHub Repository:  
https://github.com/victoriaLTZ/market-signal-lab

---

## Project Objectives

The objective of this project is to build an interactive market analysis tool allowing users to:

- Search financial assets
- Visualize price evolution
- Compute lagging indicators
- Detect technical market signals
- Explore generated signals through interactive charts and tables
- Prepare future predictive / machine learning approaches

Current version focuses on **technical analysis and lagging indicators**.

Future versions aim to introduce **leading indicators using machine learning models**.

---

## Features

### Market exploration

✅ Asset search via Alpha Vantage API

✅ Historical market data retrieval

✅ Interactive visualization of market evolution

---

### Technical indicators

Implemented indicators:

- MA20 (20-day moving average)
- MA50 (50-day moving average)
- Spread between moving averages
- Returns (RJ)
- RSI
- Trend detection

---

### Signal generation

Implemented signals:

- Golden Cross
- Death Cross
- LOOK OUT BUY
- LOOK OUT SELL
- BUY
- SELL

---

### Visualization layer

Interactive dashboard including:

✅ Plotly interactive charts

✅ Toggleable chart series

✅ Market data table

✅ Indicator explanations / educational tooltips

---

## Architecture

```text
Frontend (Next.js + React + Plotly)
                ↓
REST API
                ↓
Backend (FastAPI)
                ↓
Alpha Vantage API
```

Deployment:

```text
Frontend → Vercel

Backend → Render
```

---

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Plotly.js
- Tailwind CSS

### Backend

- FastAPI
- Python
- Pandas
- Requests

### Deployment

- GitHub
- Render
- Vercel

---

## Implemented Indicators

| Indicator | Description |
|-----------|-------------|
| MA20 | Moving average over 20 trading days |
| MA50 | Moving average over 50 trading days |
| Golden Cross | MA20 crossing above MA50 |
| Death Cross | MA20 crossing below MA50 |
| LOOK OUT BUY | Early bullish observation signal |
| LOOK OUT SELL | Early bearish observation signal |
| BUY | Strategy generated buy signal |
| SELL | Strategy generated sell signal |

---

## Local Installation

Clone repository:

```bash
git clone https://github.com/victoriaLTZ/market-signal-lab.git

cd market-signal-lab
```

---

### Backend

```bash
cd backend

pip install -r requirements.txt

uvicorn main:app --host 0.0.0.0 --port 8000
```

---

### Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend available at:

```text
http://localhost:3000
```

Backend available at:

```text
http://localhost:8000
```

---

## Environment Variables

### Backend

Create:

```text
backend/.env
```

Content:

```env
ALPHA_VANTAGE_API_KEY=YOUR_API_KEY
```

---

### Frontend

Create:

```text
frontend/.env.local
```

Content:

```env
NEXT_PUBLIC_API_URL=https://market-signal-lab.onrender.com
```

---

## ⚠ Known Limitations

Current deployment relies on the free Alpha Vantage plan.

Limitations:

- 25 requests / day
- API rate limits may affect demonstrations

Future improvements may include:

- Local cache
- Demo datasets
- Alternative financial APIs
- Offline mode

---

## Roadmap

Current version:

✅ Lagging indicators platform

Planned developments:

⬜ Machine learning leading indicators

⬜ BUY / SELL prediction engine

⬜ Market anticipation models

⬜ Signal probability estimation

⬜ Strategy comparison & backtesting

⬜ Explainable AI layer

---

## 👤 Author

**VSC**

Data Science • Finance • Business • AI

Portfolio project developed to explore financial analysis, data engineering and future predictive modelling approaches.
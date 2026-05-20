# Market Signal Lab

Interactive financial signal analysis application built with FastAPI and Next.js.

## Goal

This project aims to build a web application allowing users to:

- Search financial assets
- Compute lagging indicators
- Generate BUY / SELL signals
- Visualize indicators on interactive charts
- Explore underlying market data

---

## Stack

### Frontend
- Next.js
- React
- Tailwind CSS
- Plotly

### Backend
- FastAPI
- Python
- Pandas

### Data source
- Alpha Vantage API

---

## Features

Current features:

✅ Stock search  
✅ Lagging indicators computation  
✅ BUY / SELL / LOOK OUT signals  
✅ Interactive charts  
✅ Data table visualization  

Planned:

⬜ Observation around indicators  
⬜ Strategy comparison  
⬜ Backtesting dashboard  
⬜ Portfolio integration

---

## Architecture

Frontend (Next.js)
↓
FastAPI backend
↓
Alpha Vantage API

---

## Run locally

Backend:

```bash
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000

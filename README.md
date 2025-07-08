# Fossapay

A [NestJS](https://nestjs.com/) & [MySql](https://www.mysql.com) TypeScript project for building efficient and scalable server-side applications. This project provides a simple API for generating and managing USDT-to-fiat currency quotes, with admin endpoints for listing and downloading quotes in csv format.

## Features

- **Quote Generation:** Create quotes for converting USDT to NGN or ZAR, including fee calculation.
- **Admin Endpoints:** List and download last 50  quotes as CSV (admin authentication required).
- **Exchange Rate Fetching:** Periodically fetches USDT/NGN and USDT/ZAR rates from CoinGecko.
- **Rate Limiting:** Throttles requests to sensitive endpoints.
- **MySQL Database:** Uses TypeORM for persistence.
- **CSV Export:** Download quotes as CSV via the admin endpoint.
- **Dockerized:** Ready for containerized deployment.

## Project Structure

```
src/
  app.controller.ts         # Main API controller
  app.dto.ts                # DTOs for request validation
  app.module.ts             # Root module
  app.service.ts            # App service (placeholder)
  main.ts                   # Entry point
  exchange-rate/            # Exchange rate fetching logic
  minimalAuth/              # Simple admin auth guard
  quotes/                   # Quotes entity, service, and module
```

## [Live Demo API](https://fossapay.deploy.name.ng/)
```
For the admin route authentication, Set http header

Authorization = 'never-use-in-production'

```

## [Api Docs](https://fossapay.deploy.name.ng/docs) 
```
Also available at /docs in you environment http://localhost:3000/docs

```

### Environment Variables

Copy `.env.template` to `.env` and fill in your configuration:

```bash
cp .env.template .env
```

- `GECKO_RATE_URL` - CoinGecko API URL for rates
- `GECKO_API_KEY` - CoinGecko API key
- `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_USERNAME`, `DATABASE_PASSWORD`, `DATABASE_NAME` - MySQL connection
- `DEMO_ADMIN_CREDENTIAL` - Static admin token for protected endpoints

## Getting Started

### With Docker
Build and run with Docker Compose
#### Prerequisites
- Docker
- .env (refer to [docker-compose.yml](/docker-compose.yml) for database credentials)
#### Run
```
npm run docker
```

### With Node
#### Prerequisites
- Node.js >= 20.x
- npm >= 10.x
- MySQL 8.x (make sure you database is running)
- .env

### Installation

```bash
npm install
```



### Running the Application

#### Development

```bash
npm run start
```

#### Watch Mode

```bash
npm run start:dev
```

#### Production

```bash
npm run build
npm run start:prod
```

#### Docker

Build and run with Docker Compose:

```bash
npm run docker
```

## API Endpoints

### Public

- `POST /api/quote`  
  Create a new quote.  
  **Body:**  
  ```json
  {
    "amountOfUSDT": 100,
    "destinationCountryCode": "NGN"
  }
  ```

### Admin (Authenticated)
**Headers:**  
`Authorization: <DEMO_ADMIN_CREDENTIAL> i.e 'never-use-in-production'`
- `GET /admin/quotes`  
  List all quotes (rate-limited, optionally protected by admin guard).

- `GET /admin/quotes/download`  
  Download all quotes as CSV. 

## License
MIT

---

**Author:** [Sheriff Olowolagba](https://github.com/sh3riff/)  
**Project:** Fossapay
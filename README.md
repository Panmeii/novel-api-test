<div align="center">
  <img src="assets/logo.jpg" alt="Jellee Api" width="300"/>
  
  # Jellee API
  
  Free and open source novel & manga API that provides seamless access to detailed novel and manga information from various sources.

  <div>
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js"/>
    <img src="https://img.shields.io/badge/Cheerio.js-000000?style=for-the-badge" alt="Cheerio"/>
    <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios"/>
  </div>

  <br />
  
  [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FJelLee11%2FJellee-Api)

  [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FJelLee11%2FJellee-Api)

</div>

## Features

- Retrieve novel & manga title, chapters, and chapter contents, images, etc.
- Explore the latest, popular, newest, and completed novel per source
- Dedicated search endpoints for each source for a focused search experience

## Technologies

- **Node.js** - Runtime environment
- **Express** - Web framework
- **Cheerio** - Web scraping library
- **Axios** - HTTP client

## API Endpoints

### Root

- **`GET /`**  
  Returns a welcome message.

### Search Endpoints (by Source)

Search each source independently with the following endpoints:

- **EsNovels Search**

  - **`GET /novel/esnovels/search?query={query}`**
    - Searches for novel titles on EsNovels by query. Optional: Empty `query` resulting to default `Hero`

### esnovels Routes

| Endpoint                               | Description                                    |
| -------------------------------------- | ---------------------------------------------- |
| **`GET /novel/esnovels/info?id={id}`**       | Fetches details of a specific novel by ID.     |
| **`GET /novel/esnovels/latest?page={int}&perPage={int}`** | Retrieves list of latest/newest novels (default page=1&perPage=10). |
| **`GET /novel/esnovels/recommended?page={int}&perPage={int}`**    | Retrieves list of recommended novels (default page=1&perPage=10).        |
| **`GET /novel/esnovels/favourites?page={int}&perPage={int}`**     | Retrieves list of favourites novels (default page=1&perPage=10).     |
| **`GET /novel/esnovels/search?query={query}`**     | Lists of results from query (default = "Hero").     |

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/JelLee11/Jellee-Api.git
   cd Jellee-Api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables in a `.env` file as needed.

4. Run the server:

   ```bash
   npm start || node app.js
   ```

5. The API will be accessible at `http://localhost:5000`.

### Usage

Test the API by visiting endpoints like:

- **`http://localhost:5000/novel/esnovels/info?id={id}`** – Get novel details
- **`http://localhost:5000/novel/esnovels/latest`** – Get novel latest novels
- **`http://localhost:5000/novel/esnovels/search?query={query}`** – Search for novel on esnovels

## Folder Structure

```plaintext
Jellee-Api/
├── src/
│   ├── novel/controllers/          # controllers functions for each route
│   ├── novel/routes/               # API route definitions
│   ├── novel/scraper/             # Web scraping logic for each source
│   └── utils/                # Utility functions
├── assets/                   # Static assets including logo
├── .env                      # Environment variables (gitignored)
├── package.json             # Project dependencies and scripts
├── app.js                # Main server entry point
└── README.md                # Documentation
```

## Contributing

1. Fork the project
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a pull request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Your Name – [warlock071603@gmail.com](mailto:warlock071603@gmail.com)  
Project Link: [https://github.com/JelLee11/Jellee-Api](https://github.com/JelLee11/Jellee-Api)

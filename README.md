<div align="center">
  
  # 🔑 Production-Ready Hash Generator API
  
  [![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2020.0.0-brightgreen.svg?style=for-the-badge&logo=node.js)](https://nodejs.org)
  [![Express.js](https://img.shields.io/badge/express-v5.x-blue.svg?style=for-the-badge&logo=express)](https://expressjs.com)
  [![Docker Ready](https://img.shields.io/badge/docker-ready-cyan.svg?style=for-the-badge&logo=docker)](https://www.docker.com)
  [![License](https://img.shields.io/badge/license-MIT-purple.svg?style=for-the-badge)](https://choosealicense.com/licenses/mit/)

  A secure, lightweight, and high-performance REST API built with Node.js and Express to compute cryptographic hash values from string inputs.

</div>

---

## ⚡ Core Features

- **Built-in Cryptography**: Uses Node's native `crypto` module for high-performance hashing with zero external dependencies.
- **Multiple Algorithms**: Full support for standard hashing algorithms: `md5`, `sha1`, `sha256`, and `sha512`.
- **Robust Input Validation**: Strict validation of the request payload with structured bad-request responses.
- **Security First**: Pre-configured with [Helmet](https://helmetjs.github.io/) for HTTP header security, [CORS](https://github.com/expressjs/cors) enabled, and API rate-limiting rules.
- **Graceful Shutdown**: Active handlers for `uncaughtException` and `unhandledRejection` to release resources and shutdown cleanly.
- **Dockerized**: Multistage build environment utilizing light Alpine Linux layers running under a restricted non-root node user.

---

## 📦 Project Structure

```text
Hash Generator API/
├── src/
│   ├── config/
│   │   └── config.js            # Environment configuration mapping
│   ├── controllers/
│   │   └── hashController.js    # Payload validation and processing controller
│   ├── middlewares/
│   │   ├── errorHandler.js      # Global JSON error response formatter
│   │   └── rateLimiter.js       # IP-based rate limiting config
│   ├── routes/
│   │   └── hashRouter.js        # Express endpoint definitions
│   ├── services/
│   │   └── hashService.js       # Core hashing logic (native crypto)
│   ├── app.js                   # Application middlewares mount
│   └── server.js                # Server entry point and process safety
├── Dockerfile                   # Alpine container runner
├── package.json                 # Project scripts and dependencies
└── README.md                    # Documentation
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v20.0.0 or above)
- npm (v10.0.0 or above)

### Installation & Run

1. **Clone the repository**:
   ```bash
   git clone https://github.com/raduink/hash-generator-api.git
   cd hash-generator-api
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root of the project:
   ```bash
   cp .env.example .env
   ```
   *Modify parameters inside `.env` to match your deployment (e.g., custom rate limits).*

4. **Run Server**:
   - **Development (with hot reload)**:
     ```bash
     npm run dev
     ```
   - **Production**:
     ```bash
     npm start
     ```

---

## 🐳 Docker Deployment

To build and run the API as a containerised service:

```bash
# Build the production image
docker build -t hash-generator-api .

# Run the container mapping port 3000
docker run -p 3000:3000 --env-file .env hash-generator-api
```

---

## 📖 API Documentation

### 1. Health Status
Verify the system status and latency.

* **Endpoint**: `GET /health`
* **Response Status**: `200 OK`
* **Response Body**:
  ```json
  {
    "success": true,
    "status": "OK",
    "timestamp": "2026-06-27T00:30:00.000Z"
  }
  ```

---

### 2. Generate Hash
Computes a cryptographic hash value for a given input text.

* **Endpoint**: `POST /hash`
* **Request Body**:
  | Field | Type | Required | Description |
  | :--- | :--- | :--- | :--- |
  | `text` | `String` | Yes | The plain text to hash |
  | `algorithm` | `String` | Yes | Hashing algorithm. Options: `md5`, `sha1`, `sha256`, `sha512` |

* **Example Request**:
  ```bash
  curl -i -X POST -H "Content-Type: application/json" \
    -d '{"text": "hello", "algorithm": "sha256"}' \
    http://localhost:3000/hash
  ```
  **Response Status**: `200 OK`
  **Response Body**:
  ```json
  {
    "text": "hello",
    "algorithm": "sha256",
    "hash": "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
  }
  ```

* **Example Request (Missing Text field)**:
  ```bash
  curl -i -X POST -H "Content-Type: application/json" \
    -d '{"algorithm": "sha256"}' \
    http://localhost:3000/hash
  ```
  **Response Status**: `400 Bad Request`
  **Response Body**:
  ```json
  {
    "success": false,
    "error": {
      "status": 400,
      "message": "Field \"text\" is required."
    }
  }
  ```

* **Example Request (Unsupported Algorithm validation)**:
  ```bash
  curl -i -X POST -H "Content-Type: application/json" \
    -d '{"text": "hello", "algorithm": "sha224"}' \
    http://localhost:3000/hash
  ```
  **Response Status**: `400 Bad Request`
  **Response Body**:
  ```json
  {
    "success": false,
    "error": {
      "status": 400,
      "message": "Field \"algorithm\" must be one of: md5, sha1, sha256, sha512."
    }
  }
  ```

---

## 🔒 Security Configuration

- **Helmet**: Enforces core HTTP security headers:
  - Disables the `X-Powered-By` header to prevent server banner disclosure.
  - Applies Strict-Transport-Security, X-Content-Type-Options, and X-Frame-Options.
- **CORS**: Configured globally with standard defaults (allows all origins; can be adjusted in `src/app.js` for strict environments).
- **Rate Limiter**: Configurable via `.env`. Standard configuration limits each IP to a maximum of `100` requests per `15 minutes` window.

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more details.

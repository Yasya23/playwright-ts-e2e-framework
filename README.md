# Practice Software Testing — E2E Test Suite

Playwright end-to-end test suite for [practicesoftwaretesting.com](https://practicesoftwaretesting.com), covering favorites and product-page flows via UI and API.

---

## Project Structure

```text
├── .github/workflows/   # GitHub Actions CI workflow (playwright.yml)
├── src/
│   ├── components/      # Reusable UI components (Header, Toast)
│   ├── config/          # Environment configuration loader
│   ├── constants/       # API routes, error messages, app routes
│   ├── data/            # Static and dynamic test data generators
│   ├── fixtures/        # Custom Playwright fixtures (auth, POMs, APIs)
│   ├── pages/           # Page Object Models (Login, Register, Product, Favorites)
│   ├── types/           # TypeScript interfaces and types
│   └── utils/           # API handlers (Base, Auth, Products, Favorites) & credential generators
├── tests/
│   ├── e2e/             # End-to-end test specs (auth, favorites, product)
│   │   ├── auth/        # Auth test specs
│   │   ├── favorites/   # Favorites test specs
│   │   └── product/     # Product test specs
│   └── global.setup.ts  # Pre-execution global setup (dynamic user registration)
├── .env
├── .env-template.md     # Template for environment configuration
├── .gitignore
├── BDD_scenarios.md     # Documented BDD test scenarios
├── package-lock.json
├── package.json
├── playwright.config.ts # Core Playwright test configuration (retries, workers, browsers)
└── tsconfig.json        # TypeScript configuration with path aliases (@/*)
```

## Local Installation & Execution

1. Clone the repository and enter the directory:

```bash
git clone <repository-url>
```

2. Install dependencies:

```bash
npm install
```

3. Install Playwright browser binaries:

```bash
npx playwright install --with-deps
```

4. Set up the environment variables:

```bash
cp .env-template.md .env
```

5. Run the test suite:

### Run all tests in headless mode (Chromium, Firefox, Safari)

```bash
npm run test
```

### Run tests for specific browsers

```bash
npm run test:chrome
npm run test:firefox
npm run test:safari
```

### Execution with UI & Debugging

```bash
npm run test:ui
npm run test:headed

```

### Type checking & Reports

```bash
npm run test:type-check
npm run test:report
```

---

## Test Execution Features

- **Parallelism:** `workers: 2` — up to 2 tests run concurrently.
- **Retries:** Configured adaptively based on environment:
  - **Local Environment:** `retries: 2` (3 attempts total: 1 initial run + 2 retries)
  - **CI Environment (`process.env.CI`):** `retries: 1` (2 attempts total: 1 initial run + 1 retry)

Both settings are defined in `playwright.config.ts` (`retries: process.env.CI ? 1 : 2`).

---

## Test Accounts & State Management

The framework uses a **dynamic account provisioning strategy** to guarantee complete test isolation:

1. **Default Template Credentials:** Static fallback credentials (`USER_EMAIL_<n>` / `USER_PASSWORD_<n>`) are defined in `.env` for baseline local configuration.
2. **Dynamic Runtime Overwrite:** During execution, `global.setup.ts` registers **fresh, isolated accounts** via API before tests start. Each account receives unique random data via `createRegisterApiData()`, dynamically overwriting `process.env.USER_EMAIL_<n>` and `process.env.USER_PASSWORD_<n>` in memory.
3. **Parallel Worker Allocation:** Each Playwright worker automatically claims a dedicated account based on `testInfo.parallelIndex` (e.g., Worker 0 uses Account 1, Worker 1 uses Account 2). This prevents data race conditions during parallel execution.
4. **Fast Auth Injection:** The `authenticatedPage` fixture retrieves the JWT token via API and injects it directly into browser `localStorage`, bypassing slow UI login forms.

> **Worker Allocation Rule:**
> `REGISTERED_USERS_COUNT` must be $\ge$ `workers` in `playwright.config.ts`. If workers exceed account count, a fallback warning is logged and accounts will be shared.

---

## Fixtures Overview

## Fixtures Overview

| Fixture                                                     | Scope  | Purpose                                                                                    |
| :---------------------------------------------------------- | :----- | :----------------------------------------------------------------------------------------- |
| `loginPage`, `registerPage`, `productPage`, `favoritesPage` | test   | Page Object Model instances (`productPage` includes automatic post-test favorites cleanup) |
| `authApi`, `favoritesApi`, `productsApi`                    | test   | API clients for direct network actions                                                     |
| `workerAuthToken`                                           | worker | Obtains JWT token for the account assigned to current worker via `TEST_USERS_POOL`         |
| `authToken`                                                 | test   | Exposes `workerAuthToken` to individual test cases                                         |
| `authenticatedPage`                                         | test   | `page` instance with JWT token injected into `localStorage` via `addInitScript`            |
| `testProductData`                                           | test   | Fetches products from live catalog via `ProductsApi` and returns the first item            |
| `addedFavoriteProductViaApi`                                | test   | Pre-adds a product to favorites via API and returns created favorite data                  |
| `cleanupAddedFavoriteAfterTest`                             | test   | Post-test teardown fixture that removes the specific added product from favorites via API  |

---

## Known Limitations

- **Parallel Worker Capacity:** Parallel execution is capped by `REGISTERED_USERS_COUNT`. If you increase `workers` in `playwright.config.ts`, you must increase `REGISTERED_USERS_COUNT` accordingly to ensure each worker gets a unique user account.
- **Dynamic Catalog Dependency:** `testProductData` currently fetches the first available item (`products[0]`) from the live catalog. If catalog ordering changes or items go out of stock, consider filtering products by specific traits (e.g., in-stock status or specific category) rather than relying on array index order.

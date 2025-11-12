# Saucedemo (Swag Labs) — Login Test Plan

## Executive Summary

This test plan covers the login functionality for the Saucedemo (Swag Labs) application at `https://www.saucedemo.com/`. It provides a set of manual and automation-friendly test scenarios that validate correct behavior for valid and invalid credentials, edge cases, error handling, performance, accessibility, and session behavior. The goal is to ensure authentication works reliably for all documented user types and handles failure cases gracefully.

## Application / Page Overview

- Page title: "Swag Labs"
- Primary interactive elements:
  - Username textbox (placeholder: "Username")
  - Password textbox (placeholder: "Password")
  - Login button
- Documented test credentials (from page):
  - `standard_user` — password: `secret_sauce`
  - `locked_out_user` — password: `secret_sauce`
  - `problem_user` — password: `secret_sauce`
  - `performance_glitch_user` — password: `secret_sauce`
  - `error_user` — password: `secret_sauce`
  - `visual_user` — password: `secret_sauce`

## Assumptions

- Tests start from a fresh browser session (no cached auth/session) unless a scenario states otherwise.
- Application is reachable at `https://www.saucedemo.com/`.
- All users share the same known password: `secret_sauce`.
- The UI elements use semantic inputs/buttons accessible via standard selectors.

## Test Environments

- Browsers: Chromium, Firefox, WebKit (cross-browser automation recommended)
- Viewports: Desktop default (1280x720); test a mobile viewport for responsive behavior when relevant
- Network: Normal, Slow 3G (for performance glitch scenarios)
- Authentication persistence: SessionStorage/LocalStorage cleared between scenarios

## Pass / Fail Criteria

- Pass: Actual behavior matches the expected outcome for the scenario.
- Fail: Any deviation from expected results, UI crash, unhandled exceptions, or security exposure.

## Automation Notes

- Primary selectors: `input[name="user-name"]` (username), `input[name="password"]` (password), `button[type="submit"]` or button with text `Login`.
- After successful login, assert navigation to inventory/products page (`/inventory.html`) and presence of product list elements.
- Use explicit waits for stability: wait for navigation, selectors, or API responses.

---

## Test Scenarios

### 1. Happy Path — Valid Login (standard_user)

**Starting state:** Blank session, login page loaded.

**Steps:**
1. Enter username `standard_user` into the username field.
2. Enter password `secret_sauce` into the password field.
3. Click the `Login` button or press Enter.

**Expected results:**
- User is navigated to the inventory/products page (`/inventory.html`).
- Product list is visible and populated.
- No error message is shown.

**Success criteria:** User can interact with product listings.

**Failure conditions:** Login fails, error message appears, or page remains on login.

---

### 2. Locked Out User

**Starting state:** Blank session, login page loaded.

**Steps:**
1. Enter username `locked_out_user` and password `secret_sauce`.
2. Click `Login`.

**Expected results:**
- Login is rejected and a visible error message displays (e.g., "Sorry, this user has been locked out.").
- No navigation to the inventory page.

**Success criteria:** Appropriate, descriptive error message shown.

**Failure conditions:** Silent failure or navigation to inventory.

---

### 3. Problematic UI User (problem_user)

**Starting state:** Blank session.

**Steps:**
1. Login with `problem_user` / `secret_sauce`.

**Expected results:**
- User may successfully authenticate, but UI issues may appear (images missing/incorrect). Document visual differences.

**Success criteria:** Authentication works (if intended), and QA records visual defects.

**Failure conditions:** App crash or functional regression beyond visual defects.

---

### 4. Performance Glitch User (performance_glitch_user)

**Starting state:** Blank session, optionally throttle network to slow conditions.

**Steps:**
1. Login with `performance_glitch_user` / `secret_sauce`.

**Expected results:**
- Login may succeed but with noticeable delay. App remains responsive; no data loss.

**Success criteria:** Application recovers; no timeout or unhandled errors.

**Failure conditions:** Timeout, infinite spinner, or crash.

---

### 5. Error User (error_user)

**Starting state:** Blank session.

**Steps:**
1. Login with `error_user` / `secret_sauce`.

**Expected results:**
- The app surfaces a controlled error (if applicable) or login fails with a clear message.

**Success criteria:** Error handling is graceful and actionable.

---

### 6. Invalid Credentials

**Starting state:** Blank session.

**Steps:**
1. Enter `invalid_user` / `wrong_password`.
2. Click `Login`.

**Expected results:**
- Login rejected; generic authentication error displayed (no sensitive info revealed).

**Security check:** Ensure response does not leak stack traces or sensitive data.

---

### 7. Empty Fields Validation

**Starting state:** Blank session.

**Steps:**
1. Click `Login` with both fields empty.
2. Repeat with username empty and password filled, and vice versa.

**Expected results:**
- Validation errors shown for required fields; login not attempted.

**Failure conditions:** Form submits with empty input or shows unclear messages.

---

### 8. Input Edge Cases

**Starting state:** Blank session.

**Steps:**
1. Enter extremely long strings (> 1024 chars) in username/password.
2. Enter whitespace-only values.
3. Enter special characters and Unicode.

**Expected results:**
- Input is either accepted (and fails authentication) or properly truncated/validated; no XSS or crash.

**Security check:** Ensure inputs are correctly escaped and server returns safe messages.

---

### 9. Injection & Security Checks

**Starting state:** Blank session.

**Steps:**
1. Attempt SQL injection strings like `' OR '1'='1` in username/password.
2. Attempt script tags `<script>alert(1)</script>`.

**Expected results:**
- Authentication not bypassed; no script execution; app returns safe errors.

**Failure conditions:** Authentication bypassed or reflected XSS.

---

### 10. Session & Logout Behavior

**Starting state:** Authenticated as `standard_user`.

**Steps:**
1. Log in successfully.
2. Click any logout control (if available) or clear session.
3. Use browser back button to return to inventory page.

**Expected results:**
- Logout returns to login screen and prevents access to inventory without re-authentication.
- Back button does not restore an authenticated session.

---

### 11. Accessibility Checks

**Starting state:** Blank session.

**Steps:**
1. Verify username and password fields have accessible names and placeholders.
2. Tab through form elements; ensure logical focus order.
3. Check color contrast for any error messages.

**Expected results:**
- Form is keyboard navigable; screen readers announce labels; contrast meets WCAG 2.1 AA.

---

## Reporting & Documentation

- For each failing test, capture:
  - Steps to reproduce
  - Screenshots and console/log output
  - Browser, OS, and network conditions
- Tag bugs with scenario name and include test data used.

## Recommended Next Steps

- Convert high-priority scenarios (Happy Path, Locked Out, Invalid Credentials, Empty Fields) into Playwright automated tests.
- Add CI job to run login tests across Chromium/Firefox/WebKit on each PR.


---

*File created at `tests/login-saucelabs-test-plan.md`. Generated based on the Saucedemo login page snapshot.*

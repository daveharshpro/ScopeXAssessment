# ScopeXAssessment

# Scopex Money Testing

## Overview
This repository contains the manual and automation testing artifacts for the Scopex Money mobile application. The testing includes user registration, adding a recipient, and logout functionalities.

## Repository Link
[ScopeXAssessment Repository](https://github.com/daveharshpro/ScopeXAssessment)

## Test Approach
### Manual Testing
A detailed manual test plan and approach have been documented, covering:
- Test scenarios for user registration, adding a recipient, and logout.
- Test data requirements and preconditions.
- Expected outcomes for each scenario.
- Test environment specifications.
- Assumptions, risks, and constraints.

**Reference Documents:**
- [Manual Test Plan & Approach](https://docs.google.com/document/d/1GTXqGl8JW0iASlygFSOPIxKNaC1Kb_aPMVIinubrU8c/edit?pli=1&tab=t.0#heading=h.iv9xf9va18rp)
- [Test Scenarios & Bug Report](https://docs.google.com/spreadsheets/d/1QwOWjLvFnuzaDTusTAKxsStUdYlYRh2jQrNkjYV-9ds/edit?pli=1&gid=0#gid=0)

**Disclaimer:** Since I was asked to conduct exploratory testing, I have mentioned a limited number of bugs in the bug sheet. I found more bugs, but due to time constraints, I have not documented them.

### Automation Testing
Automation is implemented using **JavaScript and TypeScript** with Playwright. The automation covers:
- Login with a registered user.
- Adding a recipient.
- Logout.

#### Automation Requirements
- Set up environment variables using a `.env` file for secure credentials management.

**Disclaimer:** I could have written more test cases for validations and API testing, but I have included one example of each to showcase the approach. Otherwise, I have written test cases as per the requirements.

## Bug Finding & Reporting
Exploratory testing is conducted to identify issues and bugs on both the Scopex Money website and mobile application.

### Bug Report Format
| Field | Description |
|--------|------------|
| **Bug ID** | Unique identifier |
| **Title** | Brief description of the issue |
| **Environment** | Device, OS, Browser, App version, etc. |
| **Steps to Reproduce** | Detailed reproduction steps |
| **Expected Result** | Expected outcome |
| **Actual Result** | Observed behavior |
| **Screenshots/Videos** | Supporting evidence |
| **Severity** | Critical, High, Medium, Low |
| **Additional Notes** | Any extra information |

## Repository Structure
```
/scopeXAssessment
  ├── tests/       # Contains test scripts
      ├── scopeX.spec.js  # Playwright automation tests
  ├── playwright.config.js # Playwright configuration
  ├── .env         # Environment variables
  ├── package.json
  ├── package-lock.json
  ├── .gitignore
  ├── manual-testing/
      ├── test_plan.doc  # Manual test plan
      ├── bug_report.xlsx  # Bug sheet
  ├── .github/workflows/  # CI/CD pipeline
  ├── README.md           # Main repository README
```

## Getting Started
### Prerequisites
- Node.js installed
- Playwright installed
- GitHub repository access

### Installation
```sh
git clone https://github.com/daveharshpro/ScopeXAssessment.git
cd ScopeXAssessment
npm install
```

### Environment Setup
Create a `.env` file in the root directory and configure the following environment variables:

| Variable | Description |
|------------|-------------|
| **BASE_URL** | The base URL of the Scopex Money platform |
| **EMAIL_USERNAME** | The email ID used for logging into the application |
| **PASSWORD** | The corresponding password for login |
| **RECIPIENTS_ACCOUNT_NUMBER** | The account number for the recipient being added |
| **RECIPIENTS_IFSC_NUMBER** | The IFSC code of the recipient’s bank |

### Running Automation Tests
```sh
npx playwright test
```

## Contributors
- [Your Name]

## License
This project is for internal testing purposes only.


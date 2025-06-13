# Qlik Extension: Renewal vs New Opportunity Comparison

A dynamic, reusable Qlik Sense extension for visually comparing **Renewal** and **New Opportunity** data, including custom confidence scoring.

---

## Features

- **Flexible field selection:** Pick any number of dimensions or measures for each column (“Renewal” and “New Opportunity”) via the property panel.
- **Custom labels:** Easily set section and field headers.
- **Dynamic confidence score:** Select a field or expression as the confidence metric.
- **Beautiful comparison layout:** Clean, side-by-side cards or columns styled for business users.
- **Reusable:** Works with any Qlik app—no hardcoded fields.

---

## How to Use

1. **Install and deploy** the extension to your Qlik Sense SaaS tenant.
2. In your Qlik sheet, drag the extension in from “Custom Objects”.
3. Use the property panel to:
    - Select Renewal and New Opp fields (dimensions/measures)
    - Set labels for sections and fields
    - Choose the confidence field or expression
4. The extension renders a dynamic side-by-side comparison of your chosen fields, with confidence scoring front and center.

---

## Development

### Prerequisites

- Node.js v18+ and npm
- Access to a Qlik Cloud tenant

### Getting Started

```bash
git clone https://github.com/izu93/qlik-extension-comparison.git
cd qlik-extension-comparison
npm install
npm start

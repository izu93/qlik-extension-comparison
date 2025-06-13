import { useElement, useLayout, useEffect } from "@nebula.js/stardust";
import properties from "./object-properties";
import data from "./data";
import ext from "./ext";

export default function supernova(galaxy) {
  return {
    qae: { properties, data },
    ext: ext(galaxy),
    component() {
      const element = useElement();
      const layout = useLayout();

      useEffect(() => {
        // Inject styles only once
        if (!document.getElementById("comparison-styles")) {
          const style = document.createElement("style");
          style.id = "comparison-styles";
          style.textContent = `
            .comparison-container {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              background: #f5f5f5;
              padding: 20px;
              height: 100%;
              box-sizing: border-box;
            }
            .comparison-header {
              text-align: center;
              margin-bottom: 30px;
              background: linear-gradient(135deg, #6366f1, #8b5cf6);
              color: white;
              padding: 20px;
              border-radius: 12px;
            }
            .main-title {
              font-size: 2.5rem;
              font-weight: bold;
              margin: 0 0 10px 0;
            }
            .subtitle {
              font-size: 1.2rem;
              font-weight: normal;
              margin: 0 0 20px 0;
              opacity: 0.9;
            }
            .comparison-content {
              display: flex;
              align-items: center;
              gap: 30px;
              margin-bottom: 40px;
              justify-content: center;
            }
            .opportunity-panel {
              flex: 1;
              max-width: 400px;
              background: white;
              border-radius: 12px;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
              overflow: hidden;
            }
            .panel-header {
              padding: 20px;
              font-weight: bold;
              color: white;
              text-align: center;
            }
            .renewal-header {
              background: #ef4444;
            }
            .new-opp-header {
              background: #22c55e;
            }
            .panel-header h3 {
              margin: 0;
              font-size: 1.3rem;
            }
            .panel-content {
              padding: 20px;
              min-height: 200px;
            }
            .data-field {
              margin-bottom: 15px;
              padding-bottom: 15px;
              border-bottom: 1px solid #e5e7eb;
            }
            .data-field:last-child {
              border-bottom: none;
              margin-bottom: 0;
              padding-bottom: 0;
            }
            .field-label {
              font-size: 0.9rem;
              color: #6b7280;
              font-weight: 500;
              margin-bottom: 5px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .field-value {
              font-size: 1.1rem;
              font-weight: 600;
              color: #1f2937;
            }
            .measure-field .field-value {
              font-size: 1.3rem;
              color: #059669;
            }
            .positive-value {
              color: #22c55e !important;
            }
            .match-indicator {
              padding: 12px 20px;
              text-align: center;
              font-weight: 600;
              font-size: 0.9rem;
              color: #7c2d12;
            }
            .renewal-match {
              background: #fed7aa;
            }
            .new-opp-match {
              background: #fef3c7;
            }
            .confidence-section {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 15px;
              flex-shrink: 0;
            }
            .confidence-arrow {
              font-size: 2rem;
              color: #6b7280;
              font-weight: bold;
            }
            .confidence-badge {
              background: #22c55e;
              color: white;
              padding: 15px 20px;
              border-radius: 50px;
              text-align: center;
              min-width: 120px;
            }
            .confidence-label {
              font-size: 0.9rem;
              font-weight: 500;
              margin-bottom: 5px;
            }
            .confidence-score {
              font-size: 1.5rem;
              font-weight: bold;
            }
            .scoring-section {
              background: white;
              border-radius: 12px;
              padding: 20px;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }
            .scores-container {
              display: flex;
              justify-content: space-around;
              align-items: end;
              gap: 20px;
            }
            .score-item {
              text-align: center;
              flex: 1;
            }
            .score-value {
              font-size: 2rem;
              font-weight: bold;
              color: #1f2937;
              margin-bottom: 10px;
            }
            .score-label {
              font-size: 0.9rem;
              color: #6b7280;
              font-weight: 500;
            }
            .no-data-message {
              text-align: center;
              padding: 40px;
              color: #6b7280;
              font-size: 1.1rem;
              background: white;
              border-radius: 12px;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }
            @media (max-width: 1024px) {
              .comparison-content {
                flex-direction: column;
                gap: 20px;
              }
              .opportunity-panel {
                max-width: 100%;
                width: 100%;
              }
              .confidence-arrow {
                transform: rotate(90deg);
              }
              .scores-container {
                flex-wrap: wrap;
                gap: 15px;
              }
              .score-item {
                min-width: 120px;
              }
            }
          `;
          document.head.appendChild(style);
        }

        // Pull panel fields & labels from property panel
        const renewalFields = Array.from({ length: 10 }, (_, i) => ({
          key: layout[`renewalField${i + 1}`],
          label:
            layout[`renewalFieldLabel${i + 1}`] ||
            layout[`renewalField${i + 1}`],
        })).filter((f) => f.key);
        const newFields = Array.from({ length: 10 }, (_, i) => ({
          key: layout[`newField${i + 1}`],
          label: layout[`newFieldLabel${i + 1}`] || layout[`newField${i + 1}`],
        })).filter((f) => f.key);

        // Get hypercube data safely
        const qData = layout.qHyperCube;
        const dataPages = qData ? qData.qDataPages || [] : [];
        const firstRow = dataPages[0]?.qMatrix?.[0] || [];

        // Utility to get value from row by field name (dims + meas)
        function getFieldValue(fieldName, row, layout) {
          if (!layout.qHyperCube) return "-";
          const dimIndex = layout.qHyperCube.qDimensionInfo.findIndex(
            (d) => d.qFallbackTitle === fieldName
          );
          if (dimIndex !== -1) return row[dimIndex]?.qText ?? "-";
          const measIndex = layout.qHyperCube.qMeasureInfo.findIndex(
            (m) => m.qFallbackTitle === fieldName
          );
          if (measIndex !== -1)
            return (
              row[layout.qHyperCube.qDimensionInfo.length + measIndex]?.qText ??
              "-"
            );
          return "-";
        }

        // Render panel field data
        let renewalData = renewalFields
          .map(
            (f) => `
          <div class="data-field">
            <div class="field-label">${f.label}</div>
            <div class="field-value">${getFieldValue(
              f.key,
              firstRow,
              layout
            )}</div>
          </div>
        `
          )
          .join("");

        let newOppData = newFields
          .map(
            (f) => `
          <div class="data-field">
            <div class="field-label">${f.label}</div>
            <div class="field-value">${getFieldValue(
              f.key,
              firstRow,
              layout
            )}</div>
          </div>
        `
          )
          .join("");

        // Show error if no fields mapped
        if (renewalFields.length === 0 && newFields.length === 0) {
          element.innerHTML = `
            <div class="comparison-container">
              <div class="comparison-header">
                <h1 class="main-title">${
                  layout.title || "False Churn Analysis"
                }</h1>
                <h2 class="subtitle">${
                  layout.subtitle || "Renewal vs New Opportunity Comparison"
                }</h2>
              </div>
              <div class="no-data-message">
                <h3>Please map fields for both Renewal and New panels in property panel.</h3>
              </div>
            </div>
          `;
          return;
        }
        // Show error if no data
        if (!qData || dataPages.length === 0 || !firstRow.length) {
          element.innerHTML = `
            <div class="comparison-container">
              <div class="comparison-header">
                <h1 class="main-title">${
                  layout.title || "False Churn Analysis"
                }</h1>
                <h2 class="subtitle">${
                  layout.subtitle || "Renewal vs New Opportunity Comparison"
                }</h2>
              </div>
              <div class="no-data-message">
                <h3>No Data Found</h3>
                <p>Add dimensions/measures and ensure app data is loaded.</p>
              </div>
            </div>
          `;
          return;
        }

        // Main render
        element.innerHTML = `
          <div class="comparison-container">
            <div class="comparison-header">
              <h1 class="main-title">${
                layout.title || "False Churn Analysis"
              }</h1>
              <h2 class="subtitle">${
                layout.subtitle || "Renewal vs New Opportunity Comparison"
              }</h2>
            </div>
            <div class="comparison-content">
              <div class="opportunity-panel renewal-panel">
                <div class="panel-header renewal-header">
                  <h3>${layout.renewalHeader || "Renewal Opportunity"}</h3>
                </div>
                <div class="panel-content">
                  ${renewalData}
                </div>
                <div class="match-indicator renewal-match">
                  Different Account Match
                </div>
              </div>
              ${
                layout.showConfidence !== false
                  ? `<div class="confidence-section">
                      <div class="confidence-arrow">→</div>
                      <div class="confidence-badge">
                        <div class="confidence-label">High Confidence</div>
                        <div class="confidence-score">${
                          layout.confidenceScore || 87
                        }%</div>
                      </div>
                    </div>`
                  : '<div class="confidence-arrow">→</div>'
              }
              <div class="opportunity-panel new-opp-panel">
                <div class="panel-header new-opp-header">
                  <h3>${layout.newOppHeader || "New Opportunity"}</h3>
                </div>
                <div class="panel-content">
                  ${newOppData}
                </div>
                <div class="match-indicator new-opp-match">
                  Global Ultimate Entity Match
                </div>
              </div>
            </div>
            <div class="scoring-section">
              <div class="scores-container">
                <div class="score-item">
                  <div class="score-value">0.8</div>
                  <div class="score-label">Timing Score</div>
                </div>
                <div class="score-item">
                  <div class="score-value">0.9</div>
                  <div class="score-label">Value Score</div>
                </div>
                <div class="score-item">
                  <div class="score-value">0.6</div>
                  <div class="score-label">Product Score</div>
                </div>
                <div class="score-item">
                  <div class="score-value">1.0</div>
                  <div class="score-label">Structure Score</div>
                </div>
              </div>
            </div>
          </div>
        `;
      }, [element, layout]);
    },
  };
}

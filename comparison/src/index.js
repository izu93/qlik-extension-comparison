import { useElement, useLayout } from "@nebula.js/stardust";

export default function supernova() {
  return {
    qae: {
      properties: {
        type: "items",
        component: "accordion",
        items: {
          dimensions: {
            uses: "dimensions",
            min: 0,
            max: 10,
          },
          measures: {
            uses: "measures",
            min: 0,
            max: 10,
          },
          settings: {
            uses: "settings",
            items: {
              generalSection: {
                label: "General Settings",
                type: "items",
                items: {
                  title: {
                    ref: "title",
                    label: "Title",
                    type: "string",
                    defaultValue: "False Churn Analysis",
                  },
                  subtitle: {
                    ref: "subtitle",
                    label: "Subtitle",
                    type: "string",
                    defaultValue: "Renewal vs New Opportunity Comparison",
                  },
                  accountName: {
                    ref: "accountName",
                    label: "Account Name",
                    type: "string",
                    defaultValue: "TechCorp Global Industries",
                  },
                },
              },
              renewalSection: {
                label: "Renewal Settings",
                type: "items",
                items: {
                  renewalHeader: {
                    ref: "renewalHeader",
                    label: "Renewal Header",
                    type: "string",
                    defaultValue: "Renewal Opportunity",
                  },
                },
              },
              newOppSection: {
                label: "New Opportunity Settings",
                type: "items",
                items: {
                  newOppHeader: {
                    ref: "newOppHeader",
                    label: "New Opportunity Header",
                    type: "string",
                    defaultValue: "New Opportunity",
                  },
                },
              },
              confidenceSection: {
                label: "Confidence Settings",
                type: "items",
                items: {
                  showConfidence: {
                    ref: "showConfidence",
                    label: "Show Confidence Score",
                    type: "boolean",
                    defaultValue: true,
                  },
                  confidenceScore: {
                    ref: "confidenceScore",
                    label: "Confidence Score (%)",
                    type: "number",
                    defaultValue: 87,
                    min: 0,
                    max: 100,
                  },
                },
              },
            },
          },
        },
      },
    },
    component() {
      const element = useElement();
      const layout = useLayout();

      // Add styles
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
          .account-selector {
            font-size: 1rem;
            background: rgba(255, 255, 255, 0.1);
            padding: 10px 20px;
            border-radius: 8px;
            display: inline-block;
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

      console.log("Layout:", layout);

      // Get properties with defaults
      const title = layout.title || "False Churn Analysis";
      const subtitle =
        layout.subtitle || "Renewal vs New Opportunity Comparison";
      const accountName = layout.accountName || "TechCorp Global Industries";
      const renewalHeader = layout.renewalHeader || "Renewal Opportunity";
      const newOppHeader = layout.newOppHeader || "New Opportunity";
      const showConfidence = layout.showConfidence !== false;
      const confidenceScore = layout.confidenceScore || 87;

      // Safe hypercube access
      const qData = layout.qHyperCube;
      const dimensions = qData ? qData.qDimensionInfo || [] : [];
      const measures = qData ? qData.qMeasureInfo || [] : [];
      const dataPages = qData ? qData.qDataPages || [] : [];

      // Check if we have data
      if (
        !qData ||
        dimensions.length === 0 ||
        dataPages.length === 0 ||
        !dataPages[0].qMatrix ||
        dataPages[0].qMatrix.length === 0
      ) {
        element.innerHTML = `
          <div class="comparison-container">
            <div class="comparison-header">
              <h1 class="main-title">${title}</h1>
              <h2 class="subtitle">${subtitle}</h2>
            </div>
            <div class="no-data-message">
              <h3>Ready to Compare!</h3>
              <p>Add dimensions and measures in the property panel to see the comparison visualization.</p>
              <p><strong>Current Status:</strong></p>
              <p>Dimensions: ${dimensions.length} | Measures: ${measures.length}</p>
            </div>
          </div>
        `;
        return;
      }

      // Process the data
      const matrix = dataPages[0].qMatrix;
      const firstRow = matrix[0];

      // Build data for both panels
      let renewalData = "";
      let newOppData = "";

      // Process dimensions
      dimensions.forEach((dim, index) => {
        const value = firstRow[index] ? firstRow[index].qText : "N/A";
        renewalData += `
          <div class="data-field">
            <div class="field-label">${dim.qFallbackTitle}</div>
            <div class="field-value">${value}</div>
          </div>
        `;
        // For demo, show similar data in new opp (you can modify this logic)
        newOppData += `
          <div class="data-field">
            <div class="field-label">${dim.qFallbackTitle}</div>
            <div class="field-value">${value}</div>
          </div>
        `;
      });

      // Process measures
      measures.forEach((measure, index) => {
        const measureIndex = dimensions.length + index;
        const value = firstRow[measureIndex]
          ? firstRow[measureIndex].qText
          : "N/A";
        renewalData += `
          <div class="data-field measure-field">
            <div class="field-label">${measure.qFallbackTitle}</div>
            <div class="field-value">${value}</div>
          </div>
        `;
        newOppData += `
          <div class="data-field measure-field">
            <div class="field-label">${measure.qFallbackTitle}</div>
            <div class="field-value positive-value">${value}</div>
          </div>
        `;
      });

      // Render the full comparison view
      element.innerHTML = `
        <div class="comparison-container">
          <div class="comparison-header">
            <h1 class="main-title">${title}</h1>
            <h2 class="subtitle">${subtitle}</h2>
            <div class="account-selector">
              <span>Please Select an Account: <strong>${accountName}</strong></span>
            </div>
          </div>
          
          <div class="comparison-content">
            <div class="opportunity-panel renewal-panel">
              <div class="panel-header renewal-header">
                <h3>${renewalHeader}</h3>
              </div>
              <div class="panel-content">
                ${renewalData}
              </div>
              <div class="match-indicator renewal-match">
                Different Account Match
              </div>
            </div>
            
            ${
              showConfidence
                ? `
              <div class="confidence-section">
                <div class="confidence-arrow">→</div>
                <div class="confidence-badge">
                  <div class="confidence-label">High Confidence</div>
                  <div class="confidence-score">${confidenceScore}%</div>
                </div>
              </div>
            `
                : '<div class="confidence-arrow">→</div>'
            }
            
            <div class="opportunity-panel new-opp-panel">
              <div class="panel-header new-opp-header">
                <h3>${newOppHeader}</h3>
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
    },
  };
}

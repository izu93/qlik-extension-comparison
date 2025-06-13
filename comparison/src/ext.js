export default function ext(galaxy) {
  return {
    definition: {
      type: "items",
      component: "accordion",
      items: {
        data: { uses: "data" },
        sorting: { uses: "sorting" },
        settings: {
          label: "Panel Field Mapping",
          items: {
            confidenceSection: {
              type: "items",
              label: "Confidence",
              items: {
                showConfidence: {
                  ref: "showConfidence",
                  label: "Show Confidence",
                  type: "boolean",
                  defaultValue: true,
                },
                confidenceScore: {
                  ref: "confidenceScore",
                  label: "Confidence Score",
                  type: "number",
                  defaultValue: 87,
                },
              },
            },
            renewalPanelFields: {
              type: "items",
              label: "Renewal Panel Fields",
              items: Object.fromEntries(
                Array.from({ length: 10 }, (_, i) => [
                  `renewalField${i + 1}`,
                  {
                    type: "string",
                    ref: `renewalField${i + 1}`,
                    label: `Field ${i + 1}`,
                    component: "dropdown",
                    options: (props) => {
                      // All dims & meas from qHyperCubeDef
                      const dims = (props.qHyperCubeDef?.qDimensions || []).map(
                        (d) => ({
                          value: d.qDef.qFieldDefs[0],
                          label: d.qDef.qFieldDefs[0],
                        })
                      );
                      const meas = (props.qHyperCubeDef?.qMeasures || []).map(
                        (m) => ({
                          value: m.qDef.qFieldLabels?.[0] || m.qDef.qDef,
                          label: m.qDef.qFieldLabels?.[0] || m.qDef.qDef,
                        })
                      );
                      return [...dims, ...meas];
                    },
                  },
                ])
              ),
            },
            renewalPanelLabels: {
              type: "items",
              label: "Renewal Panel Field Labels",
              items: Object.fromEntries(
                Array.from({ length: 10 }, (_, i) => [
                  `renewalFieldLabel${i + 1}`,
                  {
                    type: "string",
                    ref: `renewalFieldLabel${i + 1}`,
                    label: `Label for Field ${i + 1}`,
                    defaultValue: "",
                  },
                ])
              ),
            },
            newPanelFields: {
              type: "items",
              label: "New Opp Panel Fields",
              items: Object.fromEntries(
                Array.from({ length: 10 }, (_, i) => [
                  `newField${i + 1}`,
                  {
                    type: "string",
                    ref: `newField${i + 1}`,
                    label: `Field ${i + 1}`,
                    component: "dropdown",
                    options: (props) => {
                      const dims = (props.qHyperCubeDef?.qDimensions || []).map(
                        (d) => ({
                          value: d.qDef.qFieldDefs[0],
                          label: d.qDef.qFieldDefs[0],
                        })
                      );
                      const meas = (props.qHyperCubeDef?.qMeasures || []).map(
                        (m) => ({
                          value: m.qDef.qFieldLabels?.[0] || m.qDef.qDef,
                          label: m.qDef.qFieldLabels?.[0] || m.qDef.qDef,
                        })
                      );
                      return [...dims, ...meas];
                    },
                  },
                ])
              ),
            },
            newPanelLabels: {
              type: "items",
              label: "New Opp Field Labels",
              items: Object.fromEntries(
                Array.from({ length: 10 }, (_, i) => [
                  `newFieldLabel${i + 1}`,
                  {
                    type: "string",
                    ref: `newFieldLabel${i + 1}`,
                    label: `Label for Field ${i + 1}`,
                    defaultValue: "",
                  },
                ])
              ),
            },
          },
        },
        addons: { uses: "addons" },
      },
    },
  };
}

export default {
  type: "items",
  component: "accordion",
  items: {
    settings: {
      uses: "settings",
      items: {
        generalSection: {
          label: "General",
          type: "items",
          items: {
            mainTitle: {
              ref: "props.mainTitle",
              label: "Main Title",
              type: "string",
              defaultValue: "Renewal vs New Opportunity Comparison",
            },
          },
        },
        renewalSection: {
          label: "Renewal Opportunity Fields",
          type: "items",
          items: {
            renewalHeader: {
              ref: "props.renewalHeader",
              label: "Renewal Header",
              type: "string",
              defaultValue: "Renewal Opportunity",
            },
            renewalFields: {
              ref: "props.renewalFields",
              label: "Renewal Fields",
              type: "array",
              allowAdd: true,
              allowRemove: true,
              itemTitleRef: "label",
              items: {
                field: {
                  ref: "field",
                  label: "Qlik Field",
                  type: "string",
                },
                label: {
                  ref: "label",
                  label: "Field Label",
                  type: "string",
                },
              },
            },
          },
        },
        newOppSection: {
          label: "New Opportunity Fields",
          type: "items",
          items: {
            newOppHeader: {
              ref: "props.newOppHeader",
              label: "New Opp Header",
              type: "string",
              defaultValue: "New Opportunity",
            },
            newOppFields: {
              ref: "props.newOppFields",
              label: "New Opp Fields",
              type: "array",
              allowAdd: true,
              allowRemove: true,
              itemTitleRef: "label",
              items: {
                field: {
                  ref: "field",
                  label: "Qlik Field",
                  type: "string",
                },
                label: {
                  ref: "label",
                  label: "Field Label",
                  type: "string",
                },
              },
            },
          },
        },
        confidenceSection: {
          label: "Confidence Score",
          type: "items",
          items: {
            confidenceLabel: {
              ref: "props.confidenceLabel",
              label: "Confidence Label",
              type: "string",
              defaultValue: "High Confidence",
            },
            confidenceField: {
              ref: "props.confidenceField",
              label: "Confidence Field",
              type: "string",
            },
          },
        },
      },
    },
  },
};

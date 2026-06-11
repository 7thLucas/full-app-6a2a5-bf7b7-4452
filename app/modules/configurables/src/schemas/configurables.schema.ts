/* START: THIS SECTION CODE IS CANNOT BE CHANGED, YOU ONLY READ IT */
export interface FieldSchemaType {
  fieldName?: string;
  type:
    | "string"
    | "number"
    | "boolean"
    | "object"
    | "array"
    | "color"
    | "url"
    | "enum"
    | "datetime"
    | "file"
    | "files";
  required?: boolean;
  label?: string;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  options?: string[];
  fields?: FieldSchemaType[];
  item?: FieldSchemaType;
}
/* END: THIS SECTION CODE IS CANNOT BE CHANGED, YOU ONLY READ IT */

export type ConfigurableSchemas = {
  formSchema: FieldSchemaType[];
};



export const configurableSchemas: ConfigurableSchemas = {
  formSchema: [
    {
      fieldName: "appName",
      type: "string",
      required: true,
      label: "App Name",
    },
    {
      fieldName: "logoUrl",
      type: "url",
      required: true,
      label: "Logo URL",
    },
    {
      fieldName: "brandColor",
      type: "object",
      required: true,
      label: "Brand Color",
      fields: [
        {
          fieldName: "primary",
          type: "color",
          required: true,
          label: "Primary",
        },
        {
          fieldName: "secondary",
          type: "color",
          required: true,
          label: "Secondary",
        },
        {
          fieldName: "accent",
          type: "color",
          required: true,
          label: "Accent",
        },
      ],
    },
    {
      fieldName: "tagline",
      type: "string",
      required: false,
      label: "Tagline",
    },
    {
      fieldName: "welcomeHeading",
      type: "string",
      required: false,
      label: "Welcome Heading",
    },
    {
      fieldName: "welcomeSubtext",
      type: "string",
      required: false,
      label: "Welcome Subtext",
    },
    {
      fieldName: "inputPlaceholder",
      type: "string",
      required: false,
      label: "Input Placeholder Text",
    },
    {
      fieldName: "examplePrompts",
      type: "array",
      required: false,
      label: "Example Prompt Chips",
      item: { type: "string", required: true },
    },
    {
      fieldName: "systemPrompt",
      type: "string",
      required: false,
      label: "AI System Prompt",
    },
    {
      fieldName: "enablePhotoUpload",
      type: "boolean",
      required: false,
      label: "Enable Photo Upload",
    },
    {
      fieldName: "livestockCovered",
      type: "array",
      required: false,
      label: "Livestock Covered",
      item: { type: "string", required: true },
    },
  ],
};

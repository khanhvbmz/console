import type { SelectDropdownMenuItem, AutocompleteHandler } from '@/controls/dropdown/select-dropdown/type';
import type { InputAppearanceType } from '@/controls/input/text-input/type';
import type { SupportLanguage } from '@/translations';

const TEXT_INPUT_TYPES = ['password', 'text', 'number'] as const;
export type TextInputType = typeof TEXT_INPUT_TYPES[number];

const COMPONENTS = ['PTextInput', 'GenerateIdFormat', 'PJsonSchemaForm', 'PSelectDropdown', 'PFilterableDropdown', 'PEMKeyFormat', 'PToggleButton'] as const;
export type ComponentName = typeof COMPONENTS[number];

interface Reference {
    resource_type: string; // 'identity.ServiceAccount'
    reference_key?: string; // 'service_account_id' (auto-complete/resource api, must not given) // 'project_id' (auto-complete/distinct api, must given)
    default_path?: number // if it is given, it will be used as the path to get the default value from the result array
}
export interface JsonSchema {
    type?: string;
    properties?: Record<string, JsonSchema>;
    required?: string[];
    default?: any;
    examples?: any[];
    format?: string;
    maxItems?: number;
    enum?: Array<string|null>;
    items?: JsonSchema|JsonSchema[];
    title?: string;
    order?: string[];
    disabled?: boolean;
    json?: boolean;
    menuItems?: SelectDropdownMenuItem[];
    reference?: Reference;
}

export const VALIDATION_MODES = ['input', 'all', 'none'] as const;
export type ValidationMode = typeof VALIDATION_MODES[number];

export type InnerJsonSchema = JsonSchema & {
    propertyName: string;
    componentName: ComponentName;
    inputType?: TextInputType;
    inputPlaceholder?: string;
    multiInputMode?: boolean;
    useAutoComplete?: boolean;
    appearanceType?: InputAppearanceType;
    pageSize?: number;
    referenceHandler?: AutocompleteHandler;
    description?: string;
    markdown?: string;
};

export type CustomErrorMap = Record<string, string>;

export interface HandlerRes {
    results: SelectDropdownMenuItem[];
    more?: boolean;
}

interface ReferenceHandlerOptions {
    propertyName?: string;
    schemaProperty: JsonSchema;
    pageStart?: number;
    pageSize?: number;
    filters?: SelectDropdownMenuItem[]
}
export interface ReferenceHandler {
    (inputText: string, referenceOptions: ReferenceHandlerOptions): Promise<HandlerRes>|HandlerRes;
}


export interface JsonSchemaFormProps {
    schema?: JsonSchema;
    formData?: object;
    language?: SupportLanguage;
    validationMode?: ValidationMode; // default: input
    isRoot?: boolean;
    resetOnSchemaChange?: boolean;
    customErrorMap?: CustomErrorMap;
    referenceHandler?: ReferenceHandler;
    useFixedMenuStyle?: boolean;
}

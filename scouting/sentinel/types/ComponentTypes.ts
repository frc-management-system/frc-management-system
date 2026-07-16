//export type ComponentType = 'text' | 'card' | 'button' | 'radioButton'|'view';

export interface ComponentSchema {
  type: string;
  props?: Record<string, any>;
  children?: ComponentSchema [] | string;
}
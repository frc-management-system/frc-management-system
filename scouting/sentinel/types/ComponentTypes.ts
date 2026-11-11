import { EventProps } from "./CommonTypes";

export interface ComponentSchema {
  type: string;
  field?: string;
  props?: Record<string, any>;
  children?: ComponentSchema [] | string;
}

export interface ItemSchema {
  title: string;
  onPress: EventProps[];
}
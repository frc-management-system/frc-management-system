import React from 'react';
import { ComponentSchema } from '../types/ComponentTypes';
import { ComponentMap } from './ComponentRegistry';

interface DynamicRendererProps {
  config: ComponentSchema;
}

export const DynamicRenderer: React.FC<DynamicRendererProps> = ({ config }) => {
  // Resolve component matching the string key
  const Component = ComponentMap[config.type];

  if (!Component) {
    console.warn(`Component type "${config.type}" is not registered.`);
    return null;
  }
  //console.log("config.children:", config.children);
  // Handle nested rendering for structural elements
  let renderedChildren: React.ReactNode = null;
  if (config.children) {
    if (Array.isArray(config.children)) {
      renderedChildren = config.children.map((child, index) => (
        <DynamicRenderer key={`${child.type}-${index}`} config={child} />
      ));
    } else {
      // If children is just a text snippet
      renderedChildren = config.children;
    }
  }

  // Safely produce the element at runtime
  return <Component {...config.props}>{renderedChildren}</Component>;
};
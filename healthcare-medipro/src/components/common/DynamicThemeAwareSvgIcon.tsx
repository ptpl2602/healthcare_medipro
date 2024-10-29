import React, { useEffect, useState } from 'react';

interface IconProps {
  name: string;
  className?: string;
  color?: string;
}

const DynamicThemeAwareSvgIcon: React.FC<IconProps> = ({ name, className = '', color }) => {
  const [svgContent, setSvgContent] = useState<string | null>(null);

  useEffect(() => {
    const fetchSvg = async () => {
      try {
        const response = await fetch(`/assets/icons/${name}.svg`);
        const svgText = await response.text();
        setSvgContent(svgText);
      } catch (error) {
        console.error(`Error loading SVG: ${name}`, error);
      }
    };
    fetchSvg();
  }, [name]);

  useEffect(() => {
    if (svgContent && color) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(svgContent, 'image/svg+xml');
      const paths = doc.querySelectorAll('path');
      paths.forEach(path => {
        path.setAttribute('stroke', color);
      });
      setSvgContent(new XMLSerializer().serializeToString(doc));
    }
  }, [svgContent, color]);

  if (!svgContent) {
    return null; // or a placeholder
  }

  return (
    <div 
      className={`theme-aware-icon ${className}`}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};

export default DynamicThemeAwareSvgIcon;
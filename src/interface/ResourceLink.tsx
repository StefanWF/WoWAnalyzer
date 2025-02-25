import RESOURCE_TYPES from 'game/RESOURCE_TYPES';
import TooltipProvider from 'interface/TooltipProvider';
import { useEffect, useState } from 'react';
import * as React from 'react';

import ResourceIcon from './ResourceIcon';

interface Props {
  id: number;
  children?: React.ReactNode;
  category?: string;
  icon?: boolean;
}

const ResourceLink = ({ icon = true, ...props }: Props) => {
  const [elem, setElem] = useState<HTMLAnchorElement | null>(null);

  useEffect(() => {
    TooltipProvider.refresh(elem);
  });

  const { id, children, category = undefined, ...other } = props;

  if (process.env.NODE_ENV === 'development' && !children && !RESOURCE_TYPES[id]) {
    throw new Error(`Unknown spell: ${id}`);
  }

  return (
    <a
      href={TooltipProvider.resource(id)}
      target="_blank"
      rel="noopener noreferrer"
      className={category}
      ref={(elem) => {
        setElem(elem);
      }}
      {...other}
    >
      {icon && <ResourceIcon id={id} noLink />} {children || RESOURCE_TYPES[id].name}
    </a>
  );
};

export default ResourceLink;

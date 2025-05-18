import React from "react";
import { Badge } from "react-bootstrap";
import type { Tag } from "../../types/tag";

export interface TagBadgeProps {
  tag: Tag;
  className?: string;
}

export const TagBadge = React.memo(function TagBadge({
  tag,
  className = "",
}: TagBadgeProps) {
  return (
    <Badge
      className={`text-truncate ${className}`}
      tabIndex={0}
      aria-label={`Tag: ${tag.label}`}
    >
      {tag.label}
    </Badge>
  );
});

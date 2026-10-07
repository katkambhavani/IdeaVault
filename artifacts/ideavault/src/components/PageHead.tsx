import type { ReactNode } from 'react';

type PageHeadProps = {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
};

export function PageHead({ eyebrow, title, description, action }: PageHeadProps) {
  return (
    <div className="page-head fade-up">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h1 className="display page-title">{title}</h1>
        {description && <p className="page-desc">{description}</p>}
      </div>
      {action}
    </div>
  );
}

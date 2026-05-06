import { BUSINESS } from '@/content/business';

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export function PhoneLink({ className, children }: Props) {
  return (
    <a href={BUSINESS.phone.href} className={className}>
      {children ?? BUSINESS.phone.display}
    </a>
  );
}

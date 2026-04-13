import type React from 'react';
import { cn } from '@/utils/cn';
import '@/styles/ui/skeleton.scss';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  variant?: 'text' | 'title' | 'circle' | 'block';
  style?: React.CSSProperties;
}

export function Skeleton({ className, width, height, variant = 'block', style }: SkeletonProps) {
  return (
    <div
      className={cn('skeleton', variant !== 'block' && `skeleton--${variant}`, className)}
      style={{ width, height, ...style }}
      aria-hidden="true"
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="product-card-skeleton">
      <Skeleton className="skeleton-image" />
      <div className="skeleton-body">
        <Skeleton variant="text" width="45%" height={11} />
        <Skeleton variant="title" width="90%" />
        <Skeleton variant="title" width="65%" />
        <Skeleton variant="text" width="30%" height={11} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
          <Skeleton width={60} height={20} />
          <Skeleton width={34} height={34} variant="circle" />
        </div>
      </div>
    </div>
  );
}

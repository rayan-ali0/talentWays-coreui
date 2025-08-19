import React from 'react';
import ContentLoader from 'react-content-loader';

interface ICardSkeletonProps {
  isArabic: boolean;
}

/**
 * `CardSkeleton` is a skeleton loader component that displays a placeholder UI while content is loading.
 * It can adjust the layout direction based on the `isArabic` prop for RTL (Right-to-Left) or LTR (Left-to-Right) layouts.
 *
 * @param {boolean} isArabic - A boolean indicating whether the layout should be in Arabic (RTL). If `true`, the layout will be right-to-left.
 * 
 * @returns {JSX.Element} The rendered skeleton loader component.
 */

export const CardSkeleton: React.FC<ICardSkeletonProps> = ({ isArabic }) => {

  return (
    <ContentLoader rtl={isArabic} className="mt-[30px]" speed={2} width="100%" height={80}
      backgroundColor="#f3f3f3" foregroundColor="#ecebeb">
      <rect x="20" y="10" rx="3" ry="3" width="100%" height="20" />
      <rect x="20" y="40" rx="3" ry="3" width="90%" height="15" />
      <rect x="20" y="60" rx="3" ry="3" width="80%" height="15" />
    </ContentLoader>
  )
};


import React from 'react';
import ContentLoader from 'react-content-loader';

interface IHeaderSkeletonProps {
  isArabic: boolean;
}
/**
 * `HeaderSkeleton` is a skeleton loader component that displays a placeholder UI while content is loading.
 * It can adjust the layout direction based on the `isArabic` prop for RTL (Right-to-Left) or LTR (Left-to-Right) layouts.
 *
 * @param {boolean} isArabic - A boolean indicating whether the layout should be in Arabic (RTL). If `true`, the layout will be right-to-left.
 * 
 * @returns {JSX.Element} The rendered skeleton loader component.
 */
export const HeaderSkeleton: React.FC<IHeaderSkeletonProps> = ({ isArabic }) => {

  return (
    <ContentLoader speed={2} width={"100%"} height={80} backgroundColor="#f3f3f3" foregroundColor="#ecebeb" rtl={isArabic} >
      {/* User image */}
      <circle cx="40" cy="40" r="30" />

      {/* User details */}
      <rect x="80" y="10" rx="3" ry="3" width="60%" height="20" />
      <rect x="80" y="40" rx="3" ry="3" width="50%" height="15" />
      <rect x="80" y="60" rx="3" ry="3" width="40%" height="15" />

      {/* Button */}
      <rect x="90%" y="20" rx="10" ry="10" width="8%" height="40" />
    </ContentLoader>
  )
};

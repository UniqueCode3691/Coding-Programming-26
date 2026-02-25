// Star.jsx - Reusable Star icon component.
// This component renders an SVG star icon that can be filled or outlined.
// Used for displaying ratings in the application.

const Star = ({ filled = false, size = 24, className = '' }) => (
  // Render an SVG element for the star.
  // The fill is set based on the filled prop, stroke is always currentColor.
  // Size and className are applied for customization.
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="2"
    className={className}
    width={size}
    height={size}
  >
    {/* Path element defining the star shape using SVG path data. */}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.87L12 17.77l-6.18 3.24L7 14.14 2 9.27l6.91-1.01L12 2z"
    />
  </svg>
);

export default Star;
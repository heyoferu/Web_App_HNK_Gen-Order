const ShoppingBasketIcon = ({ size = 24, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m5 11 4-7" />
    <path d="m19 11-4-7" />
    <path d="M2 11h20" />
    <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8c.9 0 1.8-.7 2-1.6l1.7-7.4" />
    <path d="m9 11 1 9" />
    <path d="m4.5 11-.1 9" />
    <path d="m15 11-1 9" />
    <path d="m19.5 11 .1 9" />
  </svg>
);

export default ShoppingBasketIcon;

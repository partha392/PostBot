export const ChatBackgroundPattern = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <pattern
        id="chat-pattern"
        width="60"
        height="60"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(45)"
      >
        <path
          d="M.5 200V.5h200"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          d="M 25 5 L 25 55"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          d="M 5 25 L 55 25"
          stroke="currentColor"
          strokeWidth="1"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#chat-pattern)" />
  </svg>
);

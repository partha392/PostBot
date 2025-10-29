export const HeroPattern = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1440 350"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <pattern
          id="pattern"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M.5 200V.5h200"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <path
        d="M-28.5 250.5C150 200.5 364.833 192.833 542.5 210C720.167 227.167 866.5 270.5 1045 275C1223.5 279.5 1351.5 241.5 1452.5 189.5V350.5H-28.5V250.5Z"
        fill="currentColor"
        fillOpacity="0.1"
      />
      <path
        d="M-28.5 220.5C150 170.5 364.833 162.833 542.5 180C720.167 197.167 866.5 240.5 1045 245C1223.5 249.5 1351.5 211.5 1452.5 159.5V350.5H-28.5V220.5Z"
        fill="currentColor"
        fillOpacity="0.1"
      />
      <path
        d="M-28.5 190.5C150 140.5 364.833 132.833 542.5 150C720.167 167.167 866.5 210.5 1045 215C1223.5 219.5 1351.5 181.5 1452.5 129.5V350.5H-28.5V190.5Z"
        fill="currentColor"
        fillOpacity="0.1"
      />
    </svg>
  );
  
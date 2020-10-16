import React, { FC } from 'react';

export const Footer: FC = () => {
  return (
    <footer className="footer">
      <p>
        <span>
          &#169;
          {`${new Date().getFullYear()} muku.`}
        </span>
        <a
          href="https://github.com/rai-wtnb"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="text-red pl-4">github</span>
        </a>
      </p>
    </footer>
  );
};

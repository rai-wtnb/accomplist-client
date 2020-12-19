import React, { FC } from 'react';

export const Footer: FC = () => {
  return (
    <footer className="footer">
      <p>
        <span>
          &#169;
          {`${new Date().getFullYear()} rai. watanabe`}
        </span>
      </p>
    </footer>
  );
};

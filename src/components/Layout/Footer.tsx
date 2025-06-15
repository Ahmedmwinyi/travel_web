import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 px-4 py-3">
      <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
        <p>© 2025 State University Of Zanzibar Academic Administration. All rights reserved.</p>
        <p className="mt-1 sm:mt-0">Powered by SUZA System v1.0</p>
      </div>
    </footer>
  );
};

export default Footer;

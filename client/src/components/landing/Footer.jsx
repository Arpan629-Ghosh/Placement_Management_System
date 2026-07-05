const Footer = () => {
  return (
    <footer className="bg-gray-900 text-center py-6 text-sm text-gray-400">
      <p>© 2026 PMS. All Rights Reserved.</p>

      <div className="mt-2">
        <p className="text-gray-300">Developed By</p>

        <p className="text-gray-400">
          Arpan Ghosh • Soumen Giri • Kartik Sau • Subhajit Sasmal
        </p>
      </div>

      <div className="flex justify-center gap-4 mt-3 text-gray-500">
        <span className="hover:text-blue-400 cursor-pointer">LinkedIn</span>

        <span className="hover:text-blue-400 cursor-pointer">Facebook</span>

        <span className="hover:text-blue-400 cursor-pointer">Instagram</span>
      </div>
    </footer>
  );
};

export default Footer;

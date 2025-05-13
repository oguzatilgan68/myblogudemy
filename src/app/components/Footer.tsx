export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-10">
      <div className="max-w-6xl mx-auto px-4 py-6 text-center text-gray-600 dark:text-gray-400 text-sm">
        © {new Date().getFullYear()} Blogum. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}

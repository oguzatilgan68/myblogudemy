export default function ContactPage() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
        İletişim
      </h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Benimle iletişime geçmek istersen aşağıdaki bilgileri kullanabilirsin.
      </p>

      <ul className="space-y-2 text-gray-700 dark:text-gray-300">
        <li>
          <strong>E-posta:</strong>{" "}
          <a
            href="mailto:ornek@mail.com"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ornek@mail.com
          </a>
        </li>
        <li>
          <strong>GitHub:</strong>{" "}
          <a
            href="https://github.com/kullaniciadi"
            className="text-blue-600 dark:text-blue-400 hover:underline"
            target="_blank"
          >
            github.com/kullaniciadi
          </a>
        </li>
        <li>
          <strong>LinkedIn:</strong>{" "}
          <a
            href="https://linkedin.com/in/kullaniciadi"
            className="text-blue-600 dark:text-blue-400 hover:underline"
            target="_blank"
          >
            linkedin.com/in/kullaniciadi
          </a>
        </li>
      </ul>
    </section>
  );
}

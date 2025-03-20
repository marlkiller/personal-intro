export function Footer() {
  return (
    <footer className="mt-16 pb-8 text-center text-sm text-gray-500 dark:text-gray-400">
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          <span>Built with</span>
          <span className="text-red-500">❤</span>
          <span>using</span>
          <a 
            href="https://nextjs.org" 
            target="_blank" 
            className="hover:text-primary transition-colors"
          >
            Next.js
          </a>
        </div>
        <div className="flex items-center gap-2">
          <a 
            href="https://opensource.org/licenses/MIT"
            target="_blank"
            className="hover:text-primary transition-colors"
          >
            MIT License
          </a>
          <span>•</span>
          <span>{new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  )
}
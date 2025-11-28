
export default function Footer() {
   return  <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© 2025 abdellhay. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/mohamedabdellhay"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/mohamedabdellhay"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://x.com/Abd_Ellhay"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Twitter
            </a>
          </div>
        </div>
      </footer>

}
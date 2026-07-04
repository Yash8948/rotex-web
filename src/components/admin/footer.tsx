export function AdminFooter() {
  return (
    <footer className="border-t border-border bg-card px-6 py-3">
      <p className="text-xs text-muted-foreground">
        © {new Date().getFullYear()} Rotex. Admin panel.
      </p>
    </footer>
  );
}

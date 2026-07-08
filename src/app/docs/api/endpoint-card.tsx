const STATUS_ROWS = [
  { status: 200, code: "—", meaning: "Success — payload in data" },
  { status: 404, code: "NOT_FOUND", meaning: "Section or slug does not exist" },
  { status: 500, code: "SERVER_ERROR", meaning: "Unexpected server error" },
];

export function EndpointCard({ method, curl }: { method: string; curl: string }) {
  return (
    <div className="mb-5 space-y-4 rounded-lg border border-border bg-muted/20 p-4">
      <div>
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Try it
        </p>
        <pre className="overflow-x-auto rounded-md border border-border bg-muted/40 p-3 text-xs">
          <code>{curl}</code>
        </pre>
      </div>

      <div>
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Responses
        </p>
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr>
              <th className="border border-border bg-muted/40 px-2.5 py-1.5 text-left font-medium">Status</th>
              <th className="border border-border bg-muted/40 px-2.5 py-1.5 text-left font-medium">Code</th>
              <th className="border border-border bg-muted/40 px-2.5 py-1.5 text-left font-medium">Meaning</th>
            </tr>
          </thead>
          <tbody>
            {STATUS_ROWS.map((row) => (
              <tr key={row.status}>
                <td className="border border-border px-2.5 py-1.5 font-mono">{row.status}</td>
                <td className="border border-border px-2.5 py-1.5 font-mono">{row.code}</td>
                <td className="border border-border px-2.5 py-1.5 text-muted-foreground">{row.meaning}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-muted-foreground">
        Method: <span className="font-mono font-medium text-foreground">{method}</span> · No auth required (public read-only)
      </p>
    </div>
  );
}

export type DocSection = {
  slug: string;
  title: string;
  content: string;
  method?: string;
  path?: string;
};

export type DocGroup = {
  title: string;
  sections: DocSection[];
};

const ENDPOINT_RE = /\*\*Endpoint:\*\*\s*`(GET|POST|PUT|DELETE)\s+([^`]+)`/;

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function parseDocFile(groupTitle: string, markdown: string): DocGroup {
  const lines = markdown.split("\n");
  const sections: DocSection[] = [];
  let current: { title: string; lines: string[] } | null = null;

  for (const line of lines) {
    const h2 = /^## (.+)$/.exec(line);
    if (h2) {
      if (current) sections.push(toSection(current));
      current = { title: h2[1].trim(), lines: [] };
    } else if (current) {
      current.lines.push(line);
    }
  }
  if (current) sections.push(toSection(current));

  return { title: groupTitle, sections };
}

function toSection({ title, lines }: { title: string; lines: string[] }): DocSection {
  const body = lines.join("\n").trim();
  const match = ENDPOINT_RE.exec(body);
  return {
    slug: slugify(title),
    title,
    content: body,
    method: match?.[1],
    path: match?.[2],
  };
}

export function exampleCurl(method: string, examplePath: string, baseUrl: string) {
  const filled = examplePath
    .replace(/\{sector-slug\}/g, "oil-gas")
    .replace(/\{sub-sector-slug\}/g, "upstream");
  return `curl -X ${method} "${baseUrl}${filled}"`;
}

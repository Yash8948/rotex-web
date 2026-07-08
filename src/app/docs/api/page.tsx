import { readFile } from "fs/promises";
import path from "path";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { auth } from "@/lib/auth";
import { parseDocFile, exampleCurl } from "./parse-docs";
import { DocsSidebar } from "./docs-sidebar";
import { EndpointCard } from "./endpoint-card";

const DOCS = [
  { title: "Home Page API", file: "api-structure.md" },
  { title: "Industries API", file: "api-structure-industries.md" },
];

const proseClasses = `
  space-y-4 text-sm leading-relaxed
  [&_h1]:mt-0 [&_h1]:mb-3 [&_h1]:text-2xl [&_h1]:font-semibold
  [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-base [&_h3]:font-semibold
  [&_p]:text-muted-foreground
  [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ul]:text-muted-foreground
  [&_li]:text-muted-foreground
  [&_strong]:text-foreground [&_strong]:font-medium
  [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-xs
  [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:border [&_pre]:border-border [&_pre]:bg-muted/40 [&_pre]:p-4 [&_pre]:text-xs
  [&_table]:w-full [&_table]:border-collapse [&_table]:text-xs
  [&_th]:border [&_th]:border-border [&_th]:bg-muted/40 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-medium
  [&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-2 [&_td]:align-top
  [&_hr]:border-border
  [&_a]:text-primary [&_a]:underline
`;

export default async function ApiDocsPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const h = await headers();
  const host = h.get("host") ?? "localhost:3000";
  const baseUrl = `${host.startsWith("localhost") ? "http" : "https"}://${host}`;

  const groups = await Promise.all(
    DOCS.map(async ({ title, file }) => {
      const markdown = await readFile(path.join(process.cwd(), "docs", file), "utf-8");
      return parseDocFile(title, markdown);
    })
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex max-w-6xl gap-10 px-6 py-12">
        <DocsSidebar groups={groups} />

        <div className="min-w-0 flex-1">
          <h1 className="mb-2 text-3xl font-semibold">API Documentation</h1>
          <p className="mb-10 text-sm text-muted-foreground">
            Versioned, enveloped endpoints under <code className="rounded bg-muted px-1 py-0.5 text-xs">/api/v1/</code>.
            Internal — admin sign-in required.
          </p>

          {groups.map((group) => (
            <div key={group.title} className="mb-16">
              <h2 className="mb-6 border-b border-border pb-3 text-xl font-semibold">{group.title}</h2>

              {group.sections.map((section) => (
                <section key={section.slug} id={section.slug} className="mb-14 scroll-mt-6">
                  <h3 className="mb-3 text-lg font-semibold">{section.title}</h3>

                  {section.method && section.path && (
                    <EndpointCard
                      method={section.method}
                      curl={exampleCurl(section.method, section.path, baseUrl)}
                    />
                  )}

                  <div className={proseClasses}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{section.content}</ReactMarkdown>
                  </div>
                </section>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

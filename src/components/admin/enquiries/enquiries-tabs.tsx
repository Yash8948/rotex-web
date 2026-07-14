"use client";

import { useState } from "react";

type Industry = { id: string; name: string };
type Enquiry = {
  id: string;
  industryName: string;
  fullName: string;
  enquiryType: string;
  product: string;
  phone: string;
  email: string;
  country: string;
  city: string;
  company: string | null;
  designation: string | null;
  message: string;
  fileUrl: string | null;
  createdAt: Date;
};

export function EnquiriesTabs({ industries, enquiries }: { industries: Industry[]; enquiries: Enquiry[] }) {
  const [active, setActive] = useState(industries[0]?.name ?? "");

  const otherCount = enquiries.filter((e) => !industries.some((i) => i.name === e.industryName)).length;
  const tabs = [...industries.map((i) => i.name), ...(otherCount > 0 ? ["Other"] : [])];

  const filtered = enquiries.filter((e) =>
    active === "Other" ? !industries.some((i) => i.name === e.industryName) : e.industryName === active
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1 border-b border-border">
        {tabs.map((name) => {
          const count = enquiries.filter((e) =>
            name === "Other" ? !industries.some((i) => i.name === e.industryName) : e.industryName === name
          ).length;
          return (
            <button
              key={name}
              onClick={() => setActive(name)}
              className={`-mb-px flex items-center gap-1.5 border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
                active === name
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {name}
              <span className="rounded-full bg-muted px-1.5 py-0.5 text-xs">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-lg border border-border">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30 text-xs uppercase tracking-wide text-muted-foreground">
                <th className="py-2.5 pl-5 pr-3 font-medium">Name</th>
                <th className="py-2.5 pr-3 font-medium">Enquiry Type</th>
                <th className="py-2.5 pr-3 font-medium">Product</th>
                <th className="py-2.5 pr-3 font-medium">Phone</th>
                <th className="py-2.5 pr-3 font-medium">Email</th>
                <th className="py-2.5 pr-3 font-medium">Country</th>
                <th className="py-2.5 pr-3 font-medium">City</th>
                <th className="py-2.5 pr-3 font-medium">Company</th>
                <th className="py-2.5 pr-3 font-medium">Designation</th>
                <th className="py-2.5 pr-3 font-medium">Message</th>
                <th className="py-2.5 pr-3 font-medium">File</th>
                <th className="py-2.5 pr-5 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={12} className="py-8 text-center text-sm text-muted-foreground">
                    No enquiries for this industry yet.
                  </td>
                </tr>
              )}
              {filtered.map((e) => (
                <tr key={e.id}>
                  <td className="py-2.5 pl-5 pr-3 font-medium whitespace-nowrap">{e.fullName}</td>
                  <td className="py-2.5 pr-3 whitespace-nowrap">{e.enquiryType}</td>
                  <td className="py-2.5 pr-3 whitespace-nowrap">{e.product}</td>
                  <td className="py-2.5 pr-3 whitespace-nowrap">{e.phone}</td>
                  <td className="py-2.5 pr-3 whitespace-nowrap">{e.email}</td>
                  <td className="py-2.5 pr-3 whitespace-nowrap">{e.country}</td>
                  <td className="py-2.5 pr-3 whitespace-nowrap">{e.city}</td>
                  <td className="py-2.5 pr-3 whitespace-nowrap">{e.company ?? "—"}</td>
                  <td className="py-2.5 pr-3 whitespace-nowrap">{e.designation ?? "—"}</td>
                  <td className="max-w-64 truncate py-2.5 pr-3" title={e.message}>{e.message}</td>
                  <td className="py-2.5 pr-3 whitespace-nowrap">
                    {e.fileUrl ? (
                      <a href={e.fileUrl} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                        View
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="py-2.5 pr-5 whitespace-nowrap text-muted-foreground">
                    {new Date(e.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

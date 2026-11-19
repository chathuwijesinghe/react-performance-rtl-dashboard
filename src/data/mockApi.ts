import type { ApiMode, CustomerRecord } from "../types/record";

const records: CustomerRecord[] = [
  { id: "INV-2048", name: "Olivia Rhye", email: "olivia@orbit.co", company: "Orbit Studio", amount: 2450, status: "Active", createdAt: "Nov 18, 2026" },
  { id: "INV-2047", name: "Phoenix Baker", email: "phoenix@layers.io", company: "Layers", amount: 1820, status: "Pending", createdAt: "Nov 17, 2026" },
  { id: "INV-2046", name: "Lana Steiner", email: "lana@circooles.com", company: "Circooles", amount: 960, status: "Active", createdAt: "Nov 16, 2026" },
  { id: "INV-2045", name: "Demi Wilkinson", email: "demi@catalog.com", company: "Catalog", amount: 3240, status: "Inactive", createdAt: "Nov 15, 2026" },
  { id: "INV-2044", name: "Candice Wu", email: "candice@quotient.com", company: "Quotient", amount: 1540, status: "Active", createdAt: "Nov 14, 2026" },
  { id: "INV-2043", name: "Natali Craig", email: "natali@acme.com", company: "Acme", amount: 2780, status: "Pending", createdAt: "Nov 13, 2026" },
];

export async function getRecords(
  mode: ApiMode,
  signal: AbortSignal,
): Promise<CustomerRecord[]> {
  await new Promise<void>((resolve, reject) => {
    const timeout = window.setTimeout(resolve, 850);
    signal.addEventListener("abort", () => {
      window.clearTimeout(timeout);
      reject(new DOMException("Request aborted", "AbortError"));
    }, { once: true });
  });

  if (signal.aborted) throw new DOMException("Request aborted", "AbortError");
  if (mode === "error") throw new Error("We couldn't load the records. Please try again.");
  if (mode === "empty") return [];
  return records;
}

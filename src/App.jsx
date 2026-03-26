import { useState } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap');`;

const styles = `
  ${FONTS}
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #0f0e0c;
    --paper: #f5f0e8;
    --cream: #ede7d5;
    --gold: #c9a84c;
    --gold-light: #e8d49a;
    --rust: #b85c3a;
    --muted: #7a7060;
    --border: #d4c9b0;
    --white: #ffffff;
  }

  body { font-family: 'DM Sans', sans-serif; background: var(--paper); color: var(--ink); min-height: 100vh; }

  .app { display: grid; grid-template-columns: 1fr 1fr; min-height: 100vh; gap: 0; }

  .editor {
    background: var(--ink);
    padding: 2.5rem;
    overflow-y: auto;
    max-height: 100vh;
    position: sticky;
    top: 0;
  }

  .editor-header { margin-bottom: 2rem; }
  .editor-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.6rem;
    color: var(--gold);
    letter-spacing: 0.02em;
    margin-bottom: 0.25rem;
  }
  .editor-sub { font-family: 'DM Mono', monospace; font-size: 0.7rem; color: var(--muted); letter-spacing: 0.15em; text-transform: uppercase; }

  .section { margin-bottom: 1.75rem; }
  .section-label {
    font-family: 'DM Mono', monospace;
    font-size: 0.65rem;
    color: var(--gold);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .section-label::after { content: ''; flex: 1; height: 1px; background: #2a2620; }

  .input-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 0.75rem; }
  .input-full { margin-bottom: 0.75rem; }

  label { display: block; font-family: 'DM Mono', monospace; font-size: 0.6rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.3rem; }
  label .req { color: var(--rust); margin-left: 2px; }

  input, textarea, select {
    width: 100%;
    background: #1a1812;
    border: 1px solid #2e2a22;
    color: var(--paper);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    padding: 0.6rem 0.8rem;
    border-radius: 4px;
    outline: none;
    transition: border-color 0.2s;
  }
  input:focus, textarea:focus, select:focus { border-color: var(--gold); }
  textarea { resize: vertical; min-height: 60px; }

  .line-item {
    background: #1a1812;
    border: 1px solid #2e2a22;
    border-radius: 6px;
    padding: 0.9rem;
    margin-bottom: 0.6rem;
    position: relative;
    transition: border-color 0.2s;
  }
  .line-item:hover { border-color: #3e3830; }
  .line-item-top { display: grid; grid-template-columns: 1fr auto; gap: 0.5rem; align-items: center; margin-bottom: 0.5rem; }
  .line-item-nums { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; }

  .btn-remove {
    background: #2a1410;
    border: 1px solid #4a2018;
    color: var(--rust);
    cursor: pointer;
    font-size: 0.75rem;
    padding: 0.3rem 0.55rem;
    border-radius: 4px;
    transition: all 0.15s;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-family: 'DM Mono', monospace;
    letter-spacing: 0.05em;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .btn-remove:hover { background: var(--rust); color: #fff; border-color: var(--rust); }

  .currency-input-wrap { position: relative; }
  .currency-input-wrap .currency-symbol {
    position: absolute;
    left: 0.7rem;
    top: 50%;
    transform: translateY(-50%);
    font-family: 'DM Mono', monospace;
    font-size: 0.75rem;
    color: var(--gold);
    pointer-events: none;
    user-select: none;
  }
  .currency-input-wrap input { padding-left: 1.75rem; }

  .btn-add {
    width: 100%;
    background: none;
    border: 1px dashed #3e3830;
    color: var(--muted);
    font-family: 'DM Mono', monospace;
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 0.7rem;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    margin-bottom: 0.5rem;
  }
  .btn-add:hover { border-color: var(--gold); color: var(--gold); }

  .btn-ai {
    width: 100%;
    background: linear-gradient(135deg, #2a2010, #1a1208);
    border: 1px solid var(--gold);
    color: var(--gold);
    font-family: 'DM Mono', monospace;
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 0.8rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
  .btn-ai:hover { background: linear-gradient(135deg, #3a3015, #2a2010); }
  .btn-ai:disabled { opacity: 0.5; cursor: not-allowed; }

  .ai-prompt-row { display: flex; gap: 0.5rem; margin-bottom: 0.6rem; }
  .ai-prompt-row input { flex: 1; }

  .ai-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    background: #1a1208;
    border: 1px solid var(--gold);
    color: var(--gold);
    font-family: 'DM Mono', monospace;
    font-size: 0.6rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 0.15rem 0.5rem;
    border-radius: 20px;
    margin-bottom: 0.75rem;
  }

  .spin { display: inline-block; animation: spin 1s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* RIGHT PANEL */
  .preview {
    background: var(--paper);
    padding: 3rem 2.5rem;
    overflow-y: auto;
    max-height: 100vh;
    position: relative;
  }

  .invoice {
    background: var(--white);
    max-width: 680px;
    margin: 0 auto;
    padding: 3.5rem;
    box-shadow: 0 4px 40px rgba(0,0,0,0.1), 0 1px 8px rgba(0,0,0,0.06);
    position: relative;
    min-height: 900px;
  }

  .invoice::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--gold), var(--rust), var(--gold));
  }

  .inv-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 3rem; }
  .inv-logo {
    font-family: 'Playfair Display', serif;
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--ink);
    letter-spacing: -0.02em;
    line-height: 1;
  }
  .inv-logo-sub { font-family: 'DM Mono', monospace; font-size: 0.6rem; color: var(--muted); letter-spacing: 0.2em; text-transform: uppercase; margin-top: 0.2rem; }

  .inv-title-block { text-align: right; }
  .inv-word {
    font-family: 'Playfair Display', serif;
    font-size: 2.5rem;
    font-weight: 400;
    color: var(--ink);
    letter-spacing: 0.05em;
    text-transform: uppercase;
    line-height: 1;
  }
  .inv-number { font-family: 'DM Mono', monospace; font-size: 0.75rem; color: var(--gold); letter-spacing: 0.1em; margin-top: 0.4rem; }

  .inv-meta { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2.5rem; padding-bottom: 2.5rem; border-bottom: 1px solid var(--border); }
  .inv-meta-label { font-family: 'DM Mono', monospace; font-size: 0.6rem; color: var(--muted); letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 0.5rem; }
  .inv-name { font-family: 'Playfair Display', serif; font-size: 1rem; font-weight: 600; margin-bottom: 0.2rem; }
  .inv-address { font-size: 0.8rem; color: var(--muted); line-height: 1.6; white-space: pre-line; }

  .inv-date-row { display: flex; gap: 1rem; align-items: center; }
  .inv-date-key { font-family: 'DM Mono', monospace; font-size: 0.6rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; }
  .inv-date-val { font-family: 'DM Mono', monospace; font-size: 0.8rem; color: var(--ink); }

  .inv-tax-badges { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.6rem; }
  .inv-tax-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    background: #faf7f0;
    border: 1px solid var(--border);
    border-radius: 3px;
    padding: 0.2rem 0.5rem;
    font-family: 'DM Mono', monospace;
    font-size: 0.68rem;
    color: var(--ink);
    letter-spacing: 0.05em;
  }
  .inv-tax-badge span {
    color: var(--muted);
    font-size: 0.55rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    background: var(--border);
    padding: 0.1rem 0.3rem;
    border-radius: 2px;
  }

  .inv-bank {
    margin-top: 2rem;
    padding: 1.25rem 1.5rem;
    background: #faf7f0;
    border: 1px solid var(--border);
    border-left: 3px solid var(--gold);
    border-radius: 4px;
  }
  .inv-bank-title {
    font-family: 'DM Mono', monospace;
    font-size: 0.6rem;
    color: var(--muted);
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin-bottom: 0.85rem;
  }
  .inv-bank-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem 2rem; }
  .inv-bank-row { display: flex; flex-direction: column; gap: 0.15rem; }
  .inv-bank-key { font-family: 'DM Mono', monospace; font-size: 0.56rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; }
  .inv-bank-val { font-family: 'DM Mono', monospace; font-size: 0.8rem; color: var(--ink); font-weight: 500; }

  .inv-table { width: 100%; border-collapse: collapse; margin-bottom: 1.5rem; }
  .inv-table th {
    font-family: 'DM Mono', monospace;
    font-size: 0.6rem;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.12em;
    padding: 0 0 0.7rem;
    border-bottom: 1px solid var(--border);
    font-weight: 400;
  }
  .inv-table th:last-child, .inv-table td:last-child { text-align: right; }
  .inv-table th:nth-child(2), .inv-table td:nth-child(2) { text-align: center; }
  .inv-table th:nth-child(3), .inv-table td:nth-child(3) { text-align: center; }
  .inv-table td {
    padding: 0.9rem 0 0.9rem;
    border-bottom: 1px solid #f0ebe0;
    font-size: 0.875rem;
    vertical-align: top;
  }
  .inv-table tr:last-child td { border-bottom: none; }
  .td-desc { color: var(--ink); }
  .td-desc-sub { font-size: 0.72rem; color: var(--muted); margin-top: 0.15rem; }
  .td-mono { font-family: 'DM Mono', monospace; font-size: 0.8rem; color: var(--muted); text-align: center; }
  .td-amount { font-family: 'DM Mono', monospace; font-size: 0.85rem; text-align: right; }

  .inv-totals { margin-left: auto; width: 260px; }
  .totals-row { display: flex; justify-content: space-between; padding: 0.45rem 0; font-size: 0.85rem; border-bottom: 1px solid #f0ebe0; }
  .totals-row:last-child { border-bottom: none; }
  .totals-key { color: var(--muted); }
  .totals-val { font-family: 'DM Mono', monospace; }
  .totals-grand { background: var(--ink); margin: 0.75rem -0.75rem -0.5rem; padding: 0.85rem 0.75rem; border-radius: 4px; }
  .totals-grand .totals-key { color: var(--paper); font-family: 'DM Mono', monospace; font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase; }
  .totals-grand .totals-val { color: var(--gold); font-size: 1.1rem; font-weight: 500; }

  .inv-notes { margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--border); }
  .inv-notes-label { font-family: 'DM Mono', monospace; font-size: 0.6rem; color: var(--muted); letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 0.5rem; }
  .inv-notes-text { font-size: 0.8rem; color: var(--muted); line-height: 1.7; }

  .inv-footer {
    position: absolute;
    bottom: 2rem;
    left: 3.5rem;
    right: 3.5rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    font-family: 'DM Mono', monospace;
    font-size: 0.6rem;
    color: #c8bfa8;
    letter-spacing: 0.08em;
  }

  .preview-actions { display: flex; gap: 0.75rem; justify-content: center; margin-top: 1.5rem; }
  .btn-print {
    background: var(--ink);
    color: var(--gold);
    border: none;
    font-family: 'DM Mono', monospace;
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 0.7rem 1.5rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s;
  }
  .btn-print:hover { background: #2a2620; }

  @media print {
    .editor, .preview-actions { display: none; }
    .app { grid-template-columns: 1fr; }
    .preview { padding: 0; max-height: none; }
    .invoice { box-shadow: none; }
  }

  @media (max-width: 900px) {
    .app { grid-template-columns: 1fr; }
    .editor { max-height: none; position: relative; }
    .preview { max-height: none; }
  }
`;

const defaultItems = [
  {
    id: 2,
    description: "Website Development",
    detail: "5-page responsive site with CMS integration",
    qty: 1,
    rate: 4800,
  },
];

const CURRENCIES = [
  { code: "USD", label: "USD — US Dollar", symbol: "$" },
  { code: "EUR", label: "EUR — Euro", symbol: "€" },
  { code: "GBP", label: "GBP — British Pound", symbol: "£" },
  { code: "INR", label: "INR — Indian Rupee", symbol: "₹" },
  { code: "CAD", label: "CAD — Canadian Dollar", symbol: "CA$" },
  { code: "AUD", label: "AUD — Australian Dollar", symbol: "A$" },
  { code: "JPY", label: "JPY — Japanese Yen", symbol: "¥" },
  { code: "SGD", label: "SGD — Singapore Dollar", symbol: "S$" },
  { code: "AED", label: "AED — UAE Dirham", symbol: "AED" },
  { code: "CHF", label: "CHF — Swiss Franc", symbol: "CHF" },
];

const fmt = (n, currency = "USD") => {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(n || 0);
  } catch {
    return `${currency} ${(n || 0).toFixed(2)}`;
  }
};
const today = () => new Date().toISOString().split("T")[0];
const dueDate = () => {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().split("T")[0];
};

export default function InvoiceGenerator() {
  const [from, setFrom] = useState({
    name: "Studio Marigold",
    address: "123 Creative Lane\nNew York, NY 10001",
    email: "hello@studiomarigold.co",
    pan: "",
    gst: "",
  });
  const [bank, setBank] = useState({
    accountName: "",
    accountNumber: "",
    bankName: "",
    ifsc: "",
    branch: "",
  });
  const [to, setTo] = useState({
    name: "Acme Corporation",
    address: "456 Business Blvd\nSan Francisco, CA 94102",
    email: "accounts@acmecorp.com",
  });
  const [meta, setMeta] = useState({
    number: "INV-2024-001",
    date: today(),
    due: dueDate(),
    currency: "USD",
  });
  const [items, setItems] = useState(defaultItems);
  const [tax, setTax] = useState(10);
  const [discount, setDiscount] = useState(0);
  const [notes, setNotes] = useState(
    "Payment due within 30 days. Bank transfer or check accepted.\nThank you for your business!",
  );
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [nextId, setNextId] = useState(10);

  const subtotal = items.reduce(
    (s, i) => s + (parseFloat(i.qty) || 0) * (parseFloat(i.rate) || 0),
    0,
  );
  const discountAmt = subtotal * (discount / 100);
  const taxAmt = (subtotal - discountAmt) * (tax / 100);
  const total = subtotal - discountAmt + taxAmt;

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      { id: nextId, description: "New Item", detail: "", qty: 1, rate: 0 },
    ]);
    setNextId((n) => n + 1);
  };
  const removeItem = (id) =>
    setItems((prev) => prev.filter((i) => i.id !== id));
  const updateItem = (id, field, val) =>
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, [field]: val } : i)),
    );

  const generateAI = async () => {
    if (!aiPrompt.trim()) return;
    setAiLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-5",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: `Generate invoice line items for: "${aiPrompt}". Return ONLY a JSON array (no markdown, no extra text) with objects having: description (string, short title), detail (string, brief explanation 3-8 words), qty (number), rate (number in USD). Generate 2-5 realistic items. Example: [{"description":"UI Design","detail":"Homepage and dashboard wireframes","qty":1,"rate":1200}]`,
            },
          ],
        }),
      });
      const data = await res.json();
      const text = data.content?.find((b) => b.type === "text")?.text || "[]";
      const cleaned = text.replace(/```json|```/g, "").trim();
      const newItems = JSON.parse(cleaned);
      if (Array.isArray(newItems)) {
        setItems((prev) => [
          ...prev,
          ...newItems.map((item, i) => ({ ...item, id: nextId + i })),
        ]);
        setNextId((n) => n + newItems.length);
        setAiPrompt("");
      }
    } catch (e) {
      console.error(e);
    }
    setAiLoading(false);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        {/* LEFT: Editor */}
        <div className="editor">
          <div className="editor-header">
            <div className="editor-title">Invoice Builder</div>
            <div className="editor-sub">
              Fill in details · AI generates line items
            </div>
          </div>

          {/* FROM */}
          <div className="section">
            <div className="section-label">From</div>
            <div className="input-full">
              <label>
                Business Name <span className="req">*</span>
              </label>
              <input
                required
                value={from.name}
                onChange={(e) =>
                  setFrom((p) => ({ ...p, name: e.target.value }))
                }
              />
            </div>
            <div className="input-full">
              <label>
                Address <span className="req">*</span>
              </label>
              <textarea
                rows={2}
                value={from.address}
                onChange={(e) =>
                  setFrom((p) => ({ ...p, address: e.target.value }))
                }
              />
            </div>
            <div className="input-full">
              <label>
                Email <span className="req">*</span>
              </label>
              <input
                required
                value={from.email}
                onChange={(e) =>
                  setFrom((p) => ({ ...p, email: e.target.value }))
                }
              />
            </div>
            <div className="input-row">
              <div>
                <label>
                  PAN Number <span className="req">*</span>
                </label>
                <input
                  required
                  placeholder="ABCDE1234F"
                  value={from.pan}
                  onChange={(e) =>
                    setFrom((p) => ({
                      ...p,
                      pan: e.target.value.toUpperCase(),
                    }))
                  }
                  maxLength={10}
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    letterSpacing: "0.08em",
                  }}
                />
              </div>
              <div>
                <label>
                  GST Number <span className="req">*</span>
                </label>
                <input
                  required
                  placeholder="22ABCDE1234F1Z5"
                  value={from.gst}
                  onChange={(e) =>
                    setFrom((p) => ({
                      ...p,
                      gst: e.target.value.toUpperCase(),
                    }))
                  }
                  maxLength={15}
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    letterSpacing: "0.08em",
                  }}
                />
              </div>
            </div>
          </div>

          {/* BANK DETAILS */}
          <div className="section">
            <div className="section-label">Bank Details</div>
            <div className="input-full">
              <label>
                Account Holder Name <span className="req">*</span>
              </label>
              <input
                required
                placeholder="As per bank records"
                value={bank.accountName}
                onChange={(e) =>
                  setBank((p) => ({ ...p, accountName: e.target.value }))
                }
              />
            </div>
            <div className="input-row">
              <div>
                <label>
                  Account Number <span className="req">*</span>
                </label>
                <input
                  required
                  placeholder="XXXXXXXXXXXX"
                  value={bank.accountNumber}
                  onChange={(e) =>
                    setBank((p) => ({ ...p, accountNumber: e.target.value }))
                  }
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    letterSpacing: "0.08em",
                  }}
                />
              </div>
              <div>
                <label>
                  IFSC Code <span className="req">*</span>
                </label>
                <input
                  required
                  placeholder="SBIN0001234"
                  value={bank.ifsc}
                  onChange={(e) =>
                    setBank((p) => ({
                      ...p,
                      ifsc: e.target.value.toUpperCase(),
                    }))
                  }
                  maxLength={11}
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    letterSpacing: "0.08em",
                  }}
                />
              </div>
            </div>
            <div className="input-row">
              <div>
                <label>
                  Bank Name <span className="req">*</span>
                </label>
                <input
                  required
                  placeholder="e.g. State Bank of India"
                  value={bank.bankName}
                  onChange={(e) =>
                    setBank((p) => ({ ...p, bankName: e.target.value }))
                  }
                />
              </div>
              <div>
                <label>Branch</label>
                <input
                  placeholder="e.g. MG Road, Bengaluru"
                  value={bank.branch}
                  onChange={(e) =>
                    setBank((p) => ({ ...p, branch: e.target.value }))
                  }
                />
              </div>
            </div>
          </div>

          {/* TO */}
          <div className="section">
            <div className="section-label">Bill To</div>
            <div className="input-full">
              <label>
                Client Name <span className="req">*</span>
              </label>
              <input
                required
                value={to.name}
                onChange={(e) => setTo((p) => ({ ...p, name: e.target.value }))}
              />
            </div>
            <div className="input-full">
              <label>Address</label>
              <textarea
                rows={2}
                value={to.address}
                onChange={(e) =>
                  setTo((p) => ({ ...p, address: e.target.value }))
                }
              />
            </div>
          </div>

          {/* META */}
          <div className="section">
            <div className="section-label">Invoice Details</div>
            <div className="input-row">
              <div>
                <label>
                  Invoice # <span className="req">*</span>
                </label>
                <input
                  required
                  value={meta.number}
                  onChange={(e) =>
                    setMeta((p) => ({ ...p, number: e.target.value }))
                  }
                />
              </div>
              <div>
                <label>Currency</label>
                <select
                  value={meta.currency}
                  onChange={(e) =>
                    setMeta((p) => ({ ...p, currency: e.target.value }))
                  }
                >
                  {CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="input-row">
              <div>
                <label>Issue Date</label>
                <input
                  type="date"
                  value={meta.date}
                  onChange={(e) =>
                    setMeta((p) => ({ ...p, date: e.target.value }))
                  }
                />
              </div>
              <div>
                <label>Due Date</label>
                <input
                  type="date"
                  value={meta.due}
                  onChange={(e) =>
                    setMeta((p) => ({ ...p, due: e.target.value }))
                  }
                />
              </div>
            </div>
          </div>

          {/* LINE ITEMS */}
          <div className="section">
            <div className="section-label">Line Items</div>
            <div className="ai-badge">✦ AI Powered</div>
            <div className="ai-prompt-row">
              <input
                placeholder="e.g. 'web design project' or 'marketing campaign'"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && generateAI()}
              />
            </div>
            <button
              className="btn-ai"
              onClick={generateAI}
              disabled={aiLoading || !aiPrompt.trim()}
            >
              {aiLoading ? (
                <>
                  <span className="spin">◌</span> Generating...
                </>
              ) : (
                <>✦ Generate Line Items with AI</>
              )}
            </button>
            <div style={{ marginTop: "1rem" }}>
              {items.map((item) => (
                <div key={item.id} className="line-item">
                  <div className="line-item-top">
                    <input
                      value={item.description}
                      onChange={(e) =>
                        updateItem(item.id, "description", e.target.value)
                      }
                      style={{
                        background: "transparent",
                        border: "none",
                        padding: 0,
                        fontSize: "0.85rem",
                        fontWeight: 500,
                      }}
                    />
                    <button
                      className="btn-remove"
                      onClick={() => removeItem(item.id)}
                    >
                      🗑 Delete
                    </button>
                  </div>
                  <input
                    value={item.detail}
                    onChange={(e) =>
                      updateItem(item.id, "detail", e.target.value)
                    }
                    placeholder="Description..."
                    style={{
                      background: "transparent",
                      border: "none",
                      padding: 0,
                      fontSize: "0.72rem",
                      color: "var(--muted)",
                      width: "100%",
                      marginBottom: "0.5rem",
                    }}
                  />
                  <div className="line-item-nums">
                    <div>
                      <label>Qty</label>
                      <input
                        type="number"
                        value={item.qty}
                        onChange={(e) =>
                          updateItem(item.id, "qty", e.target.value)
                        }
                        min="0"
                      />
                    </div>
                    <div>
                      <label>Rate ({meta.currency})</label>
                      <div className="currency-input-wrap">
                        <span className="currency-symbol">
                          {CURRENCIES.find((c) => c.code === meta.currency)
                            ?.symbol || meta.currency}
                        </span>
                        <input
                          type="number"
                          value={item.rate}
                          onChange={(e) =>
                            updateItem(item.id, "rate", e.target.value)
                          }
                          min="0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn-add" onClick={addItem}>
              + Add Line Item Manually
            </button>
          </div>

          {/* ADJUSTMENTS */}
          <div className="section">
            <div className="section-label">Adjustments</div>
            <div className="input-row">
              <div>
                <label>Tax (%)</label>
                <input
                  type="number"
                  value={tax}
                  onChange={(e) => setTax(parseFloat(e.target.value) || 0)}
                  min="0"
                  max="100"
                />
              </div>
              <div>
                <label>Discount (%)</label>
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                  min="0"
                  max="100"
                />
              </div>
            </div>
          </div>

          {/* NOTES */}
          <div className="section">
            <div className="section-label">Notes</div>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        {/* RIGHT: Preview */}
        <div className="preview">
          <div className="invoice" id="invoice-preview">
            <div className="inv-header">
              <div>
                <div className="inv-logo">{from.name || "Your Business"}</div>
                <div className="inv-logo-sub">{from.email}</div>
              </div>
              <div className="inv-title-block">
                <div className="inv-word">Invoice</div>
                <div className="inv-number">{meta.number}</div>
              </div>
            </div>

            <div className="inv-meta">
              <div>
                <div className="inv-meta-label">From</div>
                <div className="inv-name">{from.name}</div>
                <div className="inv-address">{from.address}</div>
                <div className="inv-address" style={{ marginTop: "0.3rem" }}>
                  {from.email}
                </div>
                <div className="inv-tax-badges">
                  {from.pan && (
                    <div className="inv-tax-badge">
                      <span>PAN</span>
                      {from.pan}
                    </div>
                  )}
                  {from.gst && (
                    <div className="inv-tax-badge">
                      <span>GST</span>
                      {from.gst}
                    </div>
                  )}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div className="inv-meta-label">Bill To</div>
                <div className="inv-name">{to.name}</div>
                <div className="inv-address" style={{ textAlign: "right" }}>
                  {to.address}
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "2rem",
                marginBottom: "2.5rem",
              }}
            >
              <div className="inv-date-row">
                <span className="inv-date-key">Issued</span>
                <span className="inv-date-val">{meta.date}</span>
              </div>
              <div className="inv-date-row">
                <span className="inv-date-key">Due</span>
                <span className="inv-date-val" style={{ color: "var(--rust)" }}>
                  {meta.due}
                </span>
              </div>
            </div>

            <table className="inv-table">
              <thead>
                <tr>
                  <th style={{ width: "50%", textAlign: "left" }}>
                    Description
                  </th>
                  <th style={{ width: "12%" }}>Qty</th>
                  <th style={{ width: "18%" }}>Rate</th>
                  <th style={{ width: "20%" }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const amt =
                    (parseFloat(item.qty) || 0) * (parseFloat(item.rate) || 0);
                  return (
                    <tr key={item.id}>
                      <td className="td-desc">
                        {item.description}
                        {item.detail && (
                          <div className="td-desc-sub">{item.detail}</div>
                        )}
                      </td>
                      <td className="td-mono">{item.qty}</td>
                      <td className="td-mono">
                        {fmt(item.rate, meta.currency)}
                      </td>
                      <td className="td-amount">{fmt(amt, meta.currency)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="inv-totals">
              <div className="totals-row">
                <span className="totals-key">Subtotal</span>
                <span className="totals-val">
                  {fmt(subtotal, meta.currency)}
                </span>
              </div>
              {discount > 0 && (
                <div className="totals-row">
                  <span className="totals-key">Discount ({discount}%)</span>
                  <span className="totals-val" style={{ color: "var(--rust)" }}>
                    −{fmt(discountAmt, meta.currency)}
                  </span>
                </div>
              )}
              {tax > 0 && (
                <div className="totals-row">
                  <span className="totals-key">Tax ({tax}%)</span>
                  <span className="totals-val">
                    {fmt(taxAmt, meta.currency)}
                  </span>
                </div>
              )}
              <div
                className="totals-row totals-grand"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "0.85rem 0.75rem",
                }}
              >
                <span className="totals-key">Total Due</span>
                <span className="totals-val">{fmt(total, meta.currency)}</span>
              </div>
            </div>

            {(bank.accountNumber || bank.bankName) && (
              <div className="inv-bank">
                <div className="inv-bank-title">Payment / Bank Details</div>
                <div className="inv-bank-grid">
                  {bank.accountName && (
                    <div className="inv-bank-row">
                      <span className="inv-bank-key">Account Name</span>
                      <span className="inv-bank-val">{bank.accountName}</span>
                    </div>
                  )}
                  {bank.accountNumber && (
                    <div className="inv-bank-row">
                      <span className="inv-bank-key">Account Number</span>
                      <span className="inv-bank-val">{bank.accountNumber}</span>
                    </div>
                  )}
                  {bank.bankName && (
                    <div className="inv-bank-row">
                      <span className="inv-bank-key">Bank</span>
                      <span className="inv-bank-val">{bank.bankName}</span>
                    </div>
                  )}
                  {bank.ifsc && (
                    <div className="inv-bank-row">
                      <span className="inv-bank-key">IFSC Code</span>
                      <span className="inv-bank-val">{bank.ifsc}</span>
                    </div>
                  )}
                  {bank.branch && (
                    <div className="inv-bank-row">
                      <span className="inv-bank-key">Branch</span>
                      <span className="inv-bank-val">{bank.branch}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {notes && (
              <div className="inv-notes">
                <div className="inv-notes-label">Notes</div>
                <div className="inv-notes-text">{notes}</div>
              </div>
            )}

            <div className="inv-footer">
              <span>{from.name}</span>
              <span>
                {meta.number} · Generated {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="preview-actions">
            <button className="btn-print" onClick={() => window.print()}>
              ⎙ Print / Save as PDF
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

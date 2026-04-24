import { useState } from "react";

const COLORS = {
  bg: "#0f0f0f",
  surface: "#161616",
  card: "#1c1c1c",
  border: "#2a2a2a",
  accent: "#c8102e",
  accentDim: "#8b0b20",
  gold: "#b89b5e",
  goldDim: "#7a6640",
  text: "#e8e4dc",
  textMuted: "#8a8680",
  textDim: "#5a5652",
  green: "#2d6a4f",
  greenBright: "#52b788",
  yellow: "#f4a261",
  blue: "#457b9d",
};

const TABS = [
  { id: "overview", label: "SYSTEM OVERVIEW" },
  { id: "plain-english", label: "HOW IT THINKS" },
  { id: "data-model", label: "DATA MODEL" },
  { id: "rules", label: "VSG RULES TABLE" },
  { id: "logic-tree", label: "DECISION TREE" },
  { id: "phase1", label: "PHASE 1 · SHEETS" },
  { id: "phase2", label: "PHASE 2 · NO-CODE" },
  { id: "phase3", label: "PHASE 3 · WEB APP" },
  { id: "sample-input", label: "SAMPLE INPUT" },
  { id: "sample-output", label: "SAMPLE OUTPUT" },
  { id: "tech-spec", label: "TECH SPEC" },
];

const Tag = ({ color, children }) => (
  <span style={{
    display: "inline-block",
    padding: "2px 8px",
    borderRadius: 3,
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    background: color,
    color: "#fff",
    marginRight: 6,
  }}>{children}</span>
);

const Card = ({ title, tag, tagColor, children, accent }) => (
  <div style={{
    background: COLORS.card,
    border: `1px solid ${accent ? COLORS.accent : COLORS.border}`,
    borderLeft: accent ? `3px solid ${COLORS.accent}` : `1px solid ${COLORS.border}`,
    borderRadius: 6,
    padding: "18px 20px",
    marginBottom: 16,
  }}>
    {(title || tag) && (
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        {tag && <Tag color={tagColor || COLORS.accent}>{tag}</Tag>}
        {title && <span style={{ fontWeight: 700, fontSize: 13, color: COLORS.text, letterSpacing: "0.04em", textTransform: "uppercase" }}>{title}</span>}
      </div>
    )}
    <div style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.7 }}>{children}</div>
  </div>
);

const SectionTitle = ({ children, sub }) => (
  <div style={{ marginBottom: 20, marginTop: 8 }}>
    <div style={{ fontSize: 11, color: COLORS.accent, letterSpacing: "0.15em", fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>
      {sub || "SECTION"}
    </div>
    <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.text, letterSpacing: "-0.01em" }}>{children}</div>
    <div style={{ height: 2, background: `linear-gradient(90deg, ${COLORS.accent}, transparent)`, marginTop: 10, borderRadius: 2 }} />
  </div>
);

const Table = ({ headers, rows, highlight }) => (
  <div style={{ overflowX: "auto", marginBottom: 16 }}>
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th key={i} style={{
              background: COLORS.accent,
              color: "#fff",
              padding: "8px 12px",
              textAlign: "left",
              fontWeight: 700,
              letterSpacing: "0.05em",
              fontSize: 11,
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, ri) => (
          <tr key={ri} style={{ background: ri % 2 === 0 ? COLORS.card : COLORS.surface }}>
            {row.map((cell, ci) => (
              <td key={ci} style={{
                padding: "7px 12px",
                borderBottom: `1px solid ${COLORS.border}`,
                color: highlight && ci === 0 ? COLORS.gold : COLORS.text,
                fontWeight: highlight && ci === 0 ? 700 : 400,
                fontSize: 12,
                verticalAlign: "top",
              }}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const CodeBlock = ({ children }) => (
  <pre style={{
    background: "#0a0a0a",
    border: `1px solid ${COLORS.border}`,
    borderRadius: 6,
    padding: "14px 16px",
    fontSize: 11,
    color: "#a8d8a8",
    overflowX: "auto",
    lineHeight: 1.6,
    marginBottom: 16,
    fontFamily: "'Courier New', monospace",
  }}>{children}</pre>
);

const FlagBox = ({ type, children }) => {
  const styles = {
    RULE: { bg: "#1a0a0a", border: COLORS.accent, label: "VSG RULE", color: "#ff6b6b" },
    WARN: { bg: "#1a1400", border: COLORS.yellow, label: "WARNING FLAG", color: COLORS.yellow },
    NOTE: { bg: "#0a1420", border: COLORS.blue, label: "SYSTEM NOTE", color: "#7ec8e3" },
    GO: { bg: "#0a1a0f", border: COLORS.greenBright, label: "COMPLIANT", color: COLORS.greenBright },
  };
  const s = styles[type] || styles.NOTE;
  return (
    <div style={{
      background: s.bg,
      border: `1px solid ${s.border}`,
      borderRadius: 5,
      padding: "10px 14px",
      marginBottom: 10,
      display: "flex",
      gap: 10,
      alignItems: "flex-start",
    }}>
      <span style={{ fontSize: 10, fontWeight: 800, color: s.color, whiteSpace: "nowrap", letterSpacing: "0.06em", paddingTop: 2 }}>[{s.label}]</span>
      <span style={{ fontSize: 12, color: COLORS.text, lineHeight: 1.6 }}>{children}</span>
    </div>
  );
};

const TreeNode = ({ label, children, depth = 0, color }) => (
  <div style={{ marginLeft: depth * 18, marginBottom: 6 }}>
    <div style={{
      display: "flex",
      alignItems: "flex-start",
      gap: 8,
    }}>
      {depth > 0 && <span style={{ color: COLORS.textDim, fontSize: 11, paddingTop: 2 }}>{"└─"}</span>}
      <div style={{
        background: depth === 0 ? COLORS.accent : depth === 1 ? COLORS.accentDim : COLORS.border,
        borderRadius: 4,
        padding: "5px 10px",
        fontSize: 12,
        fontWeight: depth === 0 ? 800 : depth === 1 ? 600 : 400,
        color: color || COLORS.text,
        letterSpacing: depth === 0 ? "0.04em" : 0,
        textTransform: depth === 0 ? "uppercase" : "none",
        flex: 1,
      }}>{label}</div>
    </div>
    {children && <div style={{ marginTop: 4 }}>{children}</div>}
  </div>
);

// ── TAB CONTENT ──────────────────────────────────────────────────────────────

function OverviewTab() {
  return (
    <div>
      <SectionTitle sub="App Blueprint">Tile Placement Engine</SectionTitle>

      <Card tag="PURPOSE" accent>
        A department-aware product sorting engine that reads incoming SKU data and applies VSG rules, category flow logic, price flow, size hierarchy, collection grouping, and space logic to output a specific bay assignment, adjacency recommendation, display requirement, and compliance status — before product arrives.
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
        {[
          ["INPUT", "Product list with 20+ fields per SKU", COLORS.blue],
          ["ENGINE", "Rule hierarchy + decision logic tree", COLORS.accentDim],
          ["OUTPUT", "Bay assignment, adjacency, display flag, compliance status", COLORS.green],
          ["ESCALATION", "Manager-review flags for exceptions and conflicts", COLORS.yellow],
        ].map(([label, desc, color]) => (
          <div key={label} style={{
            background: COLORS.card,
            border: `1px solid ${COLORS.border}`,
            borderTop: `3px solid ${color}`,
            borderRadius: 6,
            padding: "14px 16px",
          }}>
            <div style={{ fontSize: 10, color, fontWeight: 800, letterSpacing: "0.1em", marginBottom: 6 }}>{label}</div>
            <div style={{ fontSize: 13, color: COLORS.text }}>{desc}</div>
          </div>
        ))}
      </div>

      <Card title="Rule Priority Hierarchy">
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {[
            ["01", "VSG Category Sequence", "Hard rule — override nothing without manager flag"],
            ["02", "Product Category", "Tile vs Stone vs LFT vs Wood Look — determines run assignment"],
            ["03", "Size + Fixture Match", "36x72→LFT Easel, 12x24→3x4 Rolling, etc."],
            ["04", "Collection/Family Grouping", "Keep families together before sorting one-offs"],
            ["05", "Color Family", "Lightest to darkest within category"],
            ["06", "Price Flow Direction", "Per-category: some high→low, some low→high"],
            ["07", "Display Requirement", "Display-required SKUs → endcap or dedicated bay"],
            ["08", "Sales Rank + WOS", "Protect high-velocity placement, flag low WOS"],
            ["09", "Space Availability", "Gate: no placement assigned without confirmed open bay"],
            ["10", "Discontinued/Replacement Logic", "Old SKU must be cleared before new SKU occupies bay"],
            ["11", "Style/Look", "Secondary sort within price tier"],
          ].map(([num, name, note]) => (
            <div key={num} style={{ display: "flex", gap: 12, padding: "8px 0", borderBottom: `1px solid ${COLORS.border}` }}>
              <span style={{ color: COLORS.accent, fontWeight: 800, fontSize: 13, minWidth: 28, fontFamily: "monospace" }}>{num}</span>
              <div>
                <div style={{ color: COLORS.text, fontWeight: 600, fontSize: 13 }}>{name}</div>
                <div style={{ color: COLORS.textMuted, fontSize: 11 }}>{note}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Three Build Phases">
        {[
          ["Phase 1", "Google Sheets", "Rules tables + formula engine + manual upload", COLORS.blue],
          ["Phase 2", "No-Code Platform", "Airtable or AppSheet with automation and mobile access", COLORS.gold],
          ["Phase 3", "Web App", "Full dashboard + upload + engine + exception flags + printable action plan", COLORS.greenBright],
        ].map(([phase, platform, desc, color]) => (
          <div key={phase} style={{
            display: "flex",
            gap: 14,
            padding: "10px 0",
            borderBottom: `1px solid ${COLORS.border}`,
            alignItems: "flex-start",
          }}>
            <div style={{ minWidth: 70, background: color, borderRadius: 4, padding: "3px 8px", fontSize: 11, fontWeight: 800, color: "#000", textAlign: "center" }}>{phase}</div>
            <div>
              <div style={{ color: COLORS.text, fontWeight: 700, fontSize: 13 }}>{platform}</div>
              <div style={{ color: COLORS.textMuted, fontSize: 12 }}>{desc}</div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

function PlainEnglishTab() {
  return (
    <div>
      <SectionTitle sub="Plain-English Explanation">How the App Thinks</SectionTitle>

      <Card tag="STEP 1" tagColor={COLORS.blue} title="Read the Product">
        The app reads every field on the incoming SKU. Before doing anything else, it classifies the product into one of the core VSG categories: Large Format, White Marble Look, Marble Look, Travertine/Limestone Look, Contemporary, Outdoor/Quarry/Saltillo, Slate Look, or Wood Look. This classification drives everything that follows. If the classification is unclear, the app raises a manager-review flag and stops — it never guesses.
      </Card>

      <Card tag="STEP 2" tagColor={COLORS.blue} title="Find the Right Run">
        Once the VSG category is known, the app knows which run the product belongs to. Large Format goes on T1 (facing Deco Department). Power 5 goes on T2. LFT Square goes on T3. Contemporary follows Travertine. Wood Look faces the Wood Department. The run assignment is locked before any bay logic begins.
      </Card>

      <Card tag="STEP 3" tagColor={COLORS.blue} title="Check the Fixture">
        The app matches the product's size against the VSG fixture grid. A 24x48 goes on a Large Format Easel. A 12x24 goes on a 3x4 Rolling Fixture. A 36x72 goes on 2x LFT Easels or a 4x6 Rolling Fixture. If a product's size has no matching fixture in the store, it flags for manager review.
      </Card>

      <Card tag="STEP 4" tagColor={COLORS.blue} title="Sort Within the Run">
        Inside the correct run, the app applies the sort rules for that specific VSG category. For Large Format: longest rectangles first, then by size descending, then by sub-department, then by price high-to-low. For Contemporary: families first, rectangles before squares within each family, then price low-to-high. For Marble Look: by family first, rectangles lead, then price low-to-high. Each category has its own direction and priority.
      </Card>

      <Card tag="STEP 5" tagColor={COLORS.blue} title="Check Collection Grouping">
        Before placing a SKU among one-offs, the app checks: does this product belong to a collection (e.g., Dimarmi, Cesari, Vetta Lux)? If yes, it must be grouped with its family. The one-off slots come after. The app never breaks a family across bays unless there is no other option — and even then, it flags it.
      </Card>

      <Card tag="STEP 6" tagColor={COLORS.blue} title="Check Price Flow Direction">
        Price flow direction varies by category. The app knows: Large Format flows high-to-low by price within size tier. Contemporary and Marble Look flow low-to-high. Wood Look flows high-to-low on the outer run, then wraps and flows low-to-high on the inner run. The app applies the correct direction automatically and checks that adjacent SKUs in the assigned bay follow that direction.
      </Card>

      <Card tag="STEP 7" tagColor={COLORS.blue} title="Display Decision">
        If the product is marked display-required, the app checks: is there an endcap slot available adjacent to this run? Endcap SKUs must be active, single-SKU when possible, and represent the category next to them. The app will not assign a display slot to clearance, special buys, or discontinued product. If no display slot is available, it flags for manager decision.
      </Card>

      <Card tag="STEP 8" tagColor={COLORS.blue} title="Transition Logic">
        If the incoming SKU is a replacement for an existing SKU (old/new relationship field), the app checks whether the old SKU has been cleared, has sufficient WOS remaining to justify staying, or needs to be flagged for clearance before space opens. The new SKU is not assigned a bay until the old SKU has a confirmed clearance or exit plan. This prevents double-booking.
      </Card>

      <Card tag="STEP 9" tagColor={COLORS.blue} title="Output the Plan">
        The app produces a placement record with: recommended VSG category, run assignment, bay slot, adjacency (left and right neighbor SKUs), fixture type, display yes/no and where, VSG compliance status, any rule violations with specific rule citation, manager-review flags with reason, and priority level (Urgent / High / Standard).
      </Card>

      <FlagBox type="RULE">The app never produces a vague placement. Every recommendation includes a specific bay, a specific reason, and a specific rule citation from the VSG. If it cannot produce that, it escalates to manager review instead of guessing.</FlagBox>
      <FlagBox type="WARN">The app does not move product. It tells you where product should go and flags when something is in the way. Execution is your call.</FlagBox>
    </div>
  );
}

function DataModelTab() {
  return (
    <div>
      <SectionTitle sub="Database Structure">Required Data Model</SectionTitle>

      <Card tag="TABLE 1" tagColor={COLORS.blue} title="PRODUCTS (Core Input Table)">
        <Table
          highlight
          headers={["Field Name", "Type", "Required", "Notes"]}
          rows={[
            ["SKU", "Text", "YES", "Unique identifier"],
            ["Product Name", "Text", "YES", "Full display name"],
            ["VSG Category", "Dropdown", "YES", "LFT / White Marble / Marble / Travertine / Contemporary / Outdoor / Slate / Wood Look"],
            ["Product Type", "Dropdown", "YES", "Ceramic / Porcelain / White-body / Natural Stone / Mosaic / Trim"],
            ["Shape", "Dropdown", "YES", "Square / Rectangle / Plank / Hexagon / Pattern / Other"],
            ["Size (W x L)", "Text", "YES", "Format: 24x48 — drives fixture assignment"],
            ["Longest Side (in)", "Number", "YES", "Computed from Size — used for fixture logic"],
            ["Color Family", "Dropdown", "YES", "White / Light Gray / Gray / Beige / Taupe / Brown / Black / Multi"],
            ["Finish", "Dropdown", "YES", "Polished / Matte / Glazed / Honed / Natural"],
            ["Style/Look", "Dropdown", "YES", "Marble / Travertine / Slate / Wood / Contemporary / Outdoor"],
            ["Price Per SQFT", "Currency", "YES", "Drives price flow sorting"],
            ["Vendor/Collection", "Text", "YES", "e.g. Dimarmi, Cesari, Vetta Lux, Riviera"],
            ["Matching Trim Available", "Yes/No", "YES", "Flags for family merchandising"],
            ["Matching Mosaic Available", "Yes/No", "YES", "Flags for back-endcap coordination"],
            ["Display Required", "Yes/No", "YES", "Triggers endcap/sidecap slot check"],
            ["Display Type", "Dropdown", "IF YES", "Endcap / Sidecap / Family Board / None"],
            ["New SKU", "Yes/No", "YES", "Triggers transition logic"],
            ["Replaces SKU", "Text", "IF YES", "Links old-to-new for displacement chain"],
            ["Old SKU Status", "Dropdown", "IF YES", "Active / Clearing / Discontinued / Gone"],
            ["Weekly Sales (SQFT)", "Number", "YES", "Drives sales rank + priority"],
            ["WOS (Weeks on Hand)", "Number", "YES", "Flags low inventory risk"],
            ["Replenishment Status", "Dropdown", "YES", "Auto-replen / Seasonal / Discontinued / One-time buy"],
            ["Inventory Status", "Dropdown", "YES", "In Stock / Out of Stock / Incoming / Clearance"],
            ["Current Bay Location", "Text", "YES", "Current PLT address if product is live"],
            ["Arrival Date", "Date", "YES", "Used for space-ready planning"],
            ["Fixture Required", "Dropdown", "COMPUTED", "Auto-assigned by size logic"],
            ["Assigned Run", "Text", "COMPUTED", "T1 / T2 / T3 / etc — assigned by VSG category"],
            ["Assigned Bay", "Text", "COMPUTED", "Output of placement engine"],
            ["VSG Compliant", "Yes/No", "COMPUTED", "Engine output"],
            ["Violation Notes", "Text", "COMPUTED", "Specific rule citation if non-compliant"],
            ["Manager Review Flag", "Yes/No", "COMPUTED", "Escalation trigger"],
            ["Flag Reason", "Text", "COMPUTED", "Why manager review was triggered"],
            ["Priority Level", "Dropdown", "COMPUTED", "Urgent / High / Standard"],
          ]}
        />
      </Card>

      <Card tag="TABLE 2" tagColor={COLORS.gold} title="BAY INVENTORY (Space Management Table)">
        <Table
          highlight
          headers={["Field", "Type", "Purpose"]}
          rows={[
            ["Bay ID", "Text", "Unique address (e.g. T1-03, T2-07)"],
            ["Run", "Text", "T1 through T-last"],
            ["Position in Run", "Number", "1 = front/door side"],
            ["Aisle Side", "Dropdown", "Front / Back / Endcap / Sidecap"],
            ["Current SKU", "Text", "Linked to Products"],
            ["Current SKU Status", "Dropdown", "Active / Clearing / Empty"],
            ["Fixture Type", "Dropdown", "LFT Easel / 3x4 Rolling / 4x6 Rolling / 6x4 Upright"],
            ["Bay Available", "Yes/No", "Computed — true if clearing or empty"],
            ["Available Date", "Date", "When bay will be clear"],
            ["Reserved For SKU", "Text", "Lock incoming SKU to this slot"],
            ["Left Neighbor SKU", "Text", "Adjacency check"],
            ["Right Neighbor SKU", "Text", "Adjacency check"],
          ]}
        />
      </Card>

      <Card tag="TABLE 3" tagColor={COLORS.greenBright} title="VSG RULES (Rules Reference Table)">
        <Table
          highlight
          headers={["Field", "Type", "Purpose"]}
          rows={[
            ["Rule ID", "Text", "Unique rule code (e.g. VSG-LFT-01)"],
            ["VSG Category", "Dropdown", "Which category this rule applie

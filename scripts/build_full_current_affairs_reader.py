import json
import re
import html
import os

with open(r'c:\Users\lenovo\Website\data\current_affairs_sep_2026.json', encoding='utf-8') as f:
    mag_data = json.load(f)

# Import generator logic
from test_html_gen import sections_html

sections_combined_html = '\n'.join(sections_html)

reader_page_html = f"""<!DOCTYPE html>
<html lang="en" data-theme="light" data-font="medium">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
  <title>Notes of Current events — September 2026 Edition | C2S Digital Reader</title>
  <meta name="description" content="Read and download the official September 2026 Current Affairs Magazine (87 Pages) from C2S College to Service. Appointments, Sports, Awards, Defence Exercises, National Events & 159 Exam MCQs.">
  <link rel="icon" type="image/png" href="favicon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400&display=swap" rel="stylesheet">
  
  <style>
    :root {{
      --bg-primary: #ffffff;
      --bg-secondary: #f8fafc;
      --bg-tertiary: #f1f5f9;
      --text-primary: #0f172a;
      --text-secondary: #475569;
      --text-muted: #64748b;
      --border-color: #e2e8f0;
      --c2s-blue: #1d4ed8;
      --c2s-navy: #0f172a;
      --c2s-orange: #ea580c;
      --accent-green: #16a34a;
      --accent-red: #dc2626;
      --card-bg: #ffffff;
      --card-shadow: 0 4px 16px -2px rgba(15, 23, 42, 0.06), 0 2px 6px -1px rgba(15, 23, 42, 0.04);
      --font-scale: 16px;
      --sidebar-width: 310px;
    }}

    html[data-theme="sepia"] {{
      --bg-primary: #fbf7ee;
      --bg-secondary: #f4ede0;
      --bg-tertiary: #ebdcc9;
      --text-primary: #3d3226;
      --text-secondary: #5e4f3f;
      --text-muted: #7d6b58;
      --border-color: #e5d8c5;
      --card-bg: #fffdf9;
      --card-shadow: 0 4px 14px rgba(74, 53, 33, 0.07);
    }}

    html[data-theme="dark"] {{
      --bg-primary: #090d16;
      --bg-secondary: #111827;
      --bg-tertiary: #1f2937;
      --text-primary: #f3f4f6;
      --text-secondary: #cbd5e1;
      --text-muted: #94a3b8;
      --border-color: #334155;
      --card-bg: #131b2e;
      --card-shadow: 0 4px 20px rgba(0, 0, 0, 0.45);
    }}

    html[data-font="small"] {{ --font-scale: 14.5px; }}
    html[data-font="medium"] {{ --font-scale: 16px; }}
    html[data-font="large"] {{ --font-scale: 18px; }}
    html[data-font="xlarge"] {{ --font-scale: 20px; }}

    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: var(--bg-primary);
      color: var(--text-primary);
      font-size: var(--font-scale);
      line-height: 1.68;
      -webkit-font-smoothing: antialiased;
      transition: background-color 0.2s ease, color 0.2s ease;
    }}

    /* Global Header */
    .reader-header {{
      position: sticky;
      top: 0;
      z-index: 100;
      background-color: var(--bg-primary);
      border-bottom: 1px solid var(--border-color);
      box-shadow: 0 2px 10px rgba(0,0,0,0.04);
      backdrop-filter: blur(10px);
    }}

    .header-inner {{
      max-width: 1440px;
      margin: 0 auto;
      padding: 10px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      flex-wrap: wrap;
    }}

    .brand-section {{
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
    }}

    .back-btn {{
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      color: var(--text-primary);
      padding: 7px 13px;
      border-radius: 9px;
      font-size: 13px;
      font-weight: 700;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.15s ease;
    }}
    .back-btn:hover {{
      background: var(--c2s-blue);
      color: #fff;
      border-color: var(--c2s-blue);
    }}

    .brand-title-box {{
      display: flex;
      flex-direction: column;
    }}
    .brand-logo-text {{
      font-weight: 900;
      font-size: 17px;
      color: var(--c2s-blue);
      letter-spacing: -0.3px;
    }}
    .brand-subline {{
      font-size: 11px;
      color: var(--text-muted);
      font-weight: 600;
    }}

    /* Month Selector & Controls */
    .header-controls {{
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }}

    .month-picker {{
      background: var(--bg-secondary);
      border: 1.5px solid var(--c2s-blue);
      color: var(--text-primary);
      padding: 6px 12px;
      border-radius: 8px;
      font-size: 13.5px;
      font-weight: 700;
      outline: none;
      cursor: pointer;
    }}

    .tool-group {{
      display: flex;
      align-items: center;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 2px;
    }}

    .tool-btn {{
      background: transparent;
      border: none;
      color: var(--text-primary);
      padding: 6px 10px;
      font-size: 12.5px;
      font-weight: 700;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.15s ease;
    }}
    .tool-btn:hover {{
      background: var(--bg-tertiary);
    }}
    .tool-btn.active {{
      background: var(--c2s-blue);
      color: #fff;
    }}

    .download-cta-btn {{
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: linear-gradient(135deg, #ea580c, #c2410c);
      color: #fff;
      padding: 7px 15px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 800;
      text-decoration: none;
      box-shadow: 0 3px 8px rgba(234, 88, 12, 0.25);
      transition: transform 0.15s ease;
      white-space: nowrap;
    }}
    .download-cta-btn:hover {{
      transform: translateY(-1px);
    }}

    /* Mobile Quick Nav Bar */
    .mobile-topic-nav {{
      display: none;
      overflow-x: auto;
      white-space: nowrap;
      background: var(--bg-secondary);
      border-bottom: 1px solid var(--border-color);
      padding: 8px 12px;
      scrollbar-width: none;
      -webkit-overflow-scrolling: touch;
    }}
    .mobile-topic-nav::-webkit-scrollbar {{ display: none; }}
    .nav-pill {{
      display: inline-block;
      padding: 6px 14px;
      margin-right: 8px;
      border-radius: 20px;
      background: var(--bg-primary);
      border: 1px solid var(--border-color);
      color: var(--text-primary);
      font-size: 12.5px;
      font-weight: 700;
      text-decoration: none;
    }}
    .nav-pill.active {{
      background: var(--c2s-blue);
      color: #fff;
      border-color: var(--c2s-blue);
    }}

    /* Main Layout */
    .reader-container {{
      max-width: 1440px;
      margin: 0 auto;
      display: flex;
      padding: 24px 18px 80px;
      gap: 32px;
      position: relative;
    }}

    /* Sidebar (Desktop / Laptop) */
    .reader-sidebar {{
      width: var(--sidebar-width);
      flex-shrink: 0;
      position: sticky;
      top: 72px;
      height: calc(100vh - 90px);
      overflow-y: auto;
      padding-right: 10px;
      scrollbar-width: thin;
    }}

    .sidebar-widget {{
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 14px;
      padding: 18px;
      box-shadow: var(--card-shadow);
      margin-bottom: 20px;
    }}
    .widget-title {{
      font-size: 13.5px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--text-muted);
      margin-bottom: 14px;
      display: flex;
      align-items: center;
      gap: 6px;
    }}

    .search-input-box {{
      position: relative;
      margin-bottom: 14px;
    }}
    .search-input-box input {{
      width: 100%;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 9px;
      padding: 8px 12px 8px 34px;
      font-size: 13.5px;
      color: var(--text-primary);
      outline: none;
    }}
    .search-input-box .search-icon {{
      position: absolute;
      left: 10px;
      top: 9px;
      font-size: 14px;
      color: var(--text-muted);
    }}

    .sidebar-nav-list {{
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }}
    .sidebar-nav-item a {{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 9px 12px;
      border-radius: 8px;
      color: var(--text-secondary);
      text-decoration: none;
      font-size: 13.5px;
      font-weight: 700;
      transition: all 0.15s ease;
    }}
    .sidebar-nav-item a:hover {{
      background: var(--bg-secondary);
      color: var(--c2s-blue);
    }}
    .sidebar-nav-item.active a {{
      background: #eff6ff;
      color: var(--c2s-blue);
      font-weight: 800;
      border-left: 3px solid var(--c2s-blue);
    }}
    html[data-theme="dark"] .sidebar-nav-item.active a {{
      background: #1e293b;
    }}
    .sidebar-badge {{
      background: var(--bg-tertiary);
      color: var(--text-muted);
      font-size: 11px;
      font-weight: 800;
      padding: 2px 7px;
      border-radius: 12px;
    }}

    /* Main Content Area */
    .reader-main {{
      flex: 1;
      min-width: 0;
    }}

    /* Hero Banner */
    .magazine-hero {{
      background: linear-gradient(135deg, #1e3a8a, #0f172a);
      color: #fff;
      border-radius: 16px;
      padding: 28px 24px;
      margin-bottom: 30px;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.15);
      position: relative;
      overflow: hidden;
    }}
    .magazine-hero::after {{
      content: "";
      position: absolute;
      top: -40px;
      right: -40px;
      width: 220px;
      height: 220px;
      background: radial-gradient(circle, rgba(234, 88, 12, 0.25), transparent 70%);
      pointer-events: none;
    }}
    .hero-tag-row {{
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 10px;
      flex-wrap: wrap;
    }}
    .hero-tag {{
      background: rgba(255, 255, 255, 0.15);
      color: #93c5fd;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 11.5px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }}
    .hero-title {{
      font-size: clamp(22px, 3.5vw, 32px);
      font-weight: 900;
      margin-bottom: 8px;
      line-height: 1.25;
      color: #ffffff;
    }}
    .hero-subtitle {{
      font-size: clamp(14px, 1.8vw, 15.5px);
      color: #cbd5e1;
      margin-bottom: 20px;
      line-height: 1.55;
    }}
    .hero-stats-grid {{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
      gap: 12px;
      margin-bottom: 20px;
    }}
    .hero-stat-card {{
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 10px;
      padding: 10px 14px;
    }}
    .hero-stat-val {{
      font-size: 19px;
      font-weight: 900;
      color: #fdba74;
    }}
    .hero-stat-lbl {{
      font-size: 11px;
      color: #94a3b8;
      font-weight: 700;
      text-transform: uppercase;
    }}
    .hero-cta-row {{
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }}

    /* Topic Sections */
    .topic-section {{
      margin-bottom: 48px;
      scroll-margin-top: 80px;
    }}
    .topic-header {{
      margin-bottom: 16px;
    }}
    .topic-badge-row {{
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 6px;
    }}
    .topic-pill {{
      background: #eff6ff;
      color: var(--c2s-blue);
      border: 1px solid #bfdbfe;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 800;
    }}
    html[data-theme="dark"] .topic-pill {{
      background: #1e293b;
      border-color: #3b82f6;
      color: #93c5fd;
    }}
    .topic-meta {{
      font-size: 12.5px;
      color: var(--text-muted);
      font-weight: 600;
    }}
    .topic-title {{
      font-size: clamp(20px, 2.5vw, 26px);
      font-weight: 900;
      color: var(--text-primary);
      letter-spacing: -0.3px;
    }}

    /* Subtabs (Notes vs Quiz) */
    .topic-subtabs {{
      display: flex;
      gap: 8px;
      border-bottom: 2px solid var(--border-color);
      margin-bottom: 22px;
      padding-bottom: 4px;
    }}
    .subtab-btn {{
      background: transparent;
      border: none;
      padding: 8px 16px;
      font-size: 14px;
      font-weight: 700;
      color: var(--text-muted);
      cursor: pointer;
      position: relative;
      border-radius: 6px 6px 0 0;
      transition: all 0.15s ease;
    }}
    .subtab-btn:hover {{
      color: var(--text-primary);
    }}
    .subtab-btn.active {{
      color: var(--c2s-blue);
      font-weight: 800;
    }}
    .subtab-btn.active::after {{
      content: "";
      position: absolute;
      bottom: -6px;
      left: 0;
      right: 0;
      height: 3px;
      background: var(--c2s-blue);
      border-radius: 3px;
    }}

    /* Article Card */
    .ca-card {{
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 14px;
      padding: 24px;
      margin-bottom: 22px;
      box-shadow: var(--card-shadow);
      transition: border-color 0.15s ease;
    }}
    .ca-card:hover {{
      border-color: #93c5fd;
    }}
    .ca-card-header {{
      display: flex;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 14px;
    }}
    .ca-num-badge {{
      background: var(--c2s-blue);
      color: #fff;
      font-size: 12px;
      font-weight: 900;
      padding: 3px 8px;
      border-radius: 6px;
      flex-shrink: 0;
      margin-top: 3px;
    }}
    .ca-card-title {{
      font-size: 18.5px;
      font-weight: 800;
      color: var(--text-primary);
      line-height: 1.35;
    }}
    .art-lead {{
      font-size: 15px;
      color: var(--text-secondary);
      margin-bottom: 14px;
      line-height: 1.65;
    }}
    .art-bullets {{
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 7px;
      margin-bottom: 16px;
    }}
    .art-bullets li {{
      position: relative;
      padding-left: 20px;
      font-size: 14.5px;
      color: var(--text-primary);
      line-height: 1.6;
    }}
    .art-bullets li::before {{
      content: "•";
      position: absolute;
      left: 6px;
      color: var(--c2s-blue);
      font-weight: 900;
      font-size: 18px;
      top: -2px;
    }}

    /* Static GK Box */
    .art-static-box {{
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 10px;
      padding: 16px 18px;
      margin-top: 16px;
    }}
    html[data-theme="sepia"] .art-static-box {{
      background: #f7eedb;
      border-color: #e3d2b3;
    }}
    html[data-theme="dark"] .art-static-box {{
      background: #0f241a;
      border-color: #166534;
    }}
    .static-box-title {{
      font-size: 13.5px;
      font-weight: 800;
      color: #166534;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 6px;
    }}
    html[data-theme="dark"] .static-box-title {{
      color: #86efac;
    }}
    .static-bullets {{
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }}
    .static-bullets li {{
      position: relative;
      padding-left: 18px;
      font-size: 13.5px;
      color: var(--text-secondary);
      line-height: 1.55;
    }}
    .static-bullets li::before {{
      content: "▪";
      position: absolute;
      left: 4px;
      color: #16a34a;
      font-size: 13px;
    }}

    /* MCQ Grid & Cards */
    .quiz-info-banner {{
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 14px 18px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
    }}
    .quiz-info-text strong {{
      display: block;
      font-size: 15px;
      color: var(--text-primary);
    }}
    .quiz-info-text span {{
      font-size: 12.5px;
      color: var(--text-muted);
    }}
    .quiz-score-badge {{
      background: var(--c2s-blue);
      color: #fff;
      font-size: 14px;
      font-weight: 800;
      padding: 6px 14px;
      border-radius: 20px;
    }}

    .mcq-grid {{
      display: grid;
      grid-template-columns: 1fr;
      gap: 18px;
    }}
    .mcq-card {{
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 14px;
      padding: 20px;
      box-shadow: var(--card-shadow);
      transition: all 0.15s ease;
    }}
    .mcq-header {{
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 10px;
    }}
    .mcq-pill {{
      background: #eff6ff;
      color: var(--c2s-blue);
      font-size: 12px;
      font-weight: 800;
      padding: 3px 8px;
      border-radius: 6px;
    }}
    .mcq-tag {{
      font-size: 11.5px;
      color: var(--text-muted);
      font-weight: 600;
    }}
    .mcq-question {{
      font-size: 15.5px;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 14px;
      line-height: 1.5;
    }}
    .mcq-options {{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 10px;
      margin-bottom: 14px;
    }}
    .mcq-opt-btn {{
      display: flex;
      align-items: center;
      gap: 10px;
      background: var(--bg-secondary);
      border: 1.5px solid var(--border-color);
      border-radius: 9px;
      padding: 10px 14px;
      color: var(--text-primary);
      font-size: 14px;
      text-align: left;
      cursor: pointer;
      transition: all 0.15s ease;
      width: 100%;
    }}
    .mcq-opt-btn:hover {{
      border-color: var(--c2s-blue);
      background: var(--bg-tertiary);
    }}
    .opt-label {{
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 26px;
      height: 26px;
      background: var(--bg-primary);
      border: 1px solid var(--border-color);
      border-radius: 50%;
      font-size: 12px;
      font-weight: 800;
      flex-shrink: 0;
    }}
    .mcq-opt-btn.correct {{
      background: #dcfce7 !important;
      border-color: #22c55e !important;
      color: #15803d !important;
    }}
    .mcq-opt-btn.correct .opt-label {{
      background: #22c55e;
      color: #fff;
      border-color: #22c55e;
    }}
    .mcq-opt-btn.wrong {{
      background: #fee2e2 !important;
      border-color: #ef4444 !important;
      color: #b91c1c !important;
    }}
    .mcq-opt-btn.wrong .opt-label {{
      background: #ef4444;
      color: #fff;
      border-color: #ef4444;
    }}

    .mcq-action-row {{
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid var(--border-color);
      padding-top: 10px;
      margin-top: 10px;
    }}
    .reveal-btn {{
      background: transparent;
      border: none;
      color: var(--c2s-blue);
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 6px;
    }}
    .reveal-btn:hover {{
      background: var(--bg-secondary);
    }}
    .mcq-ans-hint {{
      font-size: 13px;
      color: #15803d;
      font-weight: 600;
    }}

    .hidden {{ display: none !important; }}

    /* Responsive adjustments */
    @media (max-width: 992px) {{
      .reader-sidebar {{ display: none; }}
      .mobile-topic-nav {{ display: block; position: sticky; top: 60px; z-index: 90; }}
      .reader-container {{ padding: 16px 14px 70px; }}
      .mcq-options {{ grid-template-columns: 1fr; }}
    }}

    @media (max-width: 600px) {{
      .header-inner {{ padding: 8px 12px; gap: 8px; }}
      .brand-title-box {{ display: none; }}
      .hero-title {{ font-size: 22px; }}
      .hero-stats-grid {{ grid-template-columns: 1fr 1fr; }}
      .ca-card {{ padding: 16px; }}
      .mcq-card {{ padding: 16px; }}
    }}

    /* Print styling */
    @media print {{
      .reader-header, .mobile-topic-nav, .reader-sidebar, .topic-subtabs, .mcq-action-row, .reveal-btn {{
        display: none !important;
      }}
      .reader-container {{ padding: 0; margin: 0; }}
      .ca-card, .mcq-card {{
        border: 1px solid #ccc;
        box-shadow: none;
        break-inside: avoid;
      }}
    }}
  </style>
</head>
<body>

  <!-- Top Navigation Bar -->
  <header class="reader-header">
    <div class="header-inner">
      <div class="brand-section">
        <a href="index.html#current-affairs" class="back-btn" title="Back to C2S Portal">
          ← C2S Portal
        </a>
        <div class="brand-title-box">
          <span class="brand-logo-text">C2S Current Affairs</span>
          <span class="brand-subline">Notes of Current events</span>
        </div>
      </div>

      <div class="header-controls">
        <!-- Month Selector Dropdown -->
        <select id="monthSelect" class="month-picker" onchange="changeEdition(this.value)">
          <option value="sep-2026" selected>📅 September 2026 (Full 87 Pages Edition)</option>
          <option value="aug-2026">📅 August 2026 (Monthly Digest Archive)</option>
          <option value="jul-2026">📅 July 2026 (Monthly Digest Archive)</option>
          <option value="oct-2026">📅 October 2026 (Upcoming Release)</option>
        </select>

        <!-- Theme Tool -->
        <div class="tool-group" title="Select Theme">
          <button class="tool-btn active" onclick="setTheme('light')">☀️</button>
          <button class="tool-btn" onclick="setTheme('sepia')">📜</button>
          <button class="tool-btn" onclick="setTheme('dark')">🌙</button>
        </div>

        <!-- Font Size Tool -->
        <div class="tool-group" title="Adjust Text Size">
          <button class="tool-btn" onclick="setFont('small')">A-</button>
          <button class="tool-btn active" onclick="setFont('medium')">A</button>
          <button class="tool-btn" onclick="setFont('large')">A+</button>
        </div>

        <!-- Download PDF Button -->
        <a href="materials/C2S-Current-Affairs-September-2026.pdf" download="C2S-Current-Affairs-September-2026.pdf" class="download-cta-btn" title="Download Printable PDF">
          📥 Download PDF (87 Pgs)
        </a>
      </div>
    </div>
  </header>

  <!-- Mobile Quick Topic Bar (Horizontal Scroll) -->
  <nav class="mobile-topic-nav" id="mobileNav">
    <a href="#sec-appointments" class="nav-pill active">👔 Appointments</a>
    <a href="#sec-sports" class="nav-pill">🏆 Sports</a>
    <a href="#sec-awards" class="nav-pill">🎖️ Awards</a>
    <a href="#sec-military-exercises" class="nav-pill">⚔️ Exercises</a>
    <a href="#sec-national-international" class="nav-pill">🌍 National & Intl</a>
    <a href="#sec-indexes" class="nav-pill">📊 Indexes</a>
  </nav>

  <!-- Main Container -->
  <div class="reader-container">

    <!-- Desktop Sidebar Table of Contents -->
    <aside class="reader-sidebar">
      <!-- Search Box -->
      <div class="sidebar-widget">
        <div class="widget-title">🔍 Quick Search Material</div>
        <div class="search-input-box">
          <span class="search-icon">🔎</span>
          <input type="text" id="searchInput" placeholder="Search events, leaders, sports..." oninput="handleSearch(this.value)">
        </div>
        <span style="font-size:12px;color:var(--text-muted);">Real-time search across all 87 pages</span>
      </div>

      <!-- Chapter Navigation -->
      <div class="sidebar-widget">
        <div class="widget-title">📚 Edition Chapters</div>
        <ul class="sidebar-nav-list" id="sidebarNav">
          <li class="sidebar-nav-item active"><a href="#sec-appointments"><span>👔 Appointments</span> <span class="sidebar-badge">29 Qs</span></a></li>
          <li class="sidebar-nav-item"><a href="#sec-sports"><span>🏆 Sports Milestones</span> <span class="sidebar-badge">40 Qs</span></a></li>
          <li class="sidebar-nav-item"><a href="#sec-awards"><span>🎖️ Awards & Honours</span> <span class="sidebar-badge">25 Qs</span></a></li>
          <li class="sidebar-nav-item"><a href="#sec-military-exercises"><span>⚔️ Military Exercises</span> <span class="sidebar-badge">15 Qs</span></a></li>
          <li class="sidebar-nav-item"><a href="#sec-national-international"><span>🌍 National & Intl</span> <span class="sidebar-badge">40 Qs</span></a></li>
          <li class="sidebar-nav-item"><a href="#sec-indexes"><span>📊 Global Indexes</span> <span class="sidebar-badge">10 Qs</span></a></li>
        </ul>
      </div>

      <!-- Quick Action Box -->
      <div class="sidebar-widget" style="background:linear-gradient(135deg, #eff6ff, #f8fafc);border:1.5px solid #bfdbfe;">
        <div style="font-size:13.5px;font-weight:800;color:#1e3a8a;margin-bottom:8px;">📥 Complete Offline PDF</div>
        <p style="font-size:12.5px;color:#475569;margin-bottom:12px;line-height:1.5;">Printable 87-page magazine complete with questions and answer keys.</p>
        <a href="materials/C2S-Current-Affairs-September-2026.pdf" download="C2S-Current-Affairs-September-2026.pdf" class="download-cta-btn" style="width:100%;justify-content:center;">
          📥 Download PDF (5.3 MB)
        </a>
      </div>
    </aside>

    <!-- Main Content Reader -->
    <main class="reader-main">

      <!-- Hero Header -->
      <div class="magazine-hero">
        <div class="hero-tag-row">
          <span class="hero-tag">MONTHLY CURRENT AFFAIRS SPECIAL</span>
          <span class="hero-tag" style="background:#ea580c;color:#fff;">SEPTEMBER 2026 FULL EDITION</span>
        </div>
        <h1 class="hero-title">Notes of Current events — September 2026</h1>
        <p class="hero-subtitle">Comprehensive monthly editorial magazine published by C2S College to Service. Tailored for UPSC, OPSC, SSC CGL/CHSL, Railway, Banking, Police & State Exams.</p>
        
        <div class="hero-stats-grid">
          <div class="hero-stat-card">
            <div class="hero-stat-val">87</div>
            <div class="hero-stat-lbl">Total Pages</div>
          </div>
          <div class="hero-stat-card">
            <div class="hero-stat-val">6</div>
            <div class="hero-stat-lbl">Core Chapters</div>
          </div>
          <div class="hero-stat-card">
            <div class="hero-stat-val">159</div>
            <div class="hero-stat-lbl">Practice MCQs</div>
          </div>
          <div class="hero-stat-card">
            <div class="hero-stat-val">100%</div>
            <div class="hero-stat-lbl">Answer Verified</div>
          </div>
        </div>

        <div class="hero-cta-row">
          <a href="materials/C2S-Current-Affairs-September-2026.pdf" download="C2S-Current-Affairs-September-2026.pdf" class="download-cta-btn" style="padding:10px 20px;font-size:14px;">
            📥 Download Official PDF (87 Pages)
          </a>
          <button type="button" class="tool-btn" style="background:rgba(255,255,255,0.2);color:#fff;padding:10px 18px;border-radius:8px;font-size:14px;font-weight:800;" onclick="switchAllToQuiz()">
            🎯 Switch All to Quiz Mode
          </button>
        </div>
      </div>

      <!-- Rendered Sections -->
      <div id="sectionsRoot">
        {sections_combined_html}
      </div>

    </main>

  </div>

  <script>
    // Theme Management
    function setTheme(theme) {{
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('c2s_reader_theme', theme);
      document.querySelectorAll('.tool-group:first-of-type .tool-btn').forEach(btn => btn.classList.remove('active'));
      event?.target?.classList.add('active');
    }}

    // Font Size Management
    function setFont(size) {{
      document.documentElement.setAttribute('data-font', size);
      localStorage.setItem('c2s_reader_font', size);
      document.querySelectorAll('.tool-group:nth-of-type(2) .tool-btn').forEach(btn => btn.classList.remove('active'));
      event?.target?.classList.add('active');
    }}

    // Topic View Switching (Notes vs Quiz)
    function switchTopicView(secId, view) {{
      const notesPane = document.getElementById(secId + '-notes-pane');
      const quizPane = document.getElementById(secId + '-quiz-pane');
      const subtabBtns = document.querySelectorAll('#sec-' + secId + ' .subtab-btn');
      
      if (view === 'notes') {{
        notesPane.classList.remove('hidden');
        quizPane.classList.add('hidden');
        subtabBtns[0].classList.add('active');
        subtabBtns[1].classList.remove('active');
      }} else {{
        notesPane.classList.add('hidden');
        quizPane.classList.remove('hidden');
        subtabBtns[0].classList.remove('active');
        subtabBtns[1].classList.add('active');
      }}
    }}

    function switchAllToQuiz() {{
      const sections = ['appointments', 'sports', 'awards', 'military-exercises', 'national-international', 'indexes'];
      sections.forEach(secId => switchTopicView(secId, 'quiz'));
    }}

    // Interactive MCQ Validation
    const sectionScores = {{}};

    function checkMcq(btn, selected, correct) {{
      const card = btn.closest('.mcq-card');
      const optBtns = card.querySelectorAll('.mcq-opt-btn');
      optBtns.forEach(b => b.classList.remove('correct', 'wrong'));
      
      const secSection = card.closest('.topic-section');
      const secId = secSection ? secSection.getAttribute('data-section-id') : 'general';
      if (!sectionScores[secId]) sectionScores[secId] = new Set();
      
      if (selected === correct) {{
        btn.classList.add('correct');
        sectionScores[secId].add(card.getAttribute('data-qnum'));
      }} else {{
        btn.classList.add('wrong');
        // highlight correct option
        optBtns.forEach(b => {{
          if (b.getAttribute('data-letter') === correct) b.classList.add('correct');
        }});
        sectionScores[secId].delete(card.getAttribute('data-qnum'));
      }}

      // Update score tracker
      const tracker = document.getElementById(secId + '-score-tracker');
      if (tracker) {{
        const total = secSection.querySelectorAll('.mcq-card').length;
        tracker.textContent = `Score: ${{sectionScores[secId].size}} / ${{total}}`;
      }}
    }}

    function revealAnswer(btn, correct) {{
      const card = btn.closest('.mcq-card');
      const hint = card.querySelector('.mcq-ans-hint');
      if (hint) hint.classList.remove('hidden');
      const optBtns = card.querySelectorAll('.mcq-opt-btn');
      optBtns.forEach(b => {{
        if (b.getAttribute('data-letter') === correct) b.classList.add('correct');
      }});
      btn.style.display = 'none';
    }}

    // Real-time Search
    function handleSearch(term) {{
      term = term.toLowerCase().trim();
      const articles = document.querySelectorAll('.ca-card');
      const mcqs = document.querySelectorAll('.mcq-card');
      
      articles.forEach(art => {{
        const text = art.textContent.toLowerCase();
        if (!term || text.includes(term)) {{
          art.classList.remove('hidden');
        }} else {{
          art.classList.add('hidden');
        }}
      }});

      mcqs.forEach(mcq => {{
        const text = mcq.textContent.toLowerCase();
        if (!term || text.includes(term)) {{
          mcq.classList.remove('hidden');
        }} else {{
          mcq.classList.add('hidden');
        }}
      }});
    }}

    // Edition Change
    function changeEdition(val) {{
      if (val === 'sep-2026') {{
        // Current loaded edition
        return;
      }}
      alert('Archive for ' + val.toUpperCase() + ' will load. September 2026 is currently the full 87-page featured edition.');
    }}

    // Initialize persisted settings
    const savedTheme = localStorage.getItem('c2s_reader_theme');
    if (savedTheme) setTheme(savedTheme);
    const savedFont = localStorage.getItem('c2s_reader_font');
    if (savedFont) setFont(savedFont);
  </script>
</body>
</html>
"""

output_path = r'c:\Users\lenovo\Website\current-affairs-reader.html'
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(reader_page_html)

print(f"Generated {output_path} successfully. File size: {os.path.getsize(output_path)} bytes.")

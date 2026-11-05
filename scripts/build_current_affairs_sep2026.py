import pypdf
import re
import json
import os

pdf_path = r'c:\Users\lenovo\Website\materials\C2S-Current-Affairs-September-2026.pdf'
reader = pypdf.PdfReader(pdf_path)

def parse_answer_key(text):
    ans_map = {}
    lines = text.split('\n')
    start_collect = False
    for line in lines:
        if any(marker in line for marker in ['Q. No. Answer', 'Q. \nNo. Answer', 'Q. No. \nAnswer', 'Q.No. Answer', 'Q. No.']):
            start_collect = True
            continue
        if start_collect:
            matches = re.findall(r'(\d+)\s+([A-D])\b', line)
            for q_num, ans in matches:
                ans_map[int(q_num)] = ans
    return ans_map

def extract_mcqs(pages, ans_page):
    ans_text = reader.pages[ans_page - 1].extract_text() or ''
    ans_map = parse_answer_key(ans_text)
    
    full_text = ""
    for p in pages:
        t = reader.pages[p - 1].extract_text() or ''
        t = re.sub(r'^\s*\d+\s*\n', '', t)
        for marker in ['Q. No. Answer', 'Q. \nNo. Answer', 'Q. No. \nAnswer', 'Q.\nNo. Answer', 'Q.\n No. Answer']:
            if marker in t:
                t = t[:t.find(marker)]
        if 'IMPORTANT MCQS FOR ALL EXAMS' in t:
            t = t[:t.find('IMPORTANT MCQS FOR ALL EXAMS')]
        full_text += "\n" + t

    q_blocks = re.split(r'\n(?=\d+\.\s+)', full_text)
    mcqs = []
    
    for block in q_blocks:
        block = block.strip()
        m = re.match(r'^(\d+)\.\s+([\s\S]+)', block)
        if not m:
            continue
        q_num = int(m.group(1))
        content = m.group(2).strip()
        content = re.sub(r'\bQ\.\s*No\.\s*Answer[\s\S]*$', '', content).strip()
        
        # Match A. or A) or (A)
        a_match = re.search(r'(?:^|\s)(?:\(?A[.)]\s*)', content)
        opts = {}
        if a_match:
            question_text = content[:a_match.start()].strip()
            rest = content[a_match.start():]
            
            # Split tokens by delimiter: [A-D][.)]
            tokens = re.split(r'(?:^|\s)(?:\(?([A-D])[.)]\s*)', rest)
            i = 1
            while i < len(tokens):
                letter = tokens[i]
                if letter in ['A', 'B', 'C', 'D'] and i + 1 < len(tokens):
                    val = tokens[i+1].strip()
                    val = re.sub(r'\s*\n\s*\d+\s*$', '', val)
                    # clean any trailing junk
                    val = re.sub(r'Q\.\s*No\.\s*Answer.*$', '', val, flags=re.IGNORECASE)
                    opts[letter] = ' '.join(val.split())
                    i += 2
                else:
                    i += 1
        else:
            question_text = content
            
        question_text = ' '.join(question_text.split())
        correct = ans_map.get(q_num, "")
        
        mcqs.append({
            "id": f"q_{q_num}",
            "num": q_num,
            "question": question_text,
            "options": opts,
            "correct": correct
        })
        
    return mcqs

def clean_text_blocks(raw_text):
    # Splits text into bullet points and paragraphs
    lines = [l.strip() for l in raw_text.split('\n') if l.strip()]
    paragraphs = []
    current_para = []
    
    for line in lines:
        if line.startswith('•') or line.startswith('-') or line.startswith('*'):
            if current_para:
                paragraphs.append(' '.join(current_para))
                current_para = []
            paragraphs.append(line)
        else:
            current_para.append(line)
            
    if current_para:
        paragraphs.append(' '.join(current_para))
        
    return paragraphs

print("Loading and parsing all sections...")

# Define sections metadata
sections_def = [
    {
        "id": "appointments",
        "title": "Newly Appointments & Administrative Leaders",
        "badge": "Appointments",
        "icon": "👔",
        "article_pages": (1, 12),
        "mcq_pages": [13, 14],
        "ans_page": 14,
        "expected_mcq": 29
    },
    {
        "id": "sports",
        "title": "Sports, Tournaments & World Records",
        "badge": "Sports",
        "icon": "🏆",
        "article_pages": (15, 33),
        "mcq_pages": [34, 35, 36],
        "ans_page": 36,
        "expected_mcq": 40
    },
    {
        "id": "awards",
        "title": "Awards, Honours & National Recognitions",
        "badge": "Awards & Honours",
        "icon": "🎖️",
        "article_pages": (37, 45),
        "mcq_pages": [46, 47],
        "ans_page": 47,
        "expected_mcq": 25
    },
    {
        "id": "military-exercises",
        "title": "Bilateral & Multinational Military Exercises",
        "badge": "Defence & Exercises",
        "icon": "⚔️",
        "article_pages": (48, 54),
        "mcq_pages": [55, 56],
        "ans_page": 56,
        "expected_mcq": 15
    },
    {
        "id": "national-international",
        "title": "National, Odisha State & International Events",
        "badge": "National & International",
        "icon": "🌍",
        "article_pages": (57, 79),
        "mcq_pages": [80, 81, 82],
        "ans_page": 82,
        "expected_mcq": 40
    },
    {
        "id": "indexes",
        "title": "Global Indexes, Reports & Institutional Rankings",
        "badge": "Indexes & Reports",
        "icon": "📊",
        "article_pages": (83, 86),
        "mcq_pages": [87],
        "ans_page": 87,
        "expected_mcq": 10
    }
]

final_sections = []
total_mcqs_all = 0

for sec in sections_def:
    sec_id = sec["id"]
    title = sec["title"]
    start_p, end_p = sec["article_pages"]
    
    # Extract raw text of articles
    sec_articles_text = ""
    for p in range(start_p - 1, end_p):
        t = reader.pages[p].extract_text() or ""
        t = re.sub(r'^\s*\d+\s*\n', '', t) # remove page number
        sec_articles_text += f"\n--- Page {p+1} ---\n" + t
        
    # Extract MCQs
    mcqs = extract_mcqs(sec["mcq_pages"], sec["ans_page"])
    total_mcqs_all += len(mcqs)
    print(f"[{title}] MCQs extracted: {len(mcqs)} (expected {sec['expected_mcq']})")
    
    final_sections.append({
        "id": sec_id,
        "title": title,
        "badge": sec["badge"],
        "icon": sec["icon"],
        "pageRange": f"Pages {start_p}–{end_p}",
        "rawContent": sec_articles_text,
        "mcqs": mcqs
    })

print(f"All sections processed. Total MCQs: {total_mcqs_all}")

# Structure the overall monthwise magazine object
magazine_data = {
    "month": "September 2026",
    "monthCode": "2026-09",
    "editionTitle": "Notes of Current events",
    "editionSubtitle": "Monthly Current Affairs & General Knowledge Magazine — September 2026 Full Edition",
    "publisher": "C2S — College to Service (Patrapada, Bhubaneswar)",
    "officialPrice": "₹15",
    "pageCount": 87,
    "totalMcqs": total_mcqs_all,
    "pdfDownloadUrl": "/materials/C2S-Current-Affairs-September-2026.pdf",
    "pdfFileName": "C2S-Current-Affairs-September-2026.pdf",
    "sections": final_sections
}

# Write to JSON
json_path = r'c:\Users\lenovo\Website\data\current_affairs_sep_2026.json'
with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(magazine_data, f, ensure_ascii=False, indent=2)
print(f"Saved JSON: {json_path}")

# Write to JS
js_path = r'c:\Users\lenovo\Website\data\current_affairs_sep_2026.js'
with open(js_path, 'w', encoding='utf-8') as f:
    f.write("// C2S Current Affairs Magazine — September 2026 Full Edition\n")
    f.write("// Extracted from the 87-page official publication\n")
    f.write("window.C2S_MAGAZINE_SEP_2026 = ")
    json.dump(magazine_data, f, ensure_ascii=False, indent=2)
    f.write(";\n")
print(f"Saved JS: {js_path}")

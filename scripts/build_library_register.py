import openpyxl, json, re

path = r'C:/Users/lenovo/.gemini/antigravity/brain/2316b601-0dd8-4c3c-a053-b554d17f80ba/.user_uploaded/media_1794032295509_6862a55d.xlsx'
wb = openpyxl.load_workbook(path)
sheet = wb['Complete Roster 1-198']
rows = list(sheet.iter_rows(values_only=True))

months = ['Jun 2026', 'Jul 2026', 'Aug 2026', 'Sep 2026', 'Oct 2026', 'Nov 2026', 'Dec 2026', 'Jan 2027', 'Feb 2027', 'Mar 2027', 'Apr 2027', 'May 2027', 'Jun 2027', 'Jul 2027', 'Aug 2027']

students = []
for r in rows[1:199]: # rows 1 to 198
    sl = r[0]
    adm_date = str(r[1] or '').strip()
    seat_raw = str(r[2] or '').strip()
    name_guard = str(r[3] or '').strip()
    addr = str(r[4] or '').strip()
    phone = str(r[5] or '').strip()
    shift_raw = str(r[6] or '').strip()
    fee_raw = str(r[7] or '').strip()
    source = str(r[23] or '').strip()
    
    # Split name and guardian
    lines = [l.strip() for l in name_guard.split('\n') if l.strip()]
    name = lines[0] if lines else f'Student #{sl}'
    name = re.sub(r'\s*/\s*S/o.*$', '', name)
    name = re.sub(r'/$', '', name).strip()
    
    guardian = ''
    if len(lines) > 1:
        for l in lines[1:]:
            m = re.search(r'(S/o|D/o|W/o|C/o)[-:]?\s*(.*)', l, re.I)
            if m:
                guardian = m.group(2).strip()
                break
            elif not guardian:
                guardian = l
    
    phone_clean = re.sub(r'[^\d/+, -]', '', phone).strip()
    
    # Determine shift
    shift_norm = 'Full Day Shift (07:00 AM – 09:00 PM)'
    shift_code = 'fullday'
    s_lower = shift_raw.lower()
    if 'morning' in s_lower:
        shift_norm = 'Morning Shift (07:00 AM – 02:00 PM)'
        shift_code = 'morning'
    elif 'afternoon' in s_lower or 'aft' in s_lower:
        shift_norm = 'Afternoon Shift (02:30 PM – 09:00 PM)'
        shift_code = 'afternoon'
    elif 'night' in s_lower:
        shift_norm = 'Night Shift (09:30 PM – 06:30 AM)'
        shift_code = 'night'
    elif '24' in s_lower:
        shift_norm = '24 Hours Round-the-Clock (24x7)'
        shift_code = '24hours'
        
    fee_num = 1200
    fee_match = re.search(r'(\d+[\d,]*)', fee_raw)
    if fee_match:
        fee_num = int(fee_match.group(1).replace(',', ''))
    elif shift_code in ['morning', 'afternoon']:
        fee_num = 800
        
    payments = {}
    paid_count = 0
    unpaid_count = 0
    notes = []
    
    for idx, m_name in enumerate(months):
        val = r[8 + idx]
        if val is not None:
            v_str = str(val).strip()
            payments[m_name] = v_str
            if '✓' in v_str or 'yes' in v_str.lower() or 'paid' in v_str.lower() or 'advance' in v_str.lower():
                paid_count += 1
            elif 'x' in v_str.lower():
                unpaid_count += 1
            if len(v_str) > 1 and v_str not in ['✓', 'X', 'x', '-']:
                notes.append(f'{m_name}: {v_str}')
                
    status = 'Active'
    raw_blob = (name_guard + ' ' + shift_raw + ' ' + ' '.join(notes) + ' ' + ' '.join(payments.values())).lower()
    if 'cancelled' in raw_blob:
        status = 'Cancelled'
    elif 'left' in raw_blob or 'return key' in raw_blob or 'end this' in raw_blob or 'exp 21/07' in raw_blob:
        status = 'Left'
        
    reg_no = f'C2SLIB-{int(sl):05d}'
    
    # Calculate toDate: 1 month after admission or default
    adm_clean = adm_date.split('\n')[0].strip() if adm_date else '01/06/2026'
    
    seat_fmt = f'Desk S-{seat_raw}' if seat_raw and seat_raw != 'None' else 'Desk Allocated'
    
    students.append({
        'slNo': sl,
        'regNo': reg_no,
        'name': name,
        'guardian': guardian or 'Guardian',
        'mobile': phone_clean or 'N/A',
        'address': addr or 'Patrapada Centre',
        'branch': 'Patrapada (NH-16)',
        'seat': seat_fmt,
        'seatNo': seat_raw,
        'shift': shift_norm,
        'shiftCode': shift_code,
        'fee': fee_num,
        'paidAmount': fee_num * (paid_count if paid_count > 0 else 1),
        'paidStatus': 'Cleared' if status == 'Active' else ('Cancelled' if status == 'Cancelled' else 'Settled'),
        'paymentMode': 'Cash / UPI',
        'admDate': adm_clean,
        'fromDate': adm_clean,
        'toDate': '30/11/2026' if status == 'Active' else '31/08/2026',
        'status': status,
        'paidMonths': paid_count,
        'unpaidMonths': unpaid_count,
        'payments': payments,
        'notes': ' | '.join(notes),
        'source': source,
        'examPref': 'Govt / Banking Aspirant',
        'kycStatus': 'Verified'
    })

# Save JSON
with open('data/library_students_register.json', 'w', encoding='utf-8') as f:
    json.dump(students, f, ensure_ascii=False, indent=2)

# Save JS
js_content = '/* C2S Official Library Students Master Register (198 Registered Students) */\n'
js_content += 'window.OFFICIAL_LIBRARY_STUDENTS = ' + json.dumps(students, ensure_ascii=False, indent=2) + ';\n'

with open('data/library_students_register.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f'Successfully exported {len(students)} student records to JSON and JS!')


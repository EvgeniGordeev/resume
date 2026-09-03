/*jshint esversion: 11 */
/*jshint node: true */
'use strict';
// resume.json -> downloads/<Name>_CV.md
// The markdown is the document source for the docx and pdf (pandoc + LibreOffice, see package.json),
// so it follows the ATS layout: single column, MM/YYYY dates, every contact and reference as a link.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');   // scripts/ lives one level below the repo root

// node resume2md.js [resume.json] [out.md]  -- defaults: resume.json -> downloads/<Name>_CV.md
const [srcArg, outArg] = process.argv.slice(2);
const data = JSON.parse(fs.readFileSync(srcArg || path.join(ROOT, 'resume.json'), 'utf8'));
const c = data.contact;
const SEP = ' | ';

const MONTHS = { jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12 };
const mon = (m) => String(MONTHS[m.slice(0, 3).toLowerCase()]).padStart(2, '0');
// 'January 2024 - Present' -> '01/2024 - Present'; 'Oct - Dec 2007' -> '10/2007 - 12/2007'; '2006 - 2010' unchanged
function mmYYYY(text) {
    const t = text.trim();
    const span = t.match(/^([A-Za-z]+)\.?\s*-\s*([A-Za-z]+)\.?\s+(\d{4})$/);
    if (span) return `${mon(span[1])}/${span[3]} - ${mon(span[2])}/${span[3]}`;
    return t.replace(/([A-Za-z]+)\.?\s+(\d{4})/g, (s, m, y) => MONTHS[m.slice(0, 3).toLowerCase()] ? `${mon(m)}/${y}` : s);
}
const bare = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
const link = (label, url) => url ? `[${label}](${url})` : label;
const clean = (s) => s.replace(/\s+/g, ' ').trim();
// YAML turns an unquoted "text: more text" item into a map; fail loudly instead of emitting [object Object]
const str = (v, where) => { if (typeof v !== 'string') throw new Error(`${where}: expected a string, got ${JSON.stringify(v)} (quote the YAML value if it contains ': ')`); return v; };

const lines = [];
const ln = (s = '') => lines.push(s);

// Header
ln(`# ${data.name}`);
ln();
const tagline = data.tagline.split('|').map(s => s.trim()).filter(Boolean).join(' · ');
ln(`**${data.title}**${tagline ? ' · ' + tagline : ''}`);
ln();
const phone = c.phone_print || c.phone;
const phoneUri = c.phone_print_uri || c.phone_uri;
// one line: location | phone | email | linkedin | github.
// The website is left out: it is the resume itself.
ln([
    c.location,
    link(phone, `tel:${phoneUri}`),
    link(c.email, `mailto:${c.email}`),
    c.linkedin && link(bare(c.linkedin), c.linkedin),
    c.github && link(bare(c.github), c.github),
].filter(Boolean).join(SEP));
ln();

// Summary
ln('## Professional Summary');
ln();
for (const p of data.summary) { ln(clean(p)); ln(); }

// Skills, one labeled line per tier
ln('## Technical Skills');
ln();
for (const tier of data.skills) {
    const label = tier.label || tier.tier;
    ln(`**${label}:** ${tier.items.join(', ')}`);
    ln();
}

// Experience
ln('## Professional Experience');
ln();
// print: false skips an entry in the exports only; compact: true renders it as a single line
const printed = data.experience.filter(j => j.print !== false);
const compactJobs = printed.filter(j => j.compact);
for (const job of printed.filter(j => !j.compact)) {
    ln(`### ${link(job.company, job.url)}`);
    ln();
    ln(`**${job.role}**${SEP}${mmYYYY(job.date)}`);
    ln();
    if (job.duties && job.duties.length) {
        ln(`${job.heading || 'Responsibilities'}: ${job.duties.map(d => str(d, job.company + ' duties').replace(/\.$/, '')).join('; ')}.`);
        ln();
    }
    for (const proj of job.projects || []) {
        const linksOnly = (proj.highlights_as_links || []).length && !(proj.highlights || []).length && !proj.description;
        if (linksOnly) {   // e.g. open source: one line of links, not a heading plus bullets
            ln(`**${proj.name}:** ${proj.highlights_as_links.map(l => link(l.label, l.url)).join(', ')}`);
            ln();
            continue;
        }
        ln(`#### ${link(proj.name, proj.url)}`);
        ln();
        if (proj.description) { ln(clean(proj.description)); ln(); }
        for (const h of proj.highlights || []) ln(`- ${str(h, proj.name)}`);
        for (const l of proj.highlights_as_links || []) ln(`- ${link(l.label, l.url)}`);
        if ((proj.highlights || []).length || (proj.highlights_as_links || []).length) ln();
        if (proj.env) {
            const parts = [];
            if (proj.env.tools) parts.push(`*Tools:* ${proj.env.tools}`);
            if (proj.env.techs) parts.push(`*Tech:* ${proj.env.techs}`);
            if (parts.length) { ln(parts.join(SEP)); ln(); }
        }
    }
}

// Roles flagged compact: true in resume.yml collapse to one line each (the website still shows them in full)
if (compactJobs.length) {
    for (const job of compactJobs) {
        const duties = (job.duties || []).map(d => str(d, job.company + ' duties').replace(/\.$/, '')).join('; ');
        ln(`**${job.role}**, ${link(job.company, job.url)}${SEP}${mmYYYY(job.date)}${duties ? '. ' + duties : ''}`);
        ln();
    }
}

// Education
ln('## Education');
ln();
for (const ed of data.education) {
    ln(`**${ed.school}**${SEP}${mmYYYY(ed.date)}${ed.major ? SEP + clean(ed.major) : ''}`);
    ln();
}

// Certifications
ln('## Certifications');
ln();
for (const cert of data.certifications) {
    ln(`- **${link(cert.name, cert.url)}**${SEP}${cert.issuer}${SEP}${mmYYYY(cert.date)}`);
}
ln();

// Languages
ln('## Languages');
ln();
for (const lang of data.languages) {
    const filled = Math.round(lang.level / 5);
    ln(`- ${lang.name}: ${'█'.repeat(filled)}${'░'.repeat(20 - filled)} ${lang.level}%`);
}
ln();

const out = outArg || path.join(ROOT, `downloads/${data.name.replace(/\s+/g, '_')}_CV.md`);
fs.writeFileSync(out, lines.join('\n'));
console.log('Generated ' + path.relative(ROOT, out));

/*jshint esversion: 11 */
/*jshint node: true */
'use strict';
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('resume.json', 'utf8'));

const lines = [];
const ln = (s = '') => lines.push(s);

// Header
ln(`# ${data.name}`);
ln();
ln(`**${data.title}** — ${data.tagline}`);
ln();
ln(`${data.contact.location} | [${data.contact.email}](mailto:${data.contact.email}) | [${data.contact.phone}](tel:${data.contact.phone_uri}) | [GitHub](${data.contact.github}) | [LinkedIn](${data.contact.linkedin})`);
ln();

// Summary
ln('## Summary');
ln();
for (const p of data.summary) {
    ln(p);
    ln();
}

// Skills — flat, comma-separated by tier
ln('## Skills & Expertise');
ln();
const allSkills = data.skills.flatMap(t => t.items);
ln(allSkills.join(' · '));
ln();

// Experience
ln('## Work Experience');
ln();
for (const job of data.experience) {
    const company = job.url ? `[${job.company}](${job.url})` : job.company;
    ln(`### ${job.role} — ${company}`);
    ln(`*${job.date}*`);
    ln();
    for (const d of job.duties) {
        ln(`- ${d}`);
    }
    ln();
    if (job.projects) {
        for (const proj of job.projects) {
            ln(`**${proj.name}**`);
            if (proj.description) {
                ln(`${proj.description}`);
            }
            if (proj.highlights) {
                ln();
                for (const h of proj.highlights) {
                    ln(`- ${h}`);
                }
            }
            if (proj.highlights_as_links) {
                ln();
                for (const link of proj.highlights_as_links) {
                    ln(`- [${link.label}](${link.url})`);
                }
            }
            if (proj.env) {
                ln();
                const parts = [];
                if (proj.env.tools) parts.push(`*Tools:* ${proj.env.tools}`);
                if (proj.env.techs) parts.push(`*Techs:* ${proj.env.techs}`);
                if (parts.length) ln(parts.join(' | '));
            }
            ln();
        }
    }
}

// Certifications
ln('## Certifications');
ln();
for (const cert of data.certifications) {
    const name = cert.url ? `[${cert.name}](${cert.url})` : cert.name;
    ln(`- **${cert.date}** — ${name} *(${cert.issuer})*`);
}
ln();

// Education
ln('## Education');
ln();
for (const ed of data.education) {
    ln(`- **${ed.date}** — ${ed.school} — ${ed.major}`);
}
ln();

// Languages
ln('## Languages');
ln();
for (const lang of data.languages) {
    const bar = '█'.repeat(Math.round(lang.level / 5)) + '░'.repeat(20 - Math.round(lang.level / 5));
    ln(`- ${lang.name}: ${bar} ${lang.level}%`);
}
ln();

fs.writeFileSync('downloads/Evgeni_Gordeev_CV.md', lines.join('\n'));
console.log('Generated downloads/Evgeni_Gordeev_CV.md');

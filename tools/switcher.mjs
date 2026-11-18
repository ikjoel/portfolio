// The "View this portfolio as" bar shared by every page.
import { ROLES } from './roles.mjs';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export const SWITCHER = (active) => `<nav class="roles" aria-label="Portfolio views"><span>View this portfolio as:</span>${[['front-end', 'Front-end', 'index.html'], ...ROLES.map((r) => [r.id, r.label, r.page])].map(([id, label, href]) => `<a href="${href}"${id === active ? ' aria-current="page"' : ''}>${esc(label)}</a>`).join('')}</nav>`;

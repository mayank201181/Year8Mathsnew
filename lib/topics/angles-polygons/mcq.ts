// ---------------------------------------------------------------------------
// Angles, Parallel Lines & Polygons — MCQ papers (4 × 20 questions).
// Diagrams are drawn to scale: every marked angle is the size the text says.
// ---------------------------------------------------------------------------
import type { Paper } from "../../types.ts";

// ----------------------------- diagrams ------------------------------------
const D_P1Q06 = `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two parallel horizontal lines crossed by a slanted line. At the upper crossing, below the line and to the right, an angle of 72 degrees. At the lower crossing, above the line and to the right, angle x."><rect width="400" height="240" fill="#ffffff"/><path d="M183.8 70 L190.6 90.9 A22 22 0 0 0 205.8 70 Z" fill="#c7d2fe" stroke="#334155" stroke-width="1"/><path d="M216.2 170 L236.2 170 A20 20 0 0 0 210.1 151 Z" fill="#fde68a" stroke="#334155" stroke-width="1"/><line x1="20" y1="70" x2="380" y2="70" stroke="#1f2937" stroke-width="2.5"/><line x1="20" y1="170" x2="380" y2="170" stroke="#1f2937" stroke-width="2.5"/><line x1="166" y1="15.4" x2="234" y2="224.6" stroke="#1f2937" stroke-width="2.5"/><polyline points="324,75 330,70 324,65" fill="none" stroke="#1f2937" stroke-width="2"/><polyline points="324,175 330,170 324,165" fill="none" stroke="#1f2937" stroke-width="2"/><text x="212.9" y="95.7" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">72°</text><text x="235.1" y="149.4" font-size="15" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-style="italic">x</text></svg>`;
const D_P1Q09 = `<svg viewBox="0 0 380 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Triangle ABC with side BC extended to D. Angle A is 48 degrees, angle B is 67 degrees, and the exterior angle ACD is marked x."><rect width="380" height="240" fill="#ffffff"/><path d="M126.2 25.4 L118.4 43.8 A20 20 0 0 0 134.7 43.5 Z" fill="#c7d2fe" stroke="#334155" stroke-width="1"/><path d="M50 205 L72 205 A22 22 0 0 0 58.6 184.7 Z" fill="#c7d2fe" stroke="#334155" stroke-width="1"/><path d="M210 205 L234 205 A24 24 0 0 0 199.9 183.2 Z" fill="#fde68a" stroke="#334155" stroke-width="1"/><polygon points="126.2,25.4 50,205 210,205" fill="none" stroke="#1f2937" stroke-width="2.5" stroke-linejoin="round"/><line x1="210" y1="205" x2="350" y2="205" stroke="#1f2937" stroke-width="2.5"/><circle cx="350" cy="205" r="2.5" fill="#1f2937"/><text x="126.8" y="63.9" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">48°</text><text x="81.7" y="188.6" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">67°</text><text x="230.4" y="178.2" font-size="15" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-style="italic">x</text><text x="126.2" y="16.3" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">A</text><text x="37" y="215.1" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">B</text><text x="210" y="225.9" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">C</text><text x="350" y="225.9" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">D</text></svg>`;
const D_P2Q19 = `<svg viewBox="0 0 380 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Triangle ABC with side BC extended to D. The angles inside the triangle are a at A, b at B and c at C. The exterior angle ACD is e."><rect width="380" height="240" fill="#ffffff"/><path d="M137.1 41.2 L127.7 58.9 A20 20 0 0 0 145.2 59.5 Z" fill="#c7d2fe" stroke="#334155" stroke-width="1"/><path d="M50 205 L72 205 A22 22 0 0 0 60.3 185.6 Z" fill="#c7d2fe" stroke="#334155" stroke-width="1"/><path d="M210 205 L202.7 188.6 A18 18 0 0 0 192 205 Z" fill="#bbf7d0" stroke="#334155" stroke-width="1"/><path d="M210 205 L234 205 A24 24 0 0 0 200.2 183.1 Z" fill="#fde68a" stroke="#334155" stroke-width="1"/><polygon points="137.1,41.2 50,205 210,205" fill="none" stroke="#1f2937" stroke-width="2.5" stroke-linejoin="round"/><line x1="210" y1="205" x2="350" y2="205" stroke="#1f2937" stroke-width="2.5"/><circle cx="350" cy="205" r="2.5" fill="#1f2937"/><text x="135.9" y="79.8" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-style="italic">a</text><text x="82.6" y="190" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-style="italic">b</text><text x="184.8" y="193.2" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-style="italic">c</text><text x="230.7" y="178.4" font-size="15" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-style="italic">e</text><text x="137.1" y="32.1" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">A</text><text x="37" y="215.1" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">B</text><text x="210" y="225.9" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">C</text><text x="350" y="225.9" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">D</text></svg>`;
const D_P1Q15 = `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two parallel horizontal lines crossed by a slanted line. At the upper crossing, below the line and to the left, an angle of 63 degrees. At the lower crossing, above the line and to the right, angle b."><rect width="400" height="240" fill="#ffffff"/><path d="M225.5 70 L203.5 70 A22 22 0 0 0 215.5 89.6 Z" fill="#c7d2fe" stroke="#334155" stroke-width="1"/><path d="M174.5 170 L196.5 170 A22 22 0 0 0 184.5 150.4 Z" fill="#fde68a" stroke="#334155" stroke-width="1"/><line x1="20" y1="70" x2="380" y2="70" stroke="#1f2937" stroke-width="2.5"/><line x1="20" y1="170" x2="380" y2="170" stroke="#1f2937" stroke-width="2.5"/><line x1="249.9" y1="22" x2="150.1" y2="218" stroke="#1f2937" stroke-width="2.5"/><polyline points="324,75 330,70 324,65" fill="none" stroke="#1f2937" stroke-width="2"/><polyline points="324,175 330,170 324,165" fill="none" stroke="#1f2937" stroke-width="2"/><text x="193.1" y="94.4" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">63°</text><text x="205.2" y="156.4" font-size="15" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-style="italic">b</text></svg>`;
const D_P1Q17 = `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Parallel lines AB (top) and CD (bottom). Point P lies between them to the right. Angle BAP is 35 degrees, angle DCP is 50 degrees and angle APC is marked x."><rect width="400" height="240" fill="#ffffff"/><path d="M170 50 L194.6 67.2 A30 30 0 0 0 200 50 Z" fill="#c7d2fe" stroke="#334155" stroke-width="1"/><path d="M211.3 190 L237.3 190 A26 26 0 0 0 228 170.1 Z" fill="#c7d2fe" stroke="#334155" stroke-width="1"/><path d="M270 120 L253.6 108.5 A20 20 0 0 0 257.1 135.3 Z" fill="#fde68a" stroke="#334155" stroke-width="1"/><line x1="20" y1="50" x2="380" y2="50" stroke="#1f2937" stroke-width="2.5"/><line x1="20" y1="190" x2="380" y2="190" stroke="#1f2937" stroke-width="2.5"/><polyline points="324,55 330,50 324,45" fill="none" stroke="#1f2937" stroke-width="2"/><polyline points="324,195 330,190 324,185" fill="none" stroke="#1f2937" stroke-width="2"/><line x1="170" y1="50" x2="270" y2="120" stroke="#1f2937" stroke-width="2.5"/><line x1="211.3" y1="190" x2="270" y2="120" stroke="#1f2937" stroke-width="2.5"/><circle cx="170" cy="50" r="2.5" fill="#1f2937"/><circle cx="370" cy="50" r="2.5" fill="#1f2937"/><circle cx="211.3" cy="190" r="2.5" fill="#1f2937"/><circle cx="370" cy="190" r="2.5" fill="#1f2937"/><circle cx="270" cy="120" r="2.5" fill="#1f2937"/><text x="215.8" y="69" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">35°</text><text x="249.3" y="176.8" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">50°</text><text x="238.3" y="129.4" font-size="15" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-style="italic">x</text><text x="170" y="38.9" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">A</text><text x="370" y="38.9" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">B</text><text x="211.3" y="212.9" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">C</text><text x="370" y="212.9" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">D</text><text x="284" y="124.9" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">P</text></svg>`;
const D_P1Q19 = `<svg viewBox="0 0 300 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A pentagon with a point O inside it. O is joined to all five vertices, splitting the pentagon into five triangles."><rect width="300" height="240" fill="#ffffff"/><polygon points="148,130 150,25 270,105" fill="#c7d2fe" fill-opacity="0.6"/><polygon points="148,130 270,105 225,215" fill="#fde68a" fill-opacity="0.6"/><polygon points="148,130 225,215 80,215" fill="#bbf7d0" fill-opacity="0.6"/><polygon points="148,130 80,215 35,100" fill="#bae6fd" fill-opacity="0.6"/><polygon points="148,130 35,100 150,25" fill="#fecaca" fill-opacity="0.6"/><polygon points="150,25 270,105 225,215 80,215 35,100" fill="none" stroke="#1f2937" stroke-width="2.5" stroke-linejoin="round"/><line x1="148" y1="130" x2="150" y2="25" stroke="#334155" stroke-width="1.5"/><line x1="148" y1="130" x2="270" y2="105" stroke="#334155" stroke-width="1.5"/><line x1="148" y1="130" x2="225" y2="215" stroke="#334155" stroke-width="1.5"/><line x1="148" y1="130" x2="80" y2="215" stroke="#334155" stroke-width="1.5"/><line x1="148" y1="130" x2="35" y2="100" stroke="#334155" stroke-width="1.5"/><circle cx="148" cy="130" r="3" fill="#1f2937"/><text x="152" y="152.9" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">O</text></svg>`;
const D_P2Q02 = `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two parallel horizontal lines crossed by a slanted line. At the upper crossing, above the line and to the right, an angle of 58 degrees. At the lower crossing, above the line and to the right, angle y."><rect width="400" height="240" fill="#ffffff"/><path d="M231.2 70 L255.2 70 A24 24 0 0 0 244 49.6 Z" fill="#c7d2fe" stroke="#334155" stroke-width="1"/><path d="M168.8 170 L192.8 170 A24 24 0 0 0 181.5 149.6 Z" fill="#fde68a" stroke="#334155" stroke-width="1"/><line x1="20" y1="70" x2="380" y2="70" stroke="#1f2937" stroke-width="2.5"/><line x1="20" y1="170" x2="380" y2="170" stroke="#1f2937" stroke-width="2.5"/><line x1="258.3" y1="26.7" x2="141.7" y2="213.3" stroke="#1f2937" stroke-width="2.5"/><polyline points="324,75 330,70 324,65" fill="none" stroke="#1f2937" stroke-width="2"/><polyline points="324,175 330,170 324,165" fill="none" stroke="#1f2937" stroke-width="2"/><text x="266.2" y="55.2" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">58°</text><text x="202" y="156.8" font-size="15" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-style="italic">y</text></svg>`;
const D_P2Q07 = `<svg viewBox="0 0 420 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two parallel horizontal lines crossed by a slanted line. At the upper crossing, below the line and to the left, an angle of 3x plus 15 degrees. At the lower crossing, above the line and to the right, an angle of 2x plus 45 degrees."><rect width="420" height="240" fill="#ffffff"/><path d="M196.6 70 L176.6 70 A20 20 0 0 0 201.8 89.3 Z" fill="#c7d2fe" stroke="#334155" stroke-width="1"/><path d="M223.4 170 L243.4 170 A20 20 0 0 0 218.2 150.7 Z" fill="#fde68a" stroke="#334155" stroke-width="1"/><line x1="20" y1="70" x2="400" y2="70" stroke="#1f2937" stroke-width="2.5"/><line x1="20" y1="170" x2="400" y2="170" stroke="#1f2937" stroke-width="2.5"/><line x1="181.5" y1="13.7" x2="238.5" y2="226.3" stroke="#1f2937" stroke-width="2.5"/><polyline points="354,75 360,70 354,65" fill="none" stroke="#1f2937" stroke-width="2"/><polyline points="354,175 360,170 354,165" fill="none" stroke="#1f2937" stroke-width="2"/><text x="134.6" y="96.5" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">(3x + 15)°</text><text x="285.4" y="152.6" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">(2x + 45)°</text></svg>`;
const D_P2Q13 = `<svg viewBox="0 0 340 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three straight lines crossing at one point, making six angles. Above the horizontal line, from right to left, are an angle of 70 degrees, an unmarked angle, and angle y. Below the horizontal line, the angle vertically opposite the unmarked angle is 45 degrees."><rect width="340" height="240" fill="#ffffff"/><path d="M170 120 L200 120 A30 30 0 0 0 180.3 91.8 Z" fill="#c7d2fe" stroke="#334155" stroke-width="1"/><path d="M170 120 L159.7 148.2 A30 30 0 0 0 182.7 147.2 Z" fill="#c7d2fe" stroke="#334155" stroke-width="1"/><path d="M170 120 L157.3 92.8 A30 30 0 0 0 140 120 Z" fill="#fde68a" stroke="#334155" stroke-width="1"/><line x1="300" y1="120" x2="40" y2="120" stroke="#1f2937" stroke-width="2.5"/><line x1="207.6" y1="16.6" x2="132.4" y2="223.4" stroke="#1f2937" stroke-width="2.5"/><line x1="123.5" y1="20.3" x2="216.5" y2="219.7" stroke="#1f2937" stroke-width="2.5"/><text x="209.3" y="97" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">70°</text><text x="172.2" y="174.5" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">45°</text><text x="131.2" y="100.5" font-size="15" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-style="italic">y</text></svg>`;
const D_P2Q16 = `<svg viewBox="0 0 380 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Parallel lines AB (top) and DE (bottom). Point C is on AB. Triangle CDE has angle CDE of 52 degrees. Angle BCE is 71 degrees. Angle DCE is marked x."><rect width="380" height="240" fill="#ffffff"/><path d="M90 200 L114 200 A24 24 0 0 0 104.8 181.1 Z" fill="#c7d2fe" stroke="#334155" stroke-width="1"/><path d="M201.1 57.9 L208.9 80.5 A24 24 0 0 0 225.1 57.9 Z" fill="#c7d2fe" stroke="#334155" stroke-width="1"/><path d="M201.1 57.9 L187.5 75.2 A22 22 0 0 0 208.2 78.7 Z" fill="#fde68a" stroke="#334155" stroke-width="1"/><line x1="20" y1="57.9" x2="360" y2="57.9" stroke="#1f2937" stroke-width="2.5"/><line x1="20" y1="200" x2="360" y2="200" stroke="#1f2937" stroke-width="2.5"/><polyline points="314,62.9 320,57.9 314,52.9" fill="none" stroke="#1f2937" stroke-width="2"/><polyline points="314,205 320,200 314,195" fill="none" stroke="#1f2937" stroke-width="2"/><line x1="201.1" y1="57.9" x2="90" y2="200" stroke="#1f2937" stroke-width="2.5"/><line x1="201.1" y1="57.9" x2="250" y2="200" stroke="#1f2937" stroke-width="2.5"/><circle cx="30" cy="57.9" r="2.5" fill="#1f2937"/><circle cx="350" cy="57.9" r="2.5" fill="#1f2937"/><circle cx="201.1" cy="57.9" r="2.5" fill="#1f2937"/><circle cx="90" cy="200" r="2.5" fill="#1f2937"/><circle cx="250" cy="200" r="2.5" fill="#1f2937"/><text x="126" y="187" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">52°</text><text x="235.2" y="86.8" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">71°</text><text x="195.1" y="98.6" font-size="15" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-style="italic">x</text><text x="30" y="46.8" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">A</text><text x="350" y="46.8" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">B</text><text x="201.1" y="46.8" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">C</text><text x="90" y="222.9" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">D</text><text x="250" y="222.9" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">E</text></svg>`;
const D_P2Q20 = `<svg viewBox="0 0 300 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Square ABCD with A bottom left, B bottom right, C top right and D top left. An equilateral triangle ABE sits inside the square on side AB. D is joined to E, and angle ADE is marked with a question mark."><rect width="300" height="260" fill="#ffffff"/><polygon points="70,225 230,225 150,86.4" fill="#bbf7d0" fill-opacity="0.6"/><path d="M70 65 L70 91 A26 26 0 0 0 95.1 71.7 Z" fill="#fde68a" stroke="#334155" stroke-width="1"/><polygon points="70,225 230,225 230,65 70,65" fill="none" stroke="#1f2937" stroke-width="2.5" stroke-linejoin="round"/><line x1="70" y1="225" x2="150" y2="86.4" stroke="#1f2937" stroke-width="2.5"/><line x1="230" y1="225" x2="150" y2="86.4" stroke="#1f2937" stroke-width="2.5"/><line x1="70" y1="65" x2="150" y2="86.4" stroke="#1f2937" stroke-width="2"/><text x="94.4" y="102" font-size="15" font-family="sans-serif" fill="#1f2937" text-anchor="middle">?</text><text x="58" y="239.9" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">A</text><text x="242" y="239.9" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">B</text><text x="242" y="59.9" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">C</text><text x="58" y="59.9" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">D</text><text x="150" y="111.3" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">E</text></svg>`;
const D_P3Q13 = `<svg viewBox="0 0 340 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Straight lines AB (horizontal) and CD cross at O. OE is perpendicular to AB, pointing up. Angle EOC is 28 degrees. Angle AOD is marked with a question mark."><rect width="340" height="260" fill="#ffffff"/><path d="M170 135 L188.8 99.7 A40 40 0 0 0 170 95 Z" fill="#c7d2fe" stroke="#334155" stroke-width="1"/><path d="M170 135 L142 135 A28 28 0 0 0 156.9 159.7 Z" fill="#fde68a" stroke="#334155" stroke-width="1"/><line x1="30" y1="135" x2="310" y2="135" stroke="#1f2937" stroke-width="2.5"/><line x1="226.3" y1="29" x2="113.7" y2="241" stroke="#1f2937" stroke-width="2.5"/><line x1="170" y1="135" x2="170" y2="20" stroke="#1f2937" stroke-width="2.5"/><polyline points="170,123 158,123 158,135" fill="none" stroke="#1f2937" stroke-width="1.5"/><text x="183.5" y="84.9" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle">28°</text><text x="134" y="161.9" font-size="15" font-family="sans-serif" fill="#1f2937" text-anchor="middle">?</text><text x="18" y="139.9" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">A</text><text x="322" y="139.9" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">B</text><text x="232.4" y="22.5" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">C</text><text x="107.6" y="257.3" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">D</text><text x="170" y="11.9" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">E</text><text x="184" y="153.9" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">O</text></svg>`;
const D_P3Q16 = `<svg viewBox="0 0 370 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rhombus ABCD with B on the left, A at the top, D on the right and C at the bottom. Its diagonals AC and BD meet at M. Angle ABC is 70 degrees. Angle BAM is marked with a question mark."><rect width="370" height="280" fill="#ffffff"/><path d="M55 140 L79.6 157.2 A30 30 0 0 0 79.6 122.8 Z" fill="#c7d2fe" stroke="#334155" stroke-width="1"/><path d="M177.9 54 L158.2 67.7 A24 24 0 0 0 177.9 78 Z" fill="#fde68a" stroke="#334155" stroke-width="1"/><polygon points="177.9,54 55,140 177.9,226 300.7,140" fill="none" stroke="#1f2937" stroke-width="2.5" stroke-linejoin="round"/><line x1="177.9" y1="54" x2="177.9" y2="226" stroke="#334155" stroke-width="1.5"/><line x1="55" y1="140" x2="300.7" y2="140" stroke="#334155" stroke-width="1.5"/><text x="107.6" y="156.7" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">70°</text><text x="160.3" y="92.9" font-size="15" font-family="sans-serif" fill="#1f2937" text-anchor="middle">?</text><text x="177.9" y="42.9" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">A</text><text x="41" y="144.9" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">B</text><text x="177.9" y="248.9" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">C</text><text x="314.7" y="144.9" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">D</text><text x="189.9" y="158.9" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">M</text></svg>`;
const D_P3Q17 = `<svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Parallel lines AB (top) and CD (bottom) crossed by a transversal at P and Q. Dashed lines bisect angle BPQ and angle PQD and meet at R, to the right of the transversal. Angle PRQ is marked with a question mark."><rect width="400" height="260" fill="#ffffff"/><path d="M144.5 60 L153.4 84.4 A26 26 0 0 0 170.5 60 Z" fill="#c7d2fe" stroke="#334155" stroke-width="1"/><path d="M195.5 200 L217.5 200 A22 22 0 0 0 188 179.3 Z" fill="#c7d2fe" stroke="#334155" stroke-width="1"/><path d="M244.5 130 L229.7 119.7 A18 18 0 0 0 234.2 144.7 Z" fill="#fde68a" stroke="#334155" stroke-width="1"/><line x1="20" y1="60" x2="380" y2="60" stroke="#1f2937" stroke-width="2.5"/><line x1="20" y1="200" x2="380" y2="200" stroke="#1f2937" stroke-width="2.5"/><line x1="137.5" y1="40.7" x2="202.5" y2="219.3" stroke="#1f2937" stroke-width="2.5"/><polyline points="339,65 345,60 339,55" fill="none" stroke="#1f2937" stroke-width="2"/><polyline points="339,205 345,200 339,195" fill="none" stroke="#1f2937" stroke-width="2"/><line x1="144.5" y1="60" x2="244.5" y2="130" stroke="#334155" stroke-width="1.8" stroke-dasharray="6 4"/><line x1="195.5" y1="200" x2="244.5" y2="130" stroke="#334155" stroke-width="1.8" stroke-dasharray="6 4"/><text x="214.9" y="140.5" font-size="15" font-family="sans-serif" fill="#1f2937" text-anchor="middle">?</text><text x="30" y="48.9" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">A</text><text x="370" y="48.9" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">B</text><text x="30" y="222.9" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">C</text><text x="370" y="222.9" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">D</text><text x="160.5" y="50.9" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">P</text><text x="179.5" y="220.9" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">Q</text><text x="258.5" y="134.9" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">R</text></svg>`;
const D_P3Q20 = `<svg viewBox="0 0 400 310" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A five-pointed star drawn by joining five points that are not evenly spaced. The tip angles are labelled a at the top, then b, c, d and e going anticlockwise round the star."><rect width="400" height="310" fill="#ffffff"/><path d="M205 20 L196.7 40.4 A22 22 0 0 0 214.5 39.8 Z" fill="#fde68a" stroke="#334155" stroke-width="1"/><path d="M35 115 L54.2 125.7 A22 22 0 0 0 57 114.4 Z" fill="#c7d2fe" stroke="#334155" stroke-width="1"/><path d="M95 290 L113.4 277.9 A22 22 0 0 0 103.3 269.6 Z" fill="#c7d2fe" stroke="#334155" stroke-width="1"/><path d="M330 280 L320.5 260.2 A22 22 0 0 0 310.8 269.3 Z" fill="#c7d2fe" stroke="#334155" stroke-width="1"/><path d="M375 105 L353 105.6 A22 22 0 0 0 356.6 117.1 Z" fill="#c7d2fe" stroke="#334155" stroke-width="1"/><polygon points="205,20 95,290 375,105 35,115 330,280" fill="none" stroke="#1f2937" stroke-width="2.5" stroke-linejoin="round"/><text x="206.1" y="60.9" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-style="italic">a</text><text x="70" y="128.5" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-style="italic">b</text><text x="117.8" y="267.1" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-style="italic">c</text><text x="305.3" y="258.7" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-style="italic">d</text><text x="340.7" y="120.8" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-style="italic">e</text></svg>`;
const D_P4Q07 = `<svg viewBox="0 0 420 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two parallel horizontal lines crossed by a slanted line. At the upper crossing, above the line and to the left, an angle of 2x plus 15 degrees. At the lower crossing, above the line and to the right, an angle of 3x plus 15 degrees."><rect width="420" height="240" fill="#ffffff"/><path d="M196.6 80 L190.9 58.7 A22 22 0 0 0 174.6 80 Z" fill="#c7d2fe" stroke="#334155" stroke-width="1"/><path d="M223.4 180 L245.4 180 A22 22 0 0 0 217.7 158.7 Z" fill="#fde68a" stroke="#334155" stroke-width="1"/><line x1="20" y1="80" x2="400" y2="80" stroke="#1f2937" stroke-width="2.5"/><line x1="20" y1="180" x2="400" y2="180" stroke="#1f2937" stroke-width="2.5"/><line x1="181.5" y1="23.7" x2="238.5" y2="236.3" stroke="#1f2937" stroke-width="2.5"/><polyline points="354,85 360,80 354,75" fill="none" stroke="#1f2937" stroke-width="2"/><polyline points="354,185 360,180 354,175" fill="none" stroke="#1f2937" stroke-width="2"/><text x="134.6" y="64.5" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">(2x + 15)°</text><text x="287.4" y="162.6" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">(3x + 15)°</text></svg>`;
const D_P4Q10 = `<svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two straight lines crossing at a point. One angle is 130 degrees, above the horizontal line. Angle y is next to it, below the horizontal line on the left, so that y and the 130 degree angle together lie along the slanted line."><rect width="320" height="220" fill="#ffffff"/><path d="M160 115 L176.7 95.1 A26 26 0 0 0 134 115 Z" fill="#c7d2fe" stroke="#334155" stroke-width="1"/><path d="M160 115 L130 115 A30 30 0 0 0 140.7 138 Z" fill="#fde68a" stroke="#334155" stroke-width="1"/><line x1="25" y1="115" x2="295" y2="115" stroke="#1f2937" stroke-width="2.5"/><line x1="230.7" y1="30.7" x2="89.3" y2="199.3" stroke="#1f2937" stroke-width="2.5"/><text x="142.3" y="81.5" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">130°</text><text x="118.3" y="139.7" font-size="15" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-style="italic">y</text></svg>`;
const D_P4Q11 = `<svg viewBox="0 0 370 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="An arrowhead-shaped quadrilateral (a dart) pointing right. The tip angle is 70 degrees, the two back corners are 25 degrees each, and the reflex angle at the dent is r."><rect width="370" height="300" fill="#ffffff"/><path d="M330 150 L305.4 132.8 A30 30 0 0 0 305.4 167.2 Z" fill="#c7d2fe" stroke="#334155" stroke-width="1"/><path d="M145.7 20.9 L165.7 55.6 A40 40 0 0 0 178.5 43.9 Z" fill="#c7d2fe" stroke="#334155" stroke-width="1"/><path d="M145.7 279.1 L178.5 256.1 A40 40 0 0 0 165.7 244.4 Z" fill="#c7d2fe" stroke="#334155" stroke-width="1"/><path d="M220.2 150 L211.2 165.6 A18 18 0 1 0 211.2 134.4 Z" fill="#fde68a" stroke="#334155" stroke-width="1"/><polygon points="330,150 145.7,20.9 220.2,150 145.7,279.1" fill="none" stroke="#1f2937" stroke-width="2.5" stroke-linejoin="round"/><text x="282" y="154.6" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">70°</text><text x="187.6" y="70.9" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle">25°</text><text x="187.6" y="237.5" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle">25°</text><text x="252.2" y="155.2" font-size="15" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-style="italic">r</text></svg>`;
const D_P4Q14 = `<svg viewBox="0 0 360 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A folding stool. Two equal legs cross at their midpoints, making an 80 degree angle facing the floor. The seat at the top is parallel to the floor. The acute angle between a leg and the seat is marked with a question mark."><rect width="360" height="250" fill="#ffffff"/><path d="M180 130 L165.9 146.9 A22 22 0 0 0 194.1 146.9 Z" fill="#c7d2fe" stroke="#334155" stroke-width="1"/><path d="M244.3 53.4 L220.3 53.4 A24 24 0 0 0 228.9 71.8 Z" fill="#fde68a" stroke="#334155" stroke-width="1"/><line x1="30" y1="206.6" x2="330" y2="206.6" stroke="#1f2937" stroke-width="2.5"/><line x1="40" y1="206.6" x2="30" y2="216.6" stroke="#334155" stroke-width="1"/><line x1="70" y1="206.6" x2="60" y2="216.6" stroke="#334155" stroke-width="1"/><line x1="100" y1="206.6" x2="90" y2="216.6" stroke="#334155" stroke-width="1"/><line x1="130" y1="206.6" x2="120" y2="216.6" stroke="#334155" stroke-width="1"/><line x1="160" y1="206.6" x2="150" y2="216.6" stroke="#334155" stroke-width="1"/><line x1="190" y1="206.6" x2="180" y2="216.6" stroke="#334155" stroke-width="1"/><line x1="220" y1="206.6" x2="210" y2="216.6" stroke="#334155" stroke-width="1"/><line x1="250" y1="206.6" x2="240" y2="216.6" stroke="#334155" stroke-width="1"/><line x1="280" y1="206.6" x2="270" y2="216.6" stroke="#334155" stroke-width="1"/><line x1="310" y1="206.6" x2="300" y2="216.6" stroke="#334155" stroke-width="1"/><rect x="85.7" y="43.4" width="188.6" height="10" fill="#bbf7d0" stroke="#1f2937" stroke-width="2"/><line x1="115.7" y1="206.6" x2="244.3" y2="53.4" stroke="#1f2937" stroke-width="2.5"/><line x1="244.3" y1="206.6" x2="115.7" y2="53.4" stroke="#1f2937" stroke-width="2.5"/><circle cx="180" cy="130" r="3" fill="#1f2937"/><text x="180" y="172.6" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">80°</text><text x="209.8" y="74.7" font-size="15" font-family="sans-serif" fill="#1f2937" text-anchor="middle">?</text><text x="314.3" y="35.6" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle">seat</text><text x="300" y="198.8" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle">floor</text></svg>`;
const D_P4Q15 = `<svg viewBox="0 0 400 290" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A regular pentagon sits on top of a square, sharing the side AB. Angle x is at B, outside both shapes, between the pentagon's side and the square's side."><rect width="400" height="290" fill="#ffffff"/><polygon points="150,175 250,175 280.9,79.9 200,21.1 119.1,79.9" fill="#bbf7d0" fill-opacity="0.6"/><polygon points="150,175 250,175 250,275 150,275" fill="#bae6fd" fill-opacity="0.6"/><path d="M250 175 L250 199 A24 24 0 0 0 257.4 152.2 Z" fill="#fde68a" stroke="#334155" stroke-width="1"/><polygon points="150,175 250,175 280.9,79.9 200,21.1 119.1,79.9" fill="none" stroke="#1f2937" stroke-width="2.5" stroke-linejoin="round"/><polygon points="150,175 250,175 250,275 150,275" fill="none" stroke="#1f2937" stroke-width="2.5" stroke-linejoin="round"/><polyline points="161,175 161,186 150,186" fill="none" stroke="#1f2937" stroke-width="1.5"/><text x="289.5" y="186.5" font-size="15" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-style="italic">x</text><text x="136" y="179.9" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">A</text><text x="238" y="165.9" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">B</text></svg>`;
const D_P4Q17 = `<svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Parallel lines AB (top) and CD (bottom). Point P lies between them, to the left of A and C. Angle BAP is 130 degrees, angle DCP is 140 degrees, and angle APC is marked x."><rect width="400" height="260" fill="#ffffff"/><path d="M177.1 50 L163 66.9 A22 22 0 0 0 199.1 50 Z" fill="#c7d2fe" stroke="#334155" stroke-width="1"/><path d="M205.3 210 L227.3 210 A22 22 0 0 0 188.5 195.9 Z" fill="#c7d2fe" stroke="#334155" stroke-width="1"/><path d="M110 130 L126.9 144.1 A22 22 0 0 0 124.1 113.1 Z" fill="#fde68a" stroke="#334155" stroke-width="1"/><line x1="20" y1="50" x2="380" y2="50" stroke="#1f2937" stroke-width="2.5"/><line x1="20" y1="210" x2="380" y2="210" stroke="#1f2937" stroke-width="2.5"/><polyline points="334,55 340,50 334,45" fill="none" stroke="#1f2937" stroke-width="2"/><polyline points="334,215 340,210 334,205" fill="none" stroke="#1f2937" stroke-width="2"/><line x1="177.1" y1="50" x2="110" y2="130" stroke="#1f2937" stroke-width="2.5"/><line x1="205.3" y1="210" x2="110" y2="130" stroke="#1f2937" stroke-width="2.5"/><circle cx="177.1" cy="50" r="2.5" fill="#1f2937"/><circle cx="370" cy="50" r="2.5" fill="#1f2937"/><circle cx="205.3" cy="210" r="2.5" fill="#1f2937"/><circle cx="370" cy="210" r="2.5" fill="#1f2937"/><circle cx="110" cy="130" r="2.5" fill="#1f2937"/><text x="193.2" y="89" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">130°</text><text x="218.3" y="178.8" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">140°</text><text x="145.9" y="132.1" font-size="15" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-style="italic">x</text><text x="177.1" y="38.9" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">A</text><text x="370" y="38.9" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">B</text><text x="205.3" y="232.9" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">C</text><text x="370" y="232.9" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">D</text><text x="96" y="134.9" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">P</text></svg>`;

export const mcqPapers: Paper[] = [
  // ======================================================================
  // MCQ Paper 1
  // ======================================================================
  {
    id: "angles-polygons-m1",
    title: "MCQ Paper 1",
    questions: [
      {
        kind: "mcq",
        id: "angles-polygons-m1-q01",
        question: "Three angles sit together on a straight line. Two of them are 47° and 68°. What is the third angle?",
        options: ["65°", "245°", "115°", "112°"],
        answerIndex: 0,
        explanation:
          "Angles on a straight line add to 180°: 180 − 47 − 68 = 65°. 245° comes from using 360° (a full turn round a point) instead of 180°. 115° is just the two known angles added together — that's the part already used up, not what is left. 112° is 180 − 68, which forgets the 47°.",
        difficulty: "warmup",
        guideRef: "angle-facts",
        hints: ["What do angles on a straight line add up to?"],
        strategy: "Subtract from the total",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m1-q02",
        question: "Two straight lines cross, making four angles. One of them is 38°. What are the other three angles?",
        options: ["142°, 142° and 142°", "52°, 38° and 52°", "38°, 142° and 142°", "38°, 38° and 38°"],
        answerIndex: 2,
        explanation:
          "The angle directly opposite the 38° is also 38° (vertically opposite angles are equal). The other two each share a straight line with the 38°, so each is 180 − 38 = 142°. Check: 38 + 142 + 38 + 142 = 360° ✓. 52° comes from using 90° instead of 180° — that only works when angles make a right angle. Four equal angles of 38° would add to only 152°, not 360°.",
        difficulty: "warmup",
        guideRef: "angle-facts",
        hints: ["Which angle is directly across the crossing from the 38°? Which angles share a straight line with it?"],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m1-q03",
        question: "An isosceles triangle has an angle of 40° between its two equal sides. What size is each of the other two angles?",
        options: ["140°", "70°", "100°", "40°"],
        answerIndex: 1,
        explanation:
          "The two base angles are equal and share what is left of 180°: 180 − 40 = 140°, so each is 140 ÷ 2 = 70°. 140° forgets to share it between the two base angles. 100° comes from treating the 40° as a base angle (180 − 40 − 40) — but the 40° is between the equal sides, so it is the odd one out.",
        difficulty: "warmup",
        guideRef: "triangles",
        hints: ["The two equal angles are at the ends of the third side. How much of the 180° is left for them?"],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m1-q04",
        question: "What do the interior angles of a hexagon (6 sides) add up to?",
        options: ["1080°", "360°", "540°", "720°"],
        answerIndex: 3,
        explanation:
          "Drawing diagonals from one vertex splits a hexagon into 6 − 2 = 4 triangles, so its angles add to 4 × 180 = 720°. 1080° comes from 6 × 180, as if there were one triangle per side. 360° is the total for a quadrilateral, and 540° is the total for a pentagon.",
        difficulty: "warmup",
        guideRef: "polygon-angles",
        hints: ["How many triangles do you get if you draw every diagonal from one corner of a hexagon?"],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m1-q05",
        question: "Which of these is true for **every** parallelogram?",
        options: ["Its diagonals are equal in length", "Its diagonals cross at right angles", "Its opposite angles are equal", "All four sides are equal"],
        answerIndex: 2,
        explanation:
          "In every parallelogram the opposite angles are equal (and neighbouring angles add to 180°, because they are co-interior between parallel sides). Equal diagonals belong to rectangles, while diagonals crossing at right angles and four equal sides belong to rhombuses. A long, slanted parallelogram has none of those extras.",
        difficulty: "warmup",
        guideRef: "quadrilaterals",
        hints: ["Picture a long, slanted parallelogram — not a square or a rectangle. Which property still holds?"],
        strategy: "Consider extremes",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m1-q06",
        question: "The two horizontal lines are parallel. Find angle x.",
        diagram: D_P1Q06,
        options: ["108°", "72°", "18°", "288°"],
        answerIndex: 0,
        explanation:
          "The 72° and x are both between the parallel lines and on the same side of the slanted line, so they are co-interior angles (a C-shape) and add to 180°: x = 180 − 72 = 108°. 72° assumes they are equal, which is true for alternate (Z) or corresponding (F) angles, not co-interior ones — and x is clearly obtuse in the diagram. 18° uses 90° instead of 180°.",
        difficulty: "core",
        guideRef: "parallel-lines",
        hints: [
          "Are both angles between the parallel lines? Are they on the same side of the slanted line?",
          "Trace the shape the two angles make: an F, a Z or a C?",
          "Co-interior (C-shape) angles add to 180°.",
        ],
        strategy: "Spot the F, Z or C shape",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m1-q07",
        question: "Four angles meet at a point. They are 2x, 3x, 70° and 40°. Find x.",
        options: ["x = 14", "x = 250", "x = 100", "x = 50"],
        answerIndex: 3,
        explanation:
          "Angles round a point add to 360°: 2x + 3x + 70 + 40 = 360, so 5x = 250 and x = 50. Check: 100 + 150 + 70 + 40 = 360 ✓. x = 14 comes from using 180° instead of 360°. x = 250 stops before dividing by 5, and 100 is the size of the angle 2x, not x itself.",
        difficulty: "core",
        guideRef: "angle-facts",
        hints: [
          "What do the angles round a point add up to?",
          "Collect the x terms: 2x + 3x = 5x. What is left for 5x once you take away 70 and 40?",
          "5x = 250 — now finish it.",
        ],
        strategy: "Introduce a variable",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m1-q08",
        question:
          "Ravi says: “These two angles between parallel lines are co-interior, so they are equal. One is 64°, so the other is 64° too.” What is his mistake?",
        options: [
          "There is no mistake — co-interior angles are equal, so the other is 64°",
          "Co-interior angles add to 180°, so the other is 116°",
          "Co-interior angles add to 90°, so the other is 26°",
          "Co-interior angles add to 360°, so the other is 296°",
        ],
        answerIndex: 1,
        explanation:
          "Co-interior angles (a C-shape: between the parallel lines, same side of the transversal) add to 180°, so the other angle is 180 − 64 = 116°. Ravi has mixed them up with alternate or corresponding angles, which are equal. 296° can't be right: an angle tucked between two parallel lines on one side of a transversal must be less than 180°.",
        difficulty: "core",
        guideRef: "parallel-lines",
        hints: [
          "Sketch a C-shape between two parallel lines. If one angle is acute, what does the other look like?",
          "One acute and one obtuse — so they can't be equal. What do they add to?",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m1-q09",
        question: "Side BC of triangle ABC is extended to D. Angle A = 48° and angle B = 67°. Find the exterior angle x.",
        diagram: D_P1Q09,
        options: ["65°", "115°", "19°", "132°"],
        answerIndex: 1,
        explanation:
          "An exterior angle of a triangle equals the sum of the two interior opposite angles: x = 48 + 67 = 115°. (The long way agrees: angle ACB = 180 − 115 = 65°, and 65 + x = 180 on the straight line BCD, so x = 115°.) 65° is the interior angle at C, not the exterior one. 132° is 180 − 48, which ignores angle B.",
        difficulty: "core",
        guideRef: "triangles",
        hints: [
          "Which two angles of the triangle are not next to x?",
          "An exterior angle equals the sum of the two interior opposite angles.",
          "Or the long way: find angle ACB first, then use the straight line BCD.",
        ],
        strategy: "Use a known shortcut",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m1-q10",
        question: "A kite has two equal angles of 110°. A third angle is 85°. What is the fourth angle?",
        options: ["85°", "70°", "165°", "55°"],
        answerIndex: 3,
        explanation:
          "The angles of any quadrilateral add to 360°: 360 − 110 − 110 − 85 = 55°. A kite is only guaranteed one pair of equal angles (here the 110° pair), so the other two need not match. 85° assumes a second equal pair, as in a parallelogram. 70° shares the leftover 140° equally between the last two angles, even though one of them is already known to be 85°. 165° subtracts only one of the 110° angles.",
        difficulty: "core",
        guideRef: "quadrilaterals",
        hints: [
          "What do the angles of any quadrilateral add up to?",
          "How many 110° angles are there? Include them all.",
          "Subtract all three known angles from 360°.",
        ],
        strategy: "Subtract from the total",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m1-q11",
        question: "Each exterior angle of a regular polygon is 24°. How many sides does it have?",
        options: ["15", "13", "7.5", "156"],
        answerIndex: 0,
        explanation:
          "The exterior angles of any polygon add to 360°, and in a regular polygon they are all equal, so n = 360 ÷ 24 = 15. 7.5 comes from dividing 180 instead of 360 — and a polygon can't have half a side. 156 is the interior angle (180 − 24), not the number of sides. 13 wrongly subtracts 2, borrowing from the interior-sum formula.",
        difficulty: "core",
        guideRef: "polygon-angles",
        hints: ["What do all the exterior angles of a polygon add up to?", "How many 24° angles fit into 360°?"],
        strategy: "Use the inverse",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m1-q12",
        question: "How many lines of symmetry does a regular octagon have, and what is its order of rotational symmetry?",
        options: ["4 lines; order 8", "8 lines; order 4", "8 lines; order 8", "16 lines; order 8"],
        answerIndex: 2,
        explanation:
          "A regular polygon with n sides has n lines of symmetry and rotational symmetry of order n, so a regular octagon has 8 lines and order 8. Four lines go through pairs of opposite vertices and four go through midpoints of opposite sides — 4 lines comes from counting only one kind. 16 lines counts each line twice, once from each end.",
        difficulty: "core",
        guideRef: "regular-polygon-symmetry",
        hints: [
          "Count the lines through pairs of opposite corners, then the lines through midpoints of opposite sides.",
          "How many times does it fit onto itself in one full turn? Each step is 360° ÷ 8.",
        ],
        strategy: "Use symmetry",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m1-q13",
        question: "What is the size of each interior angle of a regular decagon (10 sides)?",
        options: ["36°", "1440°", "180°", "144°"],
        answerIndex: 3,
        explanation:
          "Quickest route: each exterior angle is 360 ÷ 10 = 36°, so each interior angle is 180 − 36 = 144°. (Or: the total is (10 − 2) × 180 = 1440°, and 1440 ÷ 10 = 144°.) 36° is the exterior angle and 1440° is the total of all ten angles. 180° comes from using 10 × 180 for the total — that would make every corner a straight line.",
        difficulty: "core",
        guideRef: "polygon-angles",
        hints: [
          "Two routes: exterior angle first, or interior total first. Which is quicker?",
          "Each exterior angle is 360° ÷ 10.",
          "At each vertex, interior + exterior = 180°.",
        ],
        strategy: "Find the exterior angle first",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m1-q14",
        question: "Always, sometimes or never true? “A rhombus is a square.”",
        options: [
          "Always true — every rhombus has four equal sides, just like a square",
          "Sometimes true — only when its angles are right angles",
          "Sometimes true — only when its sides are equal",
          "Never true — a square and a rhombus are different shapes",
        ],
        answerIndex: 1,
        explanation:
          "Sometimes. Every rhombus has four equal sides, but a square also needs four right angles, so a rhombus is a square only when its angles are 90°. That also means a square IS a special rhombus, so “never” is wrong. “Only when its sides are equal” can't be the condition, because every rhombus already has equal sides.",
        difficulty: "core",
        guideRef: "quadrilaterals",
        hints: ["What does a square have that a general rhombus might not?", "Can you sketch a rhombus that is a square? And one that isn't?"],
        strategy: "Split into cases",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m1-q15",
        question: "The two horizontal lines are parallel. Which reason explains why angle b = 63°?",
        diagram: D_P1Q15,
        options: ["Corresponding angles are equal", "Co-interior angles are equal", "Alternate angles are equal", "Vertically opposite angles are equal"],
        answerIndex: 2,
        explanation:
          "The 63° and b are both between the parallel lines, on opposite sides of the slanted line — a Z-shape — so they are alternate angles, which are equal. Corresponding angles make an F-shape (the same position at each crossing). Co-interior angles are not equal at all; they add to 180°. Vertically opposite angles share one crossing point, but these two are at different crossings.",
        difficulty: "core",
        guideRef: "parallel-lines",
        hints: [
          "Are both angles between the parallel lines?",
          "Are they on the same side of the slanted line, or opposite sides?",
          "Between the lines and on opposite sides: which letter does that trace?",
        ],
        strategy: "Spot the F, Z or C shape",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m1-q16",
        question: "In triangle ABC, AB = AC. Side BC is extended beyond C, and the exterior angle at C is 125°. What is angle A?",
        options: ["70°", "55°", "62.5°", "110°"],
        answerIndex: 0,
        explanation:
          "On the straight line at C: angle ACB = 180 − 125 = 55°. AB = AC, so the angles opposite those sides — at C and at B — are equal: angle B = 55°. Then angle A = 180 − 55 − 55 = 70°. (Check: the exterior angle 125° = A + B = 70 + 55 ✓.) 62.5° halves 125°, which assumes A and B are equal — but the equal angles are B and C. 110° is B + C, one step short of the answer.",
        difficulty: "core",
        guideRef: "triangles",
        hints: [
          "Use the straight line at C first.",
          "AB = AC: which two angles are equal? (They are opposite the equal sides.)",
          "Now use the angle sum of the triangle.",
        ],
        strategy: "Chain angle facts",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m1-q17",
        question: "AB is parallel to CD. Angle BAP = 35° and angle DCP = 50°. Find angle APC, marked x.",
        diagram: D_P1Q17,
        options: ["85°", "95°", "15°", "275°"],
        answerIndex: 0,
        explanation:
          "Draw a line through P parallel to AB and CD. It splits x into two parts: the upper part is alternate to the 35° angle and the lower part is alternate to the 50° angle, so x = 35 + 50 = 85°. 95° is 180 − 85, which treats the angles as co-interior. 15° is the difference — but both parts add up to make x; they don't cancel. 275° is the reflex angle round the other side of P.",
        difficulty: "challenge",
        guideRef: "parallel-lines",
        hints: [
          "No single line crosses both parallel lines here. Could you add a helpful line?",
          "Draw a third line through P, parallel to AB and CD.",
          "Your new line splits x into two pieces. Each piece is alternate to one of the given angles.",
        ],
        strategy: "Add a construction line",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m1-q18",
        question: "Each interior angle of a regular polygon is 4 times the size of each exterior angle. How many sides does it have?",
        options: ["5", "144", "10", "36"],
        answerIndex: 2,
        explanation:
          "At each vertex the interior and exterior angles sit on a straight line, so they add to 180°. If the exterior angle is e, then 4e + e = 180, so e = 36° and n = 360 ÷ 36 = 10. 5 comes from using 4e + e = 360 — but the two angles share a straight line, not a full turn. 144 and 36 are the interior and exterior angles in degrees, not the number of sides.",
        difficulty: "challenge",
        guideRef: "polygon-angles",
        hints: [
          "At any vertex, what do the interior and exterior angles add up to?",
          "Call the exterior angle e. Write an equation using e and 4e.",
          "Once you know e, how many exterior angles fit into 360°?",
        ],
        strategy: "Introduce a variable",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m1-q19",
        question:
          "Mei wants to prove that the angles of a pentagon add to 540°. She picks a point O inside the pentagon and joins it to all five vertices, making five triangles. Which calculation completes her proof using these five triangles?",
        diagram: D_P1Q19,
        options: ["5 × 180° = 900°", "3 × 180° = 540°", "5 × 180° − 180° = 720°", "5 × 180° − 360° = 540°"],
        answerIndex: 3,
        explanation:
          "The five triangles contain 5 × 180 = 900° of angle. That includes the angles round O, which are not angles of the pentagon — and angles round a point add to 360°. So the pentagon's angles total 900 − 360 = 540°. 900° forgets to remove the angles at O, and 720° removes only 180° (a straight line, not a full turn). 3 × 180° gives the right total but belongs to a different proof (diagonals from one vertex make 3 triangles), not to Mei's five triangles.",
        difficulty: "challenge",
        guideRef: "angle-proofs",
        hints: [
          "Add up all the angles in the five triangles. Are they all angles of the pentagon?",
          "Some of those angles sit at O rather than at a corner of the pentagon.",
          "What do the angles round O add up to?",
        ],
        strategy: "Account for every angle",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m1-q20",
        question:
          "A square, a regular hexagon and one other regular polygon meet at a point, fitting together exactly with no gaps or overlaps. How many sides does the third polygon have?",
        options: ["6", "12", "150", "8"],
        answerIndex: 1,
        explanation:
          "The angles at the point add to 360°. The square gives 90° and the hexagon 120°, a total of 210°, so the third interior angle is 150°. Its exterior angle is 180 − 150 = 30°, so it has 360 ÷ 30 = 12 sides (a regular dodecagon). 150 is the angle, not the number of sides. 6 comes from dividing 180 (not 360) by the 30° exterior angle. An 8-sided polygon has 135° angles, which would leave a 15° gap.",
        difficulty: "challenge",
        guideRef: "regular-polygon-symmetry",
        hints: [
          "What must the three angles at the meeting point add up to?",
          "Find the missing interior angle, then its exterior angle.",
          "Number of sides = 360° ÷ exterior angle.",
        ],
        strategy: "Work backwards",
      },
    ],
  },
  // ======================================================================
  // MCQ Paper 2
  // ======================================================================
  {
    id: "angles-polygons-m2",
    title: "MCQ Paper 2",
    questions: [
      {
        kind: "mcq",
        id: "angles-polygons-m2-q01",
        question: "Through what angle does the minute hand of a clock turn in 20 minutes?",
        options: ["20°", "120°", "10°", "240°"],
        answerIndex: 1,
        explanation:
          "The minute hand makes a full turn of 360° in 60 minutes, which is 6° per minute, so in 20 minutes it turns 20 × 6 = 120°. (Or: 20 minutes is a third of an hour, and a third of 360° is 120°.) 20° assumes 1° per minute. 10° is how far the hour hand turns in 20 minutes. 240° is the part of the turn still to go.",
        difficulty: "warmup",
        guideRef: "angle-facts",
        hints: ["What fraction of a full turn is 20 minutes?"],
        strategy: "Make it simpler",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m2-q02",
        question: "The two horizontal lines are parallel. Find angle y.",
        diagram: D_P2Q02,
        options: ["122°", "32°", "116°", "58°"],
        answerIndex: 3,
        explanation:
          "The 58° and y are in matching positions at the two crossings — each is above its horizontal line and to the right of the slanted line. They are corresponding angles (an F-shape), so y = 58°. 122° is 180 − 58, which would be right for co-interior angles, not corresponding ones. 32° uses 90° instead of 180°.",
        difficulty: "warmup",
        guideRef: "parallel-lines",
        hints: ["Compare the positions: is each angle above or below its horizontal line? Left or right of the slanted line?"],
        strategy: "Spot the F, Z or C shape",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m2-q03",
        question: "One side of an equilateral triangle is extended. What is the exterior angle formed?",
        options: ["120°", "60°", "240°", "90°"],
        answerIndex: 0,
        explanation:
          "Each interior angle of an equilateral triangle is 180 ÷ 3 = 60°. The exterior angle sits on a straight line with one of them: 180 − 60 = 120°. (It also equals the sum of the two interior opposite angles: 60 + 60.) 60° is the interior angle itself. 240° is the reflex angle round the outside, 360 − 120 — not the exterior angle.",
        difficulty: "warmup",
        guideRef: "triangles",
        hints: ["Find one interior angle first, then use the straight line."],
        strategy: "Chain angle facts",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m2-q04",
        question: "Which of these regular polygons can tessellate (tile a floor with no gaps or overlaps) on its own?",
        options: ["Regular pentagon", "Regular octagon", "Regular hexagon", "Regular decagon"],
        answerIndex: 2,
        explanation:
          "Copies of a tile fit round a point only if its interior angle divides exactly into 360°. Hexagon: 120° × 3 = 360° ✓. Pentagon: 108° — three make 324° (a gap) and four overlap. Octagon: 135° — two make 270°, leaving a 90° gap, which is why octagon floor tiles come with little squares. Decagon: 144° — two make 288°, and three overlap.",
        difficulty: "warmup",
        guideRef: "regular-polygon-symmetry",
        hints: ["Where tiles meet at a point, their angles must add to exactly 360°. Which interior angle divides 360 exactly?"],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m2-q05",
        question: "Three angles of a quadrilateral are 85°, 95° and 110°. What is the fourth angle?",
        options: ["70°", "80°", "110°", "290°"],
        answerIndex: 0,
        explanation:
          "The angles of a quadrilateral add to 360°. 85 + 95 + 110 = 290, so the fourth is 360 − 290 = 70°. 290° is the total of the three known angles, not the missing one. 110° assumes opposite angles are equal, which is only guaranteed in a parallelogram. 80° comes from an addition slip (getting 280 instead of 290).",
        difficulty: "warmup",
        guideRef: "quadrilaterals",
        hints: ["What do the angles of any quadrilateral add up to?"],
        strategy: "Subtract from the total",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m2-q06",
        question: "Three angles on a straight line are (x + 20)°, (2x − 10)° and (x + 50)°. Find x.",
        options: ["x = 75", "x = 25", "x = 30", "x = 40"],
        answerIndex: 2,
        explanation:
          "Angles on a straight line add to 180°. The x terms make x + 2x + x = 4x and the numbers make 20 − 10 + 50 = 60, so 4x + 60 = 180, 4x = 120 and x = 30. Check: 50 + 50 + 80 = 180 ✓. x = 75 uses 360° instead of 180°. x = 25 treats the −10 as +10 (4x + 80 = 180). x = 40 counts only three lots of x — the 2x term is worth two.",
        difficulty: "core",
        guideRef: "angle-facts",
        hints: [
          "What do angles on a straight line add up to?",
          "Collect the x terms and the number terms separately. Careful with the −10.",
          "You should reach 4x + 60 = 180.",
        ],
        strategy: "Introduce a variable",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m2-q07",
        question: "The two horizontal lines are parallel. Find x.",
        diagram: D_P2Q07,
        options: ["x = 24", "x = 30", "x = 105", "x = 60"],
        answerIndex: 1,
        explanation:
          "Both angles are between the parallel lines, on opposite sides of the slanted line — alternate angles (a Z-shape) — so they are equal: 3x + 15 = 2x + 45, which gives x = 30. Check: both angles are 105° ✓. x = 24 treats them as co-interior (adding to 180°). x = 105 is the size of each angle, not x. x = 60 adds the 15 instead of subtracting it (x = 45 + 15).",
        difficulty: "core",
        guideRef: "parallel-lines",
        hints: [
          "Are the two angles alternate, corresponding or co-interior?",
          "Alternate angles are equal — write an equation.",
          "Take 2x from both sides, then take 15 from both sides.",
        ],
        strategy: "Introduce a variable",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m2-q08",
        question: "Priya says: “A triangle can have two obtuse angles, as long as the third angle is really small.” What is wrong with her idea?",
        options: [
          "Nothing — 95° + 91° + a tiny third angle works",
          "Nothing — the angles of a triangle add to 360°, so there is plenty of room",
          "It only works if the triangle is isosceles",
          "Two obtuse angles already add to more than 180°, leaving nothing for the third angle",
        ],
        answerIndex: 3,
        explanation:
          "Each obtuse angle is more than 90°, so two of them add to more than 180° — more than a whole triangle's total before the third angle is even counted. For example, 95° + 91° = 186°, so the “tiny” third angle would have to be negative. Being isosceles doesn't help, because the 180° total still applies, and the 360° total belongs to quadrilaterals. A triangle can have at most one obtuse angle.",
        difficulty: "core",
        guideRef: "triangles",
        hints: ["What is the smallest total two obtuse angles could have?", "Compare that total with the angle sum of a triangle."],
        strategy: "Consider extremes",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m2-q09",
        question: "Jun says: “A square is not a rectangle, because a rectangle has two long sides and two short sides.” What is wrong with his reasoning?",
        options: [
          "Nothing — squares and rectangles are separate shapes",
          "A square isn't a rectangle, but only because its diagonals cross at right angles",
          "A rectangle must have four equal sides, so every rectangle is a square",
          "A rectangle only needs four right angles; a square has four right angles, so a square is a special rectangle",
        ],
        answerIndex: 3,
        explanation:
          "A rectangle is a quadrilateral with four right angles (which forces opposite sides to be equal and parallel). Nothing says its sides must be unequal. A square has four right angles, so it IS a rectangle — a special one whose sides also happen to be equal. Extra properties, like diagonals crossing at 90°, don't stop it being a rectangle. The reverse is false, though: a 3 cm by 5 cm rectangle is not a square.",
        difficulty: "core",
        guideRef: "quadrilaterals",
        hints: ["What must a shape have to count as a rectangle?", "Does a square have everything on that list?"],
        strategy: "Check the definition",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m2-q10",
        question:
          "The interior angles of a polygon add up to 1260°. How many triangles does it split into when you draw all the diagonals from one vertex, and how many sides does it have?",
        options: ["7 triangles; 9 sides", "9 triangles; 7 sides", "7 triangles; 7 sides", "7 triangles; 5 sides"],
        answerIndex: 0,
        explanation:
          "Each triangle contributes 180°, so there are 1260 ÷ 180 = 7 triangles. From one vertex, an n-sided polygon splits into n − 2 triangles, so n − 2 = 7 and n = 9. Check: (9 − 2) × 180 = 1260 ✓. “7 sides” forgets that there are 2 fewer triangles than sides, and “5 sides” subtracts the 2 instead of adding it back. “9 triangles; 7 sides” swaps the two numbers.",
        difficulty: "core",
        guideRef: "polygon-angles",
        hints: [
          "How many lots of 180° make 1260°?",
          "With n sides, how many triangles do you get from one vertex?",
          "n − 2 = 7. Solve for n.",
        ],
        strategy: "Work backwards",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m2-q11",
        question: "A regular polygon has 9 lines of symmetry. What is the size of each of its exterior angles?",
        options: ["140°", "20°", "40°", "1260°"],
        answerIndex: 2,
        explanation:
          "A regular polygon has as many lines of symmetry as it has sides, so it has 9 sides. Each exterior angle is 360 ÷ 9 = 40°. 140° is the interior angle (180 − 40). 20° comes from thinking there are 18 sides — counting each line twice because it touches the polygon at both ends. 1260° is the total of the interior angles.",
        difficulty: "core",
        guideRef: "regular-polygon-symmetry",
        hints: ["How are the lines of symmetry of a regular polygon linked to its number of sides?", "All the exterior angles add up to 360°."],
        strategy: "Use symmetry",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m2-q12",
        question: "The angles of a triangle are in the ratio 2 : 3 : 4. What is the largest angle?",
        options: ["160°", "80°", "45°", "40°"],
        answerIndex: 1,
        explanation:
          "There are 2 + 3 + 4 = 9 parts making 180°, so one part is 20° and the angles are 40°, 60° and 80°. The largest is 80°. 160° uses 360° instead of 180°. 45° divides 180 by 4 instead of by the total number of parts, 9. 40° is the smallest angle, not the largest.",
        difficulty: "core",
        guideRef: "triangles",
        hints: ["How many parts are there altogether?", "If all the parts make 180°, what is one part worth?", "The largest angle is 4 parts."],
        strategy: "Use a bar model",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m2-q13",
        question: "Three straight lines cross at one point. Find angle y.",
        diagram: D_P2Q13,
        options: ["245°", "45°", "65°", "115°"],
        answerIndex: 2,
        explanation:
          "The 45° angle is vertically opposite the unmarked angle between 70° and y, so that angle is also 45°. Now 70°, 45° and y sit together on the straight horizontal line: y = 180 − 70 − 45 = 65°. 45° assumes y itself is opposite the 45° — check which two lines make each angle. 115° is just 70 + 45. 245° subtracts from 360° but ignores the other angles round the point.",
        difficulty: "core",
        guideRef: "angle-facts",
        hints: [
          "Which angle is vertically opposite the 45°?",
          "Copy the 45° across the point, so it sits between the 70° and y.",
          "Now three angles share one straight line.",
        ],
        strategy: "Chain angle facts",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m2-q14",
        question:
          "Hana made this table for regular polygons. One row contains a mistake. Which row?\n\n| Polygon | Sides | Sum of interior angles | Each interior angle |\n|---|---|---|---|\n| Pentagon | 5 | 540° | 108° |\n| Hexagon | 6 | 720° | 120° |\n| Octagon | 8 | 1080° | 135° |\n| Nonagon | 9 | 1440° | 160° |",
        options: ["Pentagon", "Nonagon", "Hexagon", "Octagon"],
        answerIndex: 1,
        explanation:
          "For the nonagon the sum should be (9 − 2) × 180 = 1260°, so each angle is 1260 ÷ 9 = 140°. Hana used 8 triangles instead of 7, then divided correctly — 1440 ÷ 9 really is 160, which is why the mistake is easy to miss. A quick second check: each exterior angle is 360 ÷ 9 = 40°, so each interior angle is 140°, not 160°. The octagon row may look odd, but 1080 ÷ 8 = 135° is right.",
        difficulty: "core",
        guideRef: "polygon-angles",
        hints: [
          "Check each sum using (n − 2) × 180°.",
          "Or check each angle using 180° − (360° ÷ n).",
          "A row can divide correctly and still be wrong if its total is wrong.",
        ],
        strategy: "Check by a second method",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m2-q15",
        question: "A quadrilateral's diagonals are equal in length and cut each other in half, but they do **not** cross at right angles. What is the quadrilateral?",
        options: ["Square", "Rhombus", "Parallelogram (not a rectangle)", "Rectangle (not a square)"],
        answerIndex: 3,
        explanation:
          "Diagonals that bisect each other make a parallelogram; making them equal as well forces right-angled corners, so it's a rectangle. A square's diagonals would also cross at 90°, which rules it out. A rhombus's diagonals do cross at 90° (and are usually unequal). A general parallelogram's diagonals bisect each other but are not equal.",
        difficulty: "core",
        guideRef: "quadrilaterals",
        hints: [
          "Which quadrilaterals have diagonals that cut each other in half?",
          "Of those, which have equal diagonals?",
          "Of those, which has diagonals that are NOT perpendicular?",
        ],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m2-q16",
        question: "AB is parallel to DE, and C lies on AB. Angle CDE = 52° and angle BCE = 71°. Find angle DCE, marked x.",
        diagram: D_P2Q16,
        options: ["57°", "19°", "123°", "71°"],
        answerIndex: 0,
        explanation:
          "Angle CED = 71°, because it is alternate to angle BCE (a Z-shape between the parallel lines). Then in triangle CDE: x = 180 − 52 − 71 = 57°. 19° comes from taking angle CED as 180 − 71 = 109° (as if co-interior) — but these angles are alternate, so they are equal. 123° is 52 + 71, which is an exterior angle, not x. 71° stops after the first step.",
        difficulty: "core",
        guideRef: "parallel-lines",
        hints: [
          "Can the parallel lines tell you another angle of triangle CDE?",
          "Angle BCE and angle CED make a Z-shape.",
          "Now use the angle sum of triangle CDE.",
        ],
        strategy: "Chain angle facts",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m2-q17",
        question: "An isosceles triangle has one angle of 50°. Which answer lists **all** the possibilities for the other two angles?",
        options: ["65° and 65° only", "65° and 65°, or 50° and 80°", "50° and 80° only", "Any two angles that add up to 130°"],
        answerIndex: 1,
        explanation:
          "Split into cases. If 50° is the angle between the equal sides, the other two share 130°: 65° and 65°. If 50° is one of the equal base angles, the other base angle is also 50° and the third is 180 − 100 = 80°. Both triangles exist, so both answers are possible. “65° and 65° only” assumes the given angle must be the top angle. “Any two angles adding to 130°” forgets the triangle must be isosceles — 30° and 100° would make it scalene.",
        difficulty: "challenge",
        guideRef: "triangles",
        hints: [
          "Is the 50° one of the two equal angles, or the odd one out? You aren't told — so try both.",
          "Case 1: 50° is the odd angle. Case 2: 50° is one of the equal pair.",
          "Check that each case gives a real triangle.",
        ],
        strategy: "Split into cases",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m2-q18",
        question: "Which of these could be the interior angle of a regular polygon?",
        options: ["150°", "130°", "145°", "125°"],
        answerIndex: 0,
        explanation:
          "Switch to exterior angles (180° minus each). For a regular polygon, 360 ÷ exterior angle must be a whole number of sides. 150° → 30°, and 360 ÷ 30 = 12 ✓ (a regular dodecagon). 130° → 50°, and 360 ÷ 50 = 7.2 ✗. 145° → 35°, and 360 ÷ 35 is about 10.3 ✗. 125° → 55°, and 360 ÷ 55 is about 6.5 ✗. 130° may look the friendliest number, but its exterior angle doesn't divide 360.",
        difficulty: "challenge",
        guideRef: "polygon-angles",
        hints: [
          "Work with the exterior angles instead.",
          "For a regular polygon, 360 ÷ (exterior angle) must be a whole number.",
          "Test each of the four.",
        ],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m2-q19",
        question:
          "Hana proves that an exterior angle of a triangle equals the sum of the two interior opposite angles. In the diagram, a, b and c are the angles of triangle ABC and e is the exterior angle at C.\n\n1. a + b + c = 180° (angles on a straight line)\n2. c + e = 180° (angles on a straight line)\n3. So a + b + c = c + e (both equal 180°)\n4. So a + b = e (subtract c from both sides)\n\nWhich step has the wrong reason?",
        diagram: D_P2Q19,
        options: [
          "Step 2 — it should say “angles in a triangle add to 180°”",
          "Step 4 — you can't subtract c from both sides",
          "Step 1 — it should say “angles in a triangle add to 180°”",
          "Step 3 — two things that both equal 180° need not equal each other",
        ],
        answerIndex: 2,
        explanation:
          "Step 1 is about the three angles inside the triangle, so its reason must be “angles in a triangle add to 180°”. Step 2 is right as written: c and e sit together on the straight line BCD. Step 3 is valid — two quantities that both equal 180° are equal to each other — and step 4 subtracts c from both sides, which keeps the equation balanced. A proof is only as strong as its reasons.",
        difficulty: "challenge",
        guideRef: "angle-proofs",
        hints: ["For each step, ask: does the reason describe the angles in that line?", "Are a, b and c on a straight line, or somewhere else?"],
        strategy: "Check each step",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m2-q20",
        question: "ABCD is a square. ABE is an equilateral triangle drawn inside the square. Find angle ADE.",
        diagram: D_P2Q20,
        options: ["60°", "30°", "15°", "75°"],
        answerIndex: 3,
        explanation:
          "AE = AB (equilateral triangle) and AB = AD (square), so AD = AE and triangle ADE is isosceles. Angle DAE = 90 − 60 = 30°, so angles ADE and AED are each (180 − 30) ÷ 2 = 75°. 30° is angle DAE, the top angle of that isosceles triangle. 60° assumes triangle ADE is equilateral too. 15° is angle EDC (90 − 75), the angle next door.",
        difficulty: "challenge",
        guideRef: "quadrilaterals",
        hints: [
          "Which lengths in the diagram are equal? Look for a triangle with two equal sides.",
          "AE = AB = AD. So what kind of triangle is ADE?",
          "Find angle DAE first: the square's 90° minus the triangle's 60°.",
        ],
        strategy: "Spot equal lengths",
      },
    ],
  },
  // ======================================================================
  // MCQ Paper 3
  // ======================================================================
  {
    id: "angles-polygons-m3",
    title: "MCQ Paper 3",
    questions: [
      {
        kind: "mcq",
        id: "angles-polygons-m3-q01",
        question: "Three angles meet at a point: 90°, 125° and x. Find x.",
        options: ["215°", "235°", "145°", "55°"],
        answerIndex: 2,
        explanation:
          "Angles round a point add to 360°: x = 360 − 90 − 125 = 145°. 215° is the total of the two known angles, not the missing one. 235° (360 − 125) forgets the right angle, and 55° uses 180°, as if the angles were on a straight line.",
        difficulty: "warmup",
        guideRef: "angle-facts",
        hints: ["What do angles round a point add up to?"],
        strategy: "Subtract from the total",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m3-q02",
        question: "A line crosses two other lines, making a Z-shape of alternate angles. When are those alternate angles equal?",
        options: [
          "Only when the two lines are parallel",
          "Always, whether or not the lines are parallel",
          "Never — alternate angles always add to 180°",
          "Only when the crossing line is at right angles to them",
        ],
        answerIndex: 0,
        explanation:
          "Alternate angles are equal only when the two lines are parallel — that's why the arrow marks on parallel lines matter. Tilt one line and the Z is bent, so the angles differ. Adding to 180° is the rule for co-interior angles. A crossing line at right angles makes every angle 90°, but that's just one special case: parallel lines are enough.",
        difficulty: "warmup",
        guideRef: "parallel-lines",
        hints: ["Imagine tilting one of the two lines. What happens to the angles in the Z-shape?"],
        strategy: "Consider extremes",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m3-q03",
        question: "A triangle has angles of 52° and 64°. What type of triangle is it?",
        options: ["Scalene", "Right-angled", "Equilateral", "Isosceles"],
        answerIndex: 3,
        explanation:
          "The third angle is 180 − 52 − 64 = 64°. Two equal angles mean two equal sides, so the triangle is isosceles. Scalene is the tempting guess from the two different angles you were given — always find the third angle before deciding. No angle is 90°, so it isn't right-angled.",
        difficulty: "warmup",
        guideRef: "triangles",
        hints: ["Find the third angle before you decide."],
        strategy: "Find the missing piece first",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m3-q04",
        question: "How many lines of symmetry does a rhombus have, if it is not a square?",
        options: ["4", "2", "0", "1"],
        answerIndex: 1,
        explanation:
          "A rhombus has 2 lines of symmetry: its two diagonals. Fold along either diagonal and the halves match exactly. 4 is a square's number — the lines through midpoints of opposite sides only work when the corners are right angles. 0 belongs to a general parallelogram, and 1 to a typical kite.",
        difficulty: "warmup",
        guideRef: "quadrilaterals",
        hints: ["Imagine folding along each diagonal, then along a line joining the midpoints of opposite sides."],
        strategy: "Use symmetry",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m3-q05",
        question: "What is the size of each exterior angle of a regular hexagon?",
        options: ["120°", "60°", "720°", "360°"],
        answerIndex: 1,
        explanation:
          "The six exterior angles add to 360° and are all equal, so each is 360 ÷ 6 = 60°. 120° is the interior angle (180 − 60). 360° is the total of all six exterior angles, not each one, and 720° is the total of the interior angles.",
        difficulty: "warmup",
        guideRef: "polygon-angles",
        hints: ["All the exterior angles of a polygon add up to 360°."],
        strategy: "Use the exterior angle sum",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m3-q06",
        question:
          "A straight MRT track crosses two parallel roads. The obtuse angle between the track and the first road is 125°. What is the acute angle between the track and the second road?",
        options: ["125°", "35°", "235°", "55°"],
        answerIndex: 3,
        explanation:
          "Where a straight line crosses parallel lines, all the acute angles are equal and all the obtuse angles are equal, and an acute angle and an obtuse angle together make a straight line. So the acute angle is 180 − 125 = 55°, at both roads. 125° is the obtuse angle, not the acute one. 35° uses 90° instead of 180°, and 235° uses 360°.",
        difficulty: "core",
        guideRef: "parallel-lines",
        hints: [
          "Sketch it: two parallel lines and one slanted line across them.",
          "At each crossing there are only two different angle sizes. How are they related?",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m3-q07",
        question: "Two straight lines cross. A pair of vertically opposite angles are (3y + 10)° and (5y − 30)°. Find y.",
        options: ["y = 25", "y = 10", "y = 20", "y = 70"],
        answerIndex: 2,
        explanation:
          "Vertically opposite angles are equal: 3y + 10 = 5y − 30. Add 30 to both sides and subtract 3y: 40 = 2y, so y = 20. Check: both angles are 70° ✓. y = 25 adds the angles to make 180°, but these two are opposite each other, not on a straight line together. y = 10 comes from moving the +10 across without changing its sign. 70 is the size of each angle, not y.",
        difficulty: "core",
        guideRef: "angle-facts",
        hints: [
          "What is true about vertically opposite angles?",
          "Set the two expressions equal to each other.",
          "Get the y terms on one side and the numbers on the other.",
        ],
        strategy: "Introduce a variable",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m3-q08",
        question: "Always, sometimes or never true? “An exterior angle of a triangle is obtuse.”",
        options: [
          "Sometimes true — it depends on the interior angle next to it",
          "Always true",
          "Never true",
          "Only true in an equilateral triangle",
        ],
        answerIndex: 0,
        explanation:
          "An exterior angle is 180° minus the interior angle next to it. If that interior angle is acute, say 70°, the exterior angle is obtuse (110°). If the interior angle is obtuse, say 120°, the exterior angle is acute (60°) — and a right-angled corner gives an exterior angle of exactly 90°. So it's sometimes true. Equilateral triangles do have obtuse exterior angles (120°), but so do plenty of other triangles, so “only equilateral” is wrong.",
        difficulty: "core",
        guideRef: "triangles",
        hints: ["How is an exterior angle related to the interior angle next to it?", "Try an acute corner, then an obtuse corner."],
        strategy: "Split into cases",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m3-q09",
        question: "In parallelogram PQRS, angle P = (4y + 10)° and angle Q = (y + 20)°. Find y.",
        options: ["y = 30", "y = 66", "y = 42", "y = 36"],
        answerIndex: 0,
        explanation:
          "P and Q are neighbouring angles of the parallelogram, so they are co-interior angles between parallel sides and add to 180°: 5y + 30 = 180, so 5y = 150 and y = 30. Check: P = 130° and Q = 50°, which add to 180° ✓. y = 66 uses 360°, the total for all four angles rather than two. y = 42 adds the 30 instead of subtracting it, and y = 36 forgets the 30 altogether.",
        difficulty: "core",
        guideRef: "quadrilaterals",
        hints: [
          "P and Q are next to each other. How are neighbouring angles of a parallelogram related?",
          "Neighbouring angles are co-interior between parallel sides.",
          "You should reach 5y + 30 = 180.",
        ],
        strategy: "Introduce a variable",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m3-q10",
        question: "A pentagon has angles of 100°, 110°, 120°, 2x and x. Find x.",
        options: ["x = 10", "x = 105", "x = 70", "x = 140"],
        answerIndex: 2,
        explanation:
          "A pentagon's angles add to (5 − 2) × 180 = 540°. 100 + 110 + 120 = 330, so 3x = 540 − 330 = 210 and x = 70. Check: 330 + 140 + 70 = 540 ✓. x = 10 uses 360° as the total, which is only right for a quadrilateral. x = 105 divides 210 by 2, missing the x on its own. 140 is the angle 2x, not x.",
        difficulty: "core",
        guideRef: "polygon-angles",
        hints: ["What do the angles of a pentagon add up to?", "2x + x = 3x. How much of the total is left for 3x?", "3x = 210."],
        strategy: "Introduce a variable",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m3-q11",
        question: "Always, sometimes or never true? “A shape with 6 lines of symmetry and rotational symmetry of order 6 is a regular hexagon.”",
        options: [
          "Always true",
          "Sometimes true",
          "Never true — a regular hexagon has only 3 lines of symmetry",
          "Never true — a regular hexagon has rotational symmetry of order 3",
        ],
        answerIndex: 1,
        explanation:
          "A regular hexagon does have 6 lines of symmetry and order 6 — but so does a six-pointed star (like a snowflake), which has 12 sides. So the statement is only sometimes true. “Sides = lines of symmetry” is a fact about regular polygons; it doesn't work backwards for every shape. 3 lines comes from counting only the lines through opposite corners and forgetting the 3 through midpoints of opposite sides.",
        difficulty: "core",
        guideRef: "regular-polygon-symmetry",
        hints: ["Can you think of a different shape with exactly the same symmetry as a regular hexagon?", "Think of a snowflake or a six-pointed star."],
        strategy: "Look for a counterexample",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m3-q12",
        question: "Mei measures the angles of a triangle with a protractor and gets 47°, 58° and 81°. What can she be sure of?",
        options: [
          "The triangle must be right-angled",
          "Her measurements are fine — protractors are accurate to the nearest degree",
          "The triangle is acute, so her angles must be correct",
          "At least one measurement is wrong, because they add up to 186°",
        ],
        answerIndex: 3,
        explanation:
          "Add them first: 47 + 58 + 81 = 186°, which is 6° more than any triangle can have. Rounding each reading to the nearest degree could only explain a total that is out by a degree or so, not 6°. Every angle being acute tells you the type of triangle, but it doesn't make the readings right — and none of them is 90°. So at least one reading is wrong (perhaps she read the wrong scale on the protractor).",
        difficulty: "core",
        guideRef: "triangles",
        hints: ["Add up her three angles.", "What should the angles of any triangle add up to?"],
        strategy: "Check the total",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m3-q13",
        question: "AB and CD are straight lines that cross at O, and OE is perpendicular to AB. Angle EOC = 28°. Find angle AOD.",
        diagram: D_P3Q13,
        options: ["28°", "152°", "118°", "62°"],
        answerIndex: 3,
        explanation:
          "Angle EOB = 90°, so angle COB = 90 − 28 = 62°. Angle AOD is vertically opposite angle COB (both are made by lines AB and CD), so angle AOD = 62°. 28° wrongly pairs AOD with EOC — but OE is not part of line CD, so those two aren't vertically opposite. 118° is angle AOC, which is next to AOD, not equal to it. 152° is angle EOD.",
        difficulty: "core",
        guideRef: "angle-facts",
        hints: [
          "Which angle is vertically opposite AOD? It must be made by the same two straight lines.",
          "Find angle COB using the right angle at O.",
          "COB = 90° − 28°.",
        ],
        strategy: "Chain angle facts",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m3-q14",
        question: "A line crosses two other lines. A pair of corresponding angles measure 70° and 75°. What can you conclude?",
        options: [
          "The two lines are not parallel — if they were, these angles would be equal",
          "The two lines are parallel — corresponding angles only need to be roughly equal",
          "The two lines are parallel, because 70° + 75° is less than 180°",
          "Nothing — only alternate angles can test whether lines are parallel",
        ],
        answerIndex: 0,
        explanation:
          "If the lines were parallel, corresponding angles would be exactly equal. These are 70° and 75°, so the lines are not parallel — they will meet somewhere. “Roughly equal” isn't good enough in geometry: a 5° difference matters. Corresponding, alternate and co-interior angles can all be used to test for parallel lines, not just alternate ones.",
        difficulty: "core",
        guideRef: "parallel-lines",
        hints: ["If the lines were parallel, what would be true of these two angles?", "Is that true here?"],
        strategy: "Work backwards",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m3-q15",
        question:
          "Think first: as a regular polygon gets more and more sides, what happens to each interior angle? What is each interior angle of a regular polygon with 100 sides?",
        options: ["3.6°", "176.4°", "180°", "17 640°"],
        answerIndex: 1,
        explanation:
          "Each exterior angle is 360 ÷ 100 = 3.6°, so each interior angle is 180 − 3.6 = 176.4°. As the number of sides grows, the exterior angles shrink, so the interior angles creep towards 180° — but never reach it, because a 180° “corner” would be a straight line. 3.6° is the exterior angle, and 17 640° is the total of all 100 interior angles, (100 − 2) × 180.",
        difficulty: "core",
        guideRef: "polygon-angles",
        hints: ["Find the exterior angle first — it is tiny.", "Interior angle = 180° − exterior angle."],
        strategy: "Consider extremes",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m3-q16",
        question: "ABCD is a rhombus with angle ABC = 70°. Its diagonals meet at M. Find angle BAM.",
        diagram: D_P3Q16,
        options: ["35°", "110°", "55°", "20°"],
        answerIndex: 2,
        explanation:
          "The diagonals of a rhombus cut its corner angles in half and cross at right angles. So angle ABM = 70 ÷ 2 = 35° and angle AMB = 90°, and in triangle ABM: angle BAM = 180 − 90 − 35 = 55°. (Or: angle BAD = 180 − 70 = 110°, and the diagonal halves it to 55°.) 35° is angle ABM, half of angle B, not the angle at A. 110° is the whole of angle BAD. 20° is 90 − 70, which forgets to halve angle B.",
        difficulty: "core",
        guideRef: "quadrilaterals",
        hints: [
          "What do you know about the diagonals of a rhombus — how do they cross, and what do they do to the corners?",
          "Find angle ABM, then use triangle ABM.",
          "The diagonals cross at 90° and cut each corner angle in half.",
        ],
        strategy: "Use symmetry",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m3-q17",
        question:
          "AB and CD are parallel. A transversal crosses them at P and Q. The lines that bisect angle BPQ and angle PQD meet at R. Whatever the slope of the transversal, what is angle PRQ?",
        diagram: D_P3Q17,
        options: ["45°", "It depends on the slope of the transversal", "90°", "180°"],
        answerIndex: 2,
        explanation:
          "Angles BPQ and PQD are co-interior, so they add to 180°. Each bisector takes half, so angle RPQ + angle RQP = 90°. In triangle PQR, angle PRQ = 180 − 90 = 90° — always, whatever the slope. That's an invariant hiding in the diagram. 45° halves the 90° once too often. “It depends” is what you'd think from measuring a single example. 180° would mean P, R and Q lie on a straight line.",
        difficulty: "challenge",
        guideRef: "parallel-lines",
        hints: [
          "What do angles BPQ and PQD add up to?",
          "The bisectors take half of each. What do the two halves add up to?",
          "Now use the angle sum of triangle PQR.",
        ],
        strategy: "Look for an invariant",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m3-q18",
        question: "A polygon has no reflex angles. What is the greatest number of acute interior angles it can have?",
        options: ["2", "4", "As many as you like, if it has enough sides", "3"],
        answerIndex: 3,
        explanation:
          "Think about exterior angles. An acute interior angle (less than 90°) has an exterior angle greater than 90°. The exterior angles add to exactly 360°, so four of them would already be more than 360° — impossible. Three is possible: any acute-angled triangle has three acute angles. So the answer is 3, however many sides the polygon has. “As many as you like” ignores the fixed 360° total, and 2 is too cautious.",
        difficulty: "challenge",
        guideRef: "polygon-angles",
        hints: [
          "Switch to exterior angles: if an interior angle is acute, what can you say about its exterior angle?",
          "What do the exterior angles add up to, however many sides there are?",
          "How many angles bigger than 90° can fit into 360°?",
        ],
        strategy: "Consider extremes",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m3-q19",
        question: "The smallest turn that maps a regular polygon onto itself is 24°. What is each interior angle of the polygon?",
        options: ["156°", "24°", "15°", "336°"],
        answerIndex: 0,
        explanation:
          "A regular n-sided polygon has rotational symmetry of order n, so its smallest turn is 360 ÷ n. Here 360 ÷ 24 = 15 sides. Each exterior angle is also 360 ÷ 15 = 24° — the smallest turn equals the exterior angle! So each interior angle is 180 − 24 = 156°. 15 is the number of sides, 24° is the exterior angle, and 336° (360 − 24) is a full turn minus the rotation, not an angle of the polygon.",
        difficulty: "challenge",
        guideRef: "regular-polygon-symmetry",
        hints: [
          "How many 24° turns make a full turn? That's the order of rotational symmetry.",
          "For a regular polygon, the order of rotational symmetry equals the number of sides.",
          "Now find the exterior angle, then the interior angle.",
        ],
        strategy: "Use symmetry",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m3-q20",
        question:
          "Join five points to make a five-pointed star — it doesn't have to be regular. What do the five tip angles a + b + c + d + e add up to?",
        diagram: D_P3Q20,
        options: ["540°", "180°", "360°", "It depends on the shape of the star"],
        answerIndex: 1,
        explanation:
          "Look at the small triangle at tip a. Each of its other two angles is an exterior angle of another triangle in the star: one equals c + e and the other equals b + d. So a + (c + e) + (b + d) = 180°, for any star. (Check with a regular star: each tip is 36°, and 5 × 36 = 180°.) 540° is the angle sum of the pentagon in the middle, not the tips. “It depends” is the natural guess — but the total is the same for every star.",
        difficulty: "challenge",
        guideRef: "angle-proofs",
        hints: [
          "Try a special case: a regular star. Its middle is a regular pentagon with 108° angles — use that to find one tip angle.",
          "Focus on the small triangle at tip a. Its other two angles are exterior angles of other triangles.",
          "An exterior angle equals the sum of the two interior opposite angles.",
        ],
        strategy: "Try a special case",
      },
    ],
  },
  // ======================================================================
  // MCQ Paper 4
  // ======================================================================
  {
    id: "angles-polygons-m4",
    title: "MCQ Paper 4",
    questions: [
      {
        kind: "mcq",
        id: "angles-polygons-m4-q01",
        question: "Which pair of angles could sit next to each other on a straight line?",
        options: ["63° and 127°", "63° and 27°", "63° and 297°", "63° and 117°"],
        answerIndex: 3,
        explanation:
          "Angles on a straight line add to 180°, and 63 + 117 = 180 ✓. 63° and 27° add to 90°, so they would make a right angle, not a straight line. 63° and 297° add to 360°, a full turn round a point. 63° and 127° add to 190° — just too much.",
        difficulty: "warmup",
        guideRef: "angle-facts",
        hints: ["Add each pair. What total do you need for a straight line?"],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m4-q02",
        question: "An exterior angle of a triangle is 130°. One of the two interior opposite angles is 45°. What is the other interior opposite angle?",
        options: ["50°", "85°", "175°", "5°"],
        answerIndex: 1,
        explanation:
          "The exterior angle equals the sum of the two interior opposite angles, so 45 + ? = 130 and the other angle is 85°. (Check: the interior angle next to the exterior angle is 180 − 130 = 50°, and 45 + 85 + 50 = 180 ✓.) 50° is that neighbouring interior angle, not an opposite one. 175° adds 130 and 45 instead of subtracting. 5° comes from treating the 130° as an interior angle: 180 − 130 − 45.",
        difficulty: "warmup",
        guideRef: "triangles",
        hints: ["An exterior angle equals the sum of the two interior opposite angles."],
        strategy: "Use the inverse",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m4-q03",
        question: "A line crosses two parallel lines. Which pair of angles **adds up to 180°** rather than being equal?",
        options: ["Alternate angles (Z-shape)", "Corresponding angles (F-shape)", "Co-interior angles (C-shape)", "Vertically opposite angles (X-shape)"],
        answerIndex: 2,
        explanation:
          "Co-interior angles sit between the parallel lines on the same side of the transversal. One is acute and one is obtuse (unless both are 90°), and they add to 180°. Alternate (Z), corresponding (F) and vertically opposite (X) angles are all pairs of equal angles.",
        difficulty: "warmup",
        guideRef: "parallel-lines",
        hints: ["Sketch two parallel lines and a slanted line. Find a pair of angles where one is acute and the other is obtuse — can those two ever be equal?"],
        strategy: "Spot the F, Z or C shape",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m4-q04",
        question: "Which quadrilaterals **always** have diagonals that cross at right angles?",
        options: ["Square, rhombus and kite", "Square and rectangle", "Square only", "Every parallelogram"],
        answerIndex: 0,
        explanation:
          "The square, rhombus and kite all have perpendicular diagonals: in each one, a diagonal is a line of symmetry, and it cuts the other diagonal at 90°. A rectangle's diagonals are equal, but unless it is a square they don't cross at 90° — sketch a long, thin rectangle to see. A general parallelogram's diagonals don't either.",
        difficulty: "warmup",
        guideRef: "quadrilaterals",
        hints: ["Sketch a long, thin rectangle and its diagonals. Do they cross at 90°? Now try a kite."],
        strategy: "Consider extremes",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m4-q05",
        question: "A regular polygon has rotational symmetry of order 7. How many lines of symmetry does it have?",
        options: ["14", "3", "7", "You can't tell without a diagram"],
        answerIndex: 2,
        explanation:
          "Order 7 means the polygon has 7 sides, and a regular 7-sided polygon has 7 lines of symmetry — each one through a vertex and the midpoint of the opposite side. 14 counts each line twice, once from each end. For a regular polygon you can always tell: sides = lines of symmetry = order of rotational symmetry.",
        difficulty: "warmup",
        guideRef: "regular-polygon-symmetry",
        hints: ["For a regular polygon, how are the number of sides, lines of symmetry and order of rotational symmetry linked?"],
        strategy: "Use symmetry",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m4-q06",
        question: "Two straight roads cross at a junction. One of the angles between them is 4 times the size of another angle at the junction. What is the acute angle between the roads?",
        options: ["36°", "72°", "45°", "144°"],
        answerIndex: 0,
        explanation:
          "The two angles can't be vertically opposite (those are equal), so they must be next to each other, on a straight line: a + 4a = 180, so 5a = 180 and a = 36°. 72° uses 360° instead of 180°. 45° comes from 4a = 180, leaving out the angle a itself. 144° is the obtuse angle, not the acute one.",
        difficulty: "core",
        guideRef: "angle-facts",
        hints: [
          "If two angles at a crossing are different sizes, can they be vertically opposite? So where must they be?",
          "Call the smaller angle a. The other is 4a.",
          "They sit together on a straight line.",
        ],
        strategy: "Introduce a variable",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m4-q07",
        question: "The two horizontal lines are parallel. Find x.",
        diagram: D_P4Q07,
        options: ["x = 0", "x = 66", "x = 33", "x = 30"],
        answerIndex: 3,
        explanation:
          "Chain two facts. The (2x + 15)° angle corresponds to the angle in the same position at the lower crossing (above the line, left of the slanted line). That angle and (3x + 15)° sit together on a straight line, so (2x + 15) + (3x + 15) = 180, giving 5x + 30 = 180 and x = 30. Check: 75° + 105° = 180° ✓. x = 0 comes from making the two angles equal — but one is acute and the other obtuse. x = 66 uses 360°, and x = 33 forgets one of the two +15s.",
        difficulty: "core",
        guideRef: "parallel-lines",
        hints: [
          "The marked angles are at different crossings and don't form a simple F, Z or C. Can you move one of them?",
          "Find the angle at the lower crossing that corresponds to (2x + 15)°.",
          "That angle and (3x + 15)° lie on a straight line together.",
        ],
        strategy: "Chain angle facts",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m4-q08",
        question: "A ladder leans against a vertical wall, with its foot on level ground. The ladder makes an angle of 68° with the ground. What angle does it make with the wall?",
        options: ["112°", "22°", "68°", "158°"],
        answerIndex: 1,
        explanation:
          "The wall, the ground and the ladder make a right-angled triangle, because the wall meets the ground at 90°. So the angle at the wall is 180 − 90 − 68 = 22°. 112° is 180 − 68, which forgets the right angle. 68° assumes the two acute angles are equal, which only happens when both are 45°. 158° is the angle on the outside of the triangle at the top (180 − 22).",
        difficulty: "core",
        guideRef: "triangles",
        hints: ["Sketch it. What shape do the wall, the ground and the ladder make?", "Where is the right angle?", "The triangle's angles include 90° and 68°."],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m4-q09",
        question: "Each interior angle of a regular polygon is 165°. How many sides does it have?",
        options: ["12", "24", "15", "22"],
        answerIndex: 1,
        explanation:
          "Each exterior angle is 180 − 165 = 15°, so the number of sides is 360 ÷ 15 = 24. 12 comes from dividing 180 (not 360) by 15. 15 is the exterior angle in degrees, not the number of sides. 22 subtracts 2, borrowing the (n − 2) from the interior-sum formula where it doesn't belong.",
        difficulty: "core",
        guideRef: "polygon-angles",
        hints: ["Find the exterior angle first.", "How many exterior angles of that size fit into 360°?"],
        strategy: "Find the exterior angle first",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m4-q10",
        question: "Two straight lines cross. Wei Ling says: “y = 130°, because vertically opposite angles are equal.” What is her mistake?",
        diagram: D_P4Q10,
        options: [
          "There is no mistake — y is vertically opposite the 130°, so y = 130°",
          "y and 130° make a right angle, so y = 40°",
          "y sits next to the 130° on a straight line, not opposite it, so y = 50°",
          "Angles at a point add to 360°, so y = 230°",
        ],
        answerIndex: 2,
        explanation:
          "Vertically opposite angles are directly across the crossing point from each other. In the diagram, y is next to the 130° angle and the two of them make up the slanted straight line, so y = 180 − 130 = 50°. (The angle opposite the 130° is the one diagonally across, below the horizontal line on the right.) 40° uses 90° instead of 180°. 230° uses the full 360° with only two of the four angles.",
        difficulty: "core",
        guideRef: "angle-facts",
        hints: ["Is y directly across the crossing from the 130°, or right next to it?", "If y is next to the 130°, which angle fact links them?"],
        strategy: "Check the reason",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m4-q11",
        question: "This arrowhead-shaped quadrilateral (a dart) has angles of 70°, 25° and 25°, and a reflex angle r. Find r.",
        diagram: D_P4Q11,
        options: ["240°", "120°", "60°", "265°"],
        answerIndex: 0,
        explanation:
          "The angles of any quadrilateral add to 360° — including one with a reflex angle (a diagonal still splits it into two triangles). So r = 360 − 70 − 25 − 25 = 240°. 120° is 360 − 240, the angle on the outside of the dent. 60° uses 180° as the total, as if the dart were a triangle. 265° forgets one of the two 25° angles.",
        difficulty: "core",
        guideRef: "quadrilaterals",
        hints: [
          "Does the 360° rule still work when one angle is reflex? (Could you split the dart into two triangles?)",
          "Add the three known angles.",
          "Subtract their total from 360°.",
        ],
        strategy: "Subtract from the total",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m4-q12",
        question: "A hexagon (not regular) has exterior angles of 50°, 70°, 40°, 80°, 65° and x. Find x.",
        options: ["415°", "125°", "60°", "55°"],
        answerIndex: 3,
        explanation:
          "The exterior angles of **any** polygon — regular or not — add to 360°. 50 + 70 + 40 + 80 + 65 = 305, so x = 360 − 305 = 55°. 415° uses 720°, the hexagon's interior total. 125° is the interior angle at that vertex (180 − 55). 60° assumes the hexagon is regular, which it isn't.",
        difficulty: "core",
        guideRef: "polygon-angles",
        hints: [
          "Does the exterior angle sum depend on whether the polygon is regular?",
          "Add the five known exterior angles.",
          "Subtract their total from 360°.",
        ],
        strategy: "Use the exterior angle sum",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m4-q13",
        question: "A straight line crosses two parallel lines, making eight angles. One of them is 74°. How many of the eight angles are 74°?",
        options: ["4", "2", "8", "3"],
        answerIndex: 0,
        explanation:
          "At each crossing, vertically opposite angles are equal, so each crossing has two 74° angles and two 106° angles. Because the lines are parallel, the two crossings are identical copies (corresponding angles are equal). So 4 of the 8 angles are 74° and the other 4 are 106°. 2 counts only one pair, such as an alternate pair. 3 misses the vertically opposite angle at one crossing. 8 forgets that the obtuse angles are different.",
        difficulty: "core",
        guideRef: "parallel-lines",
        hints: ["At one crossing, how many of the four angles are 74°?", "Is the second crossing a copy of the first?"],
        strategy: "Find a pattern",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m4-q14",
        question:
          "A folding stool has two equal legs that cross at their midpoints. The angle between the legs, facing the floor, is 80°. The seat is parallel to the floor. What acute angle does each leg make with the seat?",
        diagram: D_P4Q14,
        options: ["80°", "100°", "40°", "50°"],
        answerIndex: 3,
        explanation:
          "Below the crossing, the two half-legs are equal, so with the floor they make an isosceles triangle with an 80° top angle. Each base angle is (180 − 80) ÷ 2 = 50° — the angle between a leg and the floor. The seat is parallel to the floor and each leg crosses both, so the leg makes the same angle with the seat (alternate angles): 50°. 40° halves the 80° instead of halving 180 − 80. 100° is 180 − 80, which forgets to share it between the two base angles.",
        difficulty: "core",
        guideRef: "parallel-lines",
        hints: [
          "Look at the triangle made by the two legs and the floor. What kind of triangle is it?",
          "Find the angle between a leg and the floor.",
          "The seat and the floor are parallel, and each leg crosses both.",
        ],
        strategy: "Chain angle facts",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m4-q15",
        question: "A regular pentagon and a square share the side AB. Find angle x, the angle at B outside both shapes.",
        diagram: D_P4Q15,
        options: ["198°", "162°", "18°", "72°"],
        answerIndex: 1,
        explanation:
          "Angles round point B add to 360°. Each interior angle of a regular pentagon is (5 − 2) × 180 ÷ 5 = 108°, and the square's is 90°, so x = 360 − 108 − 90 = 162°. 198° is 108 + 90, the angles inside the shapes rather than outside. 18° is the difference 108 − 90. 72° is the pentagon's exterior angle, which ignores the square.",
        difficulty: "core",
        guideRef: "polygon-angles",
        hints: [
          "What do the angles round point B add up to?",
          "Find the interior angle of a regular pentagon.",
          "Subtract both shapes' angles at B from 360°.",
        ],
        strategy: "Subtract from the total",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m4-q16",
        question: "Regular pentagons cannot tessellate on their own. Which is the correct reason?",
        options: [
          "A pentagon has an odd number of sides",
          "A pentagon has no parallel sides",
          "Its interior angle, 108°, does not divide exactly into 360°",
          "Its exterior angle, 72°, divides exactly into 360°",
        ],
        answerIndex: 2,
        explanation:
          "Tiles meeting at a point must fill exactly 360°. Three pentagons give 3 × 108 = 324°, leaving a 36° gap, and four give 432°, which overlap. “An odd number of sides” can't be the reason: equilateral triangles have 3 sides and do tessellate. “No parallel sides” fails for the same reason. The exterior angle dividing 360° is true of every regular polygon, so it can't explain why pentagons fail.",
        difficulty: "core",
        guideRef: "regular-polygon-symmetry",
        hints: ["Where tiles meet at a point, what must their angles add up to?", "Try fitting 3 and then 4 pentagons round a point."],
        strategy: "Look for a counterexample",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m4-q17",
        question: "AB is parallel to CD. Angle BAP = 130° and angle DCP = 140°. Find angle APC, marked x.",
        diagram: D_P4Q17,
        options: ["270°", "10°", "50°", "90°"],
        answerIndex: 3,
        explanation:
          "Draw a line through P parallel to AB and CD, pointing right. The angle between PA and this new line is co-interior with angle BAP, so it is 180 − 130 = 50°. Likewise the angle between PC and the new line is 180 − 140 = 40°. So x = 50 + 40 = 90°. 270° comes from simply adding 130° and 140° — but that is the reflex angle at P, round the outside. 50° is only the top part of x, and 10° is the difference 140 − 130.",
        difficulty: "challenge",
        guideRef: "parallel-lines",
        hints: [
          "Add a line through P, parallel to AB and CD.",
          "PA crosses AB and your new line. Is the pair of angles at A and P equal, or do they add to 180°?",
          "Do the same at C, then add the two parts of x.",
        ],
        strategy: "Add a construction line",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m4-q18",
        question: "The exterior angles of a pentagon are x, 2x, 3x, 4x and 5x. What is the smallest interior angle of the pentagon?",
        options: ["24°", "60°", "120°", "156°"],
        answerIndex: 1,
        explanation:
          "The exterior angles add to 360°: 15x = 360, so x = 24° and the exterior angles are 24°, 48°, 72°, 96° and 120°. The smallest interior angle sits next to the largest exterior angle: 180 − 120 = 60°. (Check: the interior angles 156 + 132 + 108 + 84 + 60 = 540° ✓.) 24° is x, the smallest exterior angle. 120° is the largest exterior angle, and 156° is the largest interior angle — the opposite of what was asked.",
        difficulty: "challenge",
        guideRef: "polygon-angles",
        hints: [
          "What do the exterior angles of any polygon add up to?",
          "Find x, then list all five exterior angles.",
          "A large exterior angle means a small interior angle.",
        ],
        strategy: "Introduce a variable",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m4-q19",
        question: "The interior angles of a polygon add up to 3 times as much as its exterior angles. How many sides does it have?",
        options: ["6", "5", "8", "1080"],
        answerIndex: 2,
        explanation:
          "Exterior angles always add to 360°, so the interior angles add to 3 × 360 = 1080°. Then (n − 2) × 180 = 1080, so n − 2 = 6 and n = 8. Check: an octagon's angles add to 6 × 180 = 1080° ✓. 6 is the number of triangles, n − 2, not n. 5 comes from taking the exterior total as 180°. 1080 is the angle total in degrees, not the number of sides.",
        difficulty: "challenge",
        guideRef: "polygon-angles",
        hints: [
          "What do the exterior angles of any polygon add up to?",
          "So what do the interior angles add up to?",
          "Solve (n − 2) × 180 = 1080.",
        ],
        strategy: "Work backwards",
      },
      {
        kind: "mcq",
        id: "angles-polygons-m4-q20",
        question:
          "Zara wants to prove that the exterior angles of **any** polygon with n sides add up to 360°. She writes:\n\n- At each vertex, interior angle + exterior angle = 180°, so all of them together make n × 180°.\n- The interior angles add up to (n − 2) × 180°.\n\nWhich line finishes her proof?",
        options: [
          "Exterior angles = n × 180° − (n − 2) × 180° = 2 × 180° = 360°",
          "Exterior angles = (n − 2) × 180° − n × 180° = 360°",
          "Each exterior angle is 360° ÷ n, so n of them make 360°",
          "Exterior angles = n × 180° − 180° = 360°",
        ],
        answerIndex: 0,
        explanation:
          "Subtract the interior total from the grand total: n × 180 − (n − 2) × 180 = n × 180 − n × 180 + 2 × 180 = 360°. The n's cancel, so it works for every polygon. Subtracting the other way round gives −360°, not 360°. “360° ÷ n each” only describes regular polygons — and it assumes the very fact it is meant to prove. n × 180 − 180 equals 360 only when n = 3, so it isn't a proof for every n.",
        difficulty: "challenge",
        guideRef: "angle-proofs",
        hints: [
          "You have a grand total (interior + exterior) and the interior total. How do you get the exterior total?",
          "Expand (n − 2) × 180° carefully.",
          "Do the n's cancel? They need to, for the proof to work for every n.",
        ],
        strategy: "Introduce a variable",
      },
    ],
  },
];

scene('wrap', S => {
  const root = S.root;
  E('rect', { x: 0, y: 0, width: 1200, height: 750, fill: '#163E73' }, root);
  const ms = ['48 000 cm^2', '48,000', '1 000 000 cm^3', '147pi ~= 462 cm^3', 'V = pi r^2 h', 'pi * 3.5^2 * 12', 'SA = 2(lw + lh + wh)', '2 * 1/2 * 3 * 4 = 12', '100 * 100 = 10 000 cm^2', '48 000 ÷ 1000 = 48 "litres"', '1 "m"^2 = 100 cm^2', '2pi r', '"curved surface" = 2pi rh'];
  ms.forEach((m, i) => mkMath(root, 40, 150 + i * 44, m, { size: 34 }));
  mkText(root, 620, 150, 'Top: {{6 * 4 = 24}}', { size: 30 });
  mkText(root, 620, 200, 'about **462 ml**', { size: 30 });
  const w = mkWorking(root, 760, 250, ['V = pi r^2 h', '= pi * 3.5^2 * 12', '= 147pi ~= 462 cm^3'], { size: 32 });
  const u = avUnitDrop(root, '48 000 cm', '³', { size: 56, anchor: 'start' }); tr(u, 620, 520); u.set(1);
  return t => {};
});

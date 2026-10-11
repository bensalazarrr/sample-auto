import { mkdirSync, writeFileSync } from "node:fs";
mkdirSync("public/images/parts", { recursive: true });
const shapes = {
  oil: '<path d="M153 83h73l19 33v111q0 12-13 12h-92q-13 0-13-12V119l26-18z" fill="url(#metal)"/><rect x="167" y="65" width="51" height="21" rx="3" fill="#242931"/><path d="M148 134h78v73h-78z" fill="#c83140"/><text x="187" y="162" text-anchor="middle" fill="white" font-size="11" font-weight="bold">MOTORA</text><text x="187" y="187" text-anchor="middle" fill="white" font-size="20" font-weight="bold">5W-30</text><path d="M156 107h23v20h-29z" fill="#a9afb5"/>',
  battery:
    '<rect x="100" y="104" width="193" height="122" rx="9" fill="url(#dark)"/><rect x="94" y="91" width="205" height="26" rx="5" fill="#353c43"/><rect x="116" y="74" width="30" height="20" rx="3" fill="#a8afb3"/><rect x="248" y="74" width="30" height="20" rx="3" fill="#c83140"/><path d="M157 91V69h80v22" fill="none" stroke="#383e44" stroke-width="12"/><rect x="117" y="131" width="159" height="69" rx="2" fill="#c83140"/><text x="196" y="158" text-anchor="middle" fill="white" font-size="17" font-weight="bold">VOLTCORE</text><text x="196" y="182" text-anchor="middle" fill="#f4b1b8" font-size="12">12V · START STRONG</text>',
  rotor:
    '<ellipse cx="197" cy="151" rx="94" ry="95" fill="url(#metal)" stroke="#858e96" stroke-width="5"/><circle cx="197" cy="151" r="70" fill="none" stroke="#9ba3a9" stroke-width="2"/><circle cx="197" cy="151" r="37" fill="#434c54"/><circle cx="197" cy="151" r="19" fill="#dddeda"/><g fill="#353c44"><circle cx="197" cy="101" r="6"/><circle cx="244" cy="136" r="6"/><circle cx="226" cy="191" r="6"/><circle cx="169" cy="191" r="6"/><circle cx="150" cy="136" r="6"/></g>',
  brake:
    '<g transform="rotate(-18 190 150)"><path d="M98 145q90-84 186 0l-16 53q-71-43-153 0z" fill="#353e46" stroke="#7b858b" stroke-width="5"/><path d="M115 146q78-60 150 0l-9 29q-62-31-130 0z" fill="#697078"/><path d="M146 193q71-65 143-3l-8 45q-68-27-125 5z" fill="#222b32" stroke="#7b858b" stroke-width="4"/></g>',
  filter:
    '<ellipse cx="198" cy="104" rx="60" ry="21" fill="#303a42"/><path d="M138 102v111c0 30 120 30 120 0V102" fill="url(#dark)"/><ellipse cx="198" cy="102" rx="60" ry="22" fill="url(#metal)"/><ellipse cx="198" cy="102" rx="20" ry="9" fill="#303a42"/><rect x="146" y="145" width="104" height="43" rx="2" fill="#c83140"/><text x="198" y="164" text-anchor="middle" fill="white" font-size="13" font-weight="bold">PUREFLOW</text><text x="198" y="179" text-anchor="middle" fill="#ffb6bd" font-size="8">ENGINE OIL FILTER</text>',
  spark:
    '<g transform="rotate(23 200 150)">' +
    [135, 185, 235]
      .map(
        (x) =>
          `<rect x="${x}" y="65" width="19" height="90" rx="5" fill="#f7f7f5" stroke="#b5b9bc" stroke-width="2"/><path d="M${x} 80h19m-19 10h19m-19 10h19m-19 10h19" stroke="#92999e" stroke-width="3"/><rect x="${x - 5}" y="148" width="29" height="28" rx="4" fill="url(#metal)"/><rect x="${x + 2}" y="176" width="15" height="40" fill="#939c9f"/><path d="M${x} 184h20m-20 8h20m-20 8h20" stroke="#4d575c" stroke-width="2"/><path d="M${x + 8} 216v13" stroke="#555" stroke-width="4"/>`,
      )
      .join("") +
    "</g>",
  tire: '<ellipse cx="196" cy="151" rx="82" ry="104" fill="#22282c"/><ellipse cx="206" cy="151" rx="62" ry="89" fill="#11171b" stroke="#454e54" stroke-width="8"/><ellipse cx="206" cy="151" rx="41" ry="64" fill="url(#metal)"/><ellipse cx="206" cy="151" rx="15" ry="24" fill="#303941"/><path d="M206 89v39m0 46v40m-37-92 24 19m25 17 25 19m-75 1 26-22m24-18 23-20" stroke="#343d44" stroke-width="10"/>',
  airfilter:
    '<g transform="rotate(-15 200 150)"><rect x="92" y="90" width="215" height="138" rx="5" fill="#242d34"/><rect x="101" y="99" width="197" height="120" fill="#dbd1ac"/>' +
    Array.from(
      { length: 18 },
      (_, i) =>
        `<path d="M${108 + i * 10} 103v112" stroke="#a99e78" stroke-width="4"/>`,
    ).join("") +
    "</g>",
  shock:
    '<g transform="rotate(28 200 150)"><rect x="193" y="48" width="13" height="175" fill="url(#metal)"/><rect x="183" y="113" width="33" height="112" rx="6" fill="#c83140"/><path d="M177 84l48 12-48 12 48 12-48 12 48 12-48 12 48 12" fill="none" stroke="#3a434c" stroke-width="8"/><circle cx="199" cy="46" r="12" fill="none" stroke="#535d63" stroke-width="7"/><circle cx="199" cy="239" r="13" fill="none" stroke="#535d63" stroke-width="8"/></g>',
  fluid:
    '<rect x="157" y="87" width="78" height="146" rx="13" fill="url(#metal)"/><rect x="168" y="64" width="57" height="30" rx="5" fill="#303940"/><rect x="162" y="135" width="68" height="68" rx="2" fill="#c83140"/><text x="196" y="163" text-anchor="middle" fill="white" font-size="10" font-weight="bold">ROADLINE</text><text x="196" y="183" text-anchor="middle" fill="white" font-size="15">FLUID</text>',
  belt: '<ellipse cx="197" cy="151" rx="104" ry="65" transform="rotate(-30 197 151)" fill="none" stroke="#313a41" stroke-width="23"/><ellipse cx="197" cy="151" rx="104" ry="65" transform="rotate(-30 197 151)" fill="none" stroke="#667079" stroke-width="3"/>',
  pump: '<path d="M135 103l95-18 57 45-17 81-98 22-50-50z" fill="url(#metal)" stroke="#7d8992" stroke-width="4"/><circle cx="201" cy="153" r="51" fill="#313e47"/><circle cx="201" cy="153" r="35" fill="url(#metal)"/><circle cx="201" cy="153" r="13" fill="#3a454c"/><path d="M128 112l-23-18m158 24 24-23m-21 104 20 20m-115-3-14 24" stroke="#818c93" stroke-width="19"/>',
  link: '<g transform="rotate(30 195 150)"><path d="M161 85v140m63-140v140" stroke="#69757e" stroke-width="15"/><g fill="#303c44" stroke="#96a0a6" stroke-width="5"><circle cx="161" cy="80" r="18"/><circle cx="161" cy="226" r="18"/><circle cx="224" cy="80" r="18"/><circle cx="224" cy="226" r="18"/></g></g>',
  arm: '<path d="M111 209l87-129 92 124-41 19-51-80-48 86z" fill="url(#dark)" stroke="#697780" stroke-width="4"/><g fill="#b8bfc2" stroke="#414e56" stroke-width="12"><circle cx="198" cy="86" r="20"/><circle cx="127" cy="216" r="21"/><circle cx="272" cy="210" r="21"/></g>',
  bulb:
    '<g transform="rotate(15 200 150)">' +
    [140, 220]
      .map(
        (x) =>
          `<rect x="${x}" y="68" width="22" height="100" rx="4" fill="url(#metal)"/><rect x="${x + 5}" y="85" width="12" height="22" fill="#e9c366"/><rect x="${x - 15}" y="165" width="52" height="55" rx="5" fill="#374650"/><path d="M${x - 12} 176h46m-46 11h46m-46 11h46" stroke="#87929a" stroke-width="3"/>`,
      )
      .join("") +
    "</g>",
  wiper:
    '<path d="M95 190q96-82 214-83m-198 121q90-72 181-74" fill="none" stroke="#303d46" stroke-width="15"/><path d="M95 182q96-82 214-83m-198 121q90-72 181-74" fill="none" stroke="#89949b" stroke-width="3"/><path d="M188 135l20 14m-18 28 14 15" stroke="#202b33" stroke-width="17"/>',
  gauge:
    '<path d="M176 102l-22-29 15-16 39 31 34 47-31 98-54-14 22-69z" fill="url(#dark)"/><rect x="173" y="133" width="48" height="37" rx="3" fill="#a0b8a5" transform="rotate(14 197 151)"/><text x="196" y="158" text-anchor="middle" fill="#263d30" font-size="15">32.0</text><circle cx="185" cy="190" r="8" fill="#c83140"/>',
};
for (const [name, shape] of Object.entries(shapes))
  writeFileSync(
    `public/images/parts/${name}.svg`,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300"><defs><linearGradient id="metal" x1="0" x2="1"><stop stop-color="#a5adb3"/><stop offset=".4" stop-color="#e0e4e5"/><stop offset="1" stop-color="#858f97"/></linearGradient><linearGradient id="dark" x1="0" x2="1"><stop stop-color="#222c34"/><stop offset=".45" stop-color="#49555e"/><stop offset="1" stop-color="#1f2931"/></linearGradient></defs><ellipse cx="200" cy="250" rx="93" ry="9" fill="#000" opacity=".08"/><g font-family="Arial,sans-serif">${shape}</g></svg>`,
  );
writeFileSync(
  "public/images/og.svg",
  '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#0b0d10"/><rect x="80" y="85" width="65" height="6" fill="#e63946"/><g fill="#f5f5f5" font-family="Arial"><text x="80" y="160" font-size="35">SAMPLE AUTO</text><text x="80" y="310" font-size="76" font-weight="bold">Built for the road.</text><text x="80" y="400" font-size="76" font-weight="bold" fill="#e63946">Cared for here.</text><text x="80" y="530" font-size="23" fill="#a1a1aa">SERVICE. PARTS. PEACE OF MIND.</text></g></svg>',
);

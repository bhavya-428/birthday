import React from 'react'

export default function ChibiCharacter({ eyeOffset = { x: 0, y: 0 } }) {
  const ex = Math.max(-3, Math.min(3, eyeOffset.x))
  const ey = Math.max(-2, Math.min(2, eyeOffset.y))

  return (
    <svg
      className="chibi-svg"
      viewBox="0 0 200 230"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible' }}
    >
      {/* SHADOW */}
      <ellipse cx="100" cy="228" rx="48" ry="7" fill="rgba(180,100,140,0.2)" />

      {/* LEGS */}
      <rect x="78"  y="204" width="18" height="22" rx="9" fill="#FFDDD2" />
      <rect x="104" y="204" width="18" height="22" rx="9" fill="#FFDDD2" />
      {/* SHOES (Black combat boots style) */}
      <ellipse cx="87"  cy="226" rx="15" ry="8" fill="#1E1E1E" />
      <ellipse cx="113" cy="226" rx="15" ry="8" fill="#1E1E1E" />

      {/* BODY (Oversized BTS Purple Hoodie) */}
      <ellipse cx="100" cy="178" rx="46" ry="38" fill="#7C3AED" />
      {/* HOODIE POCKET */}
      <path d="M76 186 Q100 196 124 186 L120 202 Q100 210 80 202 Z" fill="#6D28D9" />
      {/* HOODIE STRINGS */}
      <line x1="94" y1="158" x2="94" y2="175" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
      <line x1="106" y1="158" x2="106" y2="172" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
      {/* JK LOGO */}
      <text x="100" y="178" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle" fontFamily="'Nunito', sans-serif" letterSpacing="0.5">JK</text>

      {/* ARMS (Purple Hoodie Sleeves) */}
      <ellipse cx="51" cy="164" rx="17" ry="11" fill="#7C3AED" transform="rotate(-20 51 164)" />
      <ellipse cx="149" cy="164" rx="17" ry="11" fill="#7C3AED" transform="rotate(20 149 164)" />
      {/* HANDS */}
      <circle cx="41"  cy="170" r="8.5" fill="#FFDDD2" />
      <circle cx="159" cy="170" r="8.5" fill="#FFDDD2" />

      {/* HEAD */}
      <circle cx="100" cy="95" r="60" fill="#FFDDD2" />

      {/* JUNGKOOK HAIR BASE (Charcoal Black) */}
      <ellipse cx="100" cy="50" rx="61" ry="34" fill="#1E1E1E" />
      {/* SIDE HAIR */}
      <ellipse cx="49"  cy="78" rx="20" ry="38" fill="#1E1E1E" />
      <ellipse cx="151" cy="78" rx="20" ry="38" fill="#1E1E1E" />
      {/* Jungkook curtain bangs / middle part split */}
      <path d="M42 62 Q60 84 84 80 Q88 64 88 56 Z" fill="#1E1E1E" />
      <path d="M158 62 Q140 84 116 80 Q112 64 112 56 Z" fill="#1E1E1E" />
      <path d="M84 79 Q100 84 116 79 Q100 81 84 79" stroke="#1E1E1E" strokeWidth="3" fill="none" />
      {/* HAIR SHINE */}
      <ellipse cx="78"  cy="40" rx="14" ry="5"  fill="#4A5568" opacity="0.35" />
      <ellipse cx="122"  cy="40" rx="14" ry="5"  fill="#4A5568" opacity="0.35" />

      {/* EARS & SILVER HOOP EARRINGS (Jungkook's Left Ear piercings) */}
      <circle cx="40"  cy="100" r="10" fill="#FFDDD2" />
      <circle cx="160" cy="100" r="10" fill="#FFDDD2" />
      <circle cx="40"  cy="100" r="6"  fill="#FFB6C1" opacity="0.5" />
      <circle cx="160" cy="100" r="6"  fill="#FFB6C1" opacity="0.5" />
      {/* Double hoop earrings on his left ear (viewer's right) */}
      <circle cx="168" cy="103" r="5" stroke="#CBD5E1" strokeWidth="2.2" fill="none" />
      <circle cx="166" cy="110" r="4.5" stroke="#94A3B8" strokeWidth="1.8" fill="none" />

      {/* LEFT EYE */}
      <ellipse cx="76" cy="96" rx="13" ry="14" fill="white" />
      <ellipse
        cx={76 + ex} cy={98 + ey}
        rx="8" ry="9"
        fill="#3d1a3d"
      />
      <circle cx={78 + ex} cy={95 + ey} r="3" fill="white" />
      <circle cx={74 + ex} cy={99 + ey} r="1.2" fill="white" opacity="0.7" />
      {/* Left lash */}
      <path d="M65 87 Q68 82 73 85" stroke="#3d1a3d" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M72 84 Q75 80 79 83" stroke="#3d1a3d" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* RIGHT EYE */}
      <ellipse cx="124" cy="96" rx="13" ry="14" fill="white" />
      <ellipse
        cx={124 + ex} cy={98 + ey}
        rx="8" ry="9"
        fill="#3d1a3d"
      />
      <circle cx={126 + ex} cy={95 + ey} r="3" fill="white" />
      <circle cx={122 + ex} cy={99 + ey} r="1.2" fill="white" opacity="0.7" />
      {/* Right lash */}
      <path d="M121 84 Q125 80 128 83" stroke="#3d1a3d" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M128 83 Q132 80 135 84" stroke="#3d1a3d" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* BLUSH */}
      <ellipse cx="63"  cy="112" rx="14" ry="8" fill="#FFB6C1" opacity="0.65" />
      <ellipse cx="137" cy="112" rx="14" ry="8" fill="#FFB6C1" opacity="0.65" />
      {/* Jungkook cheek scar */}
      <path d="M132 110 L140 116" stroke="#E27589" strokeWidth="1.8" strokeLinecap="round" opacity="0.85" />

      {/* NOSE */}
      <ellipse cx="100" cy="112" rx="3.5" ry="2.5" fill="#E8A090" opacity="0.6" />

      {/* MOUTH */}
      <path d="M89 122 Q100 132 111 122" stroke="#E0789A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* SMILE DIMPLES */}
      <circle cx="87"  cy="122" r="2" fill="#FFB6C1" opacity="0.5" />
      <circle cx="113" cy="122" r="2" fill="#FFB6C1" opacity="0.5" />
    </svg>
  )
}

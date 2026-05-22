import React from 'react'

export default function CakeSVG({ sliced }) {
  return (
    <div className={`cake-container${sliced ? ' cake-sliced' : ''}`}>
      <svg
        className="cake-svg"
        viewBox="0 0 190 172"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        {/* PLATE */}
        <ellipse cx="95" cy="162" rx="80" ry="13" fill="#F0E8FF" opacity="0.6" />

        {/* ---- BOTTOM LAYER ---- */}
        <g className="cake-right-half" style={{ transformOrigin: '95px 130px' }}>
          <rect x="95" y="120" width="62" height="38" rx="0" fill="#FFB6C1" />
          <rect x="95" y="118" width="62" height="9"  rx="0" fill="#FF8FAD" />
          {/* Right cap */}
          <rect x="152" y="120" width="10" height="38" rx="5" fill="#FFB6C1" />
          <rect x="152" y="118" width="10" height="9"  rx="4" fill="#FF8FAD" />
          {/* Right swirl */}
          <path
            d="M95 118 Q105 110 115 118 Q125 110 135 118 Q145 110 153 118"
            stroke="white" strokeWidth="5" fill="none" strokeLinecap="round"
          />
          {/* Right stars */}
          <text x="118" y="141" fontSize="9"  fill="white" opacity="0.55">★</text>
        </g>
        <g className="cake-left-half" style={{ transformOrigin: '95px 130px' }}>
          <rect x="33" y="120" width="62" height="38" rx="0" fill="#FFB6C1" />
          <rect x="33" y="118" width="62" height="9"  rx="0" fill="#FF8FAD" />
          {/* Left rounded cap */}
          <rect x="28" y="120" width="10" height="38" rx="5" fill="#FFB6C1" />
          <rect x="28" y="118" width="10" height="9"  rx="4" fill="#FF8FAD" />
          {/* Left swirl */}
          <path
            d="M35 118 Q45 110 55 118 Q65 110 75 118 Q85 110 95 118"
            stroke="white" strokeWidth="5" fill="none" strokeLinecap="round"
          />
          {/* Left stars */}
          <text x="48"  y="144" fontSize="11" fill="white" opacity="0.65">★</text>
          <text x="82"  y="150" fontSize="8"  fill="white" opacity="0.5">✦</text>
        </g>

        {/* ---- MIDDLE LAYER ---- */}
        <g className="cake-right-half" style={{ transformOrigin: '95px 93px' }}>
          <rect x="95" y="84" width="52" height="38" rx="0" fill="#C084FC" />
          <rect x="95" y="82" width="52" height="9"  rx="0" fill="#A855F7" />
          {/* Right cap */}
          <rect x="142" y="84" width="10" height="38" rx="5" fill="#C084FC" />
          <rect x="142" y="82" width="10" height="9"  rx="4" fill="#A855F7" />
          {/* Right swirl */}
          <path
            d="M93 82 Q93 76 103 82 Q113 74 123 82 Q133 74 143 82"
            stroke="white" strokeWidth="4" fill="none" strokeLinecap="round"
          />
          {/* Right deco */}
          <text x="115" y="104" fontSize="8"  fill="white" opacity="0.55">✦</text>
        </g>
        <g className="cake-left-half" style={{ transformOrigin: '95px 93px' }}>
          <rect x="43" y="84" width="52" height="38" rx="0" fill="#C084FC" />
          <rect x="43" y="82" width="52" height="9"  rx="0" fill="#A855F7" />
          {/* Left cap */}
          <rect x="38" y="84" width="10" height="38" rx="5" fill="#C084FC" />
          <rect x="38" y="82" width="10" height="9"  rx="4" fill="#A855F7" />
          {/* Left swirl */}
          <path
            d="M43 82 Q53 74 63 82 Q73 74 83 82 Q93 76 93 82"
            stroke="white" strokeWidth="4" fill="none" strokeLinecap="round"
          />
          {/* Left deco */}
          <text x="55"  y="107" fontSize="10" fill="white" opacity="0.6">♡</text>
        </g>

        {/* ---- TOP LAYER ---- */}
        <g className="cake-right-half" style={{ transformOrigin: '95px 58px' }}>
          <rect x="95" y="50" width="38" height="30" rx="0" fill="#F9D77E" />
          <rect x="95" y="48" width="38" height="7"  rx="0" fill="#F0C840" />
          {/* Right cap */}
          <rect x="128" y="50" width="10" height="30" rx="5" fill="#F9D77E" />
          <rect x="128" y="48" width="10" height="7"  rx="4" fill="#F0C840" />
          {/* Right deco */}
          <text x="99" y="66" fontSize="8" fill="rgba(180,100,0,0.4)">★</text>
          
          {/* Candle 3 */}
          <rect x="110" y="21" width="11" height="28" rx="5" fill="#BAE6FD" />
          <rect x="112" y="19" width="7"  height="6"  rx="3" fill="#DFFFFF" />
          {/* Flame 3 */}
          <ellipse cx="115.5" cy="18" rx="5.5" ry="7" fill="#FF8C00" opacity="0.9">
            <animate attributeName="ry" values="7;8.5;6;9;7" dur="0.6s" repeatCount="indefinite" />
            <animate attributeName="cx" values="115.5;116.5;115;116;115.5" dur="0.55s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="115.5" cy="16" rx="3" ry="4.5" fill="#FFD700">
            <animate attributeName="ry" values="4.5;5.5;4;6;4.5" dur="0.6s" repeatCount="indefinite" />
          </ellipse>
        </g>
        <g className="cake-left-half" style={{ transformOrigin: '95px 58px' }}>
          <rect x="57" y="50" width="38" height="30" rx="0" fill="#F9D77E" />
          <rect x="57" y="48" width="38" height="7"  rx="0" fill="#F0C840" />
          {/* Left cap */}
          <rect x="52" y="50" width="10" height="30" rx="5" fill="#F9D77E" />
          <rect x="52" y="48" width="10" height="7"  rx="4" fill="#F0C840" />
          {/* Left deco */}
          <text x="74" y="70" fontSize="9" fill="rgba(180,100,0,0.5)">✦</text>

          {/* Candle 1 */}
          <rect x="68" y="24" width="11" height="26" rx="5" fill="#F9D77E" />
          <rect x="70" y="22" width="7"  height="6"  rx="3" fill="#FFEAA0" />
          {/* Flame 1 */}
          <ellipse cx="73.5" cy="21" rx="5.5" ry="7" fill="#FF8C00" opacity="0.9">
            <animate attributeName="ry" values="7;9;6;8;7" dur="0.7s" repeatCount="indefinite" />
            <animate attributeName="cx" values="73.5;74;73;74.5;73.5" dur="0.5s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="73.5" cy="19" rx="3" ry="4.5" fill="#FFD700">
            <animate attributeName="ry" values="4.5;6;4;5.5;4.5" dur="0.7s" repeatCount="indefinite" />
          </ellipse>

          {/* Candle 2 (Middle) */}
          <rect x="89" y="17" width="11" height="32" rx="5" fill="#F472B6" />
          <rect x="91" y="15" width="7"  height="6"  rx="3" fill="#FFA0CC" />
          {/* Flame 2 */}
          <ellipse cx="94.5" cy="13" rx="5.5" ry="7" fill="#FF8C00" opacity="0.9">
            <animate attributeName="ry" values="7;10;6;9;7" dur="0.5s" repeatCount="indefinite" />
            <animate attributeName="cx" values="94.5;95.5;94;95;94.5" dur="0.4s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="94.5" cy="11" rx="3" ry="4.5" fill="#FFD700">
            <animate attributeName="ry" values="4.5;6.5;4;5.5;4.5" dur="0.5s" repeatCount="indefinite" />
          </ellipse>
        </g>
      </svg>

      {/* SLICE GLOW LINE */}
      <div className="cake-slice-glow" />
    </div>
  )
}

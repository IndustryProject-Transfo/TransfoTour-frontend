import { SVG } from '@svgdotjs/svg.js'
import { useEffect } from 'react'

function TransfoMap({
  selectedBuilding,
}: {
  selectedBuilding: number | undefined
}) {
  useEffect(() => {
    console.log(`#Location_${selectedBuilding}`)
    // clear any previous selections
    let svg = SVG('#transfo-map')
    svg.children().forEach((child) => child.removeClass('fill-selection-10'))

    // select new building
    let buildings = svg.find(`#Location_${selectedBuilding}`)
    buildings.forEach((building) => building.addClass('fill-selection-10'))
  }, [selectedBuilding])

  return (
    <svg
      id="transfo-map"
      data-name="Layer 2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 865.13 794.63"
      className="w-4/6"
    >
      <path
        className="cls-1 fill-gray-200"
        d="M0,170.99l32.07,185.01,44,20,34,168s6,16-15,25-62.57,32.94-62.57,32.94l75.16,35.29,140.41-52.23,23,62s6,14,17,21,94,74,103,90l9,16,42.78,20.63v-69.28l-139.78-233.35,178-88,7,4,136-31v-124.47l23-1.53v-22.28l152.78-.74,65.28-139.02v-13.31l-185.06-6.65,2-69H80.29L0,170.99Z"
      ></path>
      <polygon
        className="cls-2 fill-gray-400"
        points="91.15 121.4 100.07 258 175.57 252.08 175.57 291 245.07 286 248.47 115.87 91.15 121.4"
      ></polygon>
      <path
        className="cls-2 fill-gray-400"
        d="M325.57,191l-9.5,95-6,45.17-3.35,102.83,44.65,3.46,81.45-33.17s20.25-11.3,19.75-43.3-3.5-112-3.5-112c0,0,17.32-19,36.66-20l19.34-1,6.17-1.5v-35.5h-185.67Z"
      ></path>
      <rect
        className="fill-gray-600"
        x="372.07"
        y="111"
        width="123.3"
        height="34.78"
        id="Location_1"
      ></rect>
      <polygon
        className="fill-gray-600"
        points="372.07 151.45 372.07 166.76 437.54 166.76 437.07 151 372.07 151.45"
        id="Location_3"
      ></polygon>
      <polygon
        className="fill-gray-600"
        points="440.94 151 441.07 171 503.87 171 503.87 151 440.94 151"
        id="Location_4"
      ></polygon>
      <polygon
        className="fill-gray-600"
        points="357.39 68.68 357.39 106.66 440.94 106.66 441.07 77 433.72 77.18 433.72 61.87 401.83 61.87 401.83 68.68 357.39 68.68"
        id="Location_2"
      ></polygon>
      <polygon
        className="fill-gray-600"
        points="445.07 77 445.07 106.66 495.07 107 495.07 70.94 481.76 70.94 482.07 45 460.07 48 460.07 65 449.07 65 449.45 76 445.07 77"
        id="Location_5"
      ></polygon>
      <path
        className="fill-gray-600"
        d="M372.07,171h11.61v3.69h47.06s4.67,8.97,0,9.64-58.67,0-58.67,0v-13.33Z"
        id="Location_10"
      ></path>
      <polygon
        className="fill-gray-600"
        points="367.38 166.76 335.07 166.76 335.07 171 323.16 171 323.16 166.76 306.72 166.76 306.72 145.78 367.38 145.78 367.38 166.76"
        id="Location_16"
      ></polygon>
      <rect
        className="fill-gray-600"
        x="376.07"
        y="199"
        width="23.16"
        height="13.68"
        id="Location_17"
      ></rect>
      <polygon
        className="fill-gray-600"
        points="407.07 218 407.07 235.35 419.07 247 437.54 247 449.07 236 449.07 218 437.54 205.84 419.4 205.84 407.07 218"
        id="Location_9"
      ></polygon>
      <rect
        className="fill-gray-600"
        x="319.05"
        y="68.68"
        width="13.04"
        height="42.32"
        id="Location_11"
      ></rect>
      <rect
        className="fill-gray-600"
        x="285.07"
        y="78"
        width="14.14"
        height="21.29"
        id="Location_8"
      ></rect>
      <rect
        className="fill-gray-600"
        x="267.46"
        y="84.27"
        width="13.61"
        height="12.19"
        id="Location_8"
      ></rect>
      <rect
        className="fill-gray-600"
        x="243.07"
        y="119"
        width="19.72"
        height="16.57"
        id="Location_23"
      ></rect>
      <path
        className="fill-gray-600"
        d="M231.75,99.29c1.32,2.71,0,22.11,0,22.11h7.37v-22.11h-7.37Z"
        id="Location_12"
      ></path>
      <polygon
        className="fill-gray-600"
        points="205.67 111 205.67 119 222.68 121.4 222.68 110.35 205.67 111"
        id="Location_13"
      ></polygon>
      <rect
        className="fill-gray-600"
        x="188.07"
        y="16.52"
        width="113.98"
        height="32.48"
        id="Location_19"
      ></rect>
      <path
        className="fill-gray-600"
        d="M539.02,76l311.81,2v6.27s-57.76,134.73-60.76,134.73h-164.87l-2.27-91.71h-83.91v-51.29Z"
        id="Location_30"
      ></path>
      <polygon
        className="fill-gray-600"
        points="549.07 132 617.96 132 621.07 229 565.24 229 565.24 212.68 549.07 212.68 549.07 177.81 565.8 177.81 566.37 161 551.63 161 551.63 151 565.8 151 565.8 135.57 549.07 135.57 549.07 132"
        id="Location_24"
      ></polygon>
      <polygon
        className="fill-gray-600"
        points="459.65 219 460.07 234 470.07 234 470.07 219 459.65 219"
        id="Location_18"
      ></polygon>
      <path
        className="fill-gray-600"
        d="M499.07,278v59.4l10,8.6h13.51v3.87h-11.76l-38.42,6.8,3.66,19.32h35.74l38.26-7.98s-1-18.02-3-19.02-14,0-14,0l-1-4h14l-1.38-70.7h-37.42l-8.2,3.7Z"
        id="Location_21"
      ></path>
      <path
        className="fill-gray-600"
        d="M595.28,247v15h6.24l2.55,99h8.79s1.79-115,0-114-17.57,0-17.57,0Z"
        id="Location_29"
      ></path>
      <polygon
        className="fill-gray-600"
        points="315.07 311 319.05 311 319.05 304 347.4 304 347.4 311 351.37 311 351.37 319.83 347.07 320 345.7 325.15 319.05 325.15 319.05 318.69 315.07 318.13 315.07 311"
        id="Location_15"
      ></polygon>
      <polygon
        className="fill-gray-600"
        points="351.37 292.26 352.15 304 355.2 304 355.55 314.57 366.07 314 366.07 309.27 377.07 309 377.59 303.42 388.01 303.42 387.07 291 351.37 292.26"
        id="Location_34"
      ></polygon>
      <polygon
        className="fill-gray-600"
        points="392.07 303 392.07 289.35 403.05 290 403.07 286 400.64 286 401.07 269 408.07 270 408.07 280.28 413.07 280 413.07 276.73 417.07 277 418.07 281 426.07 280 427.07 299 402.07 299 401.07 295 396.07 295 396.53 303 392.07 303"
        id="Location_35"
      ></polygon>
      <polygon
        className="fill-gray-600"
        points="85.07 405 136.07 397 141.07 419 89.07 428 85.07 405"
        id="Location_38"
      ></polygon>
      <polygon
        className="fill-gray-600"
        points="107.07 440 120.07 513 149.07 508 135.07 434 107.07 440"
        id="Location_38"
      ></polygon>
      <polygon
        className="fill-gray-600"
        points="24.07 306 78.07 297 84.07 327 29.07 336 24.07 306"
        id="Location_38"
      ></polygon>
      <polygon
        className="fill-gray-600"
        points="20.07 216 33.07 287 57.07 282 44.07 211 20.07 216"
        id="Location_38"
      ></polygon>
      <polygon
        className="fill-gray-600"
        points="4.07 190 1.07 171 4.07 165.73 42.57 160.39 47.07 183 4.07 190"
        id="Location_38"
      ></polygon>
      <polygon
        className="fill-gray-600"
        points="53.07 606 75.07 617 166.07 580 158.07 563 53.07 606"
        id="Location_32"
      ></polygon>
      <polygon
        className="fill-gray-600"
        points="164.07 551.51 173.07 576 190.07 569 183.07 552 179.97 551.51 177.07 546.6 164.07 551.51"
        id="Location_32"
      ></polygon>
      <polygon
        className="fill-gray-600"
        points="215.5 564 220.07 578 245.07 569 238.07 551 220.07 559 221.16 561.3 215.5 564"
        id="Location_32"
      ></polygon>
      <polygon
        className="fill-gray-600"
        points="255.07 587 258.07 596 255.07 596 268.07 634 271.07 632 273.7 634 293.07 626 274.07 580.24 255.07 587"
        id="Location_27"
      ></polygon>
      <polygon
        className="fill-gray-600"
        points="279.07 638 276.07 644 311.07 670 315.07 664 279.07 638"
        id="Location_37"
      ></polygon>
      <ellipse
        className="fill-gray-600"
        cx="147.07"
        cy="203.5"
        rx="28.5"
        ry="29"
        id="Location_20"
      ></ellipse>
      <circle
        className="fill-gray-600"
        cx="202.57"
        cy="143.5"
        r="16.5"
        id="Location_40"
      ></circle>
      <circle
        className="fill-gray-600"
        cx="203.57"
        cy="203.5"
        r="12.5"
        id="Location_39"
      ></circle>
      <circle
        className="fill-gray-600"
        cx="310.07"
        cy="89"
        r="6"
        id="Location_6"
      ></circle>
      <circle className="fill-gray-600" cx="440.57" cy="70.5" r="3.5"></circle>
      <circle
        className="fill-gray-600"
        cx="563.57"
        cy="40.5"
        r="12.5"
        id="Location_28"
      ></circle>
      <polygon
        className="fill-gray-600"
        points="274.07 179 278.07 197 274.07 198.03 275.07 202 280.07 201 284.07 220 296.07 218 287.07 177 274.07 179"
        id="Location_36"
      ></polygon>
    </svg>
  )
}

export default TransfoMap

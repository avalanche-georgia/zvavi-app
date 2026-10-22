const radius = 18
const circumference = 2 * Math.PI * radius

// Indeterminate spinner while a photo is still being compressed (no byte
// progress to report yet — uploads show a bar instead). The <span> spins, not the <svg>: see Spinner
const UploadProgressRing = () => (
  <span className="inline-flex animate-spin">
    <svg className="size-11" viewBox="0 0 44 44">
      <circle className="stroke-white/30" cx="22" cy="22" fill="none" r={radius} strokeWidth="3" />
      <circle
        className="stroke-white"
        cx="22"
        cy="22"
        fill="none"
        r={radius}
        strokeDasharray={circumference}
        strokeDashoffset={circumference * 0.75}
        strokeLinecap="round"
        strokeWidth="3"
      />
    </svg>
  </span>
)

export default UploadProgressRing

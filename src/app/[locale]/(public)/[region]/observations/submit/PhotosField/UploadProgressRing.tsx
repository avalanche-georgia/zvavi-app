const radius = 18
const circumference = 2 * Math.PI * radius

// Indeterminate spin while the photo is still being compressed (no progress
// to report yet), determinate fill once bytes start going up.
const UploadProgressRing = ({ progress }: { progress: number | null }) => (
  <svg
    className={progress === null ? 'size-11 animate-spin' : 'size-11 -rotate-90'}
    viewBox="0 0 44 44"
  >
    <circle className="stroke-white/30" cx="22" cy="22" fill="none" r={radius} strokeWidth="3" />
    <circle
      className="stroke-white transition-[stroke-dashoffset] duration-200 ease-out"
      cx="22"
      cy="22"
      fill="none"
      r={radius}
      strokeDasharray={circumference}
      strokeDashoffset={circumference * (1 - (progress ?? 0.25))}
      strokeLinecap="round"
      strokeWidth="3"
    />
  </svg>
)

export default UploadProgressRing

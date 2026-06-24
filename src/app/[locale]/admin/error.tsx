'use client'

type AdminErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

const AdminError = ({ reset }: AdminErrorProps) => (
  <div className="flex flex-col items-center justify-center gap-4 p-4 py-12 md:p-6">
    <p className="text-gray-600">Something went wrong. Please try again.</p>
    <button
      className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
      onClick={reset}
    >
      Try again
    </button>
  </div>
)

export default AdminError

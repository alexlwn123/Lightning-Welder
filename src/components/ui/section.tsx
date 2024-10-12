export function Section({children}: {children: React.ReactNode}) {
  return (
    <div className="bg-gray-800/80 rounded-2xl shadow-2xl px-4 py-8 w-full max-w-5xl backdrop-filter backdrop-blur-md mt-20">
      {children}
    </div>
  )
}


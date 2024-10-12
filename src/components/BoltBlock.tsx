import boltsImg from '../assets/bolts.png'

export function BoltBlock() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center space-x-0 sm:space-x-8 -mx-4 sm:mx-0">
        <div className="flex flex-col items-center z-10">
          <h2 className="text-lg sm:text-4xl font-bold mb-4 text-green-500 font-mono tracking-wide animate-pulse whitespace-nowrap">
            Bolt 12
          </h2>
        </div>

        <img
          src={boltsImg}
          alt="Transformation"
          className="mx-0 z-0 w-[150px] sm:w-[400px] flex-shrink-0"
          width={400}
        />

        <div className="flex flex-col items-center z-10">
          <h2 className="text-lg sm:text-4xl font-bold mb-4 text-green-500 font-mono tracking-wide animate-pulse  whitespace-nowrap">
            Bolt 11
          </h2>
        </div>
      </div>
    </div>
  )
}

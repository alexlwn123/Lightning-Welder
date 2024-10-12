import { useState, useEffect } from "react"
import { QRCodeSVG } from "qrcode.react"

export function CypherpunkQr({title, size, qrValue}: {title: string, size: number, qrValue: string}) {
  const [binaryString, setBinaryString] = useState("")

  useEffect(() => {
    const generateBinary = () => {
      let binary = "''"
      for (let i = 0; i < 100; i++) {
        binary += Math.random() > 0.5 ? "1" : "0"
      }
      setBinaryString(binary)
    }
    generateBinary()
    const interval = setInterval(generateBinary, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center justify-center bg-gray-900">
      <div className="relative p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-2xl overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 right-0 overflow-hidden whitespace-nowrap text-green-500 animate-marquee">
            {binaryString}
          </div>
          <div className="absolute bottom-0 left-0 right-0 overflow-hidden whitespace-nowrap text-green-500 animate-marquee2">
            {binaryString}
          </div>
        </div>
        <div className="relative z-10">
          <h2 className="text-xl font-bold mb-6 text-center text-green-500 font-mono tracking-wider animate-pulse">
            {title}
          </h2>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 opacity-75 blur-lg animate-pulse"></div>
            <div className="relative bg-gray-800 p-1 rounded-lg">
              <QRCodeSVG
                marginSize={2}
                value={qrValue}
                size={size}
                bgColor={"#1F2937"}
                fgColor={"#10B981"}
                level={"L"}
              />
            </div>
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-green-500 rounded-tl-lg"></div>
          <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-green-500 rounded-tr-lg"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-green-500 rounded-bl-lg"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-green-500 rounded-br-lg"></div>
        </div>
      </div>
    </div>
  )
}
import './App.css'
import Header from '@/components/Header'
import { BoltBlock } from '@/components/BoltBlock'
import { Section } from './components/ui/section'
import { WeldFormComponent } from './components/weld-form'

function App() {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-black/90 min-h-screen px-6 sm:px-20">
      <Header />
      <main className="flex flex-col items-center justify-center py-10 sm:pt-20 max-w-5xl">
        <h1 className="text-3xl sm:text-6xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-500 font-mono whitespace-nowrap">
          Lightning Welder
        </h1>
        <div className="bg-gray-800/80 rounded-2xl shadow-2xl p-8 w-full backdrop-filter backdrop-blur-md mb-20">
          <BoltBlock />
        </div>

        <p className="w-full text-lg sm:text-xl text-gray-300 mt-8 text-center font-mono">
          <b>Lightning Welder</b> helps legacy lightning wallets pay <b>bolt12 offers</b>.
        </p>

        <Section>
            <h2 className="text-4xl font-bold mb-6 text-center text-green-500 font-mono">
                How It Works
            </h2>
            <p className="text-xl text-gray-300 mb-6 text-center font-mono">
              Lightning Welder seamlessly converts Bolt 12 offers to Bolt 11 invoices, ensuring compatibility across all Lightning wallets.
            </p>
        </Section>
        <Section>
          <div>
            <h2 className="text-4xl font-bold mb-6 text-center text-green-500 font-mono">
              Try it out 
            </h2>
            <WeldFormComponent />
          </div>
        </Section>
      </main>
    </div>
  )
}

export default App

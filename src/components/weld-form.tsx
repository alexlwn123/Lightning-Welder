import { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CypherpunkQr } from "./cypherpunk-qr"


const dummy = {
  "description": "test",
  "paymentHash": "asdflkjaasdklfjasjdklfjkl",
  "invoice": "lnbc250n1pns4f7jpp5s6etcj5dv40h9fq0sy52997m6thxlhyemekk2lxvys5l4t76he6sdqqcqz9vxqyz5vqrzjq0dpcf72w7rj43dnu4527vr88eve53a9u3yhlpw8khdyypygq7e76rf58gqqzsqqqqqqqqlgqqqqx6cq2qsp57jxces6qvzfx2qld0yuc7v8x2fpwjyww03p6q8dzx2fcr9sgz28s9p4gqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpqysgqznkf9u6422vfqxertw9lkxv57l22ajs5r6rfqy0l5wu03slwfqdkmq84n733vxnhvwxkt7sgl97ax4pcr0tqzcdjsp9zt43jw7u3gwsq50hd0h",
}

const parseOffer = (offer: string) => {
  //TODO
  return  dummy
}


const weldInvoice = (offer: string) => {
  //TODO
  return dummy.invoice
}

export function WeldFormComponent() {
  const [inputValue, setInputValue] = useState("")
  const [amount, setAmount] = useState(0)
  const [debouncedInputValue, setDebouncedInputValue] = useState("")
  const [showTable, setShowTable] = useState(false)
  const [tableData, setTableData] = useState<Record<string, string>>()
  const [bolt11Invoice, setBolt11Invoice] = useState("")

  const clear = () => {
    setShowTable(false)
    setBolt11Invoice("")
    setTableData({})
  }

  const handleWeld = () => {
    setBolt11Invoice(weldInvoice(inputValue))
  }

  useEffect(() => {
    if (!inputValue) {
      clear()
    }
    const timeout = setTimeout(() => {
      setDebouncedInputValue(inputValue)
      if (inputValue.trim()) {
        setShowTable(true)
      }
      const data = parseOffer(inputValue)
      setTableData(data)
    }, 500)
    return () => clearTimeout(timeout)
  }, [inputValue])

  return (
    <div className="max-w-md mx-auto mt-10 space-y-6">
      <form className="space-y-2">
        <Label htmlFor="offer">Paste Bolt12 Offer</Label>
        <Input
          id="offer"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="lno..."
        />
      </form>

      {showTable && tableData && (
        <>
          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/2">Field</TableHead>
                  <TableHead className="w-1/2">Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(tableData).map(([key, value], index) => (
                  <TableRow key={index}>
                    <TableCell className="break-words">{key}</TableCell>
                    <TableCell className="break-all">{value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <form className="space-y-2 mt-4">
            <Label htmlFor="amount">Amount (sats)</Label>
            <Input
              id="amount"
              type="number"
              inputMode="numeric"
              value={amount}
              onChange={(e) => {
                setAmount(parseInt(e.target.value))
                setBolt11Invoice("")
              }}
              placeholder="Enter amount"
              className="w-full"
            />
          </form>
          <Button className="w-full mt-4" onClick={handleWeld} disabled={!amount}>
            Weld
          </Button>
        </>
      )}
      {
        showTable && bolt11Invoice && (
          <CypherpunkQr title="Bolt11 Invoice" size={256} qrValue={bolt11Invoice} />
        )
      }
    </div>
  );
}
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
import { CypherpunkQr } from "./cypherpunk-qr";
import { createConfig, submit_bolt12, request_bolt11 } from "../lib/bolt12.js";

const parseOffer = () => {}

const submitOffer = async (config: ReturnType<typeof createConfig>, offer: string, amount: number) => {
  //TODO
  // IMPLEMENT PARSE
  const result = await submit_bolt12(config, offer, amount);
  console.error('RESULT', result);
  return result;
};

const weldInvoice = async (
  config: ReturnType<typeof createConfig>,
  fetched_event: object,
  amount: number,
  onBolt11: (bolt11: string) => void,
  onPaid: () => void
) => {
  //TODO
  // const result = await submit_bolt12(config, offer);
  const result = await request_bolt11(config, fetched_event, amount, onBolt11, onPaid);
  return result;
};

export function WeldFormComponent() {
  const [inputValue, setInputValue] = useState("");
  const [amount, setAmount] = useState(0);
  // const [, setDebouncedInputValue] = useState("");
  const [, setTableData] = useState<Record<string, string>>();
  const [result, setResult] = useState<object>();
  const [bolt11Invoice, setBolt11Invoice] = useState("");
  const [config, setConfig] = useState<ReturnType<typeof createConfig>>();
  const [paid, setPaid] = useState(false);

  const clear = () => {
    setBolt11Invoice("");
    setTableData(undefined);
  };
  const handleSubmit = async () => {
    const result = await submitOffer(config, inputValue, amount);
    setResult(result);
  }

  const handleWeld = () => {
    console.error('WELDING', result)
    if (!result) return;
    weldInvoice(config, result, amount, (bolt11) => {
      console.log('--------------------BOLT!!!!!!', bolt11)
      setBolt11Invoice(bolt11)
    }, () => {
      console.log('--------------------PAID!!!!!!')
      setPaid(true);
    });
  };

  useEffect(() => {
    setConfig(createConfig());
  }, []);

  useEffect(() => {
    if (!inputValue) {
      clear();
      return;
    }
    const timeout = setTimeout(() => {
      parseOffer()
    }, 500);
    return () => clearTimeout(timeout);
  }, [amount, config, inputValue]);

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

        <>
          {/* <div className="overflow-x-auto">
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
          </div> */}
          <form className="space-y-2 mt-4">
            <Label htmlFor="amount">Amount (sats)</Label>
            <Input
              id="amount"
              type="number"
              inputMode="numeric"
              value={amount}
              onChange={(e) => {
                setAmount(parseInt(e.target.value));
                setBolt11Invoice("");
              }}
              placeholder="Enter amount"
              className="w-full"
            />
          </form>
          <Button
            className="w-full mt-4"
            onClick={handleSubmit}
            disabled={!amount}
          >
            Validate
          </Button>
        </>
      {result && (
          <Button
            className="w-full mt-4"
            onClick={handleWeld}
            // disabled={!result}
          >
            Weld
          </Button>
      )}
      {bolt11Invoice && (
        <CypherpunkQr
          title="Bolt11 Invoice"
          size={256}
          qrValue={bolt11Invoice}
        />
      )}
      {paid && (
        <div className="text-lg sm:text-4xl font-bold mb-4 text-green-500 font-mono tracking-wide animate-pulse whitespace-nowrap">
          Paid!
        </div>
      )}
    </div>
  );
}

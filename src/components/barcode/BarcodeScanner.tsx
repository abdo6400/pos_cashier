import { useState } from 'react';
import { Scan, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

interface BarcodeScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onScan: (barcode: string) => void;
}

export function BarcodeScanner({ isOpen, onClose, onScan }: BarcodeScannerProps) {
  const [barcodeInput, setBarcodeInput] = useState('');

  const handleScan = () => {
    if (barcodeInput.trim()) {
      onScan(barcodeInput.trim());
      setBarcodeInput('');
      onClose();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleScan();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Scan Barcode</DialogTitle>
          <DialogDescription>
            Scan product barcode or enter manually
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Scanner Animation */}
          <div className="relative bg-gray-100 dark:bg-gray-800 rounded-lg p-8 flex items-center justify-center">
            <div className="text-center">
              <Scan className="w-16 h-16 mx-auto text-blue-600 animate-pulse" />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                Point camera at barcode
              </p>
            </div>
          </div>

          {/* Manual Input */}
          <div className="space-y-2">
            <label className="text-sm">Or enter barcode manually:</label>
            <Input
              value={barcodeInput}
              onChange={(e) => setBarcodeInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter barcode number"
              autoFocus
            />
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleScan} className="flex-1" disabled={!barcodeInput.trim()}>
              Scan
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
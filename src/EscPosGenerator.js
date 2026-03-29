/**
 * ESC/POS Command Generator for thermal printers.
 * Supports customizable layouts based on the Bill Printer Settings System.
 */

export class EscPosGenerator {
  constructor(settings = {}) {
    this.settings = settings;
    this.encoder = new TextEncoder();
    
    // Printer Profiles & Paper Width
    const profileId = settings.selectedProfileId || 'default';
    this.profile = settings.printerProfiles?.find(p => p.id === profileId) || { paperWidth: '80mm' };
    this.charLimit = this.profile.paperWidth === '58mm' ? 32 : 48; // Standard character limits for 58mm vs 80mm
    
    // Command Constants
    this.CMD = {
      INIT: new Uint8Array([0x1B, 0x40]),
      BOLD_ON: new Uint8Array([0x1B, 0x45, 1]),
      BOLD_OFF: new Uint8Array([0x1B, 0x45, 0]),
      ALIGN_LEFT: new Uint8Array([0x1B, 0x61, 0]),
      ALIGN_CENTER: new Uint8Array([0x1B, 0x61, 1]),
      ALIGN_RIGHT: new Uint8Array([0x1B, 0x61, 2]),
      CUT: new Uint8Array([0x1D, 0x56, 0x41, 0x08]),
      FONT_NORMAL: new Uint8Array([0x1B, 0x21, 0]),
      FONT_LARGE: new Uint8Array([0x1B, 0x21, 0x30]), // Double width & height
      LINE_SPACING_DEFAULT: new Uint8Array([0x1B, 0x32]),
    };
  }

  // Helper to merge multiple Uint8Arrays
  combine(arrays) {
    let totalLength = arrays.reduce((acc, arr) => acc + arr.length, 0);
    let result = new Uint8Array(totalLength);
    let offset = 0;
    for (let arr of arrays) {
      result.set(arr, offset);
      offset += arr.length;
    }
    return result;
  }

  t(text) {
    return this.encoder.encode(text);
  }

  line(char = '-') {
    return this.t(char.repeat(this.charLimit) + '\n');
  }

  generateBill(orderData) {
    const { header, body, footer, advanced } = this.settings;
    let cmds = [this.CMD.INIT];

    const paperWidth = this.profile.paperWidth || '80mm';
    const charLimit = this.charLimit;

    // --- Header ---
    cmds.push(this.CMD.ALIGN_CENTER);
    cmds.push(this.CMD.BOLD_ON);
    // Multiplier for larger text if supported, otherwise just bold
    cmds.push(this.t((header.storeName || 'Tyde Cafe') + '\n'));
    cmds.push(this.CMD.BOLD_OFF);
    if (header.storeAddress) {
      cmds.push(this.t(header.storeAddress + '\n'));
    }
    cmds.push(this.line('-'));

    // --- Meta Info ---
    cmds.push(this.CMD.ALIGN_LEFT);
    cmds.push(this.t(`Name: ${orderData.customerName || ''}\n`));
    cmds.push(this.line('-'));

    const dateStr = new Date().toLocaleDateString('en-GB');
    const timeStr = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    
    // Two column meta row helper
    const twoCol = (left, right) => {
      const spacing = charLimit - left.length - right.length;
      return left + " ".repeat(Math.max(1, spacing)) + right + "\n";
    };

    cmds.push(this.t(twoCol(`Date: ${dateStr}`, `${orderData.orderType || 'Dine In'}: ${orderData.tableName || 'N/A'}`)));
    cmds.push(this.t(`${timeStr}\n`));
    cmds.push(this.t(twoCol(`Cashier: ${orderData.cashierName || 'biller'}`, `Bill No.: ${orderData.billNo || '0000'}`)));
    cmds.push(this.line('-'));

    // --- Items Table ---
    // Column widths: Item(22), Qty(6), Price(10), Amount(10) total = 48
    const itemW = charLimit === 32 ? 14 : 22;
    const qtyW = charLimit === 32 ? 4 : 6;
    const priceW = charLimit === 32 ? 7 : 10;
    const amountW = charLimit === 32 ? 7 : 10;

    let tableHeader = "Item".padEnd(itemW) + "Qty.".padStart(qtyW) + "Price".padStart(priceW) + "Amount".padStart(amountW);
    cmds.push(this.t(tableHeader + '\n'));
    cmds.push(this.line('-'));

    orderData.items.forEach(item => {
      // Handle item name wrapping
      let name = item.name;
      let firstLine = name.substring(0, itemW).padEnd(itemW);
      let qty = item.qty.toString().padStart(qtyW);
      let price = item.price.toFixed(2).padStart(priceW);
      let amount = (item.qty * item.price).toFixed(2).padStart(amountW);

      cmds.push(this.t(firstLine + qty + price + amount + '\n'));
      
      // If name is longer, print the rest below
      if (name.length > itemW) {
        cmds.push(this.t(name.substring(itemW) + '\n'));
      }
    });
    cmds.push(this.line('-'));

    // --- Summary ---
    const totalQty = orderData.items.reduce((acc, i) => acc + i.qty, 0);
    
    // Total Qty (leftish), Sub Total (label), Amount (right)
    const summaryCol = (left, mid, right) => {
      // left is "Total Qty: X"
      // mid is "Sub Total"
      // right is amount
      // We want mid and right to align
      const rightPart = mid.padEnd(15) + right.padStart(10);
      const leftPart = left.padEnd(charLimit - rightPart.length);
      return leftPart + rightPart + "\n";
    };

    cmds.push(this.t(summaryCol(`Total Qty: ${totalQty}`, "Sub Total", orderData.subtotal?.toFixed(2))));
    
    if (orderData.serviceCharge > 0) {
      cmds.push(this.t(summaryCol("", "Service Charge", orderData.serviceCharge?.toFixed(2))));
      cmds.push(this.t(" ".repeat(charLimit - 25) + "(Optional)\n"));
    }

    if (orderData.roundOff !== 0) {
      const roStr = (orderData.roundOff > 0 ? "+" : "") + orderData.roundOff.toFixed(2);
      cmds.push(this.t(summaryCol("", "Round off", roStr)));
    }

    cmds.push(this.line('-'));
    
    // Grand Total Row
    cmds.push(this.CMD.BOLD_ON);
    const gtLabel = "Grand Total";
    const gtAmount = `₹${orderData.grandTotal?.toFixed(2)}`;
    const gtSpacing = charLimit - gtLabel.length - gtAmount.length;
    cmds.push(this.t(gtLabel + " ".repeat(Math.max(1, gtSpacing)) + gtAmount + '\n'));
    cmds.push(this.CMD.BOLD_OFF);
    cmds.push(this.line('-'));

    // --- Footer ---
    cmds.push(this.CMD.ALIGN_CENTER);
    if (footer.bottomText) {
      cmds.push(this.t(footer.bottomText + '\n'));
    } else {
      cmds.push(this.t("Thank You for Visiting!\n"));
    }

    // --- Cut ---
    cmds.push(this.t('\n\n\n\n'));
    cmds.push(this.CMD.CUT);

    return this.combine(cmds);
  }

  generateKOT(orderData, stationName = null) {
    let cmds = [this.CMD.INIT];
    const charLimit = this.charLimit;

    cmds.push(this.CMD.ALIGN_CENTER);
    cmds.push(this.CMD.BOLD_ON);
    cmds.push(this.t(`${stationName || 'KOT'}\n`));
    cmds.push(this.CMD.BOLD_OFF);
    cmds.push(this.line('='));
    
    cmds.push(this.CMD.ALIGN_LEFT);
    const dateStr = new Date().toLocaleDateString('en-GB');
    const timeStr = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    
    const twoCol = (left, right) => {
      const spacing = charLimit - left.length - right.length;
      return left + " ".repeat(Math.max(1, spacing)) + right + "\n";
    };

    cmds.push(this.t(twoCol(`Table: ${orderData.tableName}`, `Date: ${dateStr}`)));
    cmds.push(this.t(`Time: ${timeStr}\n`));
    cmds.push(this.line('-'));
    
    cmds.push(this.t("QTY  ITEM\n"));
    cmds.push(this.line('-'));
    
    orderData.items.forEach(item => {
      cmds.push(this.CMD.BOLD_ON);
      cmds.push(this.t(`${item.qty.toString().padEnd(5)}${item.name}\n`));
      cmds.push(this.CMD.BOLD_OFF);
      if (item.note) cmds.push(this.t(`  * NOTE: ${item.note}\n`));
    });
    
    cmds.push(this.line('='));
    cmds.push(this.t('\n\n\n\n'));
    cmds.push(this.CMD.CUT);
    
    return this.combine(cmds);
  }
}

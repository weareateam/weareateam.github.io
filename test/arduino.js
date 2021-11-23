  let isConnectted = false;
  let port;
  let writer;
  const enc = new TextEncoder();

  async function onChangeColor() {
    if (!isConnectted) {
      alert("connettere arduino");
      return;
    }
    try {
      const colorHex = document.getElementById("color-picker").value;
      const colorRgb = hexToRgb(colorHex);
      const computerText = `${colorRgb.r}-${colorRgb.g}-${colorRgb.b}@`;
      await writer.write(enc.encode(computerText));
    } catch (e) {
      console.log(e);
      alert("impossibile impostare il colore");
    }
  }

  async function onConnectUsb() {
    try {
      const requestOptions = {
        // filtro schede Arduino
        filters: [{
          usbVendorId: 0x2341
        }],
      };

      // Imposto porta seriale
      port = await navigator.serial.requestPort(requestOptions);
      await port.open({
        baudRate: 115200   // Stesso rate impostato nel codice Arduino
      });
      writer = port.writable.getWriter();
      isConnectted = true;
    } catch (e) {
      console.log(e);
    }
  }

  //converto hex in rgb per Arduino
  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      } :
      null;
  }

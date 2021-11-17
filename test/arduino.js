
  let isConnectted = false;
  let port;
  let writer;
  const enc = new TextEncoder();

  async function onChangeColor() {
    if (!isConnectted) {
      alert("you must connect to the usb in order to use this.");
      return;
    }
    try {
      const colorHex = document.getElementById("color-picker").value;
      const colorRgb = hexToRgb(colorHex);
      const computerText = `${colorRgb.r}-${colorRgb.g}-${colorRgb.b}@`;
      await writer.write(enc.encode(computerText));
    } catch (e) {
      console.log(e);
      alert("could not write color");
    }
  }

  async function onConnectUsb() {
    try {
      const requestOptions = {
        // Filter on devices with the Arduino USB vendor ID.
        filters: [{
          usbVendorId: 0x2341
        }],
      };

      // Request an Arduino from the user.
      port = await navigator.serial.requestPort(requestOptions);
      await port.open({
        baudRate: 115200
      });
      writer = port.writable.getWriter();
      isConnectted = true;
    } catch (e) {
      console.log(e);
    }
  }

  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      } :
      null;
  }

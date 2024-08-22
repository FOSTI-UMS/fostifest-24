const openWhatsAppPage = ({ name, instansi, message, phoneNumber }) => {
  let formattedMessage;
  if (name !== "") {
    formattedMessage = encodeURIComponent(
      `Halo kak 👋, perkenalkan saya ${name}${instansi != "" ? ` dari ${instansi}` : ""}.\n\n${message}\n\nTerima kasih atas waktu dan perhatiannya kak.`
    );
  } else {
    formattedMessage = "";
  }
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${formattedMessage}`;
  window.open(whatsappUrl, "_blank");
};

export default openWhatsAppPage;

const openWhatsAppPage = ({ name, instansi, message }) => {
  const formattedMessage = encodeURIComponent(
    `Halo kak, saya ${name} dari ${instansi}. Pesan saya: ${message}`
  );
  const phoneNumber = "6287831620669";
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${formattedMessage}`;
  console.log(whatsappUrl);
  window.open(whatsappUrl, "_blank");
};

export default openWhatsAppPage;

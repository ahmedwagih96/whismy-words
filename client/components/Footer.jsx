const Footer = () => {
  const year = new Date().getFullYear()
  return <footer style={styles}>Copyright {year} &copy;</footer>;
};

const styles = {
  color: "var(--white-color)",
  fontSize: "21px",
  backgroundColor: "var(--blue-color)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "50px",
};

export default Footer;

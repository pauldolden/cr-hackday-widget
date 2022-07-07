import * as React from "react";
import { Container } from "../styles/index.styles";

const IndexPage = () => {
  return (
    <Container>
      <nav>
        <a href="/widget">Widget</a>
        <a href="/mailer">Mailer</a>
      </nav>
    </Container>
  );
};

export default IndexPage;

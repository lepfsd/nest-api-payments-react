import { Container, Row, Col, Card, Table, ProgressBar } from "react-bootstrap";

const Dashboard = () => {
  return (
    <Container fluid className="p-3">
      <h1 className="mb-4">api payment nest js</h1>

      {/* Row of statistic cards */}
      <Row className="mb-4"></Row>
      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <Card.Text>1,230</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Monthly Revenue</Card.Title>
              <Card.Text>$42,000</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>New Sign-ups</Card.Title>
              <Card.Text>320</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Row of progress bars */}
      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Project A</Card.Title>
              <ProgressBar now={80} label="80%" />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Project B</Card.Title>
              <ProgressBar now={60} label="60%" />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Table of data */}
      <Row>
        <Col md={12}>
          <Card>
            <Card.Body>
              <Card.Title>Latest Transactions</Card.Title>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>User</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>2024-10-10</td>
                    <td>John Doe</td>
                    <td>$200</td>
                    <td>Completed</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>2024-10-11</td>
                    <td>Jane Smith</td>
                    <td>$300</td>
                    <td>Pending</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>2024-10-12</td>
                    <td>Bill Gates</td>
                    <td>$500</td>
                    <td>Completed</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;

import { Card, Row, Form, Button } from "react-bootstrap";
import "./InputModal.css";

const InputModal = ({ tittle, description, image, addHandle, handleChange }) => {
  return (
    <>
      <Row>
        <div className="background">
          <Card className="kartu">
            <Form>
              <Form.Group className="mb-3" controlId="formBasicTittle">
                <Form.Label>Tittle</Form.Label>
                <Form.Control type="text" value={tittle} onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" n value={description} onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicImage">
                <Form.Label>Image URL</Form.Label>
                <Form.Control type="text" value={image} onChange={handleChange} />
              </Form.Group>

              <Button variant="primary" type="submit" onClick={addHandle}>
                Submit
              </Button>
            </Form>
          </Card>
        </div>
      </Row>
    </>
  );
};

export default InputModal;

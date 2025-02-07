import { useState, useEffect } from "react";
import axios from "axios";
import {
  Modal,
  Button,
  Form,
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";

const DashboardServices = () => {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentService, setCurrentService] = useState({
    name: "",
    description: "",
    image: "",
  });

  const baseUrl = "http://localhost:2000/api";

  // Fetch Services
  const fetchServices = async () => {
    try {
      const response = await axios.get(`${baseUrl}/getAllService`);
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  // Handle Modal Open/Close
  const handleShowModal = (service = null) => {
    if (service) {
      setIsEditing(true);
      setCurrentService(service);
    } else {
      setIsEditing(false);
      setCurrentService({ name: "", description: "", image: "" });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  // Create or Update Service
  const handleSaveService = async () => {
    try {
      if (isEditing) {
        await axios.put(
          `${baseUrl}/UpdateService/${currentService._id}`,
          currentService
        );
      } else {
        await axios.post(`${baseUrl}/CreateService`, currentService);
      }
      fetchServices();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving service:", error);
    }
  };

  // Delete Service
  const handleDeleteService = async (id) => {
    try {
      await axios.delete(`${baseUrl}/DeleteService/${id}`);
      fetchServices();
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Service Management</h2>
      <Button variant="primary" onClick={() => handleShowModal()}>
        + Add New Service
      </Button>
      <Row className="mt-4">
        {services.map((services) => (
          <Col lg={3} md={6} className="mb-4" key={services._id}>
            <Card>
              <Card.Body>
                <Card.Img
                  src={services.image}
                  alt={services.name}
                  width="10px"
                  height="10px"
                  className="mb-3 img-fluid"
                />
                <Card.Title className="text-center">{services.name}</Card.Title>
                <Card.Text>{services.description}</Card.Text>
                <div className="text-center">
                  <Button
                    variant="warning"
                    onClick={() => handleShowModal(service)}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteService(service._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal for Add/Edit */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditing ? "Edit Service" : "Add New Service"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formServiceName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter service name"
                value={currentService.name}
                onChange={(e) =>
                  setCurrentService({ ...currentService, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formServiceDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter service description"
                value={currentService.description}
                onChange={(e) =>
                  setCurrentService({
                    ...currentService,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formServicePrice">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Image URL"
                value={currentService.image}
                onChange={(e) =>
                  setCurrentService({
                    ...currentService,
                    image: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveService}>
            {isEditing ? "Update Service" : "Add Service"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default DashboardServices;
